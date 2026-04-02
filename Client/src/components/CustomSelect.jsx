import { useState, useEffect, useRef } from "react";

export default function CustomSelect({
  label,
  hint,
  value,
  onChange,
  options,
  placeholder,
  error,
  disabled
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const borderColor = error
    ? "#ff4d4d"
    : open
      ? "#64ff8c"
      : "rgba(255,255,255,0.1)";

  const selectedOption = options.find((o) => {
    const optionVal = typeof o === "string" ? o : o.id;
    return optionVal === value;
  });

  const displayValue = selectedOption
    ? (typeof selectedOption === "string" ? selectedOption : selectedOption.label)
    : placeholder;

  const handleSelect = (optionVal) => {
    onChange(optionVal);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex", flexDirection: "column", gap: 6,
        position: "relative", width: "100%",
        opacity: disabled ? 0.4 : 1,
        pointerEvents: disabled ? "none" : "auto"
      }}
    >
      {/* Label Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label style={{
          fontSize: 11, fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)",
          fontFamily: "var(--font-mono)",
        }}>
          {label}
        </label>
        {hint && (
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-mono)" }}>
            {hint}
          </span>
        )}
      </div>

      {/* Trigger */}
      <div
        onClick={() => !disabled && setOpen((prev) => !prev)}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          border: `1.5px solid ${borderColor}`,
          borderRadius: 8,
          padding: "13px 16px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 14,
          color: value ? "#fff" : "#3a3a3a",
          fontFamily: "var(--font-outfit)",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "border-color 0.3s ease",
        }}
      >
        <span>{displayValue}</span>
        <span style={{
          fontSize: 14,
          color: "#64ff8c",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease"
        }}>
          ▾
        </span>
      </div>

      {/* Dropdown Panel */}
      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 6px)",
          left: 0,
          right: 0,
          background: "#161616",
          border: "1.5px solid rgba(100,255,140,0.2)",
          borderRadius: 8,
          overflow: "hidden",
          zIndex: 100,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          maxHeight: 220,
          overflowY: "auto"
        }}>
          {options.map((o) => {
            const optionVal = typeof o === "string" ? o : o.id;
            const optionLabel = typeof o === "string" ? o : o.label;
            const isSelected = value === optionVal;

            return (
              <div
                key={optionVal}
                onClick={() => handleSelect(optionVal)}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "rgba(100,255,140,0.06)";
                    e.currentTarget.style.color = "#64ff8c";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#fff";
                  }
                }}
                style={{
                  padding: "11px 16px",
                  fontSize: 13,
                  fontFamily: "var(--font-outfit)",
                  color: isSelected ? "#64ff8c" : "#fff",
                  background: isSelected ? "rgba(100,255,140,0.08)" : "transparent",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "background 0.15s ease, color 0.15s ease"
                }}
              >
                <span>{optionLabel}</span>
                {isSelected && (
                  <span style={{ fontSize: 11, color: "#64ff8c" }}>✓</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Error */}
      {error && (
        <p style={{ fontSize: 11, color: "#ff4d4d", fontFamily: "var(--font-mono)", marginTop: 2 }}>
          {error}
        </p>
      )}
    </div>
  );
}
