# TriSolve Game Structure

## Overview
TriSolve is a simple, kid-friendly math game that challenges players to solve multiplication problems. The game presents two multiplication tasks, and players must calculate the sum of both results.

## Architecture

### Backend (FastAPI)
- **File**: `main.py`
- **Framework**: FastAPI with Python
- **Endpoints**:
  - `GET /` - Serves the main HTML page
  - `GET /api/challenge` - Generates two random multiplication problems
  - `POST /api/submit` - Validates the user's answer

### Frontend
- **HTML**: `static/index.html` - Main game interface
- **JavaScript**: `static/app.js` - Game logic and API interactions
- **CSS**: `static/style.css` - Styling (with dark theme support)

### Game Logic
1. Player receives two multiplication problems (e.g., "3 × 4 and 5 × 6")
2. Player must calculate both and enter the sum (e.g., 12 + 30 = 42)
3. Score increases for correct answers
4. High score is saved in browser's localStorage

### Features
- Kid-friendly interface with emoji feedback
- Score tracking with persistent high score
- Dark theme support
- Simple, responsive design
- No user authentication required (uses guest session)

### Dependencies
- fastapi - Web framework
- uvicorn - ASGI server

### Deployment
- Can be run with: `uvicorn main:app --host 0.0.0.0 --port 8000`
- Systemd service: `trisolve.service` (manual setup required)
