import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CO2Charts from "./CO2Charts";
import CO2Stats from "./CO2Stats";
import CO2EfficiencyRing from "./CO2EfficiencyRing";

/* 🌍 Environment → Location data */
const LOCATION_DATA = {
  City: [
    { name: "Hyderabad", ppm: 430, lat: 17.385, lng: 78.4867 },
    { name: "Mumbai", ppm: 460, lat: 19.076, lng: 72.8777 },
    { name: "Delhi", ppm: 480, lat: 28.6139, lng: 77.209 },
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

/* 🧪 MOF data */
const MOF_DATA = {
  "MOF‑74": { base: 35 },
  "HKUST‑1": { base: 30 },
  "ZIF‑8": { base: 25 },
  "UiO‑66": { base: 32 }
};

function SimulationForm() {
  const [liveMode, setLiveMode] = useState(false);
  const [environment, setEnvironment] = useState("City");
  const [location, setLocation] = useState(LOCATION_DATA.City[0]);
  const [co2ppm, setCo2ppm] = useState(LOCATION_DATA.City[0].ppm);
  const [mof, setMof] = useState("MOF‑74");
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(50);
  const [lastUpdated, setLastUpdated] = useState(null);
const [aiPrediction, setAiPrediction] = useState(null);
const [anomaly, setAnomaly] = useState(false);


  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /* 🔴 FAKE LIVE SENSOR ENGINE */
  useEffect(() => {
  if (!liveMode) return;

  const interval = setInterval(() => {
    const drift = Math.floor(Math.random() * 20 - 10);
    const newCO2 = Math.max(300, co2ppm + drift);

    setCo2ppm(newCO2);
    setLastUpdated(new Date().toLocaleTimeString());

    // Fake AI prediction
    setAiPrediction(newCO2 + Math.floor(Math.random() * 30));

    // Simple anomaly detection
    setAnomaly(newCO2 > 520);
  }, 2000);

  return () => clearInterval(interval);
}, [liveMode, co2ppm]);


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

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      let efficiency = MOF_DATA[mof].base;
      if (humidity > 60) efficiency -= 5;
      if (temperature < 15 || temperature > 35) efficiency -= 3;
      efficiency = Math.max(15, Math.min(efficiency, 45));

      setResult({
        co2_before_capture: Math.round(co2ppm),
        co2_after_capture: Math.round(co2ppm * (1 - efficiency / 100)),
        reduction_percentage: efficiency
      });

      setLoading(false);
    }, 800);
  };

  return (
    <div
  style={{
    ...pageStyle,
    border:
      co2ppm > 500
        ? "2px solid #ff4d4d"
        : "2px solid transparent"
  }}
>

      <h1 style={{ textAlign: "center", marginBottom: 32 }}>
        🌍 Smart CO₂ Monitoring & Capture Using MOFs
      </h1>

      <div style={dashboardGrid}>

        {/* 🟦 TOP-LEFT — CONTROLS */}
        <motion.div style={glassCard}>
          <h2>⚙️ Simulation Controls</h2>

          {/* 🔴 Live Sensor Toggle */}
          <label style={{ fontWeight: "" }}>
            <input
              type="checkbox"
              checked={liveMode}
              onChange={() => setLiveMode(!liveMode)}
              style={{ marginRight: 9 }}
            />
            Live Sensor Mode
          </label>

          <label>  Environment</label>
          <select disabled={liveMode} value={environment} onChange={e => handleEnvironmentChange(e.target.value)} style={inputStyle}>
            {Object.keys(LOCATION_DATA).map(env => <option key={env}>{env}</option>)}
          </select>

          <label>Location</label>
          <select disabled={liveMode} value={location.name} onChange={e => handleLocationChange(e.target.value)} style={inputStyle}>
            {LOCATION_DATA[environment].map(loc => <option key={loc.name}>{loc.name}</option>)}
          </select>

          <label>MOF Material</label>
          <select disabled={liveMode} value={mof} onChange={e => setMof(e.target.value)} style={inputStyle}>
            {Object.keys(MOF_DATA).map(m => <option key={m}>{m}</option>)}
          </select>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label>Temperature: {temperature.toFixed(1)}°C</label>
              <input disabled={liveMode} type="range" min="-5" max="50" value={temperature}
                onChange={e => setTemperature(Number(e.target.value))} />
            </div>

            <div>
              <label>Humidity: {humidity.toFixed(1)}%</label>
              <input disabled={liveMode} type="range" min="20" max="100" value={humidity}
                onChange={e => setHumidity(Number(e.target.value))} />
            </div>
          </div>

          <label>CO₂ Concentration (ppm)</label>
          <input
            disabled={liveMode}
            type="number"
            value={Math.round(co2ppm)}
            onChange={e => setCo2ppm(Number(e.target.value))}
            style={{ ...inputStyle, background: "#fff", color: "#000" }}
          />

          <motion.button
            onClick={handleSubmit}
            disabled={loading}
            style={{ ...buttonStyle, marginTop: 16 }}
          >
            {loading ? "Simulating..." : "Run Simulation"}
          </motion.button>
        </motion.div>

        {/* 🟩 TOP-RIGHT — RESULTS */}
        <motion.div style={glassCard}>
          <h2>📡 Live Results</h2>
          {result ? (
            <>
              <CO2EfficiencyRing value={result.reduction_percentage} />
              <CO2Stats result={result} />
            </>
          ) : <p style={{ opacity: 0.6 }}>Run simulation to view results</p>}
        </motion.div>

        {/* 🟨 BOTTOM-LEFT — MAP */}
        <motion.div style={glassCard}>
          <h2>🗺️ Sensor Coverage Map</h2>
          <p>{location.name}</p>
          {location.lat && (
            <iframe
              title="map"
              width="100%"
              height="220"
              style={{ border: 0, borderRadius: 10 }}
              src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=10&output=embed`}
            />
          )}
        </motion.div>

        {/* 🟪 BOTTOM-RIGHT — CHARTS */}
<motion.div style={glassCard}>
  <h2>
    📊 CO₂ Analytics{" "}
    {anomaly && (
      <span style={{ color: "#ff4d4d", marginLeft: 8 }}>
        ⚠️ Anomaly Detected
      </span>
    )}
  </h2>

  {result ? (
    <CO2Charts
      result={result}
      aiPrediction={aiPrediction}
      anomaly={anomaly}
    />
  ) : (
    <p style={{ opacity: 0.6 }}>Charts appear after simulation</p>
  )}
</motion.div>


      </div>
    </div>
  );
}

/* STYLES — UNCHANGED */
const pageStyle = {
  minHeight: "100vh",
  padding: 30,
  background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  color: "#fff"
};

const dashboardGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1.3fr",
  gridTemplateRows: "auto auto",
  gap: 24,
  maxWidth: 1300,
  margin: "auto"
};

const glassCard = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
  padding: 24,
  borderRadius: 16
};

const inputStyle = {
  width: "100%",
  padding: 10,
  marginTop: 6,
  marginBottom: 12,
  borderRadius: 6,
  border: "none"
};

const buttonStyle = {
  width: "100%",
  padding: 14,
  background: "linear-gradient(90deg, #00c6ff, #0072ff)",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 16
};

export default SimulationForm;
