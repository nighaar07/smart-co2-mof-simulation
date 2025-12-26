# smart_co2_server.py

from flask import Flask, jsonify, request
from flask_cors import CORS
from co2_mof_constants import ENVIRONMENT_CO2_DATA, MOF_CAPTURE_EFFICIENCY_PERCENT

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Smart CO₂ Monitoring & MOF Capture Simulation API is running"

@app.route("/api/environment/<environment_name>", methods=["GET"])
def fetch_environment_co2(environment_name):
    environment = ENVIRONMENT_CO2_DATA.get(environment_name)

    if not environment:
        return jsonify({"error": "Invalid environment selected"}), 400

    return jsonify({
        "environment": environment_name,
        "co2_ppm": environment["average_co2_ppm"],
        "description": environment["reason"],
        "unit": "ppm"
    })

@app.route("/api/simulate-mof-capture", methods=["POST"])
def simulate_mof_capture():
    request_data = request.get_json()
    base_co2_ppm = request_data.get("base_co2_ppm")

    if base_co2_ppm is None:
        return jsonify({"error": "base_co2_ppm is required"}), 400

    reduced_amount = (base_co2_ppm * MOF_CAPTURE_EFFICIENCY_PERCENT) / 100
    final_co2_ppm = base_co2_ppm - reduced_amount

    return jsonify({
        "co2_before_capture": base_co2_ppm,
        "co2_after_capture": round(final_co2_ppm),
        "reduction_percentage": MOF_CAPTURE_EFFICIENCY_PERCENT,
        "message": "MOF-based CO₂ capture simulation completed"
    })

@app.route("/api/mof-details", methods=["GET"])
def mof_details():
    return jsonify({
        "capture_efficiency_percent": MOF_CAPTURE_EFFICIENCY_PERCENT,
        "note": "Efficiency represents generalized MOF performance for simulation purposes"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)


