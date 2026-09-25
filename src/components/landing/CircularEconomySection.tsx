import React from 'react';
import {
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Factory,
  PackageCheck,
  ShoppingBag,
} from 'lucide-react';
import { useEcoCycle } from '../../context/EcoCycleContext';

export const CircularEconomySection: React.FC = () => {
  const { setActiveTab } = useEcoCycle();

  const cycleSteps = [
    { title: '1. Waste Deposit', desc: 'Separated post-consumer recyclables dropped into smart nodes.' },
    { title: '2. Smart Collection', desc: 'Optimized on-demand routing based on ultrasonic volume triggers.' },
    { title: '3. Precision Sorting', desc: 'Optical and mechanical classification by polymer and metal grade.' },
    { title: '4. Reprocessing', desc: 'Washing, shredding, and extruding into virgin-grade pellets.' },
    { title: '5. Circular Raw Material', desc: 'Certified recycled resin supplied directly to local manufacturers.' },
    { title: '6. Durable Goods', desc: 'Transformed into durable bottles, textiles, tools, and planters.' },
    { title: '7. Consumer Use', desc: 'Used responsibly by conscious citizens who re-deposit at end-of-life.' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Closed Loop Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Keeping Materials in Perpetual Circulation
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Traditional linear economies take, make, and dump. EcoCycle Smart closes the loop so valuable aluminum, polymers, and paper never touch a landfill.
          </p>
        </div>

        {/* Visual Showcase: 2 Images with narrative overlay */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Image 1: Facility */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 relative group">
            <div className="aspect-[16/10] relative overflow-hidden">
              <img
                src="/src/assets/images/facility_recycling_1790313355365.jpg"
                alt="Automated sustainable recycling and sorting facility"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
            </div>
            <div className="p-6 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Factory className="w-4 h-4" />
                <span>PHASE A: REPROCESSING INFRASTRUCTURE</span>
              </div>
              <h3 className="text-xl font-bold">Industrial Mechanical Recovery</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Recovered plastics and non-ferrous metals are routed to partnered regional recovery centers, retaining over 88% of their structural polymer integrity.
              </p>
            </div>
          </div>

          {/* Image 2: Products */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 relative group">
            <div className="aspect-[16/10] relative overflow-hidden">
              <img
                src="/src/assets/images/circular_products_1790313367440.jpg"
                alt="Sustainable consumer products made from recycled materials"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
            </div>
            <div className="p-6 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <PackageCheck className="w-4 h-4" />
                <span>PHASE B: NEW CIRCULAR GOODS</span>
              </div>
              <h3 className="text-xl font-bold">Re-Entering the Consumer Economy</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Pellets become durable everyday essentials, building insulation, and packaging. Citizens redeem EcoCoins to purchase products manufactured from their own recycled contributions.
              </p>
            </div>
          </div>
        </div>

        {/* 7-Stage Continuous Cycle Timeline */}
        <div className="p-8 rounded-3xl bg-[#f9fbf9] border border-slate-200/80">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 font-mono">
            Continuous Circular Flow
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {cycleSteps.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200/70 space-y-1">
                <div className="text-xs font-bold text-emerald-800">{s.title}</div>
                <div className="text-[11px] text-slate-500 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-600" />
              <span>Diverts up to <strong>91%</strong> of domestic recyclable mass from landfill streams.</span>
            </div>
            <button
              onClick={() => setActiveTab('impact')}
              className="font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Verified Impact Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
