# Precision Irrigation Scheduling System — Full Stack Web App Specification

## Project Title
**A State-Transition Model for Precision Irrigation Scheduling: Optimization of Water-Use Efficiency**

---

## Objective
Build a **professional, modern, full-stack web application** for a smart agriculture use case focused on **precision irrigation scheduling**. The application should simulate and optimize irrigation decisions using a **state-transition model**, helping improve **water-use efficiency** based on crop, soil, moisture, weather, and growth-stage conditions.

This should look like a **real-world intelligent decision-support dashboard**, not a simple student project page.

---

## Product Vision
Create a web application where a user (farmer, researcher, or agriculture planner) can:

- create and manage farm profiles
- enter or upload crop, soil, and weather conditions
- simulate irrigation scheduling
- model field condition changes as **state transitions**
- receive irrigation recommendations
- view analytics and efficiency improvements
- explore datasets used in the project
- generate reports and insights

The application should feel like a polished **AgriTech SaaS dashboard**.

---

## Tech Stack Requirements

### Frontend
Use:
- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Recharts** for charts
- **Lucide Icons**
- **shadcn/ui components**

### Backend
Use:
- **Next.js full-stack architecture**
- API routes or server actions for backend logic

### Database
Use:
- **PostgreSQL**
- **Prisma ORM**

### Authentication
Include:
- simple authentication (email + password)
- login and signup pages
- authenticated dashboard access

### Data Handling
Support:
- CSV upload
- JSON data loading
- seeded demo data
- dataset preview tables

---

## Core Functional Goal
The core purpose of this app is to implement a **state-transition irrigation scheduling system**.

The app must simulate agricultural field conditions as **discrete system states**, then recommend whether irrigation is required and how much water should be applied.

---

## Core State-Transition Model

### State Inputs
The simulation should consider these parameters:

- crop type
- crop growth stage
- soil type
- soil moisture percentage
- field area
- temperature
- humidity
- rainfall
- evapotranspiration
- irrigation method
- rain forecast (yes/no)

### Example State Variables
Represent system states using combinations such as:

- Soil Moisture = Low / Optimal / High
- Temperature = Low / Moderate / High
- Crop Stage = Germination / Vegetative / Flowering / Maturity
- Rain Forecast = Yes / No
- Irrigation Need = Required / Not Required

### Example Transition Logic
Examples of transition rules:

- If soil moisture is low and rainfall forecast is no → irrigation required
- If soil moisture is optimal and rainfall forecast is yes → irrigation delayed
- If crop is in flowering stage and evapotranspiration is high → increase recommended water
- If rainfall occurred and soil moisture becomes high → irrigation skipped

### Expected Output of Simulation
The simulation engine should output:

- current state
- next state
- irrigation required or not
- recommended water amount (mm or liters)
- estimated water-use efficiency score
- textual explanation for decision
- risk status (safe / warning / critical)

---

## Design and UI Style Requirements

### Visual Style
The UI must look:
- modern
- premium
- professional
- futuristic
- agriculture + data intelligence themed

### Design Direction
Use a clean dark-light hybrid aesthetic inspired by:
- SaaS dashboards
- smart farming platforms
- AI analytics products

### Suggested Color Palette
Use an elegant palette with:
- green
- teal
- blue
- white
- charcoal / dark backgrounds
- subtle gradients

### UI Feel
Should feel like:
- intelligent
- interactive
- data-driven
- polished for final-year project presentation

### Animations
Include:
- smooth page transitions
- animated cards
- animated counters
- chart loading animations
- hover effects
- section reveal animations

---

## Required Pages

---

# 1. Landing Page

## Purpose
A premium introduction to the project.

## Sections
Include:

### Hero Section
- large title
- subtitle explaining precision irrigation optimization
- CTA buttons:
  - Explore Dashboard
  - Run Simulation
  - View Datasets

### Key Highlights Section
Show cards for:
- Water-Use Efficiency
- State-Based Decision Logic
- Smart Irrigation Scheduling
- Crop-Soil-Weather Integration

### How It Works Section
Explain:
1. collect farm conditions
2. classify current field state
3. run transition logic
4. recommend irrigation action
5. show optimized output

### Features Section
Highlight:
- simulation engine
- analytics dashboard
- dataset explorer
- irrigation history
- report generation

### Research Relevance Section
Explain the academic and practical relevance of the project.

### Footer
Include:
- project title
- tech stack
- references section placeholder
- developer info placeholder

---

