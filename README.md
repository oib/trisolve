# TriSolve 🧠

A simple and fun math game for kids that helps practice multiplication skills!

## 🎮 How to Play

1. You'll see two multiplication problems (e.g., "3 × 4 and 5 × 6")
2. Solve both problems and add the results together
3. Enter your answer and submit
4. Get points for correct answers and beat your high score!

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd trisolve
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the game:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

5. Open your browser and go to `http://localhost:8000`

## 🛠️ Systemd Service

To run TriSolve as a service, create `/etc/systemd/system/trisolve.service`:

```ini
[Unit]
Description=TriSolve Math Game
After=network.target

[Service]
Type=simple
User=<your-username>
WorkingDirectory=<path-to-trisolve>
Environment=PATH=<path-to-trisolve>/venv/bin
ExecStart=<path-to-trisolve>/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl enable trisolve
sudo systemctl start trisolve
```

## 📁 Project Structure

```
trisolve/
├── main.py              # FastAPI backend
├── requirements.txt     # Python dependencies
├── static/
│   ├── index.html      # Main game page
│   ├── app.js          # Game logic
│   └── style.css       # Styling with dark theme
├── docs/
│   └── structure.md    # Detailed documentation
└── README.md           # This file
```

## 🎨 Features

- Kid-friendly interface with emojis
- Dark theme support
- Score tracking with persistent high score
- No registration required
- Responsive design
- Simple and clean UI

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have suggestions, please open an issue on GitHub.
