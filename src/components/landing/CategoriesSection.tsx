import React from 'react';
import {
  Boxes,
  FileText,
  Package,
  Layers,
  Sparkles,
  Zap,
  Apple,
  Coins,
  Leaf,
  SlidersHorizontal,
} from 'lucide-react';
import { useEcoCycle } from '../../context/EcoCycleContext';
import { WasteCategoryKey } from '../../types';

export const CategoriesSection: React.FC = () => {
  const { categories, openDepositModal, switchRole, setActiveTab } = useEcoCycle();

  const getCategoryIcon = (key: WasteCategoryKey) => {
    switch (key) {
      case 'plastic':
        return <Boxes className="w-5 h-5 text-emerald-600" />;
      case 'paper':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'cardboard':
        return <Package className="w-5 h-5 text-amber-600" />;
      case 'metal':
        return <Layers className="w-5 h-5 text-slate-700" />;
      case 'glass':
        return <Sparkles className="w-5 h-5 text-teal-600" />;
      case 'ewaste':
        return <Zap className="w-5 h-5 text-purple-600" />;
      case 'organic':
        return <Apple className="w-5 h-5 text-lime-600" />;
    }
  };

  return (
    <section id="categories" className="py-16 md:py-24 bg-[#f9fbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
              <span>Accepted Material Streams</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Configurable Waste Categories
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Reward rates and CO₂ conversion factors are set by municipal administrators according to real recycling market commodity prices.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                switchRole('admin');
                setActiveTab('dashboard');
              }}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-white border border-emerald-200/80 px-3.5 py-2 rounded-xl flex items-center gap-1.5 hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Configure Rates in Admin Panel</span>
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map(cat => (
            <div
              key={cat.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {getCategoryIcon(cat.key)}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    <Coins className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="tabular-nums">+{cat.rewardRateCoinsPerKg}</span>
                    <span className="text-[10px] font-medium text-emerald-600">Coins/kg</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  {cat.description}
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-700 flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-emerald-600" />
                    <span>Recycling Process:</span>
                  </div>
                  <p className="leading-normal">{cat.recyclingInfo}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  Est. CO₂: <span className="font-semibold text-slate-600 font-mono">~{cat.co2SavedPerKg} kg/kg</span>
                </div>
                <button
                  onClick={() => openDepositModal()}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
                >
                  Deposit This →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
