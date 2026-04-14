from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from the Node.js frontend

submissions = []  # In-memory store for demo purposes

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "message": "Flask backend is running"}), 200

@app.route('/submit', methods=['POST'])
def submit_form():
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "error": "No JSON data received"}), 400

    # Validate required fields
    required_fields = ['name', 'email', 'course', 'year', 'message']
    missing = [f for f in required_fields if not data.get(f)]
    if missing:
        return jsonify({
            "success": False,
            "error": f"Missing required fields: {', '.join(missing)}"
        }), 422

    # Process the data
    submission = {
        "id": len(submissions) + 1,
        "name": data['name'].strip(),
        "email": data['email'].strip().lower(),
        "course": data['course'],
        "year": data['year'],
        "message": data['message'].strip(),
        "timestamp": __import__('datetime').datetime.utcnow().isoformat() + "Z"
    }

    submissions.append(submission)

    return jsonify({
        "success": True,
        "message": f"Thank you, {submission['name']}! Your registration has been received.",
        "data": submission
    }), 200

@app.route('/submissions', methods=['GET'])
def get_submissions():
    return jsonify({
        "count": len(submissions),
        "submissions": submissions
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
