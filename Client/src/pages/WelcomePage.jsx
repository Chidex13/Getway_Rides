import FadeIn from "../components/FadeIn.jsx";
import { useState, useEffect } from "react";
import { getBookingStatus } from "../utils/api.js";
import { DRIVER_CONTACTS } from "../constants/contact.js";
import { Phone } from "lucide-react";


export default function WelcomePage({ onNext }) {
  const [hovered, setHovered] = useState(false);
  const [bookingOpen, setBookingOpen] = useState();
  const [statusLoading, setStatusLoading] = useState(true);
  const [dot, setDot] = useState(true);

  useEffect(() => {
    getBookingStatus()
      .then((data) => setBookingOpen(data.isOpen))
      .catch(() => setBookingOpen(false)) // fail open if unreachable
      .finally(() => setStatusLoading(false));
  }, []);

  useEffect(() => {
    const i = setInterval(() => setDot((d) => !d), 1200);
    return () => clearInterval(i);
  }, []);

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

        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          borderRadius: 9999,
          padding: "8px 16px",
          fontSize: 12,

          textTransform: "uppercase",
          letterSpacing: "0.12em",
          fontFamily: "var(--font-mono)",
          background: bookingOpen ? "rgba(100,255,140,0.08)" : "rgba(255,77,77,0.08)",
          border: `1px solid ${bookingOpen ? "rgba(100,255,140,0.2)" : "rgba(255,77,77,0.2)"}`,
          color: bookingOpen ? "#64ff8c" : "#ff4d4d",
          lineHeight: 1,
          whiteSpace: "nowrap",
          marginBottom: 16,
        }}>
          <span style={{
            display: "inline-block",
            width: 8, height: 8,
            borderRadius: "50%",
            background: bookingOpen ? "#64ff8c" : "#ff4d4d",
            flexShrink: 0,
            opacity: bookingOpen ? (dot ? 1 : 0.15) : 1,
            transition: "opacity 0.4s",
          }} />
          {statusLoading ? "Checking..." : bookingOpen ? "Booking Open" : "Booking Closed"}
        </div>

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
            onMouseEnter={() => bookingOpen && setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => bookingOpen && onNext()}
            disabled={!bookingOpen || statusLoading}
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
              opacity: bookingOpen ? 1 : 0.4,
              cursor: bookingOpen ? "pointer" : "not-allowed",
            }}
          >
            {bookingOpen ? "Book a Ride →" : "Bookings Closed"}
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

        <FadeIn delay={780}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 20,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "var(--font-mono)",
            color: "#ffb730d2",
            letterSpacing: "0.05em",
          }}>
            <Phone size={16} strokeWidth={2.5} color="#d71d1dd9" />
            <span>{DRIVER_CONTACTS.line1}, {DRIVER_CONTACTS.line2}</span>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
