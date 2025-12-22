API.md
Project Name

Smart CO₂ Monitoring and Capture Simulation using MOFs

Purpose of This Document

This file defines the backend API contract for the application.

It explains:

what endpoints exist

what data they accept

what data they return

how they map to the application flow

This API supports a software-based simulation, not real-time sensor data.

API Design Principles

Simple REST-style APIs

JSON request and response format

No authentication required (demo-focused)

Deterministic outputs for the same inputs

Base URL
/api

Data Concepts Used Across APIs
Environment Types

Predefined environment identifiers:

classroom

traffic

residential

industrial

CO₂ Level Unit

CO₂ concentration is represented in ppm (parts per million)

MOF Capture Efficiency

Represented as a percentage value

Applied uniformly across environments

Configurable in backend constants

Example:

captureEfficiency = 30%

API Endpoints
1️⃣ Get Base CO₂ Level for an Environment
Endpoint
GET /api/environment/{environmentType}

Description

Returns the average base CO₂ level for the selected environment.

This corresponds to:

FLOW.md → Step 2 & Step 3

Path Parameters
Name	Type	Description
environmentType	string	One of the predefined environment types
Example Request
GET /api/environment/classroom

Example Response
{
  "environment": "classroom",
  "co2Level": 900,
  "unit": "ppm",
  "description": "Typical indoor classroom CO₂ concentration"
}

Error Response (Invalid Environment)
{
  "error": "Invalid environment type"
}

2️⃣ Simulate MOF CO₂ Capture
Endpoint
POST /api/simulate-capture

Description

Simulates MOF-based CO₂ capture for a given base CO₂ level.

This corresponds to:

FLOW.md → Step 5, Step 6, Step 7

Request Body
{
  "environment": "classroom",
  "baseCo2Level": 900
}

Request Fields
Field	Type	Description
environment	string	Selected environment
baseCo2Level	number	CO₂ level before capture (ppm)
Example Response
{
  "environment": "classroom",
  "beforeCapture": 900,
  "afterCapture": 630,
  "reductionPercentage": 30,
  "unit": "ppm",
  "message": "MOF-based capture simulation applied"
}

Notes

The reduction is calculated using a fixed efficiency value

No chemical or physical modeling is performed

Output is deterministic

3️⃣ Get MOF Configuration (Optional / Informational)
Endpoint
GET /api/mof-info

Description

Returns general information about the MOF capture configuration used in the simulation.

This is useful for:

transparency

educational explanation

UI tooltips

Example Response
{
  "captureEfficiency": 30,
  "efficiencyUnit": "percentage",
  "note": "Efficiency represents generalized MOF performance from research literature"
}

What the API Does NOT Do

To avoid misuse or misinformation:

no real-time sensor data

no hardware integration

no chemical reaction simulation

no user tracking or storage

Error Handling Strategy

Invalid inputs return clear error messages

No silent failures

HTTP status codes follow standard conventions

Notes for Developers

All backend logic must align with FLOW.md

Any change in simulation logic must update this file

Environment names must stay consistent across frontend and backend

End of API.md