import apiClient from "./apiClient";

export async function fetchHomePlaces(city, seed = 12345) {
  
  const payload = { seed };
  

  if (city) {
    payload.city = city;
  }

  const res = await apiClient.post("/ai/places/home", payload);
  return res.data;
}