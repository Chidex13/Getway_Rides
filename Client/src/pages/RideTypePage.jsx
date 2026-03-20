import FadeIn from "../components/FadeIn.jsx";
import ProgressSteps from "../components/ProgressSteps.jsx";
import RideCard from "../components/RideCard.jsx";
import NavBtn from "../components/NavBtn.jsx";
import { getPrice, formatPrice } from "../utils/pricing.js";

export default function RideTypePage({ campus, onNext, onBack }) {
  const getRides = () => {
    const campusKey = campus ? (campus.toLowerCase().includes("iperu") ? "iperu" : "main") : "main";
    
    return [
      {
        id: "public",
        icon: "👥",
        label: "Public",
        badge: "Shared Ride",
        badgeColor: "#64ff8c",
        badgeBg: "rgba(100,255,140,0.08)",
        badgeBorder: "rgba(100,255,140,0.2)",
        price: formatPrice(getPrice("public", campusKey)),
        priceSub: "per seat",
        glowShadow: "0 0 0 1px rgba(100,255,140,0.13), 0 0 32px 4px rgba(100,255,140,0.18), 0 8px 32px rgba(0,0,0,0.4)",
      },
      {
        id: "private",
        icon: "🧍",
        label: "Private",
        badge: "Single Drop-off",
        badgeColor: "#ffb830",
        badgeBg: "rgba(255,184,48,0.08)",
        badgeBorder: "rgba(255,184,48,0.2)",
        price: formatPrice(getPrice("private", campusKey)),
        priceSub: "full car",
        glowShadow: "0 0 0 1px rgba(255,184,48,0.13), 0 0 32px 4px rgba(255,184,48,0.18), 0 8px 32px rgba(0,0,0,0.4)",
      },
    ];
  };

  const RIDES = getRides();
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

      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column",
        alignItems: "center", width: "100%", maxWidth: 760,
      }}>

        <FadeIn delay={80} style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <ProgressSteps current={1} total={5} />
        </FadeIn>

        <FadeIn delay={160}>
          <h2 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(40px, 7vw, 64px)",
            letterSpacing: 3, color: "#fff",
            textAlign: "center", marginBottom: 8,
          }}>
            Choose Ride Type
          </h2>
          <p style={{ textAlign: "center", color: "#555", fontSize: 14, marginBottom: 36 }}>
            How would you like to travel?
          </p>
        </FadeIn>

        <FadeIn delay={280} style={{ width: "100%" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16, width: "100%" }}>
            {RIDES.map((r) => (
              <RideCard
                key={r.id}
                ride={r}
                onClick={() => onNext(r.id)}
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