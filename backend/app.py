from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

# ---------- In-memory data ----------

departments = {
    "ENT": {"current_token": 0, "serving_token": 0},
    "General": {"current_token": 0, "serving_token": 0},
    "Cardiology": {"current_token": 0, "serving_token": 0},
}

tokens = []  # {id, token_number, patient_name, phone, department, status}


def broadcast_queue_update(dept_name: str) -> None:
    data = {
        "department": dept_name,
        "serving": departments[dept_name]["serving_token"],
        "current": departments[dept_name]["current_token"],
    }
    socketio.emit("queue_update", data)


# ---------- REST API ----------

@app.route("/api/departments", methods=["GET"])
def get_departments():
    result = []
    for name, info in departments.items():
        result.append(
            {
                "id": name,
                "name": name,
                "current_token": info["current_token"],
                "serving_token": info["serving_token"],
            }
        )
    return jsonify(result)


@app.route("/api/token/generate", methods=["POST"])
def generate_token():
    data = request.json or {}
    name = (data.get("name") or "").strip()
    dept_name = data.get("department")
    phone = data.get("phone") or ""

    if not name or dept_name not in departments:
        return jsonify({"error": "Invalid name or department"}), 400

    dept = departments[dept_name]
    dept["current_token"] += 1
    token_number = dept["current_token"]

    token_entry = {
        "id": len(tokens) + 1,
        "token_number": token_number,
        "patient_name": name,
        "phone": phone,
        "department": dept_name,
        "status": "waiting",
    }
    tokens.append(token_entry)

    serving = dept["serving_token"]
    position = max(0, token_number - serving)

    payload = {
        "token": token_number,
        "serving": serving,
        "position": position,
        "department": dept_name,
    }

    socketio.emit(
        "token_generated",
        {"department": dept_name, "token": token_number},
    )
    broadcast_queue_update(dept_name)

    return jsonify(payload), 201


@app.route("/api/admin/next", methods=["POST"])
def admin_next():
    data = request.json or {}
    dept_name = data.get("department")
    if dept_name not in departments:
        return jsonify({"error": "Unknown department"}), 400

    dept = departments[dept_name]

    if dept["serving_token"] < dept["current_token"]:
        dept["serving_token"] += 1

        for t in tokens:
            if t["department"] == dept_name:
                if t["token_number"] == dept["serving_token"]:
                    t["status"] = "serving"
                elif t["token_number"] < dept["serving_token"]:
                    t["status"] = "done"

    broadcast_queue_update(dept_name)
    return jsonify({"serving": dept["serving_token"]})


@app.route("/api/admin/reset/<dept_name>", methods=["POST"])
def admin_reset(dept_name):
    if dept_name not in departments:
        return jsonify({"error": "Unknown department"}), 400

    departments[dept_name]["current_token"] = 0
    departments[dept_name]["serving_token"] = 0

    global tokens
    tokens = [t for t in tokens if t["department"] != dept_name]

    broadcast_queue_update(dept_name)
    return jsonify({"message": f"Queue reset for {dept_name}"})


@app.route("/api/tokens/<dept_name>", methods=["GET"])
def list_tokens(dept_name):
    dept_tokens = [t for t in tokens if t["department"] == dept_name]
    return jsonify(dept_tokens)


# ---------- Socket.IO events ----------

@socketio.on("connect")
def handle_connect():
    print("Client connected")


@socketio.on("disconnect")
def handle_disconnect():
    print("Client disconnected")


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)