# 2. Authentication Pages

## Required Pages
- Login
- Signup

## Requirements
- modern card-based design
- validation
- clean forms
- password visibility toggle
- redirect to dashboard after login

---

# 3. Main Dashboard

## Purpose
This is the core user workspace.

## Layout
Include:
- responsive sidebar
- top navigation
- user profile section
- summary cards
- charts
- quick actions

## Dashboard Widgets
Include cards for:
- total simulations run
- average water-use efficiency
- farms monitored
- irrigation alerts
- average soil moisture

## Charts
Include:
- soil moisture trend chart
- water usage vs savings chart
- irrigation frequency chart
- crop distribution chart
- efficiency trend over time

---

# 4. Farm Management Page

## Purpose
Allow users to create and manage farms.

## Features
User can:
- add farm
- edit farm
- delete farm
- view farm list

## Farm Fields
Include:
- farm name
- location
- area
- crop type
- soil type
- irrigation method

Display farms as:
- cards
- table view
- searchable and filterable

---

# 5. Simulation / Irrigation Scheduler Page

## Purpose
This is the main feature page.

## Requirements
Create a professional simulation form where users can enter all agricultural parameters.

## Input Fields
Include:
- farm selection
- crop type
- crop growth stage
- soil type
- soil moisture %
- field area
- temperature
- humidity
- rainfall
- evapotranspiration
- irrigation method
- rain forecast

## Action
Include:
- Run Simulation button
- Reset button
- Load Sample Data button

## Output Panel
After simulation, show:

### Results Cards
- irrigation required or not
- recommended water amount
- current state
- next state
- efficiency score
- risk level

### Detailed Explanation
Show a natural-language explanation of why the recommendation was made.

### Visualization
Include:
- before/after moisture comparison
- water recommendation chart
- transition flow visualization
- efficiency gauge

---

# 6. State Transition Explorer Page

## Purpose
Visually explain the state-transition model.

## Requirements
Show the system as a state-machine-like interface.

## Features
Include:
- list of possible states
- state transition map
- transition rules
- interactive state cards
- state descriptions

## Example States
Examples:
- MoistureLow_TempHigh_Flowering
- MoistureOptimal_RainExpected_Vegetative
- MoistureHigh_Cool_Maturity

## Goal
This page should make the Haskell/state-modelling concept understandable and visually impressive.

---

# 7. Dataset Explorer Page

## Purpose
Display the public/open datasets used by the system.

## Supported Dataset Types
Include sections for:

### Crop Dataset
Fields like:
- crop
- growth stage
- crop coefficient
- root depth
- water requirement

### Soil Dataset
Fields like:
- soil type
- field capacity
- wilting point
- infiltration rate

### Weather Dataset
Fields like:
- date
- temperature
- humidity
- rainfall
- evapotranspiration

### Irrigation Dataset
Fields like:
- irrigation method
- water applied
- irrigation interval
- moisture thresholds

## Features
Allow:
- CSV upload
- table preview
- search
- filter
- pagination
- downloadable sample templates

---

# 8. Analytics & Reports Page

## Purpose
Show performance and optimization insights.

## Include
- water-use efficiency trend
- total water saved
- irrigation recommendations by crop
- soil moisture performance
- simulation history
- seasonal performance comparison

## Reports
Allow:
- export simulation report
- download PDF summary
- print-ready report view

---

# 9. History / Logs Page

## Purpose
Store and review past irrigation simulations.

## Requirements
Show:
- simulation date
- farm
- crop
- state
- irrigation decision
- water recommendation
- efficiency score

## Features
Allow:
- filtering
- searching
- sorting
- viewing simulation details

---

# 10. About Project Page

## Purpose
Present the academic side of the project.

## Include
- problem statement
- project objective
- motivation
- why precision irrigation matters
- why state-transition modelling is useful
- how the optimization works
- why Haskell is relevant
- future enhancements

---

## Backend Requirements

The backend should support all core app features and use structured APIs.

### Required Backend Capabilities
- authentication
- farm CRUD
- simulation engine execution
- dataset upload and parsing
- historical run storage
- dashboard analytics aggregation
- report generation support

---

## API Requirements

Create backend endpoints or server actions for the following:

### Authentication
- signup
- login
- logout
- current user session

### Farms
- create farm
- get all farms
- get single farm
- update farm
- delete farm

### Simulation
- run irrigation simulation
- save simulation result
- get simulation history
- get simulation by ID

