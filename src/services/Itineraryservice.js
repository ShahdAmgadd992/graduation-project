import apiClient from './apiClient';

// ⚠️ مفيش /itineraries في الـ API
// الـ itineraries بتتعامل من خلال /trips و /favorites/trips

const itineraryService = {
  // ======== TRIPS ========

  // GET /api/v1/trips?Status=&Page=&PageSize=
  getTrips: ({ status, page = 1, pageSize = 10 } = {}) => {
    return apiClient.get('/trips', {
      params: {
        ...(status !== undefined && { Status: status }),
        Page: page,
        PageSize: pageSize,
      },
    });
  },

  // GET /api/v1/trips/{id}
  getTripById: (id) => {
    return apiClient.get(`/trips/${id}`);
  },

  // POST /api/v1/trips — إنشاء trip جديد
  createTrip: (data) => {
    // data: { title?, destinationGovernorate?, city?, startDate, endDate, people?, totalBudgetEgp?, plan?, sessionId?, isPublic?, status? }
    return apiClient.post('/trips', data);
  },

  // PUT /api/v1/trips/{id}/plan — تحديث الـ plan
  updateTripPlan: (id, data) => {
    return apiClient.put(`/trips/${id}/plan`, data);
  },

  // PATCH /api/v1/trips/{id}/rename
  renameTrip: (id, title) => {
    return apiClient.patch(`/trips/${id}/rename`, { title });
  },

  // PATCH /api/v1/trips/{id}/status?status=
  updateTripStatus: (id, status) => {
    return apiClient.patch(`/trips/${id}/status`, null, {
      params: { status },
    });
  },

  // PATCH /api/v1/trips/{id}/confirm
  confirmTrip: (id) => {
    return apiClient.patch(`/trips/${id}/confirm`);
  },

  // PATCH /api/v1/trips/{id}/complete
  completeTrip: (id) => {
    return apiClient.patch(`/trips/${id}/complete`);
  },

  // POST /api/v1/trips/{id}/share — الحصول على share link
  shareTrip: (id) => {
    return apiClient.post(`/trips/${id}/share`);
  },

  // GET /api/v1/trips/share/{token} — عرض trip مشارك بدون login
  getSharedTrip: (token) => {
    return apiClient.get(`/trips/share/${token}`);
  },

  // ======== REVIEWS ========

  // POST /api/v1/trips/{id}/review
  addReview: (id, { rating, comment }) => {
    return apiClient.post(`/trips/${id}/review`, { rating, comment });
  },

  // PATCH /api/v1/trips/{id}/review
  updateReview: (id, { rating, comment }) => {
    return apiClient.patch(`/trips/${id}/review`, { rating, comment });
  },

  // DELETE /api/v1/trips/{id}/review
  deleteReview: (id) => {
    return apiClient.delete(`/trips/${id}/review`);
  },

  // GET /api/v1/trips/{id}/review/me
  getMyReview: (id) => {
    return apiClient.get(`/trips/${id}/review/me`);
  },

  // ======== FAVORITE TRIPS ========

  // GET /api/v1/favorites/trips
  getFavoriteTrips: () => {
    return apiClient.get('/favorites/trips');
  },

  // POST /api/v1/favorites/trips/{tripId}
  addTripToFavorites: (tripId) => {
    return apiClient.post(`/favorites/trips/${tripId}`);
  },

  // DELETE /api/v1/favorites/trips/{tripId}
  removeTripFromFavorites: (tripId) => {
    return apiClient.delete(`/favorites/trips/${tripId}`);
  },
};

export default itineraryService;