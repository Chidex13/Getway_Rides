import { useRef } from "react";
import html2canvas from "html2canvas";
import FadeIn from "../components/FadeIn.jsx";
import { formatDate, formatTime } from "../utils/formatters.js";
import { formatPrice } from "../utils/pricing.js";

function ReceiptRow({ label, value }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between",
      alignItems: "center", padding: "10px 0",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}>
      <span style={{
        fontSize: 11, color: "#555",
        fontFamily: "var(--font-mono)",
        textTransform: "uppercase", letterSpacing: "0.08em",
      }}>
        {label}
      </span>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
        {value}
      </span>
    </div>
  );
}

export default function FinalizePage({ booking, onRestart }) {
  const receiptRef = useRef(null);

  const handleDownload = async () => {
    if (!receiptRef.current) return;
    try {
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: "#111111",
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `getway-receipt-${booking.bookingId}.png`;
      link.click();
    } catch (err) {
      console.error("Receipt download failed:", err);
    }
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

      {/* Green glow */}
      <div style={{
        position: "absolute", top: -160, left: "50%",
        transform: "translateX(-50%)", width: 600, height: 600,
        background: "radial-gradient(circle, rgba(100,255,140,0.07) 0%, transparent 65%)",
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

        {/* Success icon */}
        <FadeIn delay={100} style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "rgba(100,255,140,0.1)",
            border: "2px solid rgba(100,255,140,0.35)",
            display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 32,
          }}>
            ✓
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <h2 style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(40px, 7vw, 64px)",
            letterSpacing: 3, color: "#fff",
            textAlign: "center", marginBottom: 6,
          }}>
            Booking Received!
          </h2>
          <p style={{
            textAlign: "center", color: "#555", fontSize: 13,
            maxWidth: 360, margin: "0 auto 8px",
          }}>
            Save your receipt below
            as proof of payment.
          </p>
        </FadeIn>

        {/* Receipt card */}
        <FadeIn delay={300} style={{ width: "100%" }}>
          <div
            ref={receiptRef}
            style={{
              background: "#111",
              border: "1.5px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: 28,
              marginBottom: 16,
            }}
          >
            {/* Receipt header */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: 20,
              paddingBottom: 16,
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-bebas)", fontSize: 20,
                  letterSpacing: 2, color: "#64ff8c",
                }}>
                  GETWAY RIDES
                </p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255, 0.70)", fontWeight: 900, fontFamily: "var(--font-mono)", }}>
                  Booking Receipt
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{
                  fontFamily: "var(--font-mono)", fontSize: 12,
                  color: "#fff", letterSpacing: 1,
                }}>
                  {booking.bookingId}
                </p>
                <p style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>
                  {new Date().toLocaleDateString("en-NG", {
                    day: "numeric", month: "long", year: "numeric"
                  })}
                </p>
                <p style={{
                  fontSize: 10, color: "#555",
                  fontFamily: "var(--font-mono)", letterSpacing: "0.05em"
                }}>
                  {new Date().toLocaleTimeString("en-NG", {
                    hour: "2-digit", minute: "2-digit", second: "2-digit",
                    hour12: true
                  })}
                </p>
              </div>
            </div>

            {/* Passenger */}
            <p style={{
              fontSize: 9, textTransform: "uppercase",
              letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)",
              fontFamily: "var(--font-mono)", marginBottom: 4,
            }}>
              Passenger
            </p>
            <ReceiptRow label="Email" value={booking.email} />
            <ReceiptRow label="Phone" value={booking.phone} />
            <ReceiptRow label="Hostel" value={booking.hostel} />
            <ReceiptRow label="Campus" value={booking.campus === "main" ? "Main Campus" : "Iperu Campus"} />

            {/* Trip */}
            <p style={{
              fontSize: 9, textTransform: "uppercase",
              letterSpacing: "0.15em", color: "rgba(255,255,255,0.70)", fontWeight: 900,
              fontFamily: "var(--font-mono)", margin: "20px 0 4px",
            }}>
              Trip
            </p>
            <ReceiptRow label="Type" value={booking.rideType === "public" ? "Public (Shared)" : "Private"} />
            <ReceiptRow label="Direction" value={booking.tripDir === "drop-off" ? "Campus → Airport" : "Airport → Campus"} />
            <ReceiptRow label="Date" value={booking.date ? formatDate(booking.date) : "—"} />
            <ReceiptRow label="Time" value={booking.time ? formatTime(booking.time) : "—"} />
            <ReceiptRow label="Passengers" value={booking.passengers} />

            {/* Amount */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", paddingTop: 16, marginTop: 12,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}>
              <span style={{
                fontSize: 11, color: "rgba(255,255,255, 0.70)", fontWeight: 900,
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase", letterSpacing: "0.08em",
              }}>
                Amount Paid
              </span>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 26, color: "#ffb830", fontWeight: 700,
              }}>
                {booking.price ? formatPrice(booking.price) : "—"}
              </span>
            </div>



            <div style={{
              marginTop: 16,
              paddingTop: 14,
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}>
              <p style={{
                fontSize: 9, textTransform: "uppercase",
                letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)",
                fontFamily: "var(--font-mono)", marginBottom: 10,
              }}>
                Driver Contact
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{
                    fontSize: 11, color: "#555",
                    fontFamily: "var(--font-mono)"
                  }}>
                    Line 1
                  </span>
                  <span style={{
                    fontSize: 12, fontWeight: 600,
                    color: "#fff", fontFamily: "var(--font-mono)",
                    letterSpacing: "0.05em"
                  }}>
                    07019624022
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{
                    fontSize: 11, color: "#555",
                    fontFamily: "var(--font-mono)"
                  }}>
                    Line 2
                  </span>
                  <span style={{
                    fontSize: 12, fontWeight: 600,
                    color: "#fff", fontFamily: "var(--font-mono)",
                    letterSpacing: "0.05em"
                  }}>
                    0704 774 9171
                  </span>
                </div>
              </div>

              <p style={{
                fontSize: 10, color: "rgba(255,255,255,0.2)",
                fontFamily: "var(--font-mono)", marginTop: 10,
                lineHeight: 1.5,
              }}>
                Contact us if your driver has not arrived within
                40 minutes of your selected time.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={420} style={{ width: "100%", textAlign: "center" }}>
          <p style={{
            fontSize: 13,
            color: "#ff4d4d",
            fontFamily: "var(--font-outfit)",
            lineHeight: 1.6,
            padding: "0 8px",
            marginBottom: 4,
          }}>
            ⚠ Your booking is pending driver confirmation.
            You will be contacted if there are any issues.
          </p>
        </FadeIn>

        {/* Action buttons */}
        <FadeIn delay={520} style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Download */}
          <button
            onClick={handleDownload}
            style={{
              width: "100%", padding: "14px 0",
              borderRadius: 6, fontSize: 13, fontWeight: 700,
              fontFamily: "var(--font-outfit)",
              letterSpacing: "0.08em", textTransform: "uppercase",
              cursor: "pointer",
              background: "#64ff8c", color: "#080808",
              border: "none",
              display: "inline-flex", alignItems: "center",
              justifyContent: "center", gap: 8,
            }}
          >
            ↓ Download Receipt
          </button>

          {/* Book another */}
          <button
            onClick={onRestart}
            style={{
              width: "100%", padding: "14px 0",
              borderRadius: 6, fontSize: 13, fontWeight: 700,
              fontFamily: "var(--font-outfit)",
              letterSpacing: "0.08em", textTransform: "uppercase",
              cursor: "pointer",
              background: "transparent", color: "#555",
              border: "2px solid rgba(255,255,255,0.07)",
              display: "inline-flex", alignItems: "center",
              justifyContent: "center",
            }}
          >
            Book Another Ride
          </button>

        </FadeIn>

      </div>
    </div>
  );
}