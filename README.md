Smart CO₂ Monitoring and Capture Simulation using MOFs
Project Overview

The Smart CO₂ Monitoring and Capture Simulation using MOFs is a software-based web application designed to raise awareness about carbon dioxide (CO₂) levels in different environments and to simulate how MOF-based carbon capture systems can help reduce CO₂ at scale.

This project focuses on visualization, education, and decision support, not on physical CO₂ capture or real-time sensor data.

Problem Statement

Increasing CO₂ levels are a major contributor to climate change.
However, most people:
do not understand what CO₂ levels mean,
cannot visualize the impact of carbon capture technologies,
are unaware of emerging solutions like Metal-Organic Frameworks (MOFs).

There is a need for a simple, transparent, and educational tool that helps users understand:
CO₂ concentration levels in different environments
the potential impact of MOF-based capture systems

Solution Approach
This application provides:
Predefined environmental scenarios
Average CO₂ concentration values (ppm)
A simulation of MOF-based CO₂ capture using percentage efficiency
Clear visual comparison of CO₂ levels before and after capture
The system is intentionally kept simple and realistic, avoiding over-engineering or false claims.
 Target Users:
General public interested in environmental awareness
Students and educators
Institutions (schools, offices, communities) exploring sustainability concepts

 Key Features:
 Environment-based CO₂ selection (classroom, traffic, residential, industrial)
 Display of average CO₂ concentration values (ppm)
 Simulation of MOF-based CO₂ capture using fixed efficiency
 Visual comparison of CO₂ levels before and after capture
 Educational explanations for every result

 Application Flow:
User opens the web application
Selects an environment type
System retrieves average CO₂ level
CO₂ level is displayed to the user
User initiates MOF capture simulation
System applies MOF efficiency logic
Updated CO₂ values are calculated
Results are visualized using charts
Impact explanation is shown
For detailed logic, refer to FLOW.md.

 API Overview:
The backend provides simple REST APIs to:
Fetch base CO₂ levels for environments
Simulate MOF-based CO₂ capture
Expose MOF efficiency configuration
Full API documentation is available in API.md.

 About MOFs (Metal-Organic Frameworks):
MOFs are advanced porous materials researched for applications such as:
gas storage
gas separation
carbon capture
Important Clarification
This project:
does NOT simulate chemical reactions
does NOT claim real-world capture
uses generalized efficiency values from literature for educational purposes
does not capture CO₂ physically
does not integrate hardware
does not model chemical processes
It is a software simulation and visualization tool only.

 Tech Stack:

Frontend: React (Web UI & visualization)

Backend: Node.js / Python (Simulation logic)

Charts: Chart.js / Recharts (or equivalent)

Version Control: Git & GitHub
