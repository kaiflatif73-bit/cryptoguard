
"use client";

import { useMemo, useState } from "react";
import {
  ShieldCheck, LayoutDashboard, ScanSearch, ArrowLeftRight,
  Gift, Settings, Bell, Search, Wallet, Activity,
  AlertTriangle, CheckCircle2, XCircle, Menu, X,
  Lock, Zap, ChevronRight, RefreshCw
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, CartesianGrid
} from "recharts";

const transactions = [
  { id: 1, wallet: "0x82a...91bf", type: "Token Transfer", amount: "2.45 ETH", risk: "Low", status: "Safe", time: "2 min ago" },
  { id: 2, wallet: "0x41c...72de", type: "Contract Interaction", amount: "0.85 ETH", risk: "High", status: "Blocked", time: "15 min ago" },
  { id: 3, wallet: "0x93d...18ac", type: "Token Approval", amount: "120 USDT", risk: "Medium", status: "Review", time: "32 min ago" },
  { id: 4, wallet: "0x27b...45ef", type: "Token Transfer", amount: "0.5 ETH", risk: "Low", status: "Safe", time: "1 hour ago" },
  { id: 5, wallet: "0x62d...39ab", type: "Contract Interaction", amount: "1.2 ETH", risk: "Medium", status: "Review", time: "2 hours ago" },
];

const chartData = [
  { day: "Mon", scans: 18 },
  { day: "Tue", scans: 32 },
  { day: "Wed", scans: 25 },
  { day: "Thu", scans: 46 },
  { day: "Fri", scans: 38 },
  { day: "Sat", scans: 55 },
  { day: "Sun", scans: 68 },
];

const initialAirdrops = [
  { name: "LayerZero", network: "Ethereum", risk: "Low", description: "Cross-chain interoperability ecosystem" },
  { name: "Scroll", network: "Ethereum", risk: "Low", description: "Zero-knowledge Ethereum scaling network" },
  { name: "Unknown Protocol", network: "BSC", risk: "High", description: "Unverified project – exercise caution" },
];

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Wallet Scanner", icon: ScanSearch },
  { name: "Transactions", icon: ArrowLeftRight },
  { name: "Airdrop Intelligence", icon: Gift },
  { name: "Settings", icon: Settings },
];

function StatCard({ title, value, note, icon: Icon, color }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        <div className={`rounded-lg bg-slate-800 p-2 ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <h2 className="mt-5 text-3xl font-bold">{value}</h2>
      <p className="mt-2 text-xs text-slate-500">{note}</p>
    </div>
  );
}

function RiskBadge({ risk }) {
  const styles = {
    Low: "bg-emerald-500/10 text-emerald-400",
    Medium: "bg-amber-500/10 text-amber-400",
    High: "bg-red-500/10 text-red-400",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${styles[risk] || styles.Medium}`}>
      {risk}
    </span>
  );
}

