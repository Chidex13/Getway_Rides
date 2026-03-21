import { useState, useEffect, useRef } from "react";
import FadeIn from "../components/FadeIn.jsx";
import ProgressSteps from "../components/ProgressSteps.jsx";
import NavBtn from "../components/NavBtn.jsx";
import { getPricePerSeat, formatPrice } from "../utils/pricing.js";
import { formatDate, formatTime } from "../utils/formatters.js";
import { createBooking } from "../utils/api.js";

function SummaryRow({ label, value, accent }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between",
      alignItems: "center", padding: "10px 0",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}>
      <span style={{ fontSize: 12, color: "#555", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </span>
      <span style={{ fontSize: 13, fontWeight: 600, color: accent ?? "#fff" }}>
        {value}
      </span>
    </div>
  );
}

export default function PaymentPage({ booking, onNext, onBack }) {
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptError, setReceiptError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fileInputRef = useRef(null);

  const pricePerSeat = getPricePerSeat(booking.rideType, booking.campus);
  const price = pricePerSeat * (booking.passengers || 1);

  const ALLOWED = ["image/png", "image/jpeg", "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

  const handleFile = (file) => {
    if (!file) return;
    if (!ALLOWED.includes(file.type)) {
      setReceiptError("Only PNG, JPG, PDF, or DOC files are accepted.");
      setReceiptFile(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setReceiptError("File must be under 5MB.");
      setReceiptFile(null);
      return;
    }
    setReceiptFile(file);
    setReceiptError("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    if (!receiptFile) { setReceiptError("Please upload your payment receipt."); return; }
    setSubmitting(true);
    setSubmitError("");
    try {
      const result = await createBooking(
        {
          email: booking.email,
          phone: booking.phone,
          rideType: booking.rideType,
          tripDirection: booking.tripDir,
          hostel: booking.hostel,
          campus: booking.campus,
          date: booking.date,
          time: booking.time,
          passengers: booking.passengers,
          price,
        },
        receiptFile
      );
      onNext({ bookingId: result.bookingId, price });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }

    // Bypass validation for testing
    // onNext({ bookingId: "TEST-ID123", price });
  };

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
        background: "radial-gradient(circle, rgba(255,184,48,0.04) 0%, transparent 65%)",
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
        alignItems: "center", width: "100%", maxWidth: 520,
      }}>

        <FadeIn delay={60} style={{ display: "flex", justifyContent: "center" }}>
          <ProgressSteps current={4} total={5} />
        </FadeIn>

        <FadeIn delay={140}>
          <h2 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(36px, 6vw, 52px)",
            letterSpacing: 3, color: "#fff",
            textAlign: "center", marginBottom: 6,
          }}>
            Payment
          </h2>
          <p style={{
            textAlign: "center", color: "#555", fontSize: 13,
            maxWidth: 360, margin: "0 auto 28px",
          }}>
            Transfer the amount below to our account then upload your receipt.
          </p>
        </FadeIn>

        <FadeIn delay={220} style={{ width: "100%" }}>
          <div style={{
            background: "#111",
            border: "1.5px solid rgba(255,255,255,0.07)",
            borderRadius: 16, padding: 28,
            display: "flex", flexDirection: "column", gap: 4,
            marginBottom: 16,
          }}>
            <p style={{
              fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)",
              marginBottom: 8,
            }}>
              Trip Details
            </p>

            <SummaryRow label="Ride Type" value={booking.rideType === "public" ? "Public (Shared)" : "Private"} />
            <SummaryRow label="Direction" value={booking.tripDir === "drop-off" ? "Campus → Airport" : "Airport → Campus"} />
            <SummaryRow label="Campus" value={booking.campus === "main" ? "Main Campus" : "Iperu Campus"} />
            <SummaryRow label="Hostel" value={booking.hostel} />
            <SummaryRow label="Date" value={booking.date ? formatDate(booking.date) : "—"} />
            <SummaryRow label="Time" value={booking.time ? formatTime(booking.time) : "—"} />
            {booking.rideType === "private" && (
              <SummaryRow label="Passengers" value={booking.passengers} />
            )}

            <SummaryRow
              label="Price Per Seat"
              value={pricePerSeat ? formatPrice(pricePerSeat) : "—"}
            />


            {/* Price */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", paddingTop: 16, marginTop: 8,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}>
              <span style={{
                fontSize: 12, color: "#555",
                fontFamily: "var(--font-mono)", textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}>
                Total Amount
              </span>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 28,
                color: "#ffb830", fontWeight: 700,
              }}>
                {price ? formatPrice(price) : "—"}
              </span>
            </div>

            {/* Bank details */}
            <div style={{
              marginTop: 16, padding: "14px 16px",
              background: "rgba(255,184,48,0.04)",
              border: "1px solid rgba(255,184,48,0.15)",
              borderRadius: 8,
            }}>
              <p style={{
                fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em",
                color: "#ffb830", fontFamily: "var(--font-mono)", marginBottom: 8,
              }}>
                Transfer To
              </p>
              <p style={{ fontSize: 13, color: "#fff", marginBottom: 4 }}>
                <span style={{ color: "#555" }}>Bank: </span>Opay
              </p>
              <p style={{ fontSize: 13, color: "#fff", marginBottom: 4 }}>
                <span style={{ color: "#555" }}>Account No: </span>
                <span style={{ fontFamily: "var(--font-mono)", letterSpacing: 2 }}>
                  91577891764
                </span>
              </p>
              <p style={{ fontSize: 13, color: "#fff" }}>
                <span style={{ color: "#555" }}>Name: </span>Oyewumi Damilare
              </p>
            </div>

            {/* Driver Details*/}
            <div style={{
              marginTop: 16, padding: "14px 16px",
              background: "rgba(255,184,48,0.04)",
              border: "1px solid rgba(255,184,48,0.15)",
              borderRadius: 8,
            }}>
              <p style={{
                fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em",
                color: "#ffb830", fontFamily: "var(--font-mono)", marginBottom: 8,
              }}>
                Contact Driver
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <p style={{ fontSize: 13, color: "#fff", margin: 0 }}>
                  <span style={{ color: "#555" }}>Line 1: </span>
                  <span style={{ fontFamily: "var(--font-mono)", letterSpacing: 2 }}>
                    07019624022
                  </span>
                </p>
                <p style={{ fontSize: 13, color: "#fff", margin: 0 }}>
                  <span style={{ color: "#555" }}>Line 2: </span>
                  <span style={{ fontFamily: "var(--font-mono)", letterSpacing: 2 }}>
                    0704 774 9171
                  </span>
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Receipt Upload */}
        <FadeIn delay={320} style={{ width: "100%" }}>
          <div style={{
            background: "#111",
            border: "1.5px solid rgba(255,255,255,0.07)",
            borderRadius: 16, padding: 28,
            marginBottom: 16,
          }}>
            <p style={{
              fontSize: 11, fontWeight: 600, textTransform: "uppercase",
              letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)",
              fontFamily: "var(--font-mono)", marginBottom: 16,
            }}>
              Upload Payment Receipt
            </p>

            {/* Drop zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${receiptError ? "#ff4d4d" :
                  dragOver ? "#64ff8c" :
                    receiptFile ? "rgba(100,255,140,0.4)" :
                      "rgba(255,255,255,0.1)"
                  }`,
                borderRadius: 10,
                padding: "32px 20px",
                textAlign: "center",
                cursor: "pointer",
                background: dragOver
                  ? "rgba(100,255,140,0.04)"
                  : receiptFile
                    ? "rgba(100,255,140,0.03)"
                    : "transparent",
                transition: "all 0.25s ease",
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                onChange={(e) => handleFile(e.target.files[0])}
                style={{ display: "none" }}
              />

              {receiptFile ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "rgba(100,255,140,0.12)",
                    border: "1.5px solid rgba(100,255,140,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18,
                  }}>
                    ✓
                  </div>
                  <p style={{ fontSize: 13, color: "#64ff8c", fontWeight: 600 }}>
                    {receiptFile.name}
                  </p>
                  <p style={{ fontSize: 11, color: "#555" }}>
                    {(receiptFile.size / 1024).toFixed(1)} KB · Click to change
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <p style={{ fontSize: 28 }}>📎</p>
                  <p style={{ fontSize: 13, color: "#fff" }}>
                    Drag & drop or <span style={{ color: "#64ff8c", textDecoration: "underline" }}>browse</span>
                  </p>
                  <p style={{ fontSize: 11, color: "#555" }}>PNG, JPG, PDF, DOC — max 5MB</p>
                </div>
              )}
            </div>

            {receiptError && (
              <p style={{
                fontSize: 11, color: "#ff4d4d",
                fontFamily: "var(--font-mono)", marginTop: 8,
              }}>
                {receiptError}
              </p>
            )}
          </div>
        </FadeIn>

        {submitError && (
          <FadeIn delay={0} style={{ width: "100%", marginBottom: 12 }}>
            <p style={{
              fontSize: 12, color: "#ff4d4d", textAlign: "center",
              fontFamily: "var(--font-mono)",
            }}>
              {submitError}
            </p>
          </FadeIn>
        )}

        <FadeIn delay={420} style={{ width: "100%" }}>
          <div style={{ display: "flex", gap: 12 }}>
            <NavBtn onClick={onBack} variant="ghost" label="← Back" disabled={submitting} />
            <NavBtn
              onClick={handleSubmit}
              variant="primary"
              label={submitting ? "Submitting..." : "Confirm Booking →"}
              disabled={submitting}
            />
          </div>
        </FadeIn>

      </div>
    </div>
  );
}