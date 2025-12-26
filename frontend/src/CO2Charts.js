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

  /* 🧠 Fake AI prediction logic based (safe, chart-only) */
  const aiPrediction =
    result.co2_before_capture + Math.floor(Math.random() * 40 - 10);

  const predictionHeight = (aiPrediction / maxPPM) * 180;

  /* 🚨 Anomaly detection */
  const anomaly = result.co2_before_capture > 520;

  return (
    <div
      style={{
        marginTop: "30px",
        background: anomaly
          ? "rgba(255,0,0,0.15)"
          : "rgba(255,255,255,0.08)",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: anomaly ? "0 0 15px rgba(255,0,0,0.6)" : "none"
      }}
    >
      <h4 style={{ textAlign: "center", marginBottom: "20px" }}>
        CO₂ Comparison {anomaly && "⚠️ Anomaly Detected"}
      </h4>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-end",
          height: "220px",
          position: "relative"
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
              background: anomaly
                ? "linear-gradient(180deg, #ff0000, #b30000)"
                : "linear-gradient(180deg, #ff4d4d, #ff0000)",
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

        {/* 🧠 AI PREDICTION LINE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            position: "absolute",
            bottom: predictionHeight,
            left: 0,
            right: 0,
            borderTop: "2px dashed #00c6ff"
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: predictionHeight + 6,
            right: 10,
            fontSize: 12,
            color: "#00c6ff"
          }}
        >
          AI Prediction: {aiPrediction} ppm
        </div>
      </div>
    </div>
  );
}

export default CO2Charts;