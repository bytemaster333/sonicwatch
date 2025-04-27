import { useState } from "react";
import axios from "axios";

type Alert = {
  date: number;
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
      const safeAddress = encodeURIComponent(address.trim() || "demo");
      const response = await axios.get<Alert[]>(
        `http://localhost:5050/api/alerts/${safeAddress}`
      );
      setAlerts(response.data);
      setError("");
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to fetch alerts.");
      setAlerts([]);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-4">⚠️ Alerts & Anomaly Detection</h2>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Enter Sonic wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 bg-inputBg text-white placeholder-zinc-500 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon"
        />
        <button
          onClick={handleFetch}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Fetch Alerts
        </button>
      </div>

      {error && (
        <p className="text-red-600 font-medium">{error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {alerts.map((alert, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl shadow-lg ${getSeverityColor(alert.severity)} transition`}
          >
            <h3 className="text-lg font-semibold">{alert.type}</h3>
            <p className="text-sm">{alert.description}</p>
            <p className="text-xs text-gray-600 mt-2">Date: {formatDate(alert.date)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;
