import React from 'react';
import {
  PackageOpen,
  Scan,
  Coins,
  Truck,
  RotateCw,
  ArrowRight,
} from 'lucide-react';
import { useEcoCycle } from '../../context/EcoCycleContext';

export const HowItWorksSection: React.FC = () => {
  const { openDepositModal } = useEcoCycle();

  const steps = [
    {
      num: '01',
      title: 'Dispose',
      subtitle: 'Citizen Deposit',
      icon: <PackageOpen className="w-6 h-6 text-emerald-600" />,
      description:
        'User brings segregated recyclable items (plastics, paper, metals, glass, e-waste) to any connected EcoCycle IoT bin and unlocks the deposit flap.',
      pill: 'Step 1',
    },
    {
      num: '02',
      title: 'Identify',
      subtitle: 'Mass & Category Sensing',
      icon: <Scan className="w-6 h-6 text-blue-600" />,
      description:
        'The integrated load cell weighs the deposit while optional camera/barcode modules assist in verifying the material classification and anti-fraud criteria.',
      pill: 'Step 2',
    },
    {
      num: '03',
      title: 'Reward',
      subtitle: 'EcoCoin Calculation',
      icon: <Coins className="w-6 h-6 text-amber-600" />,
      description:
        'The backend credits the user’s account with verified EcoCoins according to configured municipal reward rates (e.g. 15 coins/kg for PET).',
      pill: 'Step 3',
    },
    {
      num: '04',
      title: 'Collect',
      subtitle: 'On-Demand Dispatch',
      icon: <Truck className="w-6 h-6 text-purple-600" />,
      description:
        'When the bin sensor detects fullness exceeding threshold (e.g. 85%), an automated dispatch ping notifies municipal or private collectors.',
      pill: 'Step 4',
    },
    {
      num: '05',
      title: 'Recycle',
      subtitle: 'Circular Reprocessing',
      icon: <RotateCw className="w-6 h-6 text-emerald-600" />,
      description:
        'Collected material is delivered directly to certified recycling partners where it is washed, shredded, pelleted, and converted into new circular products.',
      pill: 'Step 5',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
            <span>5-Step Circular Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How EcoCycle Smart Works
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            From the moment an empty container is deposited to when it re-emerges as a new recycled good, every gram is tracked and rewarded.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-[#fafcfa] border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-emerald-950/20">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shadow-xs">
                    {step.icon}
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider mb-1">
                  {step.subtitle}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Phase {idx + 1} of 5</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={() => openDepositModal()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <span>Experience the 5-Step Flow in Demo Mode</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
