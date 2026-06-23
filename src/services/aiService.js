import apiClient from './apiClient';

// ─── Direct EditBot webhook (n8n) ─────────────────────────────────────────────
// The EditBot runs on a separate n8n webhook, NOT on the main backend.
// We call it directly with the snake_case payload the API expects.
const EDITBOT_URL =
  'https://n8n-production-6258.up.railway.app/webhook/edit-plan';

const aiService = {
  // POST /api/v1/ai/generate-plan
  generatePlan: (data) => {
    return apiClient.post('/ai/generate-plan', data);
  },

  // POST /api/v1/ai/chat
  chat: (data) => {
    return apiClient.post('/ai/chat', data);
  },

  // POST /api/v1/ai/places/home
  homePlaces: (data) => {
    return apiClient.post('/ai/places/home', data);
  },

  // POST /api/v1/ai/places/recommend
  recommendPlaces: (data) => {
    return apiClient.post('/ai/places/recommend', data);
  },

  // POST /api/v1/ai/places/search
  searchPlaces: (data) => {
    return apiClient.post('/ai/places/search', data);
  },

  // POST /api/v1/ai/places/top-rated
  topRatedPlaces: (data) => {
    return apiClient.post('/ai/places/top-rated', data);
  },

  // POST /api/v1/ai/places/getplaces
  getPlaces: (data) => {
    return apiClient.post('/ai/places/getplaces', data);
  },

  // GET /api/v1/ai/places/{placeId}
  getPlaceById: (placeId) => {
    return apiClient.get(`/ai/places/${placeId}`);
  },

  // ── EditBot — calls n8n webhook directly (snake_case payload) ───────────────
  // Accepts camelCase from the component and converts to snake_case for the API.
  //
  // Required fields (camelCase in → snake_case out):
  //   targetChange  → target_change
  //   destination   → destination
  //   days          → days
  //   budget        → budget
  //   people        → people
  //   interests     → interests
  //   existingPlan  → existing_plan
  //   places        → places        (optional candidate list)
  //   conversation  → conversation  (optional, last 4-8 turns)
  edit: ({
    targetChange,
    destination,
    days,
    budget,
    people,
    interests,
    existingPlan,
    places,
    conversation,
  }) => {
    const body = {
      target_change: targetChange,
      destination,
      days,
      budget,
      people,
      interests: interests ?? [],
      existing_plan: existingPlan ?? [],
      places: places ?? [],
      conversation: conversation ?? [],
    };

    return fetch(EDITBOT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw Object.assign(new Error(err?.message ?? 'EditBot request failed'), {
            response: { data: err, status: res.status },
          });
        });
      }
      return res.json().then((data) => ({ data })); // mimic axios shape { data }
    });
  },
};

export default aiService;