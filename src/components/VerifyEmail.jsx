import { useState, useRef } from "react";

function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [status, setStatus] = useState("idle");
  const inputs = useRef([]);

  const handleChange = (val, i) => {
    if (!/^\d?$/.test(val)) return;
    const newCode = [...code];
    newCode[i] = val;
    setCode(newCode);
    if (val && i < 3) inputs.current[i + 1].focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputs.current[i - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    const newCode = [...code];
    pasted.split("").forEach((ch, i) => {
      newCode[i] = ch;
    });
    setCode(newCode);
    const nextEmpty = newCode.findIndex((v) => !v);
    inputs.current[nextEmpty === -1 ? 3 : nextEmpty]?.focus();
  };

  const handleSubmit = () => {
    if (code.some((d) => !d)) return;
    setStatus("loading");
    setTimeout(() => {
      if (typeof window.navigateToResetPassword === "function") {
        window.navigateToResetPassword();
      }
    }, 1500);
  };

  const handleResend = () => {
    setCode(["", "", "", ""]);
    setStatus("idle");
    inputs.current[0].focus();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        fontFamily: "'Segoe UI', sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 580,
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
            fontSize: 30,
            lineHeight: 1,
            padding: "2px 8px",
          }}
        >
          ‹
        </button>

        <h1 style={{ fontSize: 38, fontWeight: 700, margin: "0 0 36px" }}>
          <span style={{ color: "#5b9eff" }}>Verify </span>
          <span style={{ color: "#374151" }}>your email</span>
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <img
            src="/Email Verification.svg"
            alt="Verify Email"
            style={{ width: 240, height: "auto" }}
          />
        </div>

        <p style={{ fontSize: 15, color: "#374151", margin: "0 0 28px" }}>
          Please enter 4 digit code that sent to your email address
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            marginBottom: 22,
          }}
        >
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              style={{
                width: 72,
                height: 72,
                textAlign: "center",
                fontSize: 26,
                fontWeight: 600,
                color: "#1f2937",
                border: digit ? "2px solid #5b9eff" : "1.5px solid #e5e7eb",
                borderRadius: 14,
                outline: "none",
                background: "white",
                transition: "all 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#5b9eff")}
              onBlur={(e) => {
                if (!digit) e.target.style.borderColor = "#e5e7eb";
              }}
            />
          ))}
        </div>

        <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 28 }}>
          if you don't receive code !{" "}
          <span
            onClick={handleResend}
            style={{
              color: "#374151",
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Resend
          </span>
        </p>

        <button
          onClick={handleSubmit}
          disabled={code.some((d) => !d) || status === "loading"}
          style={{
            width: "100%",
            padding: "16px",
            border: "none",
            borderRadius: 50,
            background: code.every((d) => d)
              ? "linear-gradient(to right, #93c5fd, #5b9eff)"
              : "#e5e7eb",
            color: code.every((d) => d) ? "white" : "#9ca3af",
            fontSize: 17,
            fontWeight: 600,
            cursor: code.every((d) => d) ? "pointer" : "not-allowed",
            transition: "all 0.3s",
          }}
        >
          {status === "loading" ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
