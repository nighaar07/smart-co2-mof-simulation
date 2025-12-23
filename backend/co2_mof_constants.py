# co2_mof_constants.py
# Stores predefined CO₂ levels and MOF capture efficiency

ENVIRONMENT_CO2_DATA = {
    "classroom": {
        "average_co2_ppm": 900,
        "reason": "Indoor classroom with limited ventilation"
    },
    "traffic": {
        "average_co2_ppm": 700,
        "reason": "Traffic junction with vehicle emissions"
    },
    "residential": {
        "average_co2_ppm": 450,
        "reason": "Residential area with moderate human activity"
    },
    "industrial": {
        "average_co2_ppm": 1200,
        "reason": "Industrial zone with high emissions"
    }
}

MOF_CAPTURE_EFFICIENCY_PERCENT = 30
