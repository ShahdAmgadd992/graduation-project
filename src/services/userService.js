import apiClient from './apiClient';

const userService = {
  getMyProfile: () => {
    return apiClient.get('/users/me');
  },

  updateProfile: (data) => {
    return apiClient.patch('/users/me', data);
  },

  uploadPhoto: (formData) => {
    return apiClient.post('/users/me/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getDashboard: () => {
    return apiClient.get('/users/me/dashboard');
  },

  updateInterests: (list) => {
    return apiClient.put('/users/me/interests', { interests: list });
  },
};

export default userService;
