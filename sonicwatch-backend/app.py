from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # React ile bağlantı için CORS açılır

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

def load_json(filename):
    path = os.path.join(DATA_DIR, filename)
    with open(path, "r") as f:
        return json.load(f)

@app.route("/api/wallet-summary/<address>")
def wallet_summary(address):
    data = load_json("dummy_wallet.json")
    return jsonify(data)

@app.route("/api/transfers/<address>")
def wallet_transfers(address):
    data = load_json("dummy_transfers.json")
    return jsonify(data)

@app.route("/api/sega/<address>")
def sega_activity(address):
    data = load_json("dummy_sega.json")
    return jsonify(data)

@app.route("/api/alerts/<address>")
def alert_list(address):
    data = load_json("dummy_alerts.json")
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
