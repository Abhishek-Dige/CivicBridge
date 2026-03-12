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
🧭 Team Git Workflow (Step-by-Step)
1️⃣ Clone the Repository (First Time Only)

Each teammate does this once.

git clone https://github.com/your-team/civicbridge.git
cd civicbridge

Now the project exists on their computer.

2️⃣ Always Pull Latest Code Before Starting Work

Before doing any work, sync with the latest main.

git checkout main
git pull origin main

This ensures you are working on the latest version of the project.

## 🚀 Project Setup (For Contributors)

Follow these steps to run the project locally.

### 1️⃣ Clone the Repository

```bash
git clone <repo-url>
cd civicbridge
```

---

### 2️⃣ Setup Frontend

Navigate to the frontend folder and install dependencies.

```bash
cd frontend
npm install
```

Run the development server:

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

### 3️⃣ Setup Backend

Open a new terminal and navigate to the backend folder.

```bash
cd backend
npm install
```

---

### 4️⃣ Create Environment Variables

Inside the **backend folder**, create a `.env` file.

Example:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=5000
```

Ask the team lead for the Supabase credentials.

---

### 5️⃣ Start Backend Server

Run the backend:

```bash
npm run dev
```

Backend will run at:

```
http://localhost:5000
```

---

### 6️⃣ Running the Full Project(not required if you are only working on frontend)

You should now have **two terminals running**:

Terminal 1 (frontend)

```bash
cd frontend
npm run dev
```

Terminal 2 (backend)

```bash
cd backend
npm run dev
```

---

### ⚠️ Important Notes

* Do **not commit `.env` files**
* Always pull latest changes before starting work

```bash
git pull origin main
```

* Work on **feature branches**, not directly on `main`


3️⃣ Create a Feature Branch

Never work on main.

Create a branch for your task.

Example:

git checkout -b feature/navbar

Other examples:

feature/scheme-navigator
feature/report-issue
feature/map-system
feature/backend-api

Now you are working safely in your own branch.

4️⃣ Work on Your Feature

Edit files normally.

Example:

src/components/Navbar.jsx
5️⃣ Stage and Commit Changes

When you complete a logical piece of work:

git add .
git commit -m "Add navbar component"

Good commit messages:

Add scheme navigator form
Implement issue reporting API
Fix navbar routing

Avoid:

update
stuff
changes
6️⃣ Push Your Feature Branch

Upload your branch to GitHub.

git push origin feature/navbar

Now the branch appears on GitHub.

7️⃣ Create a Pull Request (PR)

Go to the repository on GitHub.

You will see:

Compare & Pull Request

Create PR:

feature/navbar → main

This means:

“Please merge my feature into the main branch.”

8️⃣ Review and Merge

Someone checks the code.

If everything is fine:

Click Merge Pull Request.

Now the main branch updates.

9️⃣ Everyone Syncs After Merge

After a PR merges, everyone should update their local repo.

git checkout main
git pull origin main

Now everyone has the updated code.

🔁 Daily Workflow (Short Version)

Every day your team follows this:

git checkout main
git pull origin main
git checkout -b feature/your-feature

Work → commit → push → PR.

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

