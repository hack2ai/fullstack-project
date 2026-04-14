# 🎓 Fullstack Student Registration App

> **Node.js + Express** frontend → **Flask** backend, fully containerized with Docker Compose.

---

## 📁 Project Structure

```
fullstack-project/
├── frontend/               # Node.js + Express
│   ├── public/
│   │   └── style.css
│   ├── views/
│   │   ├── index.ejs       # Registration form
│   │   └── submissions.ejs # Submissions table
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── backend/                # Flask Python
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yaml
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Option 1 — Docker Compose (recommended)

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd fullstack-project

# Build and start both services
docker-compose up --build

# App is now running:
#   Frontend → http://localhost:3000
#   Backend  → http://localhost:5000
```

### Option 2 — Run Locally

**Backend (Flask):**
```bash
cd backend
pip install -r requirements.txt
python app.py
# Running on http://localhost:5000
```

**Frontend (Node.js):**
```bash
cd frontend
npm install
FLASK_BACKEND_URL=http://localhost:5000 node server.js
# Running on http://localhost:3000
```

---

## 🐳 Docker Hub

Build and push images:

```bash
# Backend
docker build -t yourusername/flask-backend:latest ./backend
docker push yourusername/flask-backend:latest

# Frontend
docker build -t yourusername/node-frontend:latest ./frontend
docker push yourusername/node-frontend:latest
```

---

## 🔌 API Endpoints (Flask)

| Method | Endpoint       | Description              |
|--------|---------------|--------------------------|
| GET    | /health        | Health check             |
| POST   | /submit        | Submit registration form |
| GET    | /submissions   | List all submissions     |

### POST /submit — Request Body
```json
{
  "name": "Jane Doe",
  "email": "jane@university.edu",
  "course": "btech-cs",
  "year": "2",
  "message": "Looking forward to the semester!"
}
```

---

## 🛠️ Tech Stack

| Layer     | Technology         |
|-----------|--------------------|
| Frontend  | Node.js, Express, EJS |
| Backend   | Python, Flask, flask-cors |
| Container | Docker, Docker Compose |

---

## 📸 Screenshots

> Add terminal screenshots here after running the app.
