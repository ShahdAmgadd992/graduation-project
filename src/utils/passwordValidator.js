export const validatePassword = (password) => {
  const requirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const allMet = Object.values(requirements).every(req => req === true);
  
  return {
    isValid: allMet,
    requirements,
    errors: [
      !requirements.minLength && "At least 8 characters",
      !requirements.hasUppercase && "At least one uppercase letter (A-Z)",
      !requirements.hasLowercase && "At least one lowercase letter (a-z)",
      !requirements.hasNumber && "At least one number (0-9)",
      !requirements.hasSpecialChar && "At least one special character (!@#$%^&*)",
    ].filter(Boolean),
  };
};
