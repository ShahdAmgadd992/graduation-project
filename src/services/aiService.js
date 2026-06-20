import apiClient from './apiClient';

const aiService = {
  generatePlan: (data) => {
    return apiClient.post('/ai/generate-plan', data);
  },

  chat: (data) => {
    return apiClient.post('/ai/chat', data);
  },

  // alias "edit" so TripResult.jsx can call aiService.edit(...)
  edit: (data) => {
    return apiClient.post('/ai/edit', data);
  },

  // keep original name too so nothing else breaks
  editPlan: (data) => {
    return apiClient.post('/ai/edit', data);
  },

  recommendPlaces: (data) => {
    return apiClient.post('/ai/places/recommend', data);
  },

  topRatedPlaces: (data) => {
    return apiClient.post('/ai/places/top-rated', data);
  },

  randomPlaces: (data) => {
    return apiClient.post('/ai/places/random', data);
  },

  searchPlaces: (data) => {
    return apiClient.post('/ai/places/search', data);
  },

  getPlaceById: (placeId) => {
    return apiClient.get(`/ai/places/${placeId}`);
  },

  homePlaces: (data) => {
    return apiClient.post('/ai/places/home', data);
  },

  // POST /api/v1/ai/places/getplaces — flexible filtered list
  getPlaces: (data) => {
    return apiClient.post('/ai/places/getplaces', data);
  },
};

export default aiService;