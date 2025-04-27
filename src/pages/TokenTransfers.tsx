import { useState } from "react";
import axios from "axios";

type Transfer = {
  txHash: string;
  date: number;  // timestamp geliyor
  token: string;
  amount: string;
  direction: "incoming" | "outgoing";
};

function TokenTransfers() {
  const [address, setAddress] = useState("");
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    try {
      const safeAddress = encodeURIComponent(address.trim() || "demo");
      const response = await axios.get<Transfer[]>(
        `http://localhost:5050/api/transfers/${safeAddress}`
      );
      setTransfers(response.data);
      setError("");
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to fetch transfer data.");
      setTransfers([]);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-4">💸 Token Transfers</h2>

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
          Fetch Transfers
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
              <th className="p-3">Token</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Direction</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((transfer, idx) => (
              <tr key={idx} className="border-t border-zinc-700">
                <td className="p-3 font-mono text-indigo-400">{transfer.txHash.slice(0, 8)}...</td>
                <td className="p-3">{formatDate(transfer.date)}</td>
                <td className="p-3">{transfer.token}</td>
                <td className="p-3">{transfer.amount}</td>
                <td className="p-3 capitalize">{transfer.direction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TokenTransfers;
