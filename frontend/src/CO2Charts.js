import React from "react";
import { motion } from "framer-motion";

function CO2Charts({ result }) {
  if (!result) return null;

  const maxPPM = Math.max(
    result.co2_before_capture,
    result.co2_after_capture
  );

  const beforeHeight = (result.co2_before_capture / maxPPM) * 180;
  const afterHeight = (result.co2_after_capture / maxPPM) * 180;

  return (
    <div
      style={{
        marginTop: "30px",
        background: "rgba(255,255,255,0.08)",
        padding: "20px",
        borderRadius: "12px"
      }}
    >
      <h4 style={{ textAlign: "center", marginBottom: "20px" }}>
        CO₂ Comparison
      </h4>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-end",
          height: "220px"
        }}
      >
        {/* BEFORE BAR */}
        <div style={{ textAlign: "center" }}>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: beforeHeight }}
            transition={{ duration: 0.8 }}
            style={{
              width: "60px",
              background: "linear-gradient(180deg, #ff4d4d, #ff0000)",
              borderRadius: "8px 8px 0 0",
              marginBottom: "8px"
            }}
          />
          <strong>Before</strong>
          <div>{result.co2_before_capture} ppm</div>
        </div>

        {/* AFTER BAR */}
        <div style={{ textAlign: "center" }}>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: afterHeight }}
            transition={{ duration: 0.8 }}
            style={{
              width: "60px",
              background: "linear-gradient(180deg, #00ffcc, #00b894)",
              borderRadius: "8px 8px 0 0",
              marginBottom: "8px"
            }}
          />
          <strong>After</strong>
          <div>{result.co2_after_capture} ppm</div>
        </div>
      </div>
    </div>
  );
}

export default CO2Charts;
