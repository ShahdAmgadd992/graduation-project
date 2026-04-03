import React from "react";
import "./SignIn.css";

function SignIn() {
  const goToSignUp = (e) => {
    e.preventDefault();
    if (typeof window.navigateToSignUp === "function") {
      window.navigateToSignUp();
      return;
    }
    window.location.href = "/";
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-container">
        <div className="signin-left">
          <div className="signin-form-wrap">
            <h1 className="signin-title">
              <span>Sign</span> In
            </h1>

            <p className="signin-description">
              <span>Welcome back!</span> Continue your journey through Egypt
            </p>

            <form className="signin-form" onSubmit={(e) => e.preventDefault()}>
              <div className="signin-input-group">
                <input
                  type="email"
                  className="signin-input"
                  placeholder="Enter your Email"
                  required
                />
                <div className="signin-input-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                    <path d="M3 7l9 6 9-6"></path>
                  </svg>
                </div>
              </div>

              <div className="signin-input-group">
                <input
                  type="password"
                  className="signin-input"
                  placeholder="Enter your Password"
                  required
                />
                <div className="signin-input-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>

              <div className="signin-options">
                <label className="signin-remember">
                  <input type="checkbox" />
                  Remember me
                </label>
                <a
                  href="#"
                  className="signin-forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof window.navigateToForgetPassword === "function") {
                      window.navigateToForgetPassword();
                    }
                  }}
                >
                  Forget Password?
                </a>{" "}
              </div>

              <button type="submit" className="signin-submit-btn">
                Sign In
              </button>
            </form>

            <div className="signin-divider">
              <span>or with</span>
            </div>

            <div className="signin-socials">
              <button className="signin-social-btn" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>

              <button className="signin-social-btn" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="#1877F2"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
                Facebook
              </button>
            </div>

            <p className="signin-signup-text">
              Don't have an account?{" "}
              <a href="/" onClick={goToSignUp}>
                Sign Up
              </a>
            </p>
          </div>
        </div>

        <div className="signin-right">
          <svg
            className="signin-wave"
            viewBox="0 0 1439 822"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M1334.22 0C1334.22 0 1270.22 164.7 894.574 212.726C894.574 212.726 592.928 239.62 719.706 429.249C719.706 429.249 856.079 561.91 782.485 643.631C782.485 643.631 633.6 806.322 1138.31 820.034C1138.31 820.034 1384.08 823.457 1439 971H-284V0H1334.22Z"
              fill="white"
            />
          </svg>
          <div className="signin-dot"></div>
          <div className="signin-image-wrap">
            <img src="/Illustrartion.png" alt="Egypt Illustration" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
