import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = authService.getUser();
    const accessToken = localStorage.getItem('accessToken');

    if (savedUser && accessToken) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const register = async (name, email, password, confirmPassword, rememberMe) => {
    try {
      setError(null);
      const response = await authService.register({
        name,
        email,
        password,
        confirmPassword,
        rememberMe,
      });
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    }
  };

  const verifyEmail = async (email, otp) => {
    try {
      setError(null);
      const response = await authService.verifyEmail(email, otp);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Email verification failed';
      setError(errorMessage);
      throw err;
    }
  };

  const resendEmailOtp = async (email) => {
    try {
      setError(null);
      const response = await authService.resendEmailOtp(email);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to resend OTP';
      setError(errorMessage);
      throw err;
    }
  };

  const login = async (email, password, rememberMe = false) => {
    try {
      setError(null);
      const response = await authService.login(email, password, rememberMe);
      const { accessToken, refreshToken, userId, displayName, isEmailVerified, twoFactorEnabled } = response.data;

      authService.setTokens(accessToken, refreshToken);
      const userData = { userId, email, displayName, isEmailVerified, twoFactorEnabled };
      authService.saveUser(userData);

      setUser(userData);
      setIsAuthenticated(true);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      throw err;
    }
  };

  const verifyLoginOtp = async (email, otp) => {
    try {
      setError(null);
      const response = await authService.verifyLoginOtp(email, otp);
      const { accessToken, refreshToken, userId, displayName, isEmailVerified, twoFactorEnabled } = response.data;

      authService.setTokens(accessToken, refreshToken);
      const userData = { userId, email, displayName, isEmailVerified, twoFactorEnabled };
      authService.saveUser(userData);

      setUser(userData);
      setIsAuthenticated(true);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || '2FA verification failed';
      setError(errorMessage);
      throw err;
    }
  };

  const resendLoginOtp = async (email) => {
    try {
      setError(null);
      const response = await authService.resendLoginOtp(email);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to resend login OTP';
      setError(errorMessage);
      throw err;
    }
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      const response = await authService.forgotPassword(email);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to process forgot password';
      setError(errorMessage);
      throw err;
    }
  };

  const verifyPasswordOtp = async (email, otp) => {
    try {
      setError(null);
      const response = await authService.verifyPasswordOtp(email, otp);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'OTP verification failed';
      setError(errorMessage);
      throw err;
    }
  };

  const resendPasswordOtp = async (email) => {
    try {
      setError(null);
      const response = await authService.resendPasswordOtp(email);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to resend password OTP';
      setError(errorMessage);
      throw err;
    }
  };

  const resetPassword = async (email, resetToken, newPassword, confirmNewPassword) => {
    try {
      setError(null);
      const response = await authService.resetPassword(email, resetToken, newPassword, confirmNewPassword);
      return response.data;
    } catch (err) {
      let errorMessage = 'Password reset failed';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.status === 400) {
        errorMessage = 'Invalid password or reset token. Password must contain: uppercase, lowercase, number, and special character (!@#$%^&*)';
      } else if (err.response?.status === 401) {
        errorMessage = 'Your reset link has expired. Please request a new one.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      authService.clearTokens();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    register,
    verifyEmail,
    resendEmailOtp,
    login,
    verifyLoginOtp,
    resendLoginOtp,
    forgotPassword,
    verifyPasswordOtp,
    resendPasswordOtp,
    resetPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
