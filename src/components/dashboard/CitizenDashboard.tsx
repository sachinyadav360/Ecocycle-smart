import React from 'react';
import {
  Coins,
  Recycle,
  Scale,
  Award,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  Calendar,
  Gift,
  ArrowRight,
  Sparkles,
  Leaf,
  CheckCircle2,
} from 'lucide-react';
import { useEcoCycle } from '../../context/EcoCycleContext';
import { Achievements } from './Achievements';

export const CitizenDashboard: React.FC = () => {
  const {
    currentUser,
    wasteRecords,
    coinTransactions,
    conversionFactors,
    openDepositModal,
    setActiveTab,
  } = useEcoCycle();

  const userWasteRecords = wasteRecords.filter(r => r.userId === currentUser.id);
  const userTransactions = coinTransactions.filter(t => t.userId === currentUser.id);

  // Environmental impact calculations based on standard factors
  const co2AvoidedKg = Number((currentUser.totalWasteRecycledKg * conversionFactors.co2SavedPerKg).toFixed(1));
  const treesEquivalent = Number((currentUser.totalWasteRecycledKg * conversionFactors.treesSavedFactor).toFixed(2));
  const waterSavedLiters = Number((currentUser.totalWasteRecycledKg * conversionFactors.waterSavedLitersPerKg).toFixed(0));

  // Determine Level Progress
  // Beginner: 0-15kg, Explorer: 15-40kg, Champion: 40-80kg, Hero: 80kg+
  let currentTierTarget = 15;
  let nextLevel = 'Eco Explorer';
  let progressPercent = (currentUser.totalWasteRecycledKg / 15) * 100;

  if (currentUser.ecoLevel === 'Eco Explorer') {
    currentTierTarget = 40;
    nextLevel = 'Eco Champion';
    progressPercent = ((currentUser.totalWasteRecycledKg - 15) / (40 - 15)) * 100;
  } else if (currentUser.ecoLevel === 'Eco Champion') {
    currentTierTarget = 80;
    nextLevel = 'Eco Hero';
    progressPercent = ((currentUser.totalWasteRecycledKg - 40) / (80 - 40)) * 100;
  } else if (currentUser.ecoLevel === 'Eco Hero') {
    currentTierTarget = 150;
    nextLevel = 'Max Level Tier';
    progressPercent = 100;
  }
  progressPercent = Math.min(100, Math.max(0, Math.round(progressPercent)));

  return (
    <div className="space-y-6">
      
      {/* Top Profile & Welcome Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-2xl shadow-sm">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{currentUser.name}</h1>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                {currentUser.ecoId}
              </span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
              <span>{currentUser.email}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {currentUser.location}
              </span>
            </div>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('rewards')}
            className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Gift className="w-4 h-4 text-amber-600" />
            <span>Redeem Rewards</span>
          </button>

          <button
            onClick={() => openDepositModal()}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Recycle className="w-4 h-4" />
            <span>Recycle Waste</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Recycled */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Recycled</span>
            <Scale className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
            {currentUser.totalWasteRecycledKg} <span className="text-sm font-medium text-slate-500">kg</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Across {currentUser.recyclingEventsCount} verified events
          </div>
        </div>

        {/* EcoCoin Balance */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">EcoCoins Balance</span>
            <Coins className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono tabular-nums flex items-baseline gap-1">
            {currentUser.ecoCoins} <span className="text-xs font-semibold text-amber-600">Coins</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Ready to redeem in Rewards Shop
          </div>
        </div>

        {/* Recycling Events */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Recycling Events</span>
            <Recycle className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">
            {currentUser.recyclingEventsCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            100% verified by IoT load cells
          </div>
        </div>

        {/* Environmental Impact CO2 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Est. CO₂ Avoided</span>
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums">
            ~{co2AvoidedKg} <span className="text-sm font-medium text-slate-500">kg CO₂e</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            ≈ {treesEquivalent} tree-seedlings equivalent
          </div>
        </div>
      </div>

      {/* Level Progression Card */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Current Standing
              </div>
              <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>{currentUser.ecoLevel}</span>
                <span className="text-xs font-normal text-slate-500">
                  (Next tier: {nextLevel})
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-semibold text-slate-600 font-mono">
              {currentUser.totalWasteRecycledKg} / {currentTierTarget} kg
            </div>
            <div className="text-[11px] text-slate-400">
              {Math.max(0, Number((currentTierTarget - currentUser.totalWasteRecycledKg).toFixed(1)))} kg to unlock {nextLevel}
            </div>
          </div>
        </div>

        {/* Tier Progress Bar */}
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-emerald-600 rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Levels Grid Kicker */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
          {[
            { label: 'Eco Beginner', req: '0 kg', active: true },
            { label: 'Eco Explorer', req: '15 kg', active: currentUser.totalWasteRecycledKg >= 15 },
            { label: 'Eco Champion', req: '40 kg', active: currentUser.totalWasteRecycledKg >= 40 },
            { label: 'Eco Hero', req: '80 kg', active: currentUser.totalWasteRecycledKg >= 80 },
          ].map((lvl, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border text-[11px] ${
                lvl.active
                  ? 'border-emerald-300 bg-emerald-50/70 text-emerald-900 font-bold'
                  : 'border-slate-100 bg-slate-50 text-slate-400'
              }`}
            >
              <div>{lvl.label}</div>
              <div className="text-[10px] font-mono mt-0.5">{lvl.req}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Unlockable Milestone Achievements Component */}
      <Achievements />

      {/* Two Columns: Recent Deposits & Transactions Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recent Activity */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              Recent Recycling Deposits
            </h2>
            <button
              onClick={() => openDepositModal()}
              className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
            >
              + Log New Deposit
            </button>
          </div>

          <div className="space-y-3">
            {userWasteRecords.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                No recycling events recorded yet. Visit an IoT Smart Bin to begin!
              </div>
            ) : (
              userWasteRecords.map(rec => (
                <div
                  key={rec.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <Recycle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 capitalize">
                        {rec.wasteType} · {rec.weightKg} kg
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {rec.binCode} · {new Date(rec.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      +{rec.coinsEarned} Coins
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: EcoCoin Ledger */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              EcoCoins Transaction Ledger
            </h2>
            <button
              onClick={() => setActiveTab('rewards')}
              className="text-xs font-semibold text-amber-700 hover:underline cursor-pointer"
            >
              Shop Rewards →
            </button>
          </div>

          <div className="space-y-3">
            {userTransactions.slice(0, 5).map(tx => (
              <div
                key={tx.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-800">{tx.description}</div>
                  <div className="text-[10px] text-slate-400">
                    {new Date(tx.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <span
                  className={`font-mono font-bold ${
                    tx.amount > 0 ? 'text-emerald-700' : 'text-slate-700'
                  }`}
                >
                  {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
