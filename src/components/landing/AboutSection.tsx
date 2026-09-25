import React from 'react';
import { Target, Compass, ShieldAlert, Cpu, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
            <span>Our Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About EcoCycle Smart
          </h2>
          <p className="text-slate-700 text-lg font-medium leading-relaxed">
            “EcoCycle Smart is designed to connect smart waste collection, recycling, and community rewards into one circular ecosystem.”
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-[#fafcfa] border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To eliminate unmanaged urban waste and maximize material reclamation by turning passive disposal bins into intelligent, rewarding community infrastructure. We empower citizens to recycle with tangible incentives and give municipal collectors real-time operational efficiency.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#fafcfa] border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              A zero-landfill smart city where all discarded consumer items remain within verified circular supply loops. We envision an urban grid where waste is no longer viewed as a refuse burden, but as a predictable, high-value local resource commodity.
            </p>
          </div>
        </div>

        {/* Real-World Limitations & Scientific Rigor Disclosure */}
        <div className="p-8 rounded-3xl bg-amber-50/50 border border-amber-200 space-y-4">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
            <span>Academic Rigor & Real-World Limitations Disclosure</span>
          </div>

          <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed">
            In accordance with sound engineering and scientific integrity:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200/60 text-xs text-amber-950">
              <div className="font-bold text-amber-900 mb-1">1. Hardware Delineation</div>
              This web platform features an interactive telemetry simulator with sample JSON payloads. Real physical measurement requires connected microcontrollers (e.g. ESP32 + HC-SR04).
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200/60 text-xs text-amber-950">
              <div className="font-bold text-amber-900 mb-1">2. Impact Formulas</div>
              Environmental figures (CO₂ avoided, trees saved) are calibrated estimates calculated using published US EPA Waste Reduction Model (WARM) recovery factors.
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200/60 text-xs text-amber-950">
              <div className="font-bold text-amber-900 mb-1">3. EcoCoin Value</div>
              EcoCoins are internal loyalty points redeemable for partner coupons and community projects; they hold no guaranteed fiat monetary tender unless legally licensed.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
