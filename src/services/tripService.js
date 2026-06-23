import apiClient from './apiClient';

const tripService = {
  // POST /api/v1/trips
  createTrip: (data) => {
    return apiClient.post('/trips', data);
  },

  // GET /api/v1/trips  — params: { Status, Page, PageSize }
  // TripStatus enum: 0=Planning, 1=Upcoming, 2=Active, 3=Completed
  getTrips: (params) => {
    return apiClient.get('/trips', { params });
  },

  // GET /api/v1/trips/{id}
  getTripById: (id) => {
    return apiClient.get(`/trips/${id}`);
  },

  // PUT /api/v1/trips/{id}/plan  (full plan update)
  updateTripPlan: (id, data) => {
    return apiClient.put(`/trips/${id}/plan`, data);
  },

  // PATCH /api/v1/trips/{id}/rename
  renameTrip: (id, title) => {
    return apiClient.patch(`/trips/${id}/rename`, { title });
  },

  // PATCH /api/v1/trips/{id}/status?status=N
  updateTripStatus: (id, status) => {
    return apiClient.patch(`/trips/${id}/status`, null, { params: { status } });
  },

  // PATCH /api/v1/trips/{id}/confirm
  confirmTrip: (id) => {
    return apiClient.patch(`/trips/${id}/confirm`);
  },

  // PATCH /api/v1/trips/{id}/complete
  completeTrip: (id) => {
    return apiClient.patch(`/trips/${id}/complete`);
  },

  // POST /api/v1/trips/{id}/share  → returns share token
  shareTrip: (id) => {
    return apiClient.post(`/trips/${id}/share`);
  },

  // GET /api/v1/trips/share/{token}  → public trip view
  getTripByShareToken: (token) => {
    return apiClient.get(`/trips/share/${token}`);
  },

  // POST /api/v1/trips/{id}/review
  createReview: (id, data) => {
    return apiClient.post(`/trips/${id}/review`, data);
  },

  // PATCH /api/v1/trips/{id}/review
  updateReview: (id, data) => {
    return apiClient.patch(`/trips/${id}/review`, data);
  },

  // DELETE /api/v1/trips/{id}/review
  deleteReview: (id) => {
    return apiClient.delete(`/trips/${id}/review`);
  },

  // GET /api/v1/trips/{id}/review/me
  getMyReview: (id) => {
    return apiClient.get(`/trips/${id}/review/me`);
  },
};

export default tripService;