export default function Home() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [protection, setProtection] = useState({
    phishing: true,
    suspicious: true,
    approvals: false,
  });

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.wallet.toLowerCase().includes(search.toLowerCase()) ||
        tx.type.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || tx.risk === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  function runScan(e) {
    e.preventDefault();
    if (!walletAddress.trim() || scanning) return;

    setScanning(true);
    setScanResult(null);

    // Demonstration only: this does not query a blockchain.
    setTimeout(() => {
      setScanResult({
        score: 94,
        risk: "Low",
        address: walletAddress,
        checks: [
          "Address format accepted",
          "Phishing check simulated",
          "Contract risk check simulated",
          "Transaction analysis simulated",
        ],
      });
      setScanning(false);
    }, 1800);
  }

  function toggleProtection(key) {
    setProtection((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  }

  function renderDashboard() {
    return (
      <>
        <div className="mb-8">
          <p className="text-sm text-blue-400">OVERVIEW</p>
          <h1 className="mt-2 text-3xl font-bold">Security Dashboard</h1>
          <p className="mt-2 text-sm text-slate-400">
            Monitor wallet activity and your security settings.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Security Score" value="94/100" note="Demo score · Excellent" icon={ShieldCheck} color="text-blue-400" />
          <StatCard title="Wallet Scans" value="128" note="Sample scan count" icon={ScanSearch} color="text-violet-400" />
          <StatCard title="Threats Detected" value="07" note="Sample threat records" icon={AlertTriangle} color="text-amber-400" />
          <StatCard title="Protected Assets" value="24" note="Sample asset count" icon={Activity} color="text-emerald-400" />
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Security Scan Activity</h2>
                <p className="mt-1 text-xs text-slate-500">Illustrative weekly scan data</p>
              </div>
              <Activity className="text-blue-400" size={20} />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="scanGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="day" stroke="#64748b" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8 }} />
                  <Area type="monotone" dataKey="scans" stroke="#60a5fa" fill="url(#scanGradient)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="font-semibold">Protection Status</h2>
            <div className="mt-6 flex items-center gap-3">
              <div className="rounded-full bg-emerald-500/10 p-3 text-emerald-400">
                <ShieldCheck size={26} />
              </div>
              <div>
                <p className="font-semibold text-emerald-400">Protected</p>
                <p className="text-xs text-slate-500">Demo protection settings</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {Object.entries(protection).map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm capitalize text-slate-300">
                    {key === "phishing" ? "Phishing alerts" : key === "suspicious" ? "Suspicious activity" : "Approval monitoring"}
                  </span>
                  <button
                    onClick={() => toggleProtection(key)}
                    aria-label={`Toggle ${key}`}
                    aria-pressed={enabled}
                    className={`h-6 w-11 rounded-full p-1 transition ${enabled ? "bg-blue-600" : "bg-slate-700"}`}
                  >
                    <span className={`block h-4 w-4 rounded-full bg-white transition ${enabled ? "translate-x-5" : ""}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          {renderTransactions(true)}
        </div>
      </>
    );
  }

  function renderScanner() {
    return (
      <div>
        <p className="text-sm text-blue-400">WALLET PROTECTION</p>
        <h1 className="mt-2 text-3xl font-bold">Wallet Scanner</h1>
        <p className="mt-2 text-sm text-slate-400">Run a demonstration wallet security scan.</p>

        <div className="mt-8 max-w-3xl rounded-xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-3 text-blue-400"><ScanSearch size={25} /></div>
            <div>
              <h2 className="font-semibold">Scan a wallet address</h2>
              <p className="text-xs text-slate-500">Enter an address to start the demo scan.</p>
            </div>
          </div>

          <form onSubmit={runScan}>
            <label className="mb-2 block text-sm text-slate-300">Wallet address</label>
            <input
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-4 text-sm outline-none focus:border-blue-500"
            />
            <button
              disabled={scanning || !walletAddress.trim()}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {scanning ? <><RefreshCw className="animate-spin" size={18} /> Scanning...</> : <><ScanSearch size={18} /> Start Security Scan</>}
            </button>
          </form>

          {scanResult && (
            <div className="mt-7 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Demo scan completed</h3>
                <RiskBadge risk={scanResult.risk} />
              </div>
              <p className="mt-4 text-4xl font-bold text-emerald-400">{scanResult.score}/100</p>
              <p className="mt-2 break-all text-xs text-slate-400">{scanResult.address}</p>
              <div className="mt-5 space-y-3">
                {scanResult.checks.map((check) => (
                  <p key={check} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 size={17} className="text-emerald-400" /> {check}
                  </p>
                ))}
              </div>
              <p className="mt-5 text-xs text-amber-300">
                Demonstration result only. No blockchain or security provider was queried.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderTransactions(compact = false) {
    return (
      <div>
        {!compact && (
          <>
            <p className="text-sm text-blue-400">ACTIVITY MONITOR</p>
            <h1 className="mt-2 text-3xl font-bold">Transactions</h1>
            <p className="mt-2 text-sm text-slate-400">Search and filter sample transaction records.</p>
          </>
        )}

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-semibold">{compact ? "Recent Security Activity" : "Transaction History"}</h2>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-slate-700 px-3">
                <Search size={16} className="text-slate-500" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-28 bg-transparent py-2 text-xs outline-none sm:w-36" />
              </div>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs">
                <option>All</option><option>Low</option><option>Medium</option><option>High</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="text-xs text-slate-500">
                <tr className="border-b border-slate-800">
                  <th className="pb-4">Wallet</th><th className="pb-4">Activity</th><th className="pb-4">Amount</th><th className="pb-4">Risk</th><th className="pb-4">Status</th><th className="pb-4">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.slice(0, compact ? 4 : undefined).map((tx) => (
                  <tr key={tx.id} className="border-b border-slate-800/70 last:border-0">
                    <td className="py-4 text-slate-300">{tx.wallet}</td>
                    <td className="py-4 text-slate-400">{tx.type}</td>
                    <td className="py-4">{tx.amount}</td>
                    <td className="py-4"><RiskBadge risk={tx.risk} /></td>
                    <td className="py-4 text-slate-300">{tx.status}</td>
                    <td className="py-4 text-slate-500">{tx.time}</td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr><td colSpan="6" className="py-8 text-center text-slate-500">No matching transactions found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  function renderAirdrops() {
    return (
      <div>
        <p className="text-sm text-blue-400">DISCOVER</p>
        <h1 className="mt-2 text-3xl font-bold">Airdrop Intelligence</h1>
        <p className="mt-2 text-sm text-slate-400">Explore sample opportunities and risk labels.</p>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {initialAirdrops.map((drop) => (
            <div key={drop.name} className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-violet-500/10 p-3 text-violet-400"><Gift size={23} /></div>
                <RiskBadge risk={drop.risk} />
              </div>
              <h2 className="mt-5 text-xl font-semibold">{drop.name}</h2>
              <p className="mt-1 text-xs text-blue-400">{drop.network}</p>
              <p className="mt-4 text-sm text-slate-400">{drop.description}</p>
              <button className="mt-5 flex items-center gap-2 text-sm text-blue-400">
                View details <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-amber-300">Sample listings only. These are not verified or endorsed airdrops.</p>
      </div>
    );
  }

  function renderSettings() {
    return (
      <div>
        <p className="text-sm text-blue-400">PREFERENCES</p>
        <h1 className="mt-2 text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-sm text-slate-400">Manage your demonstration security preferences.</p>
        <div className="mt-8 max-w-2xl rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center gap-3">
            <Lock className="text-blue-400" />
            <h2 className="font-semibold">Security preferences</h2>
          </div>
          {Object.entries(protection).map(([key, enabled]) => (
            <div key={key} className="flex items-center justify-between border-b border-slate-800 py-5">
              <div>
                <p className="text-sm font-medium capitalize">{key === "phishing" ? "Phishing alerts" : key === "suspicious" ? "Suspicious activity alerts" : "Approval monitoring"}</p>
                <p className="mt-1 text-xs text-slate-500">Demo preference control</p>
              </div>
              <button onClick={() => toggleProtection(key)} aria-pressed={enabled} className={`h-6 w-11 rounded-full p-1 ${enabled ? "bg-blue-600" : "bg-slate-700"}`}>
                <span className={`block h-4 w-4 rounded-full bg-white ${enabled ? "translate-x-5" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const pageContent = {
    Dashboard: renderDashboard,
    "Wallet Scanner": renderScanner,
    Transactions: renderTransactions,
    "Airdrop Intelligence": renderAirdrops,
    Settings: renderSettings,
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-slate-900 p-5">
      <div className="mb-10 flex items-center gap-3 px-2">
        <ShieldCheck className="text-blue-400" size={30} />
        <span className="text-xl font-bold">CryptoGuard</span>
      </div>
      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Workspace</p>
      <nav className="space-y-2">
        {navItems.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => { setActivePage(name); setMobileOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${activePage === name ? "bg-blue-600/15 text-blue-400" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
          >
            <Icon size={19} /> {name}
          </button>
        ))}
      </nav>
      <div className="mt-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
        <ShieldCheck size={22} className="text-emerald-400" />
        <p className="mt-3 text-sm font-medium">Security first</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">CryptoGuard portfolio demonstration.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-800 lg:block">
      {SidebarContent()}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/70" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />
          <aside className="relative h-full w-72">
            <button onClick={() => setMobileOpen(false)} className="absolute right-3 top-5 z-10 text-white"><X /></button>
            {SidebarContent()}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="text-slate-300 lg:hidden"><Menu /></button>
            <div>
              <p className="text-sm font-semibold">{activePage}</p>
              <p className="hidden text-xs text-slate-500 sm:block">CryptoGuard Security Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <button aria-label="Notifications" className="text-slate-400 hover:text-white"><Bell size={20} /></button>
            <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-xs font-medium hover:bg-blue-700 sm:px-4 sm:text-sm">
              <Wallet size={17} /> <span className="hidden sm:inline">Connect Wallet</span><span className="sm:hidden">Connect</span>
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-4 sm:p-8">
          {pageContent[activePage]()}
          <footer className="mt-12 border-t border-slate-800 py-6 text-center text-xs text-slate-600">
            CryptoGuard · Portfolio demonstration · Simulated data only
          </footer>
        </main>
      </div>
    </div>
  );
}
