/**
 * usePlaceReviews.js  – Fixed
 *
 * Strategy:
 *  1. place.reviews array → use directly
 *  2. tripId exists      → GET /api/v1/trips/{id}/reviews
 *  3. Fallback           → empty array (no dummies)
 *
 * Also exposes submitReview() → POST /api/v1/trips/{id}/review
 * so the modal Submit button actually works.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import apiClient from "../services/apiClient";

export function usePlaceReviews(place, tripId) {
  const [reviews,        setReviews]        = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [submitLoading,  setSubmitLoading]  = useState(false);
  const [submitError,    setSubmitError]    = useState(null);
  // ✅ FIX: Guard against double-submit (React Strict Mode fires effects twice, 409 Conflict)
  const submitInFlightRef = useRef(false);

  // ── Normalise one raw review into a display object ─────────────────────────
  const normalise = (r, i) => ({
    id:     r.tripReviewId || r.id || r.reviewId || i,
    name:   r.displayName  || r.name || "Traveller",
    rating: r.rating ?? 5,
    text:   r.comment      || r.text || "",
    avatar:
      r.profilePhotoUrl ||
      r.avatar ||
      `https://randomuser.me/api/portraits/${i % 2 === 0 ? "women" : "men"}/${(i % 10) + 1}.jpg`,
  });

  useEffect(() => {
    // Case 1: place already carries reviews
    if (Array.isArray(place?.reviews) && place.reviews.length > 0) {
      setReviews(place.reviews.map(normalise));
      return;
    }

    // Case 2: fetch via trip reviews endpoint
    if (tripId) {
      setReviewsLoading(true);
      apiClient
        .get(`/trips/${tripId}/reviews`)
        .then((res) => {
          const raw = Array.isArray(res.data) ? res.data : [];
          setReviews(raw.map(normalise));
        })
        .catch((err) => {
          console.error("Failed to load trip reviews:", err);
          setReviews([]);
        })
        .finally(() => setReviewsLoading(false));
    }
    // Case 3: no data → keep empty array
  }, [place, tripId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Submit a new review → POST /api/v1/trips/{id}/review ──────────────────
  // Returns { success: boolean }
  const submitReview = useCallback(
    async ({ rating, comment }) => {
      if (!tripId) return { success: false, error: "No trip selected yet." };
      // ✅ FIX: Prevent 409 Conflict from double-submit (React Strict Mode / fast clicks)
      if (submitInFlightRef.current) return { success: false, error: "Already submitting." };
      submitInFlightRef.current = true;
      setSubmitLoading(true);
      setSubmitError(null);
      try {
        const res = await apiClient.post(`/trips/${tripId}/review`, {
          rating,
          comment: comment || undefined,
        });
        // Add the new review optimistically to local state
        const newRev = normalise(
          {
            tripReviewId: res.data?.tripReviewId,
            rating,
            comment,
            displayName: "You",
          },
          reviews.length
        );
        setReviews((prev) => [...prev, newRev]);
        return { success: true };
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data ||
          "Failed to submit review.";
        setSubmitError(msg);
        console.error("submitReview error:", err);
        return { success: false, error: msg };
      } finally {
        submitInFlightRef.current = false;
        setSubmitLoading(false);
      }
    },
    [tripId, reviews.length] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return { reviews, reviewsLoading, submitReview, submitLoading, submitError };
}