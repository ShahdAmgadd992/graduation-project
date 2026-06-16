import apiClient from './apiClient';

const tripService = {
  createTrip: (data) => {
    return apiClient.post('/trips', data);
  },

  getTrips: (params) => {
    return apiClient.get('/trips', { params });
  },

  getTripById: (id) => {
    return apiClient.get(`/trips/${id}`);
  },

  updateTrip: (id, data) => {
    return apiClient.patch(`/trips/${id}`, data);
  },

  deleteTrip: (id) => {
    return apiClient.delete(`/trips/${id}`);
  },

  updateTripStatus: (id, status) => {
    return apiClient.patch(`/trips/${id}/status`, { status });
  },

  getBudget: (tripId) => {
    return apiClient.get(`/trips/${tripId}/budget`);
  },

  allocateBudget: (tripId, data) => {
    return apiClient.post(`/trips/${tripId}/budget`, data);
  },

  updateActualSpent: (tripId, amt) => {
    return apiClient.patch(`/trips/${tripId}/budget/actual-spent`, {
      actualSpentEgp: amt,
    });
  },
};

export default tripService;
