import React, { useState } from 'react';
import {
  X,
  Recycle,
  Coins,
  Scale,
  Sparkles,
  Camera,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Upload,
} from 'lucide-react';
import { useEcoCycle } from '../../context/EcoCycleContext';
import { WasteCategoryKey, SmartBin } from '../../types';

export const DepositModal: React.FC = () => {
  const {
    isDepositModalOpen,
    closeDepositModal,
    selectedBinForDeposit,
    bins,
    categories,
    depositWaste,
    showToast,
  } = useEcoCycle();

  if (!isDepositModalOpen) return null;

  const initialBin = selectedBinForDeposit || bins.find(b => b.status !== 'offline') || bins[0];

  const [chosenBinId, setChosenBinId] = useState<string>(initialBin.id);
  const [chosenType, setChosenType] = useState<WasteCategoryKey>(initialBin.primaryWasteType || 'plastic');
  const [weightKg, setWeightKg] = useState<number>(2.0);
  const [classifiedItem, setClassifiedItem] = useState<{
    label: string;
    category: WasteCategoryKey;
    weight: number;
    confidence: number;
  } | null>(null);

  const selectedBin = bins.find(b => b.id === chosenBinId) || initialBin;
  const selectedCategory = categories.find(c => c.key === chosenType) || categories[0];
  const coinsToEarn = Math.round(weightKg * selectedCategory.rewardRateCoinsPerKg);

  const isOverDailyLimit = weightKg > 15;

  const sampleItems: {
    label: string;
    category: WasteCategoryKey;
    weight: number;
    confidence: number;
  }[] = [
    { label: 'PET Water & Soda Bottles (pack of 6)', category: 'plastic', weight: 1.5, confidence: 96 },
    { label: 'Aluminum Beverage Cans (crushed 12-pack)', category: 'metal', weight: 1.8, confidence: 98 },
    { label: 'Flattened Corrugated Shipping Box', category: 'cardboard', weight: 3.2, confidence: 94 },
    { label: 'Recycled Glass Jars & Beverage Bottles', category: 'glass', weight: 2.4, confidence: 92 },
    { label: 'Deprecated Charger Cables & Smartphone', category: 'ewaste', weight: 0.8, confidence: 95 },
  ];

  const handleApplyClassifier = (sample: typeof sampleItems[0]) => {
    setClassifiedItem(sample);
    setChosenType(sample.category);
    setWeightKg(sample.weight);
    showToast(`AI Classifier recognized: ${sample.label} (${sample.confidence}% confidence)`, 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBin.status === 'offline') {
      showToast('This bin is currently offline for maintenance.', 'warning');
      return;
    }

    if (isOverDailyLimit) {
      showToast('Anti-Fraud Limit: Single deposit exceeds 15kg max threshold. Attendant override required.', 'warning');
      return;
    }

    depositWaste({
      binId: chosenBinId,
      wasteType: chosenType,
      weightKg,
    });

    closeDepositModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Deposit Recyclable Waste
              </h2>
              <div className="text-xs text-slate-500">
                IoT load cell weighing & verified EcoCoin issuance
              </div>
            </div>
          </div>

          <button
            onClick={closeDepositModal}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Optional AI Waste Classifier Simulator Drawer */}
        <div className="p-4 rounded-2xl bg-[#f0f7f2] border border-emerald-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
              <Camera className="w-4 h-4 text-emerald-700" />
              <span>Smart Waste Classifier (Vision Prototype)</span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
              Modular Vision Subsystem
            </span>
          </div>
          <p className="text-[11px] text-emerald-800 leading-normal">
            Simulate computer-vision classification by clicking a common household item sample below:
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {sampleItems.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyClassifier(item)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-colors cursor-pointer ${
                  classifiedItem?.label === item.label
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-white text-slate-700 border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                {item.label.split('(')[0]}
              </button>
            ))}
          </div>

          {classifiedItem && (
            <div className="text-[11px] text-emerald-900 font-mono bg-white/80 p-2 rounded-lg flex items-center justify-between mt-2">
              <span>Match: <strong>{classifiedItem.label}</strong></span>
              <span className="text-emerald-700 font-bold">{classifiedItem.confidence}% Confidence</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Bin Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Destination Smart Bin
            </label>
            <select
              value={chosenBinId}
              onChange={e => setChosenBinId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            >
              {bins.map(b => (
                <option key={b.id} value={b.id}>
                  {b.binCode} — {b.name} ({b.currentFillPercent}% Full, {b.status.replace('_', ' ')})
                </option>
              ))}
            </select>
          </div>

          {/* Waste Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Waste Category Stream
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {categories.map(cat => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setChosenType(cat.key)}
                  className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                    chosenType === cat.key
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400/40'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="capitalize">{cat.name}</div>
                  <div className="text-[10px] text-emerald-700 font-mono">
                    +{cat.rewardRateCoinsPerKg} c/kg
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Weight Input & Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">
                Deposit Mass (Measured by Load Cell)
              </label>
              <span className="font-mono text-base font-bold text-slate-900 tabular-nums">
                {weightKg} kg
              </span>
            </div>

            <input
              type="range"
              min={0.2}
              max={16}
              step={0.1}
              value={weightKg}
              onChange={e => setWeightKg(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />

            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>0.2 kg</span>
              <span>8.0 kg</span>
              <span>15.0 kg (Max Cap)</span>
            </div>
          </div>

          {/* Anti-Fraud Limit Warning */}
          {isOverDailyLimit && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Anti-Fraud Check: Maximum single deposit limit is 15.0 kg to prevent commercial fraud.</span>
            </div>
          )}

          {/* Real-Time Reward Calculation Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-emerald-800 uppercase font-mono">
                Calculated Community Reward
              </div>
              <div className="text-2xl font-black text-emerald-950 font-mono flex items-center gap-1.5 mt-0.5">
                <Coins className="w-5 h-5 text-amber-500" />
                <span>+{coinsToEarn} EcoCoins</span>
              </div>
              <div className="text-[11px] text-emerald-700 mt-0.5">
                Formula: {weightKg} kg × {selectedCategory.rewardRateCoinsPerKg} coins/kg
              </div>
            </div>

            <div className="text-right text-[11px] text-slate-500 font-mono">
              <div>Est. CO₂: ~{(weightKg * selectedCategory.co2SavedPerKg).toFixed(2)} kg</div>
              <div>Bin Fill: +~{Math.min(40, Math.round((weightKg * 6 / selectedBin.capacityLiters) * 100))}%</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={closeDepositModal}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isOverDailyLimit}
              className={`px-6 py-2.5 text-xs font-semibold text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                isOverDailyLimit
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-emerald-700 hover:bg-emerald-800'
              }`}
            >
              <span>Confirm Deposit & Earn Coins</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
