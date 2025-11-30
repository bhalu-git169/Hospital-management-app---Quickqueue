# ⚡ QuickQueue – Smart Hospital Token System
QuickQueue is a web app that turns crowded hospital waiting lines into a smooth, token‑based experience. Patients generate digital tokens, admins manage queues in real time, and display screens show live progress – all from the browser.

Built in under 48 hours for Hackarena 2.0 by a 2‑member team.

## 🚀 Live Demo
Frontend (React, GitHub Pages): [click here](https://bhalu-git169.github.io/Hospital-management-app---Quickqueue/)
### Backend (Flask, Render)
Base URL: [https://hospital-management-app-quickqueue.onrender.com/api/departments](https://hospital-management-app-quickqueue.onrender.com/api/departments)

Try it out:

* Open the frontend link

* Choose a department

* Generate a token and watch the queue update live

👥 Team
Team name: **Prometheus**

Hackathon: Hackarena 2.0

Members: 2


### ✨ What QuickQueue Does
🧾 Digital tokens for patients
* Patients choose a department, enter their details, and get a unique token.

### 📺 Live queue display
* A dedicated screen mode to show “Now Serving” and upcoming tokens.

### 🛠 Admin dashboard

* Call next token

* Reset department queues

* View all tokens with status (waiting / serving / done)

### 🔔 Realtime updates
Powered by WebSockets so patient view, display view, and admin view stay in sync.

### 🧱 Tech Stack
Frontend: React, React Router, Axios, React Icons, CSS

Backend: Python, Flask, Flask‑CORS, Flask‑SocketIO

### Deployment:

> Frontend → GitHub Pages

> Backend → Render (Python Web Service)

* Data: In‑memory (no external DB, perfect for fast hackathon demos)

* Focused on solving long hospital queues with a lightweight, easily deployable web solution.

* Designed for quick demos: no external database, all data stored in memory on the backend.

### 🔧 Local Setup
1. Clone the repo
   ```
   git clone https://github.com/bhalu-git169/Hospital-management-app---Quickqueue.git
   cd Hospital-management-app---Quickqueue
   ```

2. Backend – Flask (Python)
   ```
   cd backend

   # (optional but recommended) create virtual env
   python -m venv venv
   venv\Scripts\activate  # Windows

   # install backend libraries
   pip install -r requirements.txt

   # run backend
   python app.py
   ```

Backend will run on: http://localhost:5000

3. Frontend – React
Open a new terminal:
   ```
   cd frontend

   # install frontend libraries
   npm install

   # run dev server
   npm start
   ```


Frontend will run on: http://localhost:3000

In development, the frontend is configured to hit the local backend (http://localhost:5000/api) via Axios.

### 🌐 Production URLs
Frontend (production):
https://bhalu-git169.github.io/Hospital-management-app---Quickqueue/

Backend (production base URL):
https://hospital-management-app-quickqueue.onrender.com/api

### 🧪 Key API Endpoints
* All endpoints are under the base URL above.

* GET /departments
List all departments and their current/serving tokens.

* POST /token/generate
>Body: { "name": string, "department": string, "phone": string? }
* Returns token number, current serving, and position in queue.

> GET /tokens/<department>
> Fetch all tokens for a department.

>POST /admin/next
>Body: { "department": string }
* Advances to the next token.

> POST /admin/reset/<department>
* Reset a department’s queue and related tokens.


## 🏁 Hackarena 2.0 Notes
* Built specifically for Hackarena 2.0

### Optimized for:

* Fast setup (no DB)

* Easy demo for judges (single frontend URL + backend URL)

* Shows how a small team can turn a real‑world hospital problem into a working web solution in a short time.
