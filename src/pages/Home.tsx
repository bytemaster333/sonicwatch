const Card = ({ title, desc }: { title: string; desc: string }) => (
  <div className="bg-card rounded-xl border border-zinc-700 p-6 shadow-lg hover:shadow-neon transition">
    <h3 className="text-accent text-xl font-semibold mb-2">{title}</h3>
    <p className="text-textSecondary text-sm">{desc}</p>
  </div>
);

function Home() {
  return (
    <div className="flex flex-col items-center text-center space-y-10 pt-12">
      {/* Başlık */}
      <div>
        <h1 className="text-5xl font-bold text-accent drop-shadow-md mb-2">SonicWatch</h1>
        <p className="text-textSecondary text-lg max-w-xl">
          Real-time analytics and anomaly detection for the Sonic SVM blockchain.
        </p>
      </div>

      {/* Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl px-4">
        <Card
          title="Wallet Analysis"
          desc="Track wallet history, token holdings, and activity timeline."
        />
        <Card
          title="Token Transfers"
          desc="Explore incoming and outgoing token movement trends."
        />
        <Card
          title="SEGA Interactions"
          desc="See your wallet’s swaps and liquidity events on Sonic’s DEX."
        />
        <Card
          title="Alerts"
          desc="Get notified for suspicious spikes, big withdrawals, and more."
        />
      </div>
    </div>
  );
}

export default Home;
