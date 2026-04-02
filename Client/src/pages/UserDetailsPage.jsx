import { useState, useEffect } from "react";
import FadeIn from "../components/FadeIn.jsx";
import ProgressSteps from "../components/ProgressSteps.jsx";
import Field from "../components/Field.jsx";
import CustomSelect from "../components/CustomSelect.jsx";
import NavBtn from "../components/NavBtn.jsx";
import { isValidFullName, isValidPhone } from "../utils/validators.js";
import { CAMPUSES } from "../constants/campuses.js";
import { useUserDetails } from "../hooks/useUserDetails.js";

export default function UserDetailsPage({ onNext, onBack }) {
  const {
    fullName: savedFullName,
    phone: savedPhone,
    campus: savedCampus,
    setFullName,
    setPhone,
    setCampus,
    saveDetails,
    clearDetails,
    isLoaded
  } = useUserDetails();

  const [fullName, setFullNameLocal] = useState("");
  const [phone, setPhoneLocal] = useState("");
  const [campus, setCampusLocal] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [campusError, setCampusError] = useState("");
  const [attempted, setAttempted] = useState(false);

  // Populate from localStorage once loaded
  useEffect(() => {
    if (isLoaded) {
      setFullNameLocal(savedFullName);
      setPhoneLocal(savedPhone);
      setCampusLocal(savedCampus);
    }
  }, [isLoaded, savedFullName, savedPhone, savedCampus]);

  const canContinue = isValidFullName(fullName) && isValidPhone(phone) && campus;

  /* Live validation after first attempt */
  useEffect(() => {
    if (!attempted) return;
    setFullNameError(
      isValidFullName(fullName) ? "" : "Must be greater than 6 characters and contain only letters"
    );
    setPhoneError(
      isValidPhone(phone) ? "" : "Enter a valid Nigerian number — e.g. 08012345678"
    );
  }, [fullName, phone, attempted]);

  const handleContinue = () => {
    setAttempted(true);
    const fErr = isValidFullName(fullName)
      ? "" : "Must be greater than 6 characters and contain only letters";
    const pErr = isValidPhone(phone)
      ? "" : "Enter a valid Nigerian number e.g. 08012345678";
    const cErr = campus ? "" : "Please select your campus";

    setFullNameError(fErr);
    setPhoneError(pErr);
    setCampusError(cErr);

    if (fErr || pErr || cErr) return;

    // Save to localStorage before proceeding
    saveDetails(fullName.trim(), phone.trim(), campus);

    onNext({ fullName: fullName.trim(), phone: phone.trim(), campus });
  };

  const handleClearDetails = () => {
    if (window.confirm("Clear saved user details? You'll need to enter them again next time.")) {
      clearDetails();
      setFullNameLocal("");
      setPhoneLocal("");
      setCampusLocal("");
    }
  };

  const pageStyle = {
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
    padding: "80px 24px 40px",
  };

  if (!isLoaded) {
    return (
      <div style={pageStyle}>
        <p style={{ color: "#64ff8c" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div className="bg-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      <div style={{
        position: "absolute", top: -160, left: "50%",
        transform: "translateX(-50%)", width: 500, height: 500,
        background: "radial-gradient(circle, rgba(100,255,140,0.05) 0%, transparent 65%)",
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

      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column",
        alignItems: "center", width: "100%", maxWidth: 460,
      }}>

        <FadeIn delay={60} style={{ display: "flex", justifyContent: "center" }}>
          <ProgressSteps current={0} total={5} />
        </FadeIn>

        <FadeIn delay={140}>
          <h2 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(36px, 6vw, 52px)",
            letterSpacing: 3, color: "#fff",
            textAlign: "center", marginBottom: 6,
          }}>
            Your Details
          </h2>
          <p style={{
            textAlign: "center", color: "#555", fontSize: 13,
            maxWidth: 340, margin: "0 auto 32px",
          }}>
            Enter your full name, phone number, and select your campus.
          </p>
        </FadeIn>

        <FadeIn delay={240} style={{ width: "100%" }}>
          <div style={{
            background: "#111",
            border: "1.5px solid rgba(255,255,255,0.07)",
            borderRadius: 16, padding: 28,
            display: "flex", flexDirection: "column", gap: 20,
          }}>
            <Field
              label="Full Name"
              type="text"
              value={fullName}
              onChange={setFullNameLocal}
              error={fullNameError}
              placeholder="John Doe"
              maxLength={50}
            />
            <Field
              label="Phone Number"
              hint="WhatsApp number"
              type="tel"
              value={phone}
              onChange={setPhoneLocal}
              error={phoneError}
              placeholder="08012345678"
              maxLength={11}
            />
            <CustomSelect
              label="Campus"
              value={campus}
              onChange={(v) => { setCampusLocal(v); setCampusError(""); }}
              options={CAMPUSES}
              placeholder="Select your campus"
              error={campusError}
            />

            <div style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              padding: "11px 14px",
              background: "rgba(100,255,140,0.04)",
              border: "1px solid rgba(100,255,140,0.1)",
              borderRadius: 8,
            }}>
              <span style={{ color: "#64ff8c", fontSize: 13, marginTop: 1, flexShrink: 0 }}>ℹ</span>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>
                Your details are saved locally. Click "Clear Details" below to remove them.
              </p>
            </div>

            {/* Clear Details Button */}
            {(fullName || phone || campus) && (
              <button
                onClick={handleClearDetails}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "rgba(255,77,77,0.08)",
                  border: "1px solid rgba(255,77,77,0.2)",
                  borderRadius: 8,
                  color: "#ff4d4d",
                  fontSize: 12,
                  fontFamily: "var(--font-outfit)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,77,77,0.15)";
                  e.currentTarget.style.borderColor = "rgba(255,77,77,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,77,77,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,77,77,0.2)";
                }}
              >
                Clear Saved Details
              </button>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={340} style={{ width: "100%", marginTop: 16 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <NavBtn onClick={onBack} variant="ghost" label="← Back" />
            <NavBtn
              onClick={handleContinue}
              variant="primary"
              label="Continue →"
              disabled={!canContinue && attempted}
            />
          </div>
        </FadeIn>

      </div>
    </div>
  );
}