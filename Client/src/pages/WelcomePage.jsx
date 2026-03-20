import { useState } from "react";
import FadeIn from "../components/FadeIn.jsx";
import LiveBadge from "../components/LiveBadge.jsx";

export default function WelcomePage({ onNext }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      fontFamily: "var(--font-outfit)",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
    }}>

      {/* Grid */}
      <div className="bg-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* Green glow */}
      <div style={{
        position: "absolute",
        top: -160,
        left: "50%",
        transform: "translateX(-50%)",
        width: 600,
        height: 600,
        background: "radial-gradient(circle, rgba(100,255,140,0.07) 0%, transparent 65%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      {/* Amber glow */}
      <div style={{
        position: "absolute",
        bottom: -200,
        right: -100,
        width: 500,
        height: 500,
        background: "radial-gradient(circle, rgba(255,184,48,0.05) 0%, transparent 65%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <div style={{
        position: "absolute",
        top: 28,
        left: 32,
        zIndex: 2,
        fontFamily: "var(--font-bebas)",
        fontSize: 20,
        letterSpacing: 3,
        color: "#64ff8c",
      }}>
        GETWAY RIDES
      </div>

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: 640,
        width: "100%",
      }}>

        <FadeIn delay={100} style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
          <LiveBadge />
        </FadeIn>

        <FadeIn delay={200} style={{ display: "flex", justifyContent: "center" }}>
          <p style={{
            fontFamily: "var(--font-outfit)",
            fontSize: "clamp(22px, 3vw, 28px)",
            fontWeight: 600,
            color: "rgba(255,255,255,0.32)",
            letterSpacing: "0.04em",
            marginBottom: 6,
          }}>
            Welcome,
          </p>
        </FadeIn>

        <FadeIn delay={320}>
          <p style={{
            fontSize: "clamp(26px, 5vw, 50px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.15,
            letterSpacing: "-0.5px",
            maxWidth: 760,
            marginBottom: 16,
          }}>
            Need a ride between{" "}
            <span style={{ color: "#ffb830" }}>Gateway Airport</span>{" "}
            and your campus?
          </p>
        </FadeIn>

        <FadeIn delay={440}>
          <p style={{
            fontSize: "clamp(13px, 1.6vw, 16px)",
            color: "#555",
            lineHeight: 1.65,
            maxWidth: 400,
            marginBottom: 44,
          }}>
            We've got you covered.{" "}
            <span style={{ color: "#64ff8c" }}>Book your rides now.</span>
          </p>
        </FadeIn>

        <FadeIn delay={540}>
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onNext}
            className="t-glow"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 52px",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "var(--font-outfit)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              border: "2px solid #64ff8c",
              background: hovered ? "#64ff8c" : "transparent",
              color: hovered ? "#080808" : "#64ff8c",
              boxShadow: hovered
                ? "0 0 18px 2px rgba(100,255,140,0.25), 0 0 48px 8px rgba(100,255,140,0.12)"
                : "none",
              transform: hovered ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            Book a Ride →
          </button>
        </FadeIn>

        <FadeIn delay={680}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 36,
            fontSize: 11,
            fontFamily: "var(--font-mono)",
            color: "#444",
            letterSpacing: "0.08em",
          }}>
            <span>BABCOCK UNIVERSITY</span>
            <span style={{ color: "#2a2a2a" }}>———</span>
            <span style={{ color: "#ffb830" }}>✈ GATEWAY AIRPORT</span>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}