### Datasets
- upload crop dataset
- upload soil dataset
- upload weather dataset
- upload irrigation dataset
- fetch dataset previews

### Analytics
- get dashboard summary
- get charts data
- get water efficiency metrics

### Reports
- generate report data
- export report

---

## Database Schema Requirements

Use Prisma and create a clean relational schema.

### Suggested Models

#### User
Fields:
- id
- name
- email
- password
- createdAt

#### Farm
Fields:
- id
- userId
- name
- location
- area
- cropType
- soilType
- irrigationMethod
- createdAt

#### Simulation
Fields:
- id
- userId
- farmId
- cropType
- cropStage
- soilType
- soilMoisture
- temperature
- humidity
- rainfall
- evapotranspiration
- rainForecast
- currentState
- nextState
- irrigationRequired
- recommendedWater
- efficiencyScore
- riskLevel
- explanation
- createdAt

#### CropDataset
Fields:
- id
- crop
- growthStage
- kcValue
- rootDepth
- waterRequirement

#### SoilDataset
Fields:
- id
- soilType
- fieldCapacity
- wiltingPoint
- infiltrationRate

#### WeatherDataset
Fields:
- id
- date
- temperature
- humidity
- rainfall
- evapotranspiration

#### IrrigationDataset
Fields:
- id
- irrigationMethod
- waterApplied
- irrigationInterval
- moistureThreshold

---

## Simulation Logic Requirements

Implement a deterministic rule-based state engine for the first version.

### Logic Expectations
The app should classify input into discrete state categories and then generate decisions based on rule evaluation.

### Example Rule Logic
Use practical rules like:

- low soil moisture + no rainfall forecast = irrigation required
- low soil moisture + high evapotranspiration = higher recommended water
- high soil moisture + rainfall forecast = no irrigation
- flowering stage crops should have stricter moisture thresholds
- sandy soil loses water faster than clay soil
- drip irrigation should have higher efficiency than flood irrigation

### Efficiency Score
Generate a simple calculated efficiency score based on:
- moisture status
- crop stage suitability
- water recommendation accuracy
- irrigation method efficiency

### Risk Level
Classify output as:
- Safe
- Warning
- Critical

---

## Data Seeding Requirements

Seed the app with realistic demo data so the project works immediately after setup.

### Include Demo Data For
- farms
- users
- crops
- soils
- weather records
- irrigation records
- sample simulation history

### Demo Crop Types
Include at least:
- Rice
- Wheat
- Maize
- Cotton
- Tomato
- Sugarcane

### Demo Soil Types
Include:
- Sandy
- Loamy
- Clay
- Silt

### Demo Irrigation Methods
Include:
- Drip
- Sprinkler
- Surface
- Flood

---

## Dataset Integration Requirements

Use public/open-style agriculture datasets as seeded or sample data inspiration.

### Dataset Themes
Simulate datasets inspired by:
- FAO irrigation data
- crop water requirement tables
- soil moisture threshold references
- evapotranspiration-based irrigation indicators

### Important
The app should work **even without external APIs** by using seeded local datasets and uploaded CSVs.

---

## Haskell / State Modelling Representation

This project is inspired by **state modelling in Haskell**.

The generated app does not need to run a real Haskell backend unless desired, but it should be architected in a way that clearly reflects:

- state definitions
- transition logic
- deterministic functional decision rules
- rule-based state evolution

If helpful, structure the simulation logic in a clean functional style so it can later be replaced with an actual Haskell engine.

---

## UX Expectations

The app must be:

- responsive
- mobile-friendly
- polished
- fast
- cleanly structured
- easy to demo during academic presentation

### Important UX Features
Include:
- loading states
- success/error toasts
- empty states
- modern forms
- smooth transitions
- consistent spacing
- accessible UI

---

## File / Folder Quality Expectations

Generate a clean, production-style codebase with:

- reusable components
- modular structure
- clear separation of concerns
- scalable folder organization
- maintainable TypeScript types
- clean API handling
- environment variable support

---

## Deliverable Expectations

Generate a complete full-stack application with:

- polished frontend
- working backend
- database schema
- seeded demo data
- interactive dashboard
- simulation engine
- dataset explorer
- analytics page
- authentication
- clean responsive UI

The final output should be presentation-ready and feel like a deployable intelligent agriculture platform.

---

## Final Build Goal
This should feel like a **professional AgriTech platform for precision irrigation optimization**, built around a **state-transition computational model** and designed for both **academic presentation** and **real-world software showcase**.