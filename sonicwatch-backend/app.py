from flask import Flask, jsonify
from flask_cors import CORS
import requests
import os
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

SONIC_API_URL = "https://api.mainnet-alpha.sonic.game"

# ───────────────────────────────
# HELPERS
# ───────────────────────────────

def fetch_signatures(address, limit=10):
    payload = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getSignaturesForAddress",
        "params": [address, {"limit": limit}]
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(SONIC_API_URL, json=payload, headers=headers)
    return response.json().get("result", [])

def fetch_transaction(signature):
    payload = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getTransaction",
        "params": [signature, {"encoding": "jsonParsed"}]
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(SONIC_API_URL, json=payload, headers=headers)
    return response.json().get("result", {})

# ───────────────────────────────
# ROUTES
# ───────────────────────────────
@app.route("/api/wallet-summary/<address>")
def wallet_summary(address):
    try:
        payload = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getSignaturesForAddress",
            "params": [address, {"limit": 100}]
        }
        headers = {"Content-Type": "application/json"}
        response = requests.post(SONIC_API_URL, json=payload, headers=headers)

        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch from Sonic API"}), 500

        result = response.json().get("result", [])

        if not result:
            return jsonify({
                "totalTxs": 0,
                "tokenCount": 0,
                "firstSeen": None,
                "lastActivity": None
            })

        timestamps = [tx["blockTime"] for tx in result if tx.get("blockTime")]

        return jsonify({
            "totalTxs": len(result),
            "tokenCount": 0,  # Şimdilik dummy, transfers entegre olunca güncelleyeceğiz
            "firstSeen": min(timestamps) if timestamps else None,
            "lastActivity": max(timestamps) if timestamps else None
        })

    except Exception as e:
        print(f"Error in wallet_summary: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/api/transfers/<address>")
def wallet_transfers(address):
    try:
        signatures = fetch_signatures(address, limit=10)
        if not signatures:
            return jsonify([])

        transfers = []

        for sig in signatures:
            tx = fetch_transaction(sig["signature"])
            if not tx:
                continue

            tx_time = tx.get("blockTime", None)
            tx_meta = tx.get("meta", {})
            tx_instructions = tx.get("transaction", {}).get("message", {}).get("instructions", [])

            for instr in tx_instructions:
                if instr.get("program") == "spl-token" and "parsed" in instr:
                    parsed = instr["parsed"]
                    info = parsed.get("info", {})
                    transfer_type = parsed.get("type", "")

                    if transfer_type == "transfer":
                        transfers.append({
                            "txHash": sig["signature"],
                            "date": tx_time,
                            "token": info.get("mint", "Unknown Token"),
                            "amount": info.get("amount", "0"),
                            "direction": "outgoing" if info.get("source") == address else "incoming"
                        })

        return jsonify(transfers)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500
    
@app.route("/api/sega/<address>")
def sega_activity(address):
    try:
        signatures = fetch_signatures(address, limit=10)
        if not signatures:
            return jsonify([])

        sega_interactions = []
        SEGA_PROGRAM_ID = "SegazTQwbYWknDZkJ6j2Kgvm5gw3MrHGKtWstZdoNKZ"

        for sig in signatures:
            tx = fetch_transaction(sig["signature"])
            if not tx:
                continue

            tx_time = tx.get("blockTime", None)
            tx_meta = tx.get("meta", {})
            tx_instructions = tx.get("transaction", {}).get("message", {}).get("instructions", [])
            inner_instructions = tx_meta.get("innerInstructions", [])

            # Normal instructions içinde kontrol et
            for instr in tx_instructions:
                if instr.get("programId") == SEGA_PROGRAM_ID:
                    parsed = instr.get("parsed", {})
                    action = parsed.get("type", "unknown")

                    sega_interactions.append({
                        "txHash": sig["signature"],
                        "date": tx_time,
                        "action": action
                    })

            # Inner instructions içinde de kontrol et
            for inner in inner_instructions:
                for instr in inner.get("instructions", []):
                    if instr.get("programId") == SEGA_PROGRAM_ID:
                        parsed = instr.get("parsed", {})
                        action = parsed.get("type", "unknown")

                        sega_interactions.append({
                            "txHash": sig["signature"],
                            "date": tx_time,
                            "action": action
                        })

        return jsonify(sega_interactions)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/api/alerts/<address>")
def alert_list(address):
    try:
        signatures = fetch_signatures(address, limit=10)
        if not signatures:
            return jsonify([])

        alerts = []

        for sig in signatures:
            tx = fetch_transaction(sig["signature"])
            if not tx:
                continue

            tx_time = tx.get("blockTime", None)
            tx_meta = tx.get("meta", {})
            tx_instructions = tx.get("transaction", {}).get("message", {}).get("instructions", [])

            # 1. Büyük Transfer Anomaly (simplified)
            for instr in tx_instructions:
                if instr.get("program") == "spl-token" and "parsed" in instr:
                    parsed = instr["parsed"]
                    info = parsed.get("info", {})
                    transfer_type = parsed.get("type", "")

                    if transfer_type == "transfer":
                        amount = int(info.get("amount", "0"))
                        if amount > 10000:  # Threshold değeri
                            alerts.append({
                                "date": tx_time,
                                "type": "Large Transfer",
                                "severity": "high",
                                "description": f"Detected a large token transfer of {amount} units."
                            })

            # 2. İşlem Hatası Anomaly
            if tx_meta.get("err"):
                alerts.append({
                    "date": tx_time,
                    "type": "Failed Transaction",
                    "severity": "medium",
                    "description": "A transaction failed for this wallet."
                })

        return jsonify(alerts)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
