import FadeIn from "../components/FadeIn.jsx";
import ProgressSteps from "../components/ProgressSteps.jsx";
import TripCard from "../components/TripCard.jsx";
import NavBtn from "../components/NavBtn.jsx";

const TRIPS = [
  {
    id: "drop-off",
    arrow: "🏫 → ✈️",
    label: "Drop-Off",
    from: "Babcock University",
    fromSub: "Ilishan-Remo, Ogun State",
    to: "Gateway Int'l Airport",
    toSub: "Ogun State, Nigeria",
    dotFrom: "#64ff8c",
    dotTo: "#ffb830",
  },
  {
    id: "pick-up",
    arrow: "✈️ → 🏫",
    label: "Pick-Up",
    from: "Gateway Int'l Airport",
    fromSub: "Ogun State, Nigeria",
    to: "Babcock University",
    toSub: "Ilishan-Remo, Ogun State",
    dotFrom: "#ffb830",
    dotTo: "#64ff8c",
  },
];

export default function SelectTripPage({ rideType, onNext, onBack }) {
  return (
    <div style={{
      minHeight: "100vh", background: "#080808",
      fontFamily: "var(--font-outfit)", color: "#fff",
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px",
    }}>
      <div className="bg-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* Logo */}
      <div style={{
        position: "absolute", top: 28, left: 32, zIndex: 2,
        fontFamily: "var(--font-bebas)", fontSize: 20,
        letterSpacing: 3, color: "#64ff8c",
      }}>
        GETWAY RIDES
      </div>

      {/* Ride type pill */}
      <div style={{
        position: "absolute", top: 28, right: 32, zIndex: 2,
        fontFamily: "var(--font-mono)", fontSize: 9,
        textTransform: "uppercase", letterSpacing: "0.12em",
        padding: "5px 12px", borderRadius: 4,
        background: rideType === "public" ? "rgba(100,255,140,0.08)" : "rgba(255,184,48,0.08)",
        border: `1px solid ${rideType === "public" ? "rgba(100,255,140,0.2)" : "rgba(255,184,48,0.2)"}`,
        color: rideType === "public" ? "#64ff8c" : "#ffb830",
      }}>
        {rideType === "public" ? "Public Ride" : "Private Ride"}
      </div>

      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column",
        alignItems: "center", width: "100%", maxWidth: 760,
      }}>

        <FadeIn delay={80} style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <ProgressSteps current={2} total={5} />
        </FadeIn>

        <FadeIn delay={160}>
          <h2 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(40px, 7vw, 64px)",
            letterSpacing: 3, color: "#fff",
            textAlign: "center", marginBottom: 8,
          }}>
            Select Trip
          </h2>
          <p style={{ textAlign: "center", color: "#555", fontSize: 14, marginBottom: 36 }}>
            Where are you headed?
          </p>
        </FadeIn>

        <FadeIn delay={280} style={{ width: "100%" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16, width: "100%" }}>
            {TRIPS.map((t) => (
              <TripCard
                key={t.id}
                trip={t}
                onClick={() => onNext(t.id)}
              />
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={400} style={{ width: "100%", marginTop: 28 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <NavBtn onClick={onBack} variant="ghost" label="← Back" style={{ maxWidth: 160 }} />
          </div>
        </FadeIn>

      </div>
    </div>
  );
}