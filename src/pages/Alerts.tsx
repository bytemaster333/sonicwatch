import { useState } from "react";
import axios from "axios";

type Alert = {
  date: string;
  type: string;
  severity: "low" | "medium" | "high";
  description: string;
};

function Alerts() {
  const [address, setAddress] = useState("");
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    try {
      const res = await axios.get<Alert[]>(
        `http://localhost:5000/api/alerts/${address || "demo"}`
      );
      setAlerts(res.data);
      setError("");
    } catch (err) {
      console.error("Alert fetch error:", err);
      setError("Failed to fetch alerts.");
      setAlerts([]);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-600/20 text-red-400";
      case "medium": return "bg-yellow-400/10 text-yellow-300";
      case "low": return "bg-blue-600/20 text-blue-300";
      default: return "bg-zinc-700 text-white";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-4">⚠️ Alerts & Anomaly Detection</h2>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Enter wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="px-4 py-2 w-full max-w-md bg-inputBg text-white placeholder-zinc-500 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-neon"
        />
        <button
          onClick={handleFetch}
          className="bg-accent text-white px-6 py-2 rounded-xl shadow hover:bg-cyan-500 transition"
        >
          Fetch Alerts
        </button>
      </div>

      {error && <p className="text-red-500 font-medium">{error}</p>}

      <div className="mt-6 space-y-4">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className="bg-card border border-zinc-700 rounded-xl p-5 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center hover:border-neon transition"
          >
            <div>
              <h3 className="text-xl font-semibold text-accent mb-1">{alert.type}</h3>
              <p className="text-textSecondary text-sm">{alert.description}</p>
              <p className="text-xs text-zinc-500 mt-1">Date: {alert.date}</p>
            </div>
            <span
              className={`mt-3 sm:mt-0 px-3 py-1 rounded-xl text-xs font-bold ${getSeverityColor(alert.severity)}`}
            >
              {alert.severity.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;
