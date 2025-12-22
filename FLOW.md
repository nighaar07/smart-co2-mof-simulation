 FLOW.md
 Project Name 
 Smart CO₂ Monitoring and Capture Simulation using MOFs ---
  Purpose of This Document
 This file explains **how the application works step by step**, in simple language. It is the single source of truth for: * application flow * feature logic * naming consistency No code logic should be created without matching this flow. --- 
  Target Users
  * General public interested in environmental awareness * Students and educators * Institutions (schools, offices, communities) exploring carbon reduction concepts 
  > Note: This application is a **software-based monitoring and simulation tool**, not a physical CO₂ capture device. ---
   High-Level Idea The application helps users: 
   * understand CO₂ levels in different environments * visualize how MOF-based carbon capture systems can reduce CO₂ * see the environmental impact through clear numbers and graphs The focus is **awareness, visualization, and decision support**, not real-time chemical capture. ---
    Application Flow (Step-by-Step) 
    Step 1: 
   User Opens the Application * The user opens the web application in a browser. * The landing page briefly explains what CO₂ is and why reduction matters. --- 
     Step 2: User Selects an Environment Context The user chooses **where the CO₂ level is being observed**. The selection can be one of the following (predefined): * Indoor classroom * Traffic junction * Residential area * Industrial zone > The user is **not required to know CO₂ values**. > Each scenario internally maps to an average CO₂ level. --- 
     Step 3: System Determines the Base CO₂ Level * Based on the selected environment, the system retrieves: * an **average CO₂ concentration value** (ppm) * These values are stored as predefined constants or datasets. Example logic (conceptual): * Classroom → higher CO₂ * Traffic area → moderate CO₂ * Residential area → lower CO₂ --- 
     Step 4: CO₂ Level is Displayed to the User * The dashboard displays: * selected environment * current CO₂ level (before capture) * A simple explanation is shown so users understand what the number represents. ---
      Step 5: User Initiates MOF Capture Simulation * The user clicks a button labeled: **"Simulate MOF Carbon Capture"** This action represents: * deployment of MOF-based capture systems in that environment * not personal or household capture --- 
      Step 6: System Applies MOF Capture Logic * The backend applies a **fixed MOF capture efficiency** (percentage-based). * This efficiency represents generalized MOF performance from research literature. Important clarification: * The system simulates the **effect of capture**, not the chemical process. --- 
      Step 7: Updated CO₂ Level is Calculated * The system calculates: * CO₂ level after capture * percentage reduction * These values are returned to the frontend. --- 
      Step 8: Results Are Visualized The user sees: * CO₂ level before capture * CO₂ level after capture * graphical comparison (chart or bar graph) Optional (if time permits): * equivalent environmental impact (e.g., trees planted) --- 
     Step 9: Impact Explanation is Shown * A short, clear message explains: * how much CO₂ was reduced * why MOF-based capture can help at scale The tone is educational and realistic. --- ## What the Application Does NOT Claim To avoid misinformation, the application clearly states: * it does not capture CO₂ physically * it does not use real-time sensor data * it does not model chemical reactions It is a **simulation and visualization tool**. ---
       Completion Criteria (When App Is Considered "Complete") The application is considered complete when: * it runs without errors * users can select an environment * CO₂ levels are displayed * capture simulation works * results are shown visually ---
        Notes for Team Members * All frontend, backend, and documentation work must follow this flow * Any change to logic must first update this file * Naming in code should reflect terms used here (e.g., environment, capture, CO₂ level) ---
         End of FLOW.md