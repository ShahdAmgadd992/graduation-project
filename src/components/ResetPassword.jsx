import { useState } from "react";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) {
      setStatus("mismatch");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  const EyeIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

  const LockIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

  // ✅ Success Page كاملة لوحدها
  if (status === "success") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          fontFamily: "'Segoe UI', sans-serif",
          padding: "20px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 560, textAlign: "center" }}>
          <h1 style={{ fontSize: 38, fontWeight: 700, margin: "0 0 32px" }}>
            <span style={{ color: "#5b9eff" }}>You're Back In!</span>
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <img
              src="/Safe-bro.svg"
              alt="Success"
              style={{ width: 220, height: "auto" }}
            />
          </div>
          <p
            style={{
              fontSize: 14,
              color: "#9ca3af",
              margin: "0 0 30px",
              lineHeight: 1.6,
            }}
          >
            Your password has been successfully updated. Click below to log in
          </p>
          <button
            onClick={() => window.navigateToSignIn?.()}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: 50,
              background: "linear-gradient(to left, #97ceff 0%, #5596fe 100%)",
              color: "white",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(91,158,255,0.3)",
            }}
          >
            Log in
          </button>
        </div>
      </div>
    );
  }

  // ✅ Reset Password Form
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        fontFamily: "'Segoe UI', sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          textAlign: "center",
          position: "relative",
        }}
      >
        <button
          onClick={() => window.history.back()}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#6b7280",
            fontSize: 28,
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            padding: "4px 8px",
          }}
        >
          ‹
        </button>

        <h1
          style={{
            fontSize: 38,
            fontWeight: 700,
            margin: "0 0 32px",
            paddingTop: 4,
          }}
        >
          <span style={{ color: "#5b9eff" }}>Reset </span>
          <span style={{ color: "#374151" }}>Password</span>
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <img
            src="/Reset password.svg"
            alt="Reset Password"
            style={{ width: 220, height: "auto" }}
          />
        </div>

        <p
          style={{
            fontSize: 14,
            color: "#9ca3af",
            margin: "0 0 30px",
            lineHeight: 1.6,
          }}
        >
          Your new password must be different from previously used password
        </p>

        {/* New Password */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <span
            style={{
              position: "absolute",
              left: 20,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <LockIcon />
          </span>
          <input
            type={showNew ? "text" : "password"}
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setStatus("idle");
            }}
            style={{
              width: "100%",
              padding: "15px 50px 15px 50px",
              border: "1.5px solid #e5e7eb",
              borderRadius: 50,
              fontSize: 15,
              outline: "none",
              boxSizing: "border-box",
              color: "#374151",
              background: "white",
              transition: "border 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#5b9eff")}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            style={{
              position: "absolute",
              right: 18,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#9ca3af",
              display: "flex",
              alignItems: "center",
              padding: 4,
            }}
          >
            {showNew ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>

        {/* Confirm Password */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <span
            style={{
              position: "absolute",
              left: 20,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <LockIcon />
          </span>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setStatus("idle");
            }}
            style={{
              width: "100%",
              padding: "15px 50px 15px 50px",
              border: `1.5px solid ${status === "mismatch" ? "#ef4444" : "#e5e7eb"}`,
              borderRadius: 50,
              fontSize: 15,
              outline: "none",
              boxSizing: "border-box",
              color: "#374151",
              background: "white",
              transition: "border 0.2s",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor =
                status === "mismatch" ? "#ef4444" : "#5b9eff")
            }
            onBlur={(e) =>
              (e.target.style.borderColor =
                status === "mismatch" ? "#ef4444" : "#e5e7eb")
            }
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            style={{
              position: "absolute",
              right: 18,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#9ca3af",
              display: "flex",
              alignItems: "center",
              padding: 4,
            }}
          >
            {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>

        {status === "mismatch" && (
          <p
            style={{
              color: "#ef4444",
              fontSize: 13,
              margin: "-8px 0 12px",
              textAlign: "left",
              paddingLeft: 16,
            }}
          >
            Passwords do not match
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          style={{
            width: "100%",
            padding: "15px",
            border: "2px solid #5b9eff",
            borderRadius: 50,
            background: "white",
            color: "#5b9eff",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.25s",
            marginTop: 8,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#5b9eff";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.color = "#5b9eff";
          }}
        >
          {status === "loading" ? "Resetting..." : "Reset"}
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
