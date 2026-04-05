import apiClient from './apiClient';

const authService = {
  // 01. Register
  register: (data) => {
    return apiClient.post('/auth/register', {
      displayName: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      rememberMe: data.rememberMe || false,
    });
  },

  // 02. Verify Email
  verifyEmail: (email, otp) => {
    return apiClient.post('/auth/email/verify', { email, otp });
  },

  // 03. Resend Email OTP
  resendEmailOtp: (email) => {
    return apiClient.post('/auth/email/resend-otp', { email });
  },

  // 04. Login
  login: (email, password, rememberMe = false) => {
    return apiClient.post('/auth/login', { email, password, rememberMe });
  },

  // 05. Verify Login OTP (2FA)
  verifyLoginOtp: (email, otp) => {
    return apiClient.post('/auth/login/verify', { email, otp });
  },

  // 06. Resend Login OTP
  resendLoginOtp: (email) => {
    return apiClient.post('/auth/login/resend-otp', { email });
  },

  // 07. Google Login
  googleLogin: (idToken) => {
    return apiClient.post('/auth/google', { idToken });
  },

  // 08. Facebook Login
  facebookLogin: (accessToken) => {
    return apiClient.post('/auth/facebook', { accessToken });
  },

  // 09. Refresh Token
  refreshToken: (refreshToken) => {
    return apiClient.post('/auth/refresh', { refreshToken });
  },

  // 10. Logout
  logout: (refreshToken) => {
    return apiClient.post('/auth/logout', { refreshToken });
  },

  // 11. Revoke Token
  revokeToken: (refreshToken) => {
    return apiClient.post('/auth/revoke', { refreshToken });
  },

  // 12. Forgot Password
  forgotPassword: (email) => {
    return apiClient.post('/auth/password/forgot', { email });
  },

  // 13. Verify Password OTP
  verifyPasswordOtp: (email, otp) => {
    return apiClient.post('/auth/password/verifyotp', { email, otp });
  },

  // 14. Reset Password
  resetPassword: (email, resetToken, newPassword, confirmNewPassword) => {
    console.log("Reset password request:", { 
      email, 
      resetToken: resetToken ? `${resetToken.substring(0, 10)}...` : "missing",
      newPassword: "***",
      confirmNewPassword: "***"
    });
    return apiClient.post('/auth/password/reset', {
      email,
      resetToken,
      newPassword,
      confirmNewPassword,
    });
  },

  // 15. Resend Password OTP
  resendPasswordOtp: (email) => {
    return apiClient.post('/auth/password/resend-otp', { email });
  },

  // 16. Change Password
  changePassword: (currentPassword, newPassword, confirmNewPassword) => {
    return apiClient.post('/auth/password/change', {
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
  },

  // 17. Enable 2FA - Initiate
  initiate2FA: () => {
    return apiClient.post('/auth/2fa/initiate');
  },

  // 18. Enable 2FA - Confirm
  confirm2FA: (otp) => {
    return apiClient.post('/auth/2fa/confirm', { otp });
  },

  // 19. Disable 2FA
  disable2FA: (password) => {
    return apiClient.post('/auth/2fa/disable', { password });
  },

  // 20. Resend 2FA OTP
  resend2FAOTP: () => {
    return apiClient.post('/auth/2fa/resend-otp');
  },

  // 21. Get Current User
  getCurrentUser: () => {
    return apiClient.get('/auth/me');
  },

  // Token management
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  getTokens: () => {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
  },

  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  saveUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },
};

export default authService;
