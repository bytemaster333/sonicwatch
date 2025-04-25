import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'Fira Code'", "monospace"],
      },
      colors: {
        background: "#0f172a",     // Slate-900 benzeri, göz yormaz
        card: "#1e293b",           // Slate-800
        neon: "#00ffe0",
        accent: "#38bdf8",         // Sky-400
        textPrimary: "#f8fafc",    // zinc-50
        textSecondary: "#94a3b8",  // zinc-400
        inputBg: "#1e293b",        // koyu input
      },
      boxShadow: {
        neon: "0 0 10px #00ffe0",
      },
    },
  },
  plugins: [],
}

export default config;
