/**
 * useAddToTrip.js  – Final Fixed Version (v5 - Slot Preservation Fix)
 *
 * Bug fixes:
 * 1. ✅ Data Structure Mismatch Fixed
 * 2. ✅ formatPlanForBackend: فلتر بـ _slot بس — مش بـ indexOf (كان بيبوظ الترتيب)
 * 3. ✅ Auto-assign fallback: لو الـ AI edit فشل يرجع لـ findBestDay
 * 4. ✅ generatePlan 503: لو السيرفر بيعطي 503 نحفظ التريب بدون plan ونكمّل
 * 5. ✅ 400 Validation Error: buildPlaceItem بيعمل Number()/String() coercion صريح لكل الحقول
 * 6. ✅ putPlan() helper: بيلف كل نداء PUT بصيغة { plan: {...} } الصحيحة وبيطبعها
 */

import { useState, useCallback } from "react";
import tripService from "../services/tripService";
import aiService from "../services/aiService";

// ─── Budget calculation ───────────────────────────────────────────────────────
export const calcBudget = (tier, days, people) => {
  const economy = days * people * 1800;
  if (tier === "Economic")    return economy;
  if (tier === "Comfortable") return Math.round(economy * 1.5);
  if (tier === "Luxury")      return Math.round(economy * 1.5 * 1.5);
  return economy;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Convert backend Object { day1: { morning: [] } } to internal Array
const parsePlan = (rawPlan) => {
  if (!rawPlan) return [];
  if (typeof rawPlan === "string") {
    try { rawPlan = JSON.parse(rawPlan); } catch { return []; }
  }
  if (Array.isArray(rawPlan)) return rawPlan;
  if (rawPlan.days && Array.isArray(rawPlan.days)) return rawPlan.days;

  // Handle Backend Object format: { day1: { morning: [], afternoon: [], evening: [] } }
  const planArray = [];
  Object.keys(rawPlan).forEach((key) => {
    if (key.startsWith("day")) {
      const dayNum = parseInt(key.replace("day", ""), 10);
      const dayData = rawPlan[key];
      let places = [];

      if (Array.isArray(dayData)) {
        places = dayData;
      } else if (typeof dayData === "object" && dayData !== null) {
        // Tag each place with its slot so we can round-trip slot structure correctly
        const morning   = (dayData.morning   || []).map((p) => ({ ...p, _slot: "morning"   }));
        const afternoon = (dayData.afternoon || []).map((p) => ({ ...p, _slot: "afternoon" }));
        const evening   = (dayData.evening   || []).map((p) => ({ ...p, _slot: "evening"   }));
        places = [...morning, ...afternoon, ...evening];
      }
      planArray.push({ day: dayNum, places });
    }
  });

  return planArray.sort((a, b) => a.day - b.day);
};

// ✅ FIX: Convert internal Array back to Backend Object format before API calls.
// Filters ONLY by _slot tag — never by index (index-based filtering broke slot order
// whenever a new place was prepended to the array, shifting all indices).
// Places with no _slot fallback to morning.
const formatPlanForBackend = (planArray) => {
  const formatted = {};
  planArray.forEach((dayObj) => {
    const dayKey = `day${dayObj.day}`;
    const places = dayObj.places || [];

    const morning   = places.filter((p) => p._slot === "morning"   || !p._slot);
    const afternoon = places.filter((p) => p._slot === "afternoon");
    const evening   = places.filter((p) => p._slot === "evening");

    formatted[dayKey] = { morning, afternoon, evening };
  });
  return formatted;
};

const findBestDay = (plan, totalDays) => {
  if (!plan || plan.length === 0) return 1;
  const counts = {};
  for (let d = 1; d <= totalDays; d++) counts[d] = 0;
  plan.forEach((dayObj) => {
    counts[dayObj.day] = (dayObj.places || []).length;
  });
  return Number(Object.entries(counts).sort((a, b) => a[1] - b[1])[0][0]);
};

const buildPlaceItem = (place, dayNumber) => {
  const mappedPlace = {
    place_id:      place?.place_id || null,
    name:          String(place?.title || place?.name || "Unknown Place"),
    day:           Number(dayNumber) || 1,
    type:          place?.type || null,
    category:      place?.category || null,
    price:         Number(place?.price) || 0,
    cost:          Number(place?.cost ?? place?.price) || 0,
    city:          place?.city || null,
    city_en:       place?.city || null,
    lat:           Number(place?.lat) || 0,
    lng:           Number(place?.lng) || 0,
    rating:        Number(place?.rating) || 0,
    reviews_count: Number(place?.reviews_count) || 0,
    address:       place?.address || null,
    description:   place?.description || null,
    photo_url:     place?.photo_url || place?.image || place?.image_urls?.[0] || null,
    image_urls:    place?.image_urls || [],
    maps_url:      place?.maps_url || null,
    interests:     place?.interests || [],
  };

  console.log("Mapped Place Item:", mappedPlace);
  return mappedPlace;
};

const sanitizePlaceFromAi = (rawPlace, dayNumber) => ({
  place_id:      rawPlace?.place_id || rawPlace?.id || null,
  name:          String(rawPlace?.name || rawPlace?.title || "Unknown Place"),
  day:           Number(dayNumber) || 1,
  type:          rawPlace?.type || null,
  category:      rawPlace?.category || null,
  price:         Number(rawPlace?.price ?? rawPlace?.cost) || 0,
  cost:          Number(rawPlace?.cost ?? rawPlace?.price) || 0,
  city:          rawPlace?.city || rawPlace?.city_en || null,
  city_en:       rawPlace?.city_en || rawPlace?.city || null,
  lat:           Number(rawPlace?.lat ?? rawPlace?.latitude) || 0,
  lng:           Number(rawPlace?.lng ?? rawPlace?.longitude) || 0,
  rating:        Number(rawPlace?.rating) || 0,
  reviews_count: Number(rawPlace?.reviews_count ?? rawPlace?.reviewsCount) || 0,
  address:       rawPlace?.address || null,
  description:   rawPlace?.description || null,
  photo_url:     rawPlace?.photo_url || rawPlace?.image || rawPlace?.image_urls?.[0] || rawPlace?.photos?.[0] || null,
  image_urls:    rawPlace?.image_urls || rawPlace?.photos || [],
  maps_url:      rawPlace?.maps_url || null,
  interests:     rawPlace?.interests || [],
});

const sanitizePlanForApi = (rawPlan) => {
  if (!Array.isArray(rawPlan)) return [];
  const sanitized = rawPlan.map((dayObj) => {
    const dayNumber = Number(dayObj?.day) || 1;
    const places = Array.isArray(dayObj?.places) ? dayObj.places : [];
    return {
      day: dayNumber,
      places: places.map((p) => sanitizePlaceFromAi(p, dayNumber)),
    };
  });
  console.log("Sanitized AI plan (Array format):", sanitized);
  return sanitized;
};

const resolveInterests = (explicitInterests, place) => {
  if (Array.isArray(explicitInterests) && explicitInterests.length > 0) return explicitInterests;
  if (Array.isArray(place?.interests) && place.interests.length > 0) return place.interests;
  if (place?.category) return [place.category];
  if (place?.type) return [place.type];
  return [];
};

const putPlan = (tripId, planArray) => {
  const formattedPlan = formatPlanForBackend(planArray);
  const payload = { plan: formattedPlan };
  console.log("Final PUT Payload:", payload);
  return tripService.updateTripPlan(tripId, payload);
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAddToTrip(place, { onPlanUpdated } = {}) {
  const [trips,          setTrips]          = useState([]);
  const [tripsLoading,   setTripsLoading]   = useState(false);
  const [addedTripId,    setAddedTripId]    = useState(null);
  const [addedTripTitle, setAddedTripTitle] = useState("");
  const [currentDayNumber, setCurrentDayNumber] = useState(null);
  const [actionLoading,  setActionLoading]  = useState(false);
  const [error,          setError]          = useState(null);

  // ── Fetch & filter trips ────────────────────────────────────────────────────
  const fetchTrips = useCallback(async () => {
    setTripsLoading(true);
    setError(null);
    try {
      const res   = await tripService.getTrips({ Page: 1, PageSize: 50 });
      const items = res.data?.items || res.data?.data ||
                    (Array.isArray(res.data) ? res.data : []);
      const placeGov = place?.governorate || place?.destinationGovernorate || place?.city;

      const filtered = items
        .map((t) => ({ ...t, id: t.tripId, coverImage: t.coverImageUrl }))
        .filter((t) => {
          if (!placeGov) return true;
          const tGov = t.destinationGovernorate || t.city;
          return (
            !tGov ||
            tGov.toLowerCase().includes(placeGov.toLowerCase()) ||
            placeGov.toLowerCase().includes(tGov.toLowerCase())
          );
        });

      setTrips(filtered);
      return filtered;
    } catch (err) {
      setError("Failed to load trips.");
      console.error(err);
      return [];
    } finally {
      setTripsLoading(false);
    }
  }, [place]);

  // ── Path A: Add to EXISTING trip ───────────────────────────────────────────
  const addToExistingTrip = useCallback(
    async (tripId, daySelection) => {
      setActionLoading(true);
      setError(null);
      try {
        const tripRes  = await tripService.getTripById(tripId);
        const tripData = tripRes.data;
        let   plan     = parsePlan(tripData.plan);
        let   targetDay;

        if (daySelection === null) {
          targetDay = findBestDay(plan, tripData.durationDays || 1);
        } else {
          targetDay = Number(daySelection);
        }

        const placeName = place?.title || place?.name;
        const placeId   = place?.place_id;

        let dayEntry = plan.find((d) => Number(d.day) === targetDay);
        if (!dayEntry) {
          dayEntry = { day: targetDay, places: [] };
          plan.push(dayEntry);
        }

        // Remove any existing copy first (idempotent)
        dayEntry.places = (dayEntry.places || []).filter((p) =>
          (placeId && p.place_id) ? p.place_id !== placeId : p.name !== placeName
        );

        // Insert at the front of the morning slot
        const newPlaceItem = { ...buildPlaceItem(place, targetDay), _slot: "morning" };
        dayEntry.places = [newPlaceItem, ...dayEntry.places];

        await putPlan(tripId, plan);

        setCurrentDayNumber(targetDay);
        setAddedTripId(tripId);
        setAddedTripTitle(tripData.title || "your trip");

        onPlanUpdated?.({ tripId, day: targetDay });
        window.dispatchEvent(new CustomEvent("tripPlanUpdated", { detail: { tripId, day: targetDay } }));

        return { success: true, tripTitle: tripData.title, day: targetDay };
      } catch (err) {
        const serverMsg =
          err?.response?.data?.detail ||
          err?.response?.data?.title  ||
          err?.message ||
          "Failed to add place to trip.";
        setError(serverMsg);
        console.error("addToExistingTrip failed:", err?.response?.data || err);
        return { success: false, error: serverMsg };
      } finally {
        setActionLoading(false);
      }
    },
    [place]
  );

  // ── Path B: Create NEW trip + generate AI plan ─────────────────────────────
  const createTripWithPlan = useCallback(
    async ({ startDate, endDate, budgetTier, people, interests }) => {
      setActionLoading(true);
      setError(null);
      try {
        const days   = Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));
        const budget = calcBudget(budgetTier, days, people);
        const city   = place?.city || "Cairo";

        const createRes = await tripService.createTrip({
          title:                  `Trip to ${city}`,
          destinationGovernorate: place?.governorate || city,
          city,
          startDate:    startDate.toISOString(),
          endDate:      endDate.toISOString(),
          people,
          totalBudgetEgp: budget,
          isPublic:     false,
        });

        const newTripId = createRes.data?.tripId;
        if (!newTripId) throw new Error("No tripId returned from create");

        let hasPlan = false;
        try {
          const resolvedInterests = resolveInterests(interests, place);
          const planRes = await aiService.generatePlan({
            city,
            days,
            budget,
            people,
            interests:   resolvedInterests,
            mustInclude: place?.title || place?.name || "",
          });

          const generatedPlan = parsePlan(planRes.data?.plan || planRes.data);
          const sanitizedPlan = sanitizePlanForApi(generatedPlan);
          const totalPlaces = sanitizedPlan.reduce((sum, d) => sum + (d.places?.length || 0), 0);

          if (totalPlaces > 0) {
            await putPlan(newTripId, sanitizedPlan);
            hasPlan = true;
          } else {
            console.warn("AI returned a plan with 0 places — trip shell saved without itinerary.");
          }
        } catch (planErr) {
          console.warn("generate-plan failed, trip shell saved without plan:", planErr?.response?.data || planErr);
        }

        setAddedTripId(newTripId);
        setAddedTripTitle(`Trip to ${city}`);
        return { success: true, tripId: newTripId, tripTitle: `Trip to ${city}`, hasPlan };
      } catch (err) {
        setError("Failed to create trip.");
        console.error(err);
        return { success: false };
      } finally {
        setActionLoading(false);
      }
    },
    [place]
  );

  // ── Manage: Move to another day ────────────────────────────────────────────
  const moveToAnotherDay = useCallback(
    async (newDayNumber) => {
      if (!addedTripId) return { success: false };
      setActionLoading(true);
      setError(null);
      try {
        const tripRes = await tripService.getTripById(addedTripId);
        let   plan    = parsePlan(tripRes.data.plan);

        plan = plan.map((d) => ({
          ...d,
          places: (d.places || []).filter(
            (p) => p.place_id !== place?.place_id &&
                   p.name    !== (place?.title || place?.name)
          ),
        }));

        let newDayEntry = plan.find((d) => d.day === newDayNumber);
        if (!newDayEntry) {
          newDayEntry = { day: newDayNumber, places: [] };
          plan.push(newDayEntry);
        }
        newDayEntry.places = [
          ...(newDayEntry.places || []),
          { ...buildPlaceItem(place, newDayNumber), _slot: "morning" },
        ];

        await putPlan(addedTripId, plan);
        setCurrentDayNumber(newDayNumber);
        onPlanUpdated?.({ tripId: addedTripId, day: newDayNumber });
        window.dispatchEvent(new CustomEvent("tripPlanUpdated", { detail: { tripId: addedTripId } }));
        return { success: true };
      } catch (err) {
        setError("Failed to move place.");
        console.error(err);
        return { success: false };
      } finally {
        setActionLoading(false);
      }
    },
    [addedTripId, place]
  );

  // ── Manage: Move to another trip ───────────────────────────────────────────
  const moveToAnotherTrip = useCallback(
    async (destinationTripId) => {
      if (!addedTripId) return { success: false };
      setActionLoading(true);
      setError(null);
      try {
        const currentRes = await tripService.getTripById(addedTripId);
        let   currentPlan = parsePlan(currentRes.data.plan);
        currentPlan = currentPlan.map((d) => ({
          ...d,
          places: (d.places || []).filter(
            (p) => p.place_id !== place?.place_id &&
                   p.name    !== (place?.title || place?.name)
          ),
        }));
        await putPlan(addedTripId, currentPlan);

        const destRes  = await tripService.getTripById(destinationTripId);
        let   destPlan = parsePlan(destRes.data.plan);
        let   destDay1 = destPlan.find((d) => d.day === 1);
        if (!destDay1) {
          destDay1 = { day: 1, places: [] };
          destPlan.push(destDay1);
        }
        destDay1.places = [
          ...(destDay1.places || []),
          { ...buildPlaceItem(place, 1), _slot: "morning" },
        ];
        await putPlan(destinationTripId, destPlan);

        const destTripTitle = destRes.data?.title || "the trip";
        setAddedTripId(destinationTripId);
        setAddedTripTitle(destTripTitle);
        setCurrentDayNumber(1);
        onPlanUpdated?.({ tripId: destinationTripId });
        window.dispatchEvent(new CustomEvent("tripPlanUpdated", { detail: { tripId: destinationTripId } }));
        return { success: true, destTripTitle };
      } catch (err) {
        setError("Failed to move place to another trip.");
        console.error(err);
        return { success: false };
      } finally {
        setActionLoading(false);
      }
    },
    [addedTripId, place]
  );

  // ── Manage: Remove from trip ───────────────────────────────────────────────
  const removeFromTrip = useCallback(async () => {
    if (!addedTripId) return { success: false };
    setActionLoading(true);
    setError(null);
    try {
      const tripRes = await tripService.getTripById(addedTripId);
      let   plan    = parsePlan(tripRes.data.plan);
      plan = plan.map((d) => ({
        ...d,
        places: (d.places || []).filter(
          (p) => p.place_id !== place?.place_id &&
                 p.name    !== (place?.title || place?.name)
        ),
      }));
      await putPlan(addedTripId, plan);
      onPlanUpdated?.({ tripId: addedTripId });
      window.dispatchEvent(new CustomEvent("tripPlanUpdated", { detail: { tripId: addedTripId } }));
      setAddedTripId(null);
      setAddedTripTitle("");
      setCurrentDayNumber(null);
      return { success: true };
    } catch (err) {
      setError("Failed to remove place from trip.");
      console.error(err);
      return { success: false };
    } finally {
      setActionLoading(false);
    }
  }, [addedTripId, place]);

  return {
    trips, tripsLoading, actionLoading, error,
    addedTripId, addedTripTitle, currentDayNumber,
    isAddedToTrip: !!addedTripId,
    fetchTrips, addToExistingTrip, createTripWithPlan,
    moveToAnotherDay, moveToAnotherTrip, removeFromTrip,
  };
}