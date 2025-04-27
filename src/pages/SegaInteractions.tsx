import { useState } from "react";
import axios from "axios";

type SegaTx = {
  txHash: string;
  date: number;  // timestamp
  action: string; // swap, add-liquidity, remove-liquidity
};

function SegaInteractions() {
  const [address, setAddress] = useState("");
  const [segaTxs, setSegaTxs] = useState<SegaTx[]>([]);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    try {
      const safeAddress = encodeURIComponent(address.trim() || "demo");
      const response = await axios.get<SegaTx[]>(
        `http://localhost:5050/api/sega/${safeAddress}`
      );
      setSegaTxs(response.data);
      setError("");
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to fetch SEGA interactions.");
      setSegaTxs([]);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-4">🌀 SEGA Interactions</h2>

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
          Fetch SEGA Activity
        </button>
      </div>

      {error && (
        <p className="text-red-600 font-medium">{error}</p>
      )}

      <div className="overflow-x-auto mt-6">
        <table className="w-full bg-card text-white rounded-xl">
          <thead>
            <tr className="text-gray-400 text-left">
              <th className="p-3">Tx Hash</th>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {segaTxs.map((tx, idx) => (
              <tr key={idx} className="border-t border-zinc-700">
                <td className="p-3 font-mono text-indigo-400">{tx.txHash.slice(0, 8)}...</td>
                <td className="p-3">{formatDate(tx.date)}</td>
                <td className="p-3 capitalize">{tx.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SegaInteractions;
