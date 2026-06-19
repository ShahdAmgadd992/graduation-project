import apiClient from './apiClient';

const tripService = {
  // POST /api/v1/trips
  createTrip: (data) => {
    return apiClient.post('/trips', data);
  },

  // GET /api/v1/trips  — params: { Status, Page, PageSize }
  // Status enum: 0=Planning, 1=Upcoming, 2=Active, 3=Completed, 4=Cancelled
  getTrips: (params) => {
    return apiClient.get('/trips', { params });
  },

  // GET /api/v1/trips/{id}
  getTripById: (id) => {
    return apiClient.get(`/trips/${id}`);
  },

  // PATCH /api/v1/trips/{id}
  updateTrip: (id, data) => {
    return apiClient.patch(`/trips/${id}`, data);
  },

  // DELETE /api/v1/trips/{id}
  deleteTrip: (id) => {
    return apiClient.delete(`/trips/${id}`);
  },

  // PATCH /api/v1/trips/{id}/status?status=N
  updateTripStatus: (id, status) => {
    return apiClient.patch(`/trips/${id}/status`, null, { params: { status } });
  },

  // GET /api/v1/trips/{tripId}/budget
  getBudget: (tripId) => {
    return apiClient.get(`/trips/${tripId}/budget`);
  },

  // POST /api/v1/trips/{tripId}/budget
  allocateBudget: (tripId, data) => {
    return apiClient.post(`/trips/${tripId}/budget`, data);
  },

  // PATCH /api/v1/trips/{tripId}/budget/actual-spent
  updateActualSpent: (tripId, amt) => {
    return apiClient.patch(`/trips/${tripId}/budget/actual-spent`, {
      actualSpentEgp: amt,
    });
  },
};

export default tripService;