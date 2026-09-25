import React from 'react';
import {
  AlertTriangle,
  Layers,
  Trash2,
  EyeOff,
  Coins,
  Truck,
  Activity,
} from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: <Trash2 className="w-5 h-5 text-rose-600" />,
      title: 'Dustbins Overflow Before Collection',
      description:
        'Fixed collection schedules fail when bins fill unexpectedly. Overflowing garbage litters public streets, creating health hazards and urban pollution.',
    },
    {
      icon: <Layers className="w-5 h-5 text-amber-600" />,
      title: 'Waste Is Frequently Mixed',
      description:
        'Lack of clear segregation at source causes high contamination. Clean recyclables mixed with wet waste end up permanently diverted to open landfills.',
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
      title: 'High-Value Materials Lost',
      description:
        'Billions of dollars of recyclable aluminum, PET polymers, and paper fibers are incinerated or buried rather than recovered into the circular economy.',
    },
    {
      icon: <EyeOff className="w-5 h-5 text-indigo-600" />,
      title: 'Manual Monitoring Is Inefficient',
      description:
        'Sanitation inspectors manually drive around cities checking bins by eye, wasting thousands of labor hours and municipal tax dollars.',
    },
    {
      icon: <Coins className="w-5 h-5 text-emerald-600" />,
      title: 'Zero Citizen Incentive',
      description:
        'Citizens receive no immediate positive reinforcement or tangible reward for spending time sorting household waste responsibly.',
    },
    {
      icon: <Truck className="w-5 h-5 text-blue-600" />,
      title: 'Inefficient Truck Routing',
      description:
        'Collection trucks drive blind routes collecting half-empty bins, generating heavy diesel emissions and traffic congestion without live demand data.',
    },
    {
      icon: <Activity className="w-5 h-5 text-purple-600" />,
      title: 'Lack of Real-Time Information',
      description:
        'City administrators and recycling plants lack visibility into incoming material streams, making circular supply chains unpredictable.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
            <span>Critical Urban Challenge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Waste Problem
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Traditional municipal waste management relies on 50-year-old static schedules. The consequences are overflowing streets, high contamination, and lost resources.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#fbfdfb] border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs mb-4 group-hover:scale-105 transition-transform">
                {prob.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {prob.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {prob.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
