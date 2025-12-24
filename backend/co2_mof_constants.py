# backend/co2_mof_constants.py

"""
This file contains all the constant values used in the CO2-MOF simulation.
Keeping constants in a separate file helps maintain clean code and easy updates.
"""

# Gas properties
CO2_MOLAR_MASS = 44.01  # g/mol
N2_MOLAR_MASS = 28.01   # g/mol
O2_MOLAR_MASS = 32.00   # g/mol

# Simulation parameters
TEMPERATURE_STANDARD = 298.15  # K (25°C)
PRESSURE_STANDARD = 1.0        # atm

# MOF properties (example values)
MOF_SURFACE_AREA = 1200        # m2/g
MOF_PORE_VOLUME = 0.5           # cm3/g
MOF_DENSITY = 0.8               # g/cm3

# Adsorption constants (Langmuir model example)
ADSORPTION_COEFFICIENT = 0.05  # mol/kg·atm
MAX_ADSORPTION_CAPACITY = 2.0  # mol/kg

# Conversion factors
ATM_TO_PA = 101325              # 1 atm = 101325 Pa
CM3_TO_M3 = 1e-6                # 1 cm3 = 1e-6 m3
G_TO_KG = 1e-3                  # 1 g = 0.001 kg

# Tolerance / small value for numerical calculations
EPSILON = 1e-8
