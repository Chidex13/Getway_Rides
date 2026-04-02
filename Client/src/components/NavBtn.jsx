import { useState } from "react";

export default function NavBtn({ onClick, variant, label, disabled }) {
  const [hovered, setHovered] = useState(false);
  const isPrimary = variant === "primary";

  const base = {
    flex: isPrimary ? 2 : 1,
    padding: "14px 0",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 700,
    fontFamily: "var(--font-outfit)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    opacity: disabled ? 0.35 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  };

  const primary = {
    background: hovered && !disabled ? "#64ff8c" : "transparent",
    color: hovered && !disabled ? "#080808" : "#64ff8c",
    border: "2px solid #64ff8c",
    boxShadow: hovered && !disabled
      ? "0 0 18px 2px rgba(100,255,140,0.25), 0 0 48px 8px rgba(100,255,140,0.12)"
      : "none",
    transform: hovered && !disabled ? "translateY(-1px)" : "translateY(0)",
  };

  const ghost = {
    background: hovered ? "rgba(100,255,140,0.05)" : "transparent",
    color: hovered ? "rgba(100,255,140,0.6)" : "#555",
    border: `2px solid ${hovered ? "rgba(100,255,140,0.2)" : "rgba(255,255,255,0.07)"}`,
  };

  return (
    <button
      
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={isPrimary ? "t-glow" : "t-ghost"}
      style={{ ...base, ...(isPrimary ? primary : ghost), transition: "all 0.2s ease" , zIndex: 100 }}
    >
      {label}
    </button>
  );
}