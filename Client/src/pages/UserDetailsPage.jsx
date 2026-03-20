import { useState, useEffect } from "react";
import FadeIn from "../components/FadeIn.jsx";
import ProgressSteps from "../components/ProgressSteps.jsx";
import Field from "../components/Field.jsx";
import CustomSelect from "../components/CustomSelect.jsx";
import OtpInput from "../components/OtpInput.jsx";
import NavBtn from "../components/NavBtn.jsx";
import { useOtp } from "../hooks/useOtp.js";
import { isValidBabcockEmail, isValidPhone } from "../utils/validators.js";
import { CAMPUSES } from "../constants/campuses.js";

function ResendTimer({ onResend, sending }) {
  const [seconds, setSeconds] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    setSeconds(60);
    setCanResend(false);
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) { clearInterval(interval); setCanResend(true); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {canResend ? (
        <button
          onClick={onResend}
          disabled={sending}
          style={{
            background: "none",
            border: "none",
            color: sending ? "#444" : "#64ff8c",
            fontSize: 12,
            fontFamily: "var(--font-mono)",
            cursor: sending ? "not-allowed" : "pointer",
            textDecoration: "underline",
            padding: 0,
          }}
        >
          {sending ? "Sending..." : "Resend code"}
        </button>
      ) : (
        <p style={{ fontSize: 12, color: "#444", fontFamily: "var(--font-mono)" }}>
          Resend code in <span style={{ color: "#64ff8c" }}>{seconds}s</span>
        </p>
      )}
    </div>
  );
}



export default function UserDetailsPage({ onNext, onBack }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [campus, setCampus] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [campusError, setCampusError] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendKey, setResendKey] = useState(0);

  const { stage, error, sending, verifying, send, verify, reset } = useOtp();

  const canSend = isValidBabcockEmail(email) && isValidPhone(phone) && campus;

  /* Live validation after first attempt */
  useEffect(() => {
    if (!attempted) return;
    setEmailError(
      isValidBabcockEmail(email) ? "" : "Must end with @student.babcock.edu.ng"
    );
    setPhoneError(
      isValidPhone(phone) ? "" : "Enter a valid Nigerian number — e.g. 08012345678"
    );
  }, [email, phone, attempted]);

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!campus) {
      setCampusError("Please select your campus");
      return;
    }
    onNext({ email: email.trim(), phone: phone.trim(), campus });
  };

  const handleVerify = async () => {
    if (otp.length < 6) return;
    const ok = await verify(email, otp);
    if (ok) {
      setTimeout(() => onNext({ email: email.trim(), phone: phone.trim(), campus }), 900);
    }
  };

  const handleResend = () => {
    setOtp("");
    setResendKey((k) => k + 1);
    send(email);
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

        {/* ── STAGE: FORM ── */}
        {stage === "idle" && (
          <>
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
                Enter your student email and we'll send a verification code.
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
                  label="Student Email"
                  hint="@student.babcock.edu.ng"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  error={emailError}
                  placeholder="yourname@student.babcock.edu.ng"
                  disabled={sending}
                />
                <Field
                  label="Phone Number"
                  hint="Nigerian number"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  error={phoneError}
                  placeholder="08012345678"
                  disabled={sending}
                />
                <CustomSelect
                  label="Campus"
                  value={campus}
                  onChange={(v) => { setCampus(v); setCampusError(""); }}
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
                    A 6-digit verification code will be sent to your Babcock student email.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={340} style={{ width: "100%", marginTop: 16 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <NavBtn onClick={onBack} variant="ghost" label="← Back" />
                <NavBtn
                  onClick={handleSendCode}
                  variant="primary"
                  label="Send Code →"
                />
              </div>
            </FadeIn>
          </>
        )}

        {/* ── STAGE: OTP ── */}
        {(stage === "sent" || stage === "verified") && (
          <>
            <FadeIn delay={100}>
              <h2 style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(32px, 6vw, 48px)",
                letterSpacing: 3, color: "#fff",
                textAlign: "center", marginBottom: 6,
              }}>
                Check Your Email
              </h2>
              <p style={{
                textAlign: "center", fontSize: 13, color: "#555",
                maxWidth: 340, margin: "0 auto 32px",
              }}>
                We sent a 6-digit code to{" "}
                <span style={{ color: "rgba(255,255,255,0.6)" }}>{email}</span>
              </p>
            </FadeIn>

            <FadeIn delay={200} style={{ width: "100%" }}>
              <div style={{
                background: "#111",
                border: `1.5px solid ${stage === "verified" ? "rgba(100,255,140,0.3)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 16, padding: 28,
                display: "flex", flexDirection: "column", gap: 24,
                transition: "border-color 0.4s ease",
              }}>
                {stage === "verified" ? (
                  <div style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", gap: 12, padding: "8px 0",
                  }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: "50%",
                      background: "rgba(100,255,140,0.12)",
                      border: "2px solid rgba(100,255,140,0.4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 22, color: "#64ff8c",
                    }}>
                      ✓
                    </div>
                    <p style={{ fontSize: 14, color: "#64ff8c", fontFamily: "var(--font-mono)" }}>
                      Email verified!
                    </p>
                    <p style={{ fontSize: 12, color: "#555" }}>
                      Taking you to the next step...
                    </p>
                  </div>
                ) : (
                  <>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      disabled={verifying}
                      error={error}
                    />
                    <ResendTimer
                      key={resendKey}
                      onResend={handleResend}
                      sending={sending}
                    />
                  </>
                )}
              </div>
            </FadeIn>

            {stage !== "verified" && (
              <FadeIn delay={300} style={{ width: "100%", marginTop: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <NavBtn
                    onClick={() => { reset(); setOtp(""); }}
                    variant="ghost"
                    label="← Change Email"
                  />
                  <NavBtn
                    onClick={handleVerify}
                    variant="primary"
                    label={verifying ? "Verifying..." : "Verify →"}
                    disabled={verifying || otp.length < 6}
                  />
                </div>
              </FadeIn>
            )}
          </>
        )}

      </div>
    </div>
  );
}