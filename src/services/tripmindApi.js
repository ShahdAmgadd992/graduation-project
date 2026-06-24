import apiClient from "./apiClient";

export async function fetchHomePlaces(city = "Cairo", seed = 12345) {
  const res = await apiClient.post("/ai/places/home", { city, seed });
  return res.data;
}
