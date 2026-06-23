import apiClient from "./apiClient";

const userService = {
  // GET /api/v1/users/me
  getMyProfile: () => {
    return apiClient.get("/users/me");
  },

  // PATCH /api/v1/users/me
  // Accepts: { displayName, username, phoneNumber, bio, homeGovernorate, languagePreference, profilePhotoUrl }
  updateProfile: (data) => {
    return apiClient.patch("/users/me", data);
  },

  // POST /api/v1/users/me/photo  (multipart/form-data)
  uploadPhoto: (formData) => {
    return apiClient.post("/users/me/photo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // GET /api/v1/users/me/dashboard → { totalTrips, totalReviews, totalSaved }
  getDashboard: () => {
    return apiClient.get("/users/me/dashboard");
  },

  // PUT /api/v1/users/me/interests  → { interests: string[] }
  updateInterests: (list) => {
    return apiClient.put("/users/me/interests", { interests: list });
  },

  // DELETE /api/v1/users/me
  deleteAccount: () => {
    return apiClient.delete("/users/me");
  },
};

export default userService;
