import apiClient from './apiClient';

const locationService = {
  // GET /api/v1/ai/places/{placeId}
  getLocationById: (placeId) => {
    return apiClient.get(`/ai/places/${placeId}`);
  },

  // POST /api/v1/ai/places/recommend
  // selectedCategories مطلوبة، باقي الحاجات optional
  getRecommended: ({ selectedCategories = [], page = 1, limit = 12, seed, filters } = {}) => {
    return apiClient.post('/ai/places/recommend', {
      selectedCategories,
      page,
      limit,
      ...(seed !== undefined && { seed }),
      ...(filters && { filters }),
    });
  },

  // POST /api/v1/ai/places/getplaces
  // للـ hidden gems: hiddenGem: true
  getHiddenGems: ({ city, page = 1, limit = 12 } = {}) => {
    return apiClient.post('/ai/places/getplaces', {
      hiddenGem: true,
      ...(city && { city: [city] }),
      page,
      limit,
    });
  },

  // POST /api/v1/ai/places/top-rated
  getPopular: ({ city, page = 1, limit = 12, filters } = {}) => {
    return apiClient.post('/ai/places/top-rated', {
      page,
      limit,
      ...(city && {
        filters: {
          ...filters,
          city_en: city,
        },
      }),
    });
  },

  // POST /api/v1/ai/places/search
  searchPlaces: ({ query, filters, page = 1, limit = 12 } = {}) => {
    return apiClient.post('/ai/places/search', {
      query,
      page,
      limit,
      ...(filters && { filters }),
    });
  },

  // POST /api/v1/ai/places/home
  getHomePlaces: ({ city, seed } = {}) => {
    return apiClient.post('/ai/places/home', {
      ...(city && { city }),
      ...(seed !== undefined && { seed }),
    });
  },

  // POST /api/v1/ai/places/getplaces — general filter
  getPlaces: ({ city, category, interests, minRating, maxRating, minPrice, maxPrice, hiddenGem, sortBy, order, page = 1, limit = 12 } = {}) => {
    return apiClient.post('/ai/places/getplaces', {
      ...(city && { city: Array.isArray(city) ? city : [city] }),
      ...(category && { category }),
      ...(interests && { interests }),
      ...(minRating !== undefined && { minRating }),
      ...(maxRating !== undefined && { maxRating }),
      ...(minPrice !== undefined && { minPrice }),
      ...(maxPrice !== undefined && { maxPrice }),
      ...(hiddenGem !== undefined && { hiddenGem }),
      ...(sortBy && { sortBy }),
      ...(order && { order }),
      page,
      limit,
    });
  },
};

export default locationService;