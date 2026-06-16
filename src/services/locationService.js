import apiClient from './apiClient';

const locationService = {
  getLocations: (params) => {
    return apiClient.get('/locations', { params });
  },

  getLocationById: (id) => {
    return apiClient.get(`/locations/${id}`);
  },

  getHiddenGems: (governorate) => {
    return apiClient.get('/locations/hidden-gems', {
      params: { governorate },
    });
  },

  getRecommended: (count) => {
    return apiClient.get('/locations/recommended', {
      params: { count },
    });
  },

  getPopular: (governorate, count) => {
    return apiClient.get('/locations/popular', {
      params: { governorate, count },
    });
  },
};

export default locationService;
