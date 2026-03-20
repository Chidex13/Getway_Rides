import { useState, useEffect } from "react";
import FadeIn from "../components/FadeIn.jsx";
import ProgressSteps from "../components/ProgressSteps.jsx";
import Field from "../components/Field.jsx";
import CustomSelect from "../components/CustomSelect.jsx";
import NavBtn from "../components/NavBtn.jsx";

export default function BookingFormPage({ booking, onNext, onBack }) {
  const [hostel, setHostel] = useState(booking.hostel ?? "");
  const [date, setDate] = useState(booking.date ?? "");
  const [time, setTime] = useState(booking.time ?? "");
  const [passengers, setPassengers] = useState(booking.passengers ?? 1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setHostel("");
  }, [booking.campus]);

  const validate = () => {
    const e = {};
    if (!hostel) e.hostel = "Please select your hostel";
    if (!date) e.date = "Please select a date";
    if (!time) e.time = "Please select a time";
    if ((booking.rideType === "public" || booking.rideType === "private") && (!passengers || passengers < 1))
      e.passengers = "Enter number of passengers";
    return e;
  };

  const handleNext = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onNext({ hostel, date, time, passengers: parseInt(passengers) });
  };

  const today = new Date().toISOString().split("T")[0];

  const MAIN_HOSTELS = [
    "Niel Wilson Hall", "Gideon Tropers Hall", "Nelson Mandela Hall",
    "Winslow Hall", "Welch Hall", "Bethel Hall", "Topaz Hall", 
    "Emerald Hall", "Ameyo Adadevoh Hall", "Havilla Gold", "Fad Hall",
    "Christall Hall", "Platnum Hall", "Queen Esther Hall", "White Hall",
    "Ogden Hall", "Nyberg Hall", "Sapphire Hall", "Off Campus"
  ];
  
  const IPERU_HOSTELS = [
    "Iperu Campus", "Off Campus"
  ];
  
  const availableHostels = booking.campus === "iperu" 
    ? IPERU_HOSTELS 
    : MAIN_HOSTELS;

  return (
    <div style={{
      minHeight: "100vh", background: "#080808",
      fontFamily: "var(--font-outfit)", color: "#fff",
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "80px 24px 40px",
    }}>
      <div className="bg-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      <div style={{
        position: "absolute", top: -160, left: "50%",
        transform: "translateX(-50%)", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(100,255,140,0.04) 0%, transparent 65%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

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
        background: booking.rideType === "public" ? "rgba(100,255,140,0.08)" : "rgba(255,184,48,0.08)",
        border: `1px solid ${booking.rideType === "public" ? "rgba(100,255,140,0.2)" : "rgba(255,184,48,0.2)"}`,
        color: booking.rideType === "public" ? "#64ff8c" : "#ffb830",
      }}>
        {booking.rideType === "public" ? "Public Ride" : "Private Ride"}
      </div>

      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column",
        alignItems: "center", width: "100%", maxWidth: 520,
      }}>

        <FadeIn delay={60} style={{ display: "flex", justifyContent: "center" }}>
          <ProgressSteps current={3} total={5} />
        </FadeIn>

        <FadeIn delay={140}>
          <h2 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(36px, 6vw, 52px)",
            letterSpacing: 3, color: "#fff",
            textAlign: "center", marginBottom: 6,
          }}>
            Booking Details
          </h2>
          <p style={{
            textAlign: "center", color: "#555", fontSize: 13,
            maxWidth: 360, margin: "0 auto 28px",
          }}>
            Tell us where you're coming from and when you need the ride.
          </p>
        </FadeIn>

        <FadeIn delay={240} style={{ width: "100%" }}>
          <div style={{
            background: "#111",
            border: "1.5px solid rgba(255,255,255,0.07)",
            borderRadius: 16, padding: 28,
            display: "flex", flexDirection: "column", gap: 20,
          }}>

            {/* Hostel */}
            <CustomSelect
              label="Hostel"
              hint="Where are you staying?"
              value={hostel}
              onChange={(v) => { setHostel(v); setErrors((e) => ({ ...e, hostel: "" })); }}
              options={availableHostels}
              placeholder="Select your hostel"
              error={errors.hostel}
            />

            {/* Date + Time row */}
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
              <Field
                label="Date"
                hint="Date for pickup?"
                type="date"
                value={date}
                onChange={(v) => { setDate(v); setErrors((e) => ({ ...e, date: "" })); }}
                error={errors.date}
                placeholder={today}
              />
              <Field
                label="Time"
                hint="Time for pickup?"
                type="time"
                value={time}
                onChange={(v) => { setTime(v); setErrors((e) => ({ ...e, time: "" })); }}
                error={errors.time}
                placeholder="00:00"
              />
            </div>

            {/* Passengers — public and private with different limits */}
            {booking.rideType === "public" && (
              <Field
                label="Passengers"
                hint="Max 3"
                hintColor="#ff4d4d"
                type="number"
                value={String(passengers)}
                onChange={(v) => {
                  if (v === "") {
                    setPassengers("");
                  } else {
                    const num = parseInt(v, 10);
                    if (!isNaN(num)) {
                      const n = Math.min(3, Math.max(1, num));
                      setPassengers(n);
                    }
                  }
                  setErrors((e) => ({ ...e, passengers: "" }));
                }}
                error={errors.passengers}
                placeholder="1"
              />
            )}
            {booking.rideType === "private" && (
              <Field
                label="Passengers"
                hint="Max 2"
                hintColor="#ff4d4d"
                type="number"
                value={String(passengers)}
                onChange={(v) => {
                  if (v === "") {
                    setPassengers("");
                  } else {
                    const num = parseInt(v, 10);
                    if (!isNaN(num)) {
                      const n = Math.min(2, Math.max(1, num));
                      setPassengers(n);
                    }
                  }
                  setErrors((e) => ({ ...e, passengers: "" }));
                }}
                error={errors.passengers}
                placeholder="1"
              />
            )}

          </div>
        </FadeIn>

        <FadeIn delay={320} style={{ width: "100%" }}>
          <div style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            padding: "11px 14px",
            background: "rgba(255,77,77,0.05)",
            border: "1px solid rgba(255,77,77,0.15)",
            borderRadius: 8,
            marginTop: 12,
          }}>
            <span style={{ color: "#ff4d4d", fontSize: 13, marginTop: 1, flexShrink: 0 }}>⚠</span>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, fontFamily: "var(--font-outfit)" }}>
              Note: Your driver may arrive 30–40 minutes before or after your selected time. Please plan your pickup accordingly.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={360} style={{ width: "100%", marginTop: 20 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <NavBtn onClick={onBack} variant="ghost" label="← Back" />
            <NavBtn onClick={handleNext} variant="primary" label="Next →" />
          </div>
        </FadeIn>

      </div>
    </div>
  );
}