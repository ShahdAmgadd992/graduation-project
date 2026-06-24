import { useState, useEffect, useCallback } from "react";
import { fetchHomePlaces } from "./tripmindApi";
/**
 * useHomePlaces
 * Fetches featured / hidden_gems / trending places for the Explore page.
 *
 * @param {string} city
 * @param {number} seed
 */
export function useHomePlaces(city = "Cairo", seed = 12345) {
  const [data, setData] = useState({
    featured: [],
    hidden_gems: [],
    trending: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchHomePlaces(city, seed);
      setData({
        featured: result.featured ?? [],
        hidden_gems: result.hidden_gems ?? [],
        trending: result.trending ?? [],
      });
      console.log("API Data:", result);
    } catch (err) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [city, seed]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...data, loading, error, refetch: load };
}
