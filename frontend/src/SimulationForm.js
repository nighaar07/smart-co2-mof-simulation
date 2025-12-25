import React, { useState } from "react";
import { motion } from "framer-motion";
import CO2Charts from "./CO2Charts";
import CO2Stats from "./CO2Stats";
import CO2EfficiencyRing from "./CO2EfficiencyRing";

/* 🌍 Environment → Location data (NOW WITH lat/lng) */
const LOCATION_DATA = {
  City: [
    { name: "Hyderabad", ppm: 430, lat: 17.3850, lng: 78.4867 },
    { name: "Mumbai", ppm: 460, lat: 19.0760, lng: 72.8777 },
    { name: "Delhi", ppm: 480, lat: 28.6139, lng: 77.2090 },
    { name: "Bengaluru", ppm: 420, lat: 12.9716, lng: 77.5946 }
  ],
  Forest: [
    { name: "Sundarbans", ppm: 360, lat: 21.9497, lng: 89.1833 },
    { name: "Western Ghats", ppm: 350, lat: 10.1632, lng: 76.6413 }
  ],
  Industrial: [
    { name: "Jamshedpur", ppm: 540, lat: 22.8046, lng: 86.2029 },
    { name: "Vapi", ppm: 550, lat: 20.3719, lng: 72.9048 }
  ],
  Indoor: [
    { name: "Classroom", ppm: 600, lat: null, lng: null },
    { name: "Office", ppm: 550, lat: null, lng: null }
  ]
};


/* 🧪 MOF simulation data */
const MOF_DATA = {
  "MOF‑74": { base: 35 },
  "HKUST‑1": { base: 30 },
  "ZIF‑8": { base: 25 },
  "UiO‑66": { base: 32 }
};

function SimulationForm() {
  const [environment, setEnvironment] = useState("City");
  const [location, setLocation] = useState(LOCATION_DATA.City[0]);
  const [co2ppm, setCo2ppm] = useState(LOCATION_DATA.City[0].ppm);

  const [mof, setMof] = useState("MOF‑74");
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(50);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEnvironmentChange = (env) => {
    const loc = LOCATION_DATA[env][0];
    setEnvironment(env);
    setLocation(loc);
    setCo2ppm(loc.ppm);
    setResult(null);
  };

  const handleLocationChange = (name) => {
    const loc = LOCATION_DATA[environment].find(l => l.name === name);
    setLocation(loc);
    setCo2ppm(loc.ppm);
    setResult(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      let efficiency = MOF_DATA[mof].base;

      if (humidity > 60) efficiency -= 5;
      if (temperature < 15 || temperature > 35) efficiency -= 3;

      efficiency = Math.max(15, Math.min(efficiency, 45));

      const reduced = co2ppm - (co2ppm * efficiency) / 100;

      setResult({
        co2_before_capture: co2ppm,
        co2_after_capture: Math.round(reduced),
        reduction_percentage: efficiency,
        message: "MOF‑based CO₂ capture simulation completed",
        location: location.name,
        lat: location.lat,
        lng: location.lng
      });

      setLoading(false);
    }, 800);
  };

  return (
    <motion.div style={pageStyle}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>
        🌍 Smart CO₂ Monitoring & MOF Capture
      </h1>

      <motion.div style={glassCard}>
        <h2>Simulation Setup</h2>

        <label>Environment</label>
        <select value={environment} onChange={e => handleEnvironmentChange(e.target.value)} style={inputStyle}>
          {Object.keys(LOCATION_DATA).map(env => <option key={env}>{env}</option>)}
        </select>

        <label>Location</label>
        <select value={location.name} onChange={e => handleLocationChange(e.target.value)} style={inputStyle}>
          {LOCATION_DATA[environment].map(loc => <option key={loc.name}>{loc.name}</option>)}
        </select>
        {/* 📍 Location Preview (Map-ready data) */}
<div style={{ marginTop: 12, fontSize: 14, opacity: 0.9 }}>
  <b>Selected Location Coordinates:</b><br />
  Latitude: {location.lat ?? "N/A"} <br />
  Longitude: {location.lng ?? "N/A"}
</div>
{/* 🗺️ Map Preview */}
<div style={{ marginTop: 16 }}>
  <label>Map Preview</label>

  <iframe
    title="location-map"
    width="100%"
    height="220"
    style={{
      border: 0,
      borderRadius: 10,
      marginTop: 8
    }}
    loading="lazy"
    allowFullScreen
    src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=10&output=embed`}
  />
</div>


        <label>MOF Material</label>
        <select value={mof} onChange={e => setMof(e.target.value)} style={inputStyle}>
          {Object.keys(MOF_DATA).map(m => <option key={m}>{m}</option>)}
        </select>

        <div style={{ marginTop: 16 }}>
          <label>Temperature: {temperature}°C</label>
          <input type="range" min="5" max="100" value={temperature}
            onChange={e => setTemperature(Number(e.target.value))} />
        </div>

        <div style={{ marginTop: 16 }}>
          <label>Humidity: {humidity}%</label>
          <input type="range" min="20" max="100" value={humidity}
            onChange={e => setHumidity(Number(e.target.value))} />
        </div>

        <div style={{ marginTop: 24 }}>
          <label>CO₂ Concentration (ppm)</label>
          <input
            type="number"
            value={co2ppm}
            onChange={e => setCo2ppm(Number(e.target.value))}
            style={{ ...inputStyle, background: "rgba(255,255,255,0.95)", color: "#000" }}
          />
        </div>

        <motion.button
          onClick={handleSubmit}
          disabled={loading}
          style={{ ...buttonStyle, marginTop: 24 }}
        >
          {loading ? "Simulating..." : "Simulate MOF Capture"}
        </motion.button>
      </motion.div>

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
