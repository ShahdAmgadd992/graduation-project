import apiClient from './apiClient';

const itineraryService = {
  // GET /api/v1/itineraries  — returns saved itineraries for current user
  getItineraries: () => {
    return apiClient.get('/itineraries');
  },

  // POST /api/v1/itineraries  — save a trip as itinerary
  // body: { tripId, customName?, isFavorite? }
  saveItinerary: (data) => {
    return apiClient.post('/itineraries', data);
  },

  // DELETE /api/v1/itineraries/{id}
  deleteItinerary: (id) => {
    return apiClient.delete(`/itineraries/${id}`);
  },

  // GET /api/v1/itineraries/share/{token}  — public shared itinerary
  getSharedItinerary: (token) => {
    return apiClient.get(`/itineraries/share/${token}`);
  },
};

export default itineraryService;