import React, { useEffect, useState } from "react";

function CountUp({ value, duration = 800 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const stepTime = Math.max(Math.floor(duration / value), 10);

    const interval = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, [value, duration]);

  return <span>{count}</span>;
}

export default function CO2Stats({ result }) {
  return (
    <div style={statsGrid}>
      <StatCard
        title="Before CO₂"
        value={result.co2_before_capture}
        unit="ppm"
        tip="CO₂ concentration before MOF capture"
      />

      <StatCard
        title="After CO₂"
        value={result.co2_after_capture}
        unit="ppm"
        tip="CO₂ concentration after MOF capture"
      />

      <StatCard
        title="Efficiency"
        value={result.reduction_percentage}
        unit="%"
        tip="Percentage of CO₂ removed"
      />
    </div>
  );
}

function StatCard({ title, value, unit, tip }) {
  return (
    <div style={card}>
      <div style={tooltip}>{tip}</div>
      <h4>{title}</h4>
      <h2>
        <CountUp value={value} /> {unit}
      </h2>
    </div>
  );
}

/* styles */
const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  marginBottom: "30px"
};

const card = {
  position: "relative",
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(12px)",
  padding: "20px",
  borderRadius: "14px",
  textAlign: "center",
  cursor: "pointer"
};

const tooltip = {
  position: "absolute",
  top: "-35px",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#000",
  color: "#fff",
  padding: "6px 10px",
  borderRadius: "6px",
  fontSize: "12px",
  opacity: 0,
  pointerEvents: "none",
  transition: "0.3s"
};

/* hover effect */
card[":hover"] = {
  transform: "scale(1.05)"
};
