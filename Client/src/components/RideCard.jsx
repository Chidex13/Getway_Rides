import { useState } from "react";

export default function RideCard({ ride, onClick }) {
  const [hovered, setHovered] = useState(false);
  const active = hovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="t-card"
      style={{
        background: "#111",
        border: "1.5px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        padding: 28,
        cursor: "pointer",
        position: "relative",
        boxShadow: active ? ride.glowShadow : "none",
        transform: active ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      {/* Badge */}
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 9,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        padding: "4px 10px",
        borderRadius: 4,
        marginBottom: 20,
        fontFamily: "var(--font-mono)",
        background: ride.badgeBg,
        border: `1px solid ${ride.badgeBorder}`,
        color: ride.badgeColor,
        lineHeight: 1,
      }}>
        ! {ride.badge}
      </span>

      {/* Icon */}
      <div style={{ fontSize: 44, marginBottom: 14, lineHeight: 1 }}>
        {ride.icon}
      </div>

      {/* Label */}
      <h3 style={{
        fontFamily: "var(--font-bebas)",
        fontSize: 32,
        letterSpacing: 2,
        color: "#fff",
        marginBottom: 8,
      }}>
        {ride.label}
      </h3>

      {/* Price */}
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 24, fontWeight: 700, color: ride.badgeColor, marginBottom: 4 }}>
        {ride.price}
      </p>
      <p style={{ fontSize: 11, color: "#555" }}>{ride.priceSub}</p>
    </div>
  );
}