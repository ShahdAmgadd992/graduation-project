import React from "react";
import "./SignUp.css";

function SignIn() {
  return (
    <div className="container">
      {/* الفورم */}
      <div className="form-section">
        <h2>Sign In</h2>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button>Sign In</button>
      </div>

      {/* الصورة */}
      <div className="image-section">
        <img src="/vite.svg" alt="illustration" />
      </div>
    </div>
  );
}

export default SignIn;
