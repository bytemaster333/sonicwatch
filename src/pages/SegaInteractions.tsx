import { useState } from "react";
import axios from "axios";

type SegaTx = {
  txHash: string;
  date: string;
  type: "swap" | "add-liquidity" | "remove-liquidity";
  tokenPair: string;
  amount: string;
};

function SegaInteractions() {
  const [address, setAddress] = useState("");
  const [segaTxs, setSegaTxs] = useState<SegaTx[]>([]);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    try {
      const res = await axios.get<SegaTx[]>(
        `http://localhost:5000/api/sega/${address || "demo"}`
      );
      setSegaTxs(res.data);
      setError("");
    } catch (err) {
      console.error("SEGA fetch error:", err);
      setError("Failed to fetch SEGA interactions.");
      setSegaTxs([]);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "swap": return "bg-indigo-500/20 text-indigo-300";
      case "add-liquidity": return "bg-green-500/20 text-green-300";
      case "remove-liquidity": return "bg-red-500/20 text-red-300";
      default: return "bg-zinc-700 text-white";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-4">🌀 SEGA Interactions</h2>

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
          Fetch SEGA Data
        </button>
      </div>

      {error && <p className="text-red-600 font-medium">{error}</p>}

      <div className="overflow-x-auto mt-6">
        <table className="w-full border border-zinc-700 rounded-xl overflow-hidden text-sm text-left">
          <thead className="bg-zinc-800 text-zinc-300">
            <tr>
              <th className="px-4 py-2">Tx Hash</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Token Pair</th>
              <th className="px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {segaTxs.map((tx, i) => (
              <tr key={i} className="border-t border-zinc-700 hover:bg-zinc-800 transition">
                <td className="px-4 py-2 font-mono text-cyan-400">{tx.txHash}</td>
                <td className="px-4 py-2 text-textPrimary">{tx.date}</td>
                <td className="px-4 py-2">
                  <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${getTypeColor(tx.type)}`}>
                    {tx.type.replace("-", " ")}
                  </span>
                </td>
                <td className="px-4 py-2 text-textPrimary">{tx.tokenPair}</td>
                <td className="px-4 py-2 text-textPrimary">{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Placeholder for Future Chart */}
      <div className="mt-10 bg-card rounded-xl p-6 border border-zinc-700">
        <p className="text-textSecondary mb-2">📊 DEX Activity Graph (Coming Soon)</p>
        <div className="w-full h-40 bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-500">
          [Chart Placeholder]
        </div>
      </div>
    </div>
  );
}

export default SegaInteractions;
