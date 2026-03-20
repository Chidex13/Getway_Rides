import { useState, useEffect } from "react";

export default function LiveBadge() {
  const [dot, setDot] = useState(true);

  useEffect(() => {
    const i = setInterval(() => setDot((d) => !d), 1200);
    return () => clearInterval(i);
  }, []);

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: 9999,
        padding: "8px 16px",
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        fontFamily: "var(--font-mono)",
        background: "rgba(100,255,140,0.08)",
        border: "1px solid rgba(100,255,140,0.2)",
        color: "#64ff8c",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: "50%",
          flexShrink: 0,
          background: "#64ff8c",
          opacity: dot ? 1 : 0.15,
          transition: "opacity 0.4s",
        }}
      />
      Booking Open
    </span>
  );
}