import React, { useState } from "react";
import { motion } from "framer-motion";
import CO2Charts from "./CO2Charts";
import CO2Stats from "./CO2Stats";
import CO2EfficiencyRing from "./CO2EfficiencyRing";

/* 🌍 Environment → Location data */
const LOCATION_DATA = {
  City: [
    { name: "Banjara Hills, Hyderabad", ppm: 430 },
    { name: "Mumbai", ppm: 460 },
    { name: "Delhi", ppm: 480 },
    { name: "Bengaluru", ppm: 420 },
    { name: "Chennai", ppm: 440 },
    { name: "Kolkata", ppm: 450 },
    { name: "Pune", ppm: 415 }
  ],
  Forest: [
    { name: "Sundarbans", ppm: 360 },
    { name: "Western Ghats", ppm: 350 },
    { name: "Kaziranga", ppm: 355 },
    { name: "Nilgiris", ppm: 340 },
    { name: "Gir Forest", ppm: 365 }
  ],
  Industrial: [
    { name: "Surat GIDC", ppm: 520 },
    { name: "Jamshedpur", ppm: 540 },
    { name: "Rourkela", ppm: 530 },
    { name: "Visakhapatnam", ppm: 510 },
    { name: "Vapi", ppm: 550 }
  ],
  Indoor: [
    { name: "Classroom", ppm: 600 },
    { name: "Office", ppm: 550 },
    { name: "Hospital Ward", ppm: 520 },
    { name: "Shopping Mall", ppm: 580 },
    { name: "Home Kitchen", ppm: 500 }
  ]
};

function SimulationForm() {
  const [environment, setEnvironment] = useState("City");
  const [location, setLocation] = useState(LOCATION_DATA.City[0]);
  const [co2ppm, setCo2ppm] = useState(LOCATION_DATA.City[0].ppm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /* 🔁 Environment change */
  const handleEnvironmentChange = (env) => {
    setEnvironment(env);
    const defaultLoc = LOCATION_DATA[env][0];
    setLocation(defaultLoc);
    setCo2ppm(defaultLoc.ppm);
    setResult(null);
  };

  /* 📍 Location change */
  const handleLocationChange = (locName) => {
    const selected = LOCATION_DATA[environment].find(
      (l) => l.name === locName
    );
    setLocation(selected);
    setCo2ppm(selected.ppm);
    setResult(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const efficiency = 30;
      const reduced = co2ppm - (co2ppm * efficiency) / 100;

      setResult({
        co2_before_capture: co2ppm,
        co2_after_capture: Math.round(reduced),
        reduction_percentage: efficiency,
        message: "MOF-based CO₂ capture simulation completed"
      });

      setLoading(false);
    }, 800);
  };

  return (
    <motion.div style={pageStyle}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>
        🌍 Smart CO₂ Monitoring & MOF Capture
      </h1>

      {/* SETUP CARD */}
      <motion.div style={glassCard}>
        <h2>Simulation Setup</h2>

        {/* ENVIRONMENT */}
        <label>Environment</label>
        <select
          value={environment}
          onChange={(e) => handleEnvironmentChange(e.target.value)}
          style={inputStyle}
        >
          {Object.keys(LOCATION_DATA).map((env) => (
            <option key={env}>{env}</option>
          ))}
        </select>

        <br /><br />

        {/* LOCATION */}
        <label>Location</label>
        <select
          value={location.name}
          onChange={(e) => handleLocationChange(e.target.value)}
          style={inputStyle}
        >
          {LOCATION_DATA[environment].map((loc) => (
            <option key={loc.name}>{loc.name}</option>
          ))}
        </select>

        <br /><br />

        {/* CO₂ */}
        <label>CO₂ Concentration (ppm)</label>
        <input
          type="number"
          value={co2ppm}
          disabled
          style={{ ...inputStyle, opacity: 0.7 }}
        />

        <br /><br />

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleSubmit}
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Simulating..." : "Simulate MOF Capture"}
        </motion.button>
      </motion.div>

      {/* RESULTS */}
      {result && (
        <motion.div style={resultCard}>
          <h3>📊 Results</h3>

          <CO2EfficiencyRing value={result.reduction_percentage} />
          <CO2Stats result={result} />
          <CO2Charts result={result} />
        </motion.div>
      )}
    </motion.div>
  );
}

/* STYLES */
const pageStyle = {
  minHeight: "100vh",
  padding: 40,
  background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  color: "#fff",
  fontFamily: "Arial"
};

const glassCard = {
  maxWidth: 900,
  margin: "auto",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
  padding: 25,
  borderRadius: 14
};

const resultCard = {
  maxWidth: 900,
  margin: "40px auto",
  background: "rgba(0,0,0,0.4)",
  padding: 25,
  borderRadius: 14
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  borderRadius: "6px",
  border: "none",
  background: "rgba(255,255,255,0.9)",
  color: "#000",
  fontSize: "16px"
};


const buttonStyle = {
  width: "100%",
  padding: 14,
  background: "linear-gradient(90deg, #00c6ff, #0072ff)",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 16,
  cursor: "pointer"
};

export default SimulationForm;
