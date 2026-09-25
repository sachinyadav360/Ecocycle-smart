import React from 'react';
import {
  Cpu,
  Wifi,
  Radio,
  Sliders,
  BellRing,
  ArrowRight,
  Database,
  Truck,
  Building2,
  Users,
} from 'lucide-react';
import { useEcoCycle } from '../../context/EcoCycleContext';

export const SolutionSection: React.FC = () => {
  const { openDepositModal, openIoTSimulator, setActiveTab, bins } = useEcoCycle();

  const bin102 = bins.find(b => b.binCode === 'EC-102') || bins[1];

  return (
    <section className="py-16 md:py-24 bg-[#f9fbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md border border-emerald-200">
            <span>Unified Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            One Smart Ecosystem for Waste Management
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            EcoCycle Smart bridges the physical-digital divide. By pairing IoT telemetry with an incentivized circular reward economy, we turn everyday waste bins into autonomous resource nodes.
          </p>
        </div>

        {/* 4 Pillars of the Ecosystem */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">1. IoT Smart Bins</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equipped with ultrasonic depth sensors, load-cell scales, solar harvesting, and LoRaWAN/Cellular telemetry to broadcast fill percentages in real-time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">2. Citizen Rewards</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Citizens scan or identify at the bin, deposit segregated recyclables, and immediately earn tamper-proof EcoCoins redeemable for local vouchers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold mb-4">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">3. On-Demand Logistics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Collectors receive automated dispatch orders only when bins breach configured thresholds (e.g. 85%), cutting truck fuel consumption by up to 38%.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">4. Certified Recycling</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Materials route straight to verified reprocessing facilities. Batches are tracked from sorted flakes to reborn circular consumer goods.
            </p>
          </div>
        </div>

        {/* Live Interactive Telemetry Showcase Card */}
        <div className="bg-white rounded-3xl border border-emerald-900/10 shadow-lg p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left side: Specs */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
                <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>TELEMETRY SPECIFICATION</span>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900">
                Automated Threshold Dispatch Logic
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                When an IoT Smart Dustbin reaches its configured threshold (customizable between 75%–95%), an event payload is sent to the backend dispatcher. A high-priority collection request is automatically scheduled and broadcast to assigned collectors nearby.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase">Sensors Supported</div>
                  <div className="text-sm font-bold text-slate-800">HC-SR04 / JSN-SR04T</div>
                  <div className="text-[11px] text-slate-500">Ultrasonic non-contact depth</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase">Mass Measurement</div>
                  <div className="text-sm font-bold text-slate-800">HX711 4-Point Load Cell</div>
                  <div className="text-[11px] text-slate-500">±10g dynamic precision</div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('map')}
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Explore All Smart Bins on Map</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={openIoTSimulator}
                  className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Open Simulator
                </button>
              </div>
            </div>

            {/* Right side: Example Live Bin #102 Card */}
            <div className="lg:col-span-6 bg-[#0f172a] text-white rounded-2xl p-6 shadow-xl border border-slate-800 font-sans">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="font-mono text-xs font-bold text-rose-400">HARDWARE TRIGGER ACTIVE</span>
                </div>
                <span className="font-mono text-xs text-slate-400">Node ID: {bin102.binCode}</span>
              </div>

              {/* Data points */}
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-slate-400">Bin Identification</div>
                  <div className="text-lg font-bold text-white">{bin102.name}</div>
                  <div className="text-xs text-emerald-400 font-mono mt-0.5">Location: {bin102.location}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">Measured Fill Level</span>
                    <span className="font-mono font-bold text-rose-400 text-sm">{bin102.currentFillPercent}%</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-500 rounded-full transition-all duration-700"
                      style={{ width: `${bin102.currentFillPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>Configured Alert Trigger: {bin102.thresholdPercent}%</span>
                    <span>Status: Collection Required</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Capacity</div>
                    <div className="text-xs font-bold text-white font-mono">{bin102.capacityLiters} L</div>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Battery</div>
                    <div className="text-xs font-bold text-emerald-400 font-mono">{bin102.batteryPercent}%</div>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Temp</div>
                    <div className="text-xs font-bold text-white font-mono">{bin102.temperatureCelsius}°C</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Automated Notification dispatched to collector queue</span>
                  <button
                    onClick={() => {
                      setActiveTab('dashboard');
                    }}
                    className="text-xs font-semibold text-emerald-300 hover:text-emerald-200 underline cursor-pointer"
                  >
                    View in Collector Queue →
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
