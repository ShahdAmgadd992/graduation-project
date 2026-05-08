import { createContext } from 'react';

const defaultAuthContext = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  register: async () => Promise.reject(new Error('AuthProvider is missing')),
  verifyEmail: async () => Promise.reject(new Error('AuthProvider is missing')),
  resendEmailOtp: async () => Promise.reject(new Error('AuthProvider is missing')),
  login: async () => Promise.reject(new Error('AuthProvider is missing')),
  verifyLoginOtp: async () => Promise.reject(new Error('AuthProvider is missing')),
  resendLoginOtp: async () => Promise.reject(new Error('AuthProvider is missing')),
  forgotPassword: async () => Promise.reject(new Error('AuthProvider is missing')),
  verifyPasswordOtp: async () => Promise.reject(new Error('AuthProvider is missing')),
  resendPasswordOtp: async () => Promise.reject(new Error('AuthProvider is missing')),
  resetPassword: async () => Promise.reject(new Error('AuthProvider is missing')),
  logout: async () => Promise.reject(new Error('AuthProvider is missing')),
};

const AuthContext = createContext(defaultAuthContext);

export default AuthContext;
