import { useRef } from "react";

export default function OtpInput({ value, onChange, disabled, error }) {
  const refs = Array.from({ length: 6 }, () => useRef(null));
  const digits = value.padEnd(6, " ").split("");

  const handleChange = (i, e) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    if (!char) return;
    const next = value.padEnd(6, " ").split("");
    next[i] = char;
    onChange(next.join("").trimEnd());
    if (i < 5) refs[i + 1].current?.focus();
  };

  const handleKey = (i, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = value.padEnd(6, " ").split("");
      if (next[i].trim()) {
        next[i] = " ";
        onChange(next.join("").trimEnd());
      } else if (i > 0) {
        next[i - 1] = " ";
        onChange(next.join("").trimEnd());
        refs[i - 1].current?.focus();
      }
      return;
    }
    if (e.key === "ArrowLeft" && i > 0) { refs[i - 1].current?.focus(); return; }
    if (e.key === "ArrowRight" && i < 5) { refs[i + 1].current?.focus(); return; }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted) {
      onChange(pasted);
      refs[Math.min(pasted.length, 5)].current?.focus();
    }
    e.preventDefault();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={refs[i]}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d.trim()}
            disabled={disabled}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKey(i, e)}
            onPaste={handlePaste}
            style={{
              width: 48,
              height: 56,
              textAlign: "center",
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              background: d.trim() ? "rgba(100,255,140,0.06)" : "rgba(255,255,255,0.03)",
              border: `1.5px solid ${error ? "#ff4d4d" :
                  d.trim() ? "rgba(100,255,140,0.4)" :
                    "rgba(255,255,255,0.1)"
                }`,
              borderRadius: 8,
              color: "#fff",
              outline: "none",
              caretColor: "#64ff8c",
              transition: "border-color 0.25s ease, background 0.25s ease",
              cursor: disabled ? "not-allowed" : "text",
            }}
          />
        ))}
      </div>

      {error && (
        <p style={{
          fontSize: 11,
          color: "#ff4d4d",
          fontFamily: "var(--font-mono)",
          textAlign: "center",
        }}>
          {error}
        </p>
      )}
    </div>
  );
}