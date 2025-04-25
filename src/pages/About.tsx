function About() {
  return (
    <div className="space-y-10 text-textPrimary">
      <h2 className="text-3xl font-bold text-accent mb-2">📘 About SonicWatch</h2>

      <p className="text-lg max-w-3xl text-textSecondary leading-relaxed">
        <strong className="text-white">SonicWatch</strong> is an open-source analytics and monitoring dashboard designed for the <strong className="text-white">Sonic SVM blockchain</strong>. It empowers developers, analysts, and users to visualize on-chain activity, wallet interactions, token transfers, and dApp usage — with real-time anomaly detection and alerting capabilities.
      </p>

      <section>
        <h3 className="text-2xl font-semibold text-accent mb-3">🚀 Why This Project?</h3>
        <ul className="list-disc pl-6 text-textSecondary space-y-2">
          <li>Make Sonic on-chain data more accessible and transparent</li>
          <li>Help users spot risky wallet behavior and suspicious transactions</li>
          <li>Enable developers to track dApp usage and token distribution in real-time</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold text-accent mb-3">🛣️ Roadmap</h3>
        <ul className="list-disc pl-6 text-textSecondary space-y-2">
          <li>✅ UI with wallet, token, SEGA and alert modules</li>
          <li>🔄 Flask API backend with live data</li>
          <li>📊 Graphs for volume trends, dApp activity, token flow</li>
          <li>🧠 ML-based anomaly scoring & clustering</li>
          <li>📤 Export to CSV/PDF and alert webhooks</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold text-accent mb-3">🔗 Useful Links</h3>
        <ul className="pl-6 space-y-2">
          <li>
            <a
              href="https://github.com/YOUR_GITHUB/sonicwatch"
              className="text-blue-400 hover:text-neon underline transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </li>
          <li>
            <a
              href="https://explorer.sonic.game"
              className="text-blue-400 hover:text-neon underline transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sonic Explorer
            </a>
          </li>
          <li>
            <a
              href="https://docs.sonic.game"
              className="text-blue-400 hover:text-neon underline transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sonic Docs
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold text-accent mb-3">🙌 Contributions Welcome</h3>
        <p className="text-textSecondary max-w-3xl leading-relaxed">
          This project is fully open source and welcomes community contributions, feature suggestions, and bug reports. Feel free to fork, open issues, or submit pull requests on GitHub.
        </p>
      </section>
    </div>
  );
}

export default About;
