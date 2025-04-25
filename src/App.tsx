import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import WalletAnalysis from "./pages/WalletAnalysis";
import TokenTransfers from "./pages/TokenTransfers";
import SegaInteractions from "./pages/SegaInteractions";
import Alerts from "./pages/Alerts";
import About from "./pages/About";
import { FaSearch, FaWallet, FaExchangeAlt, FaBolt, FaInfoCircle, FaBug } from "react-icons/fa";
import { JSX } from "react";

const Sidebar = () => (
  <div className="min-h-screen w-64 bg-gradient-to-b from-background to-black text-textPrimary px-5 py-6 border-r border-zinc-800 shadow-lg">
    <h1 className="text-2xl font-bold tracking-wide text-cyan-400 mb-10">SonicWatch</h1>
    <nav className="space-y-4 text-sm">
      <NavItem icon={<FaSearch />} label="Home" to="/" />
      <NavItem icon={<FaWallet />} label="Wallet" to="/wallet" />
      <NavItem icon={<FaExchangeAlt />} label="Transfers" to="/transfers" />
      <NavItem icon={<FaBolt />} label="SEGA" to="/sega" />
      <NavItem icon={<FaBug />} label="Alerts" to="/alerts" />
      <NavItem icon={<FaInfoCircle />} label="About" to="/about" />
    </nav>
  </div>
);

const NavItem = ({ icon, label, to }: { icon: JSX.Element; label: string; to: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
        isActive
          ? "bg-cyan-800 text-white shadow-md"
          : "hover:bg-zinc-800 hover:text-cyan-300"
      }`
    }
  >
    {icon} <span>{label}</span>
  </NavLink>
);

function App() {
  return (
    <Router>
      <div className="flex font-mono bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white">
        <Sidebar />
        <main className="flex-1 bg-background text-textPrimary min-h-screen p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wallet" element={<WalletAnalysis />} />
            <Route path="/transfers" element={<TokenTransfers />} />
            <Route path="/sega" element={<SegaInteractions />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
