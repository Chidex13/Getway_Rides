import { useState } from "react";

export default function TripCard({ trip, onClick }) {
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
        boxShadow: active
          ? "0 0 0 1px rgba(100,255,140,0.13), 0 0 32px 4px rgba(100,255,140,0.18), 0 8px 32px rgba(0,0,0,0.4)"
          : "none",
        transform: active ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      {/* Arrow */}
      <div style={{ fontSize: 28, marginBottom: 14 }}>{trip.arrow}</div>

      {/* Label */}
      <h3 style={{
        fontFamily: "var(--font-bebas)",
        fontSize: 28,
        letterSpacing: 2,
        color: "#fff",
        marginBottom: 20,
      }}>
        {trip.label}
      </h3>

      {/* Route */}
      <div style={{ display: "flex", flexDirection: "column" }}>

        {/* From */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: trip.dotFrom, flexShrink: 0 }} />
            <div style={{ width: 1, height: 26, background: "#2a2a2a", margin: "4px 0" }} />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{trip.from}</p>
            <p style={{ fontSize: 11, color: "#555" }}>{trip.fromSub}</p>
          </div>
        </div>

        {/* To */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: trip.dotTo, flexShrink: 0, marginTop: 4 }} />
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{trip.to}</p>
            <p style={{ fontSize: 11, color: "#555" }}>{trip.toSub}</p>
          </div>
        </div>

      </div>

    </div>
  );
}