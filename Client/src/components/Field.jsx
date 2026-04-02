import { useState } from "react";

export default function Field({
  label, hint, hintColor, type = "text", value,
  onChange, error, placeholder, disabled,
}) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? "#ff4d4d"
    : focused
      ? "#64ff8c"
      : "rgba(255,255,255,0.1)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>

      {/* Label row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label style={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.45)",
          fontFamily: "var(--font-mono)",
        }}>
          {label}
        </label>
        {hint && (
          <span style={{
            fontSize: 10,
            color: hintColor || "rgb(163, 51, 51, 0.8)",
            fontFamily: "var(--font-mono)",
          }}>
            {hint}
          </span>
        )}
      </div>

      {/* Input */}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: disabled ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)",
          border: `1.5px solid ${borderColor}`,
          borderRadius: 8,
          padding: "13px 16px",
          fontSize: 14,
          color: disabled ? "#444" : "#fff",
          fontFamily: "var(--font-outfit)",
          outline: "none",
          width: "100%",
          transition: "border-color 0.3s ease",
          caretColor: "#64ff8c",
          cursor: disabled ? "not-allowed" : "text",
        }}
      />

      {/* Error */}
      {error && (
        <p style={{
          fontSize: 11,
          color: "#ff4d4d",
          fontFamily: "var(--font-mono)",
          marginTop: 2,
        }}>
          {error}
        </p>
      )}
    </div>
  );
}