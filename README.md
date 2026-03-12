# CivicBridge 🚀

**Open Platform for Discovering Public Schemes and Reporting Civic Issues**

CivicBridge is a civic-tech platform that helps citizens:

* Discover **government schemes they are eligible for**
* **Report civic issues** like potholes, garbage dumps, and broken infrastructure
* View issues **transparently on a public map**

The goal is to improve **awareness, transparency, and community participation**.

---

# 🏗 Project Architecture

Frontend

* React
* Vite
* Tailwind CSS

Backend

* Node.js
* Express.js

Database & Auth

* Supabase

Maps

* Leaflet

AI (Optional)

* OpenAI API or
* Google Gemini

---
```
## Project Structure
civicbridge/
│
├── README.md
├── .env
├── .gitignore
│
├── frontend/
│   ├── public/
│   │   └── logo.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── icons/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── SchemeCard.jsx
│   │   │   ├── IssueCard.jsx
│   │   │   └── MapComponent.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── SchemeNavigator.jsx
│   │   │   ├── ReportIssue.jsx
│   │   │   ├── IssueMap.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── schemeService.js
│   │   │   └── issueService.js
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   │
│   │   ├── utils/
│   │   │   ├── filterSchemes.js
│   │   │   └── constants.js
│   │   │
│   │   ├── styles/
│   │   │   └── global.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
│
├── backend/
│   ├── src/
│   │
│   │   ├── controllers/
│   │   │   ├── schemeController.js
│   │   │   └── issueController.js
│   │   │
│   │   ├── routes/
│   │   │   ├── schemeRoutes.js
│   │   │   └── issueRoutes.js
│   │   │
│   │   ├── services/
│   │   │   ├── schemeService.js
│   │   │   └── issueService.js
│   │   │
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── config/
│   │   │   └── supabaseClient.js
│   │   │
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   │
│   │   └── server.js
│   │
│   └── package.json
│
│
├── database/
│   ├── schema.sql
│   └── seedData.json
│
│
├── docs/
│   ├── architecture.md
│   └── api.md
│
│
└── scripts/
    └── seedDatabase.js
```
# 📦 Core Features

## 1️⃣ Scheme Navigator

Users enter basic details:

* Age
* Income
* State
* Education
* Occupation
* Category

System filters and recommends **eligible government schemes**.

Output shows:

* Scheme name
* Description
* Eligibility criteria
* Benefits
* Application link

---

## 2️⃣ Civic Issue Reporter

Citizens can report local issues.

Fields:

* Photo upload
* Issue type
* Description
* Location

Issues appear on a **public map** for transparency.

Issue Types:

* Pothole
* Garbage
* Water leakage
* Broken streetlight
* Road damage

---

## 3️⃣ Public Issue Map

Interactive map showing reported issues.

Features:

* Map markers
* Issue popup with photo
* Issue status tracking

Statuses:

* Reported
* In Progress
* Resolved

---

# 🗂 Database Schema

## Schemes Table

```
id
name
description
income_limit
age_limit
category
state
link
```

## Issues Table

```
id
title
description
latitude
longitude
photo_url
status
created_at
```

## Users Table

```
id
name
email
role
```

---

# 🗓 20-Day Development Roadmap

---

# Phase 1 — Project Foundation (Day 1–5)

Goal: **Working project skeleton**

### Day 1

Project setup

* Create GitHub repo
* Setup React + Vite
* Install Tailwind
* Setup Supabase

### Day 2

UI structure

Pages:

* Home
* Scheme Navigator
* Report Issue
* Map
* Login

Add routing.

---

### Day 3

Database setup

Create tables:

* Users
* Schemes
* Issues

---

### Day 4

Authentication

Features:

* Signup
* Login
* Logout
* User sessions

---

### Day 5

Backend APIs

Create endpoints:

```
GET /schemes
GET /issues
POST /issues
```

Add **dummy scheme dataset**.

Result → basic working system.

---

# Phase 2 — Core Features (Day 6–10)

Goal: **Functional MVP**

### Day 6

Build **Scheme Navigator form**

Inputs:

* Age
* Income
* Education
* State
* Category

---

### Day 7

Implement **scheme filtering logic**

```
user_input → filter schemes → return eligible schemes
```

Display results as **scheme cards**.

---

### Day 8

Build **Civic Issue Reporter**

Form:

* Photo upload
* Issue type
* Description
* Location

Use browser geolocation.

---

### Day 9

Image upload system

Flow:

```
photo → upload → storage → save URL in database
```

---

### Day 10

Issue feed

Display:

* Issue photo
* Description
* Location
* Status

MVP complete.

---

# Phase 3 — Map System (Day 11–14)

Goal: **Interactive civic map**

---

### Day 11

Integrate Leaflet map.

---

### Day 12

Add **issue markers**

Each issue appears on the map.

Click marker → show issue details.

---

### Day 13

Add **issue heatmap**

Highlight areas with many complaints.

---

### Day 14

Add **issue status system**

Statuses:

* Reported
* In Progress
* Resolved

Admin can update.

---

# Phase 4 — Smart Features (Day 15–17)

Goal: **Hackathon-level innovation**

---

### Day 15

AI Scheme Assistant

User prompt:

> "I am a student from Gujarat with income 3L"

AI suggests eligible schemes.

---

### Day 16

Optional: AI Image Detection

Upload image → detect issue type.

Example:

```
photo → AI → pothole detected
```

---

### Day 17

Notifications

Send alerts via:

* Email
* Telegram
* WhatsApp

---

# Phase 5 — Final Polish (Day 18–20)

Goal: **Hackathon-ready product**

---

### Day 18

UI improvements

* Responsive design
* Animations
* Better cards
* Loading states

---

### Day 19

Testing + Demo Data

Add demo issues:

* potholes
* garbage dumps
* streetlight failures

Test full workflow.

---

### Day 20

Hackathon Demo Prep

Prepare:

**Slides**

* Problem
* Solution
* Architecture
* Demo
* Impact

**Demo Flow**

1. Find scheme using navigator
2. Report civic issue
3. View issue on map
4. Use AI assistant

---

# 🚀 Future Improvements

Possible extensions:

* Government API integration
* Issue voting system
* Civic analytics dashboard
* Mobile app
* Community moderation

---

# 🏆 Goal

Deliver a **working MVP by Day 10** and spend the remaining time **adding innovation and polish** to make CivicBridge stand out in hackathons.

---

If you want, I can also give you a **clean GitHub folder structure + task distribution for a 3–4 person team** (this makes hackathon execution much smoother).

