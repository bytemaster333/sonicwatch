import { useState } from "react";
import axios from "axios";

type Transfer = {
  txHash: string;
  date: string;
  token: string;
  amount: string;
  direction: "incoming" | "outgoing";
};

function TokenTransfers() {
  const [address, setAddress] = useState("");
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [filter, setFilter] = useState<"all" | "incoming" | "outgoing">("all");
  const [error, setError] = useState("");

  const handleFetch = async () => {
    try {
      const res = await axios.get<Transfer[]>(
        `http://localhost:5000/api/transfers/${address || "demo"}`
      );
      setTransfers(res.data);
      setError("");
    } catch (err) {
      console.error("Transfer fetch error:", err);
      setError("Failed to fetch transfer data.");
      setTransfers([]);
    }
  };

  const filteredTransfers = transfers.filter((tx) =>
    filter === "all" ? true : tx.direction === filter
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-4">💸 Token Transfers</h2>

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
        Fetch Transfers
      </button>
      </div> 

      {error && <p className="text-red-600 font-medium">{error}</p>}

      <div className="flex gap-4 mt-4">
        {["all", "incoming", "outgoing"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as "all" | "incoming" | "outgoing")}
            className={`px-4 py-1 rounded-lg text-sm border border-zinc-600 ${
              filter === f
                ? "bg-neon text-black font-bold"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            } transition`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full border border-zinc-700 rounded-xl overflow-hidden text-sm text-left">
          <thead className="bg-zinc-800 text-zinc-300">
            <tr>
              <th className="px-4 py-2">Tx Hash</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Token</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Direction</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransfers.map((tx, i) => (
              <tr
                key={i}
                className="border-t border-zinc-700 hover:bg-zinc-800 transition"
              >
                <td className="px-4 py-2 font-mono text-cyan-400">{tx.txHash}</td>
                <td className="px-4 py-2 text-textPrimary">{tx.date}</td>
                <td className="px-4 py-2 text-textPrimary">{tx.token}</td>
                <td className="px-4 py-2 text-textPrimary">{tx.amount}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-xl text-xs font-semibold ${
                      tx.direction === "incoming"
                        ? "bg-green-300/10 text-green-400"
                        : "bg-red-300/10 text-red-400"
                    }`}
                  >
                    {tx.direction}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10 bg-card rounded-xl p-6 border border-zinc-700">
        <p className="text-textSecondary mb-2">📊 Transfer Volume Chart (Coming Soon)</p>
        <div className="w-full h-40 bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-500">
          [Chart Placeholder]
        </div>
      </div>
    </div>
  );
}

export default TokenTransfers;
