export default function ProgressSteps({ current, total }) {
  return (
    <div style={{ width: "100%", overflow: "hidden", padding: "0 8px", display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32, maxWidth: 320 }}>
        {Array.from({ length: total }).map((_, i) => {
        const isCompleted = i < current;
        const isCurrent = i === current;
        const stepNum = i + 1;

        // Base circle style
        let circleStyle = {
          width: "clamp(24px, 5vw, 28px)",
          height: "clamp(24px, 5vw, 28px)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 700,
          transition: "all 0.4s ease",
          zIndex: 2, // keep above line
        };

        if (isCompleted) {
          circleStyle = {
            ...circleStyle,
            background: "#64ff8c",
            color: "#080808",
            border: "2px solid #64ff8c",
          };
        } else if (isCurrent) {
          circleStyle = {
            ...circleStyle,
            background: "transparent",
            color: "#64ff8c",
            border: "2px solid #64ff8c",
            boxShadow: "0 0 12px 2px rgba(100,255,140,0.15)",
          };
        } else {
          circleStyle = {
            ...circleStyle,
            background: "transparent",
            color: "#444",
            border: "2px solid rgba(255,255,255,0.06)",
          };
        }

        return (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            {/* The Step Circle */}
            <div style={circleStyle}>{stepNum}</div>

            {/* The Line connecting to the *next* step (only if not the last step) */}
            {i !== total - 1 && (
              <div
                style={{
                  width: "clamp(20px, 4vw, 32px)", // length of the line
                  height: 2,
                  background: isCompleted ? "#64ff8c" : "rgba(255,255,255,0.06)",
                  transition: "background 0.4s ease",
                }}
              />
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
}
