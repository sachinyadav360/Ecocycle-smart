import React from 'react';
import { ArrowRight, Sparkles, Cpu, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import { useEcoCycle } from '../../context/EcoCycleContext';

export const HeroSection: React.FC = () => {
  const { openDepositModal, openIoTSimulator, setActiveTab, bins } = useEcoCycle();

  const fullBin = bins.find(b => b.status === 'collection_required') || bins[1];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-emerald-50/60 via-white to-[#f9fbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/70 border border-emerald-200/80 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Waste Today. Resource Tomorrow.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] text-balance">
              Turn Waste Into <span className="text-emerald-600">Rewards.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              Smart waste collection, responsible recycling, and rewards for every contribution. Connecting IoT smart dustbins, citizens, municipal collectors, and circular recycling facilities.
            </p>

            {/* CTA Action Group */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openDepositModal()}
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Get Started · Recycle Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('how-it-works')}
                className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl border border-slate-200 shadow-sm transition-colors cursor-pointer"
              >
                How It Works
              </button>

              <button
                onClick={openIoTSimulator}
                className="px-4 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-medium text-xs rounded-xl border border-emerald-200/70 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-emerald-600" />
                <span>Simulate IoT Bin</span>
              </button>
            </div>

            {/* Visual Process Flow Kicker */}
            <div className="pt-6 border-t border-slate-200/80">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Closed-Loop Circular Workflow
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700">
                <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200 shadow-xs">Waste</span>
                <span className="text-emerald-500 font-bold">→</span>
                <span className="px-2.5 py-1 bg-emerald-50 rounded-md border border-emerald-200 text-emerald-800 font-semibold">Smart Bin</span>
                <span className="text-emerald-500 font-bold">→</span>
                <span className="px-2.5 py-1 bg-amber-50 rounded-md border border-amber-200 text-amber-800 font-semibold">Collection</span>
                <span className="text-emerald-500 font-bold">→</span>
                <span className="px-2.5 py-1 bg-blue-50 rounded-md border border-blue-200 text-blue-800 font-semibold">Recycling</span>
                <span className="text-emerald-500 font-bold">→</span>
                <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-md shadow-xs font-semibold">EcoCoin Rewards</span>
              </div>
            </div>

            {/* Trust points */}
            <div className="flex items-center gap-6 text-xs text-slate-500 pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Anti-Fraud Checks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Hallucinated Metrics</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-emerald-900/10 shadow-2xl bg-white">
              {/* High fidelity image banner */}
              <div className="aspect-[16/10] relative bg-emerald-950 overflow-hidden">
                <img
                  src="/src/assets/images/hero_smart_bin_1790313341975.jpg"
                  alt="EcoCycle Smart IoT dustbin in modern eco-friendly city park"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback container in case of error
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                
                {/* Live IoT telemetry overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-bold text-white tracking-wider">IOT NODE ACTIVE</span>
                  </div>
                  <span className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] text-emerald-300">
                    4G / LoRaWAN
                  </span>
                </div>
              </div>

              {/* Real-time Bin Snapshot Demonstration */}
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                      Connected Live Smart Bin
                    </div>
                    <div className="text-base font-bold text-slate-900">
                      {fullBin.name} ({fullBin.binCode})
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{fullBin.location}</span>
                    </div>
                  </div>

                  <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    🔴 Collection Required
                  </span>
                </div>

                {/* Progress bar gauge */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Ultrasonic Fill Level</span>
                    <span className="text-rose-600 font-mono tabular-nums">{fullBin.currentFillPercent}% Full</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 rounded-full transition-all duration-500"
                      style={{ width: `${fullBin.currentFillPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Threshold: {fullBin.thresholdPercent}%</span>
                    <span>Battery: {fullBin.batteryPercent}%</span>
                  </div>
                </div>

                {/* Simulated action row */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <div className="text-xs text-slate-600 font-medium">
                    Reward: <span className="text-emerald-700 font-bold">+15 EcoCoins / kg</span>
                  </div>
                  <button
                    onClick={() => openDepositModal(fullBin)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Simulate Deposit →
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
