import apiClient from './apiClient';

const reviewService = {
  // GET /api/v1/reviews/location/{locationId}
  getLocationReviews: (locationId) => {
    return apiClient.get(`/reviews/location/${locationId}`);
  },

  // POST /api/v1/reviews
  // body: { locationId, rating (1-5), reviewText?, photoUrl?, visitedAt? }
  addReview: (data) => {
    return apiClient.post('/reviews', data);
  },

  // POST /api/v1/reviews/{id}/vote?isHelpful=true|false
  voteReview: (id, isHelpful) => {
    return apiClient.post(`/reviews/${id}/vote`, null, { params: { isHelpful } });
  },

  // POST /api/v1/reviews/{id}/report
  reportReview: (id) => {
    return apiClient.post(`/reviews/${id}/report`);
  },
};

export default reviewService;