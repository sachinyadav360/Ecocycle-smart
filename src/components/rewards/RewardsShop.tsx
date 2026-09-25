import React, { useState } from 'react';
import {
  Coins,
  Gift,
  Tag,
  ShoppingBag,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useEcoCycle } from '../../context/EcoCycleContext';
import { RewardItem } from '../../types';

export const RewardsShop: React.FC = () => {
  const { currentUser, rewards, redeemReward, openDepositModal } = useEcoCycle();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [redeemedCode, setRedeemedCode] = useState<{ name: string; code: string } | null>(null);

  const filteredRewards = rewards.filter(
    r => selectedCategory === 'all' || r.category === selectedCategory
  );

  const handleRedeem = (item: RewardItem) => {
    const res = redeemReward(item.id);
    if (res.success && res.voucherCode) {
      setRedeemedCode({ name: item.name, code: res.voucherCode });
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header with Live EcoCoins Balance */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200 bg-white/10 px-3 py-1 rounded-full border border-white/15">
            <Coins className="w-3.5 h-3.5 text-amber-300" />
            <span>Circular Economy Marketplace</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">EcoCoins Rewards</h1>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
            Redeem verified points earned by recycling at IoT smart dustbins for local business coupons, durable circular products, and native tree planting.
          </p>
        </div>

        {/* Big Balance Box */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black shadow-xs">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-emerald-200 uppercase tracking-wider">
              Available Balance
            </div>
            <div className="text-3xl font-black font-mono tabular-nums text-white">
              {currentUser.ecoCoins} <span className="text-sm font-semibold text-amber-300">EcoCoins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Rewards' },
          { id: 'voucher', label: 'Local Vouchers & Dining' },
          { id: 'product', label: 'Sustainable Goods' },
          { id: 'donation', label: 'Environmental Donations' },
          { id: 'community', label: 'Community & Clean Power' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map(item => {
          const canAfford = currentUser.ecoCoins >= item.coinCost;
          const isOutOfStock = item.availableCount <= 0;

          return (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-semibold uppercase text-slate-400">
                    {item.partner}
                  </span>
                  <div className="flex items-center gap-1 font-mono font-bold text-xs bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-full">
                    <Coins className="w-3.5 h-3.5 text-amber-600" />
                    <span>{item.coinCost} Coins</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 mb-4">
                  <strong>Terms:</strong> {item.terms}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {isOutOfStock ? (
                    <span className="text-rose-600 font-semibold">Out of Stock</span>
                  ) : (
                    <span>{item.availableCount} available</span>
                  )}
                </span>

                <button
                  disabled={!canAfford || isOutOfStock}
                  onClick={() => handleRedeem(item)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    !canAfford
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : isOutOfStock
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                  }`}
                >
                  {canAfford ? 'Redeem Voucher' : 'Need More Coins'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Earn More Coins Prompt Banner */}
      <div className="p-6 rounded-3xl bg-[#f0f7f2] border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-emerald-950">Need more EcoCoins?</h3>
          <p className="text-xs text-emerald-800 mt-0.5">
            Deposit clean recyclable bottles, cans, and cartons at any nearby IoT Smart Bin.
          </p>
        </div>
        <button
          onClick={() => openDepositModal()}
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <span>Recycle Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Redemption Success Modal */}
      {redeemedCode && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Voucher Generated</h3>
              <p className="text-xs text-slate-600 mt-1">{redeemedCode.name}</p>
            </div>

            <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl font-mono text-lg font-black text-emerald-700 tracking-wider">
              {redeemedCode.code}
            </div>

            <p className="text-[11px] text-slate-400">
              Present this digital alphanumeric code at checkout or online partner portal.
            </p>

            <button
              onClick={() => setRedeemedCode(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
