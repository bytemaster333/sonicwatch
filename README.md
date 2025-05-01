# SonicWatch
Real-Time Transparency and Analytics for the Sonic SVM Blockchain.
Monitor wallet activities, track token transfers, analyze dApp interactions, and detect anomalies — all live from the Sonic mainnet alpha.

## ✨ Features
Wallet address analysis (total transactions, first/last activity)

Incoming and outgoing token transfer tracking

SEGA DEX interaction detection (swaps, liquidity actions)

Real-time anomaly detection (large transfers, failed transactions)

Lightweight Flask API backend

Modern React.js frontend dashboard

Sonic Mainnet Alpha API live integration

## 🚀 Installation
Follow these steps to set up SonicWatch locally:

### 1. Clone the Repository
```bash
git clone https://github.com/bytemaster333/sonicwatch
cd sonicwatch
```

### 2. Setup the Backend (Flask API)
Go into the backend/ folder:
```bash
cd backend
```
Create a virtual environment and activate it:
```bash
python -m venv venv
# Linux/Mac
source venv/bin/activate
# Windows
venv\Scripts\activate
```
Install required Python packages:
```bash
pip install -r requirements.txt
```
Run the Flask server:
```bash
python app.py
```
Server will run by default on:
http://localhost:5050

### 3. Setup the Frontend (React.js App)
Go into the frontend/ folder:
```bash
cd ../frontend
```
Install the dependencies:
```bash
npm install
```
Run the development server:
```bash
npm run dev
```
Frontend will run by default on:
http://localhost:3000
## 🔐 API Access Requirements
Good news!
✅ Sonic Mainnet Alpha APIs used in SonicWatch do not require authentication tokens at this stage.

All API queries are made directly to:

https://api.mainnet-alpha.sonic.game

You can use the tool freely without any Sonic API key setup.

## 🎯 Usage
Once both backend and frontend are running:

Navigate to http://localhost:3000

Enter any Sonic wallet address into the input fields

Analyze wallet activity, token transfers, dApp interactions, and detected anomalies in real-time

## 🔭 Future Roadmap
Multi-wallet tracking

Entity profiling (whale, bot, developer detection)

ML-based anomaly detection engine

Data export options (CSV, API access)

dApp interaction mapping

## 🤝 Contribution
Contributions are welcome!
Feel free to fork the repository, open issues, or submit pull requests to suggest features or improvements.

