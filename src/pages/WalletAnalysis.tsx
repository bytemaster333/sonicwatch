import { useState } from "react";
import axios from "axios";

type WalletSummary = {
  totalTxs: number;
  tokenCount: number;
  firstSeen: string;
  lastActivity: string;
};

function WalletAnalysis() {
  const [address, setAddress] = useState("");
  const [walletData, setWalletData] = useState<WalletSummary | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    try {
      const response = await axios.get<WalletSummary>(
        `http://localhost:5000/api/wallet-summary/${address || "demo"}`
      );
      setWalletData(response.data);
      setError("");
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to fetch wallet data.");
      setWalletData(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-4">🔎 Wallet Analysis</h2>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Enter Sonic wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 bg-inputBg text-white placeholder-zinc-500 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon"
        />
        <button
          onClick={handleAnalyze}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Analyze
        </button>
      </div>

      {error && (
        <p className="text-red-600 font-medium">{error}</p>
      )}

      {walletData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="bg-card p-6 rounded-xl border border-zinc-700 shadow hover:shadow-neon transition">
            <h3 className="text-gray-500 text-sm">Total Transactions</h3>
            <p className="text-2xl font-bold text-indigo-600">{walletData.totalTxs}</p>
          </div>
          <div className="bg-card p-6 rounded-xl border border-zinc-700 shadow hover:shadow-neon transition">
            <h3 className="text-gray-500 text-sm">Token Types Held</h3>
            <p className="text-2xl font-bold text-indigo-600">{walletData.tokenCount}</p>
          </div>
          <div className="bg-card p-6 rounded-xl border border-zinc-700 shadow hover:shadow-neon transition">
            <h3 className="text-gray-500 text-sm">First Seen</h3>
            <p className="text-xl font-semibold">{walletData.firstSeen}</p>
          </div>
          <div className="bg-card p-6 rounded-xl border border-zinc-700 shadow hover:shadow-neon transition">
            <h3 className="text-gray-500 text-sm">Last Activity</h3>
            <p className="text-xl font-semibold">{walletData.lastActivity}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WalletAnalysis;
