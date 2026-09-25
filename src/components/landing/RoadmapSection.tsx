import React from 'react';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const RoadmapSection: React.FC = () => {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Platform & Dashboards',
      status: 'Current Live Prototype',
      statusType: 'completed',
      points: [
        'Responsive citizen, collector, facility & admin dashboards',
        'Stateful EcoCoin transactions & balance tracking',
        'Configurable reward rules & conversion factors',
        'Interactive Smart Bin map & live simulator',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'IoT Smart-Bin Deployment',
      status: 'Hardware Verification',
      statusType: 'in_progress',
      points: [
        'ESP32 / LoRaWAN microcontroller board integration',
        'HC-SR04 non-contact ultrasonic depth calibration',
        'HX711 4-cell digital scale platform integration',
        'Solar battery harvesting & low-power sleep modes',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Automated Waste Classification',
      status: 'Engineering Roadmap',
      statusType: 'upcoming',
      points: [
        'Edge AI camera classification for PET, HDPE, & aluminum',
        'Contamination rejection sensor before hatch locks',
        'Anti-fraud weight-to-volume ratio validation algorithms',
      ],
    },
    {
      phase: 'Phase 4',
      title: 'Recycling Facility Integrations',
      status: 'Partner Pilots',
      statusType: 'upcoming',
      points: [
        'Direct API telemetry hooks for regional materials recovery (MRFs)',
        'Automated bill-of-lading (BOL) generation for collection trucks',
        'Mass-balance yield auditing from gross intake to clean resin',
      ],
    },
    {
      phase: 'Phase 5',
      title: 'Reward Marketplace Expansion',
      status: 'Ecosystem Scaling',
      statusType: 'upcoming',
      points: [
        'Direct integration with municipal utility bills (water/power credits)',
        'Merchant POS integration for instant checkout with EcoCoins',
        'Verified corporate ESG donation matching',
      ],
    },
    {
      phase: 'Phase 6',
      title: 'City-Scale Autonomous Network',
      status: 'Long-term Vision',
      statusType: 'upcoming',
      points: [
        'Autonomous electric collection fleet dispatch optimization',
        'City-wide digital twin waste density heatmaps',
        'Inter-city carbon credit generation backed by circular data',
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#f9fbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
            <span>Progressive Development Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Future Roadmap
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            From our current working prototype to city-scale autonomous waste networks, here is how EcoCycle Smart scales sustainably.
          </p>
        </div>

        {/* Phase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((p, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-white border transition-all ${
                p.statusType === 'completed'
                  ? 'border-emerald-300 shadow-xs'
                  : 'border-slate-200/80'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {p.phase}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    p.statusType === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : p.statusType === 'in_progress'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-3">
                {p.title}
              </h3>

              <ul className="space-y-2 text-xs text-slate-600">
                {p.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
