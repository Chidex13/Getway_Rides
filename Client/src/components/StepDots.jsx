export default function StepDots({ current, total }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 40 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? 24 : 8,
            height: 8,
            borderRadius: 4,
            background: i === current ? "#64ff8c" : "#333",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}