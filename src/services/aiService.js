import apiClient from './apiClient';

const aiService = {
  generatePlan: (data) => {
    return apiClient.post('/ai/generate-plan', data);
  },

  chat: (data) => {
    return apiClient.post('/ai/chat', data);
  },

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
};

export default aiService;
