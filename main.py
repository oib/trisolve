from fastapi import FastAPI, Form
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
import random

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

user_state = {}

@app.get("/")
def index():
    return FileResponse("static/index.html")

@app.get("/api/challenge")
def challenge(username: str):
    a1, b1 = random.randint(1,10), random.randint(1,10)
    a2, b2 = random.randint(1,10), random.randint(1,10)
    result = a1 * b1 + a2 * b2
    user_state[username] = {"sum": result}
    return {"task1": f"{a1} × {b1}", "task2": f"{a2} × {b2}"}

@app.post("/api/submit")
def submit(username: str = Form(...), answer: str = Form(...)):
    try:
        parsed = int(answer)
    except ValueError:
        return JSONResponse(content={"result": "error", "message": "Answer must be a number"}, status_code=400)

    user = user_state.get(username)
    if not user or "sum" not in user:
        return JSONResponse(content={"result": "error", "message": "No challenge found"}, status_code=400)

    expected = user["sum"]
    correct = parsed == expected

    return JSONResponse(content={
        "result": "correct" if correct else "wrong",
        "correct": expected
    })

