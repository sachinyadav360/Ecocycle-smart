import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  Lock,
  CheckCircle2,
  TreePine,
  ShieldCheck,
  Zap,
  Globe,
  Crown,
  Leaf,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { useEcoCycle } from '../../context/EcoCycleContext';

export interface MilestoneBadge {
  id: string;
  name: string;
  category: 'weight' | 'events' | 'impact';
  milestoneThresholdKg?: number;
  milestoneEvents?: number;
  description: string;
  perk: string;
  iconName: string;
  badgeLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
}

export const MILESTONE_BADGES: MilestoneBadge[] = [
  {
    id: 'badge-1',
    name: 'Eco Newbie',
    category: 'weight',
    milestoneThresholdKg: 5,
    description: 'Began the circular journey by depositing your first 5 kg of segregated waste.',
    perk: '+15 Welcome Bonus EcoCoins credited',
    iconName: 'leaf',
    badgeLevel: 'Bronze',
  },
  {
    id: 'badge-2',
    name: 'Green Pioneer',
    category: 'events',
    milestoneEvents: 10,
    description: 'Completed 10 verified smart-bin deposit sessions with IoT load cells.',
    perk: 'Unlocks priority customer support',
    iconName: 'zap',
    badgeLevel: 'Bronze',
  },
  {
    id: 'badge-3',
    name: 'Green Warrior',
    category: 'weight',
    milestoneThresholdKg: 25,
    description: 'Diverted 25 kg of recyclable plastics, paper, and metal from landfills.',
    perk: '5% bonus EcoCoins on all metal deposits',
    iconName: 'shield',
    badgeLevel: 'Silver',
  },
  {
    id: 'badge-4',
    name: 'Carbon Crusher',
    category: 'weight',
    milestoneThresholdKg: 50,
    description: 'Reached 50 kg total recycled mass, preventing over 70 kg of CO₂ equivalent.',
    perk: '+50 Milestone EcoCoins + Eco Champion tier',
    iconName: 'flame',
    badgeLevel: 'Gold',
  },
  {
    id: 'badge-5',
    name: 'Urban Forester',
    category: 'events',
    milestoneEvents: 25,
    description: 'Consistent community recycler with 25 separate smart bin check-ins.',
    perk: 'Free Native Sapling Planted in city park in your name',
    iconName: 'tree',
    badgeLevel: 'Gold',
  },
  {
    id: 'badge-6',
    name: 'Planet Savior',
    category: 'weight',
    milestoneThresholdKg: 100,
    description: 'Surpassed 100 kg of materials saved — top 1% community environmental steward.',
    perk: 'Permanent 10% EcoCoin booster & Platinum Leaderboard badge',
    iconName: 'globe',
    badgeLevel: 'Platinum',
  },
  {
    id: 'badge-7',
    name: 'Circular Legend',
    category: 'weight',
    milestoneThresholdKg: 200,
    description: 'The pinnacle of circular citizenship. Transformed a whole quarter-ton of resources.',
    perk: 'Municipal Certificate of Environmental Excellence & VIP partner discounts',
    iconName: 'crown',
    badgeLevel: 'Diamond',
  },
];

export const Achievements: React.FC = () => {
  const { currentUser, openDepositModal } = useEcoCycle();
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<MilestoneBadge | null>(null);

  const getBadgeIcon = (iconName: string, isUnlocked: boolean) => {
    const props = { className: `w-5 h-5 ${isUnlocked ? 'text-emerald-700' : 'text-slate-400'}` };
    switch (iconName) {
      case 'leaf': return <Leaf {...props} />;
      case 'zap': return <Zap {...props} />;
      case 'shield': return <ShieldCheck {...props} />;
      case 'flame': return <Flame {...props} />;
      case 'tree': return <TreePine {...props} />;
      case 'globe': return <Globe {...props} />;
      case 'crown': return <Crown {...props} />;
      default: return <Award {...props} />;
    }
  };

  const getBadgeStatus = (badge: MilestoneBadge) => {
    if (badge.milestoneThresholdKg !== undefined) {
      const isUnlocked = currentUser.totalWasteRecycledKg >= badge.milestoneThresholdKg;
      const progress = Math.min(100, Math.round((currentUser.totalWasteRecycledKg / badge.milestoneThresholdKg) * 100));
      return {
        isUnlocked,
        progress,
        current: currentUser.totalWasteRecycledKg,
        target: badge.milestoneThresholdKg,
        unit: 'kg',
      };
    } else if (badge.milestoneEvents !== undefined) {
      const isUnlocked = currentUser.recyclingEventsCount >= badge.milestoneEvents;
      const progress = Math.min(100, Math.round((currentUser.recyclingEventsCount / badge.milestoneEvents) * 100));
      return {
        isUnlocked,
        progress,
        current: currentUser.recyclingEventsCount,
        target: badge.milestoneEvents,
        unit: 'deposits',
      };
    }
    return { isUnlocked: false, progress: 0, current: 0, target: 100, unit: 'kg' };
  };

  const badgesWithStatus = MILESTONE_BADGES.map(badge => {
    const status = getBadgeStatus(badge);
    return { ...badge, status };
  });

  const unlockedCount = badgesWithStatus.filter(b => b.status.isUnlocked).length;
  const lockedCount = badgesWithStatus.length - unlockedCount;

  const filteredBadges = badgesWithStatus.filter(b => {
    if (filter === 'unlocked') return b.status.isUnlocked;
    if (filter === 'locked') return !b.status.isUnlocked;
    return true;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Header & Badges Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Recycling Achievements & Milestone Badges
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Unlock distinguished badges and reward multipliers as you recycle more mass into circular streams.
          </p>
        </div>

        {/* Unlocked Tally & Filter Segmented Control */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({MILESTONE_BADGES.length})
            </button>
            <button
              onClick={() => setFilter('unlocked')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === 'unlocked'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Unlocked ({unlockedCount})
            </button>
            <button
              onClick={() => setFilter('locked')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === 'locked'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Locked ({lockedCount})
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBadges.map(badge => {
          const { isUnlocked, progress, current, target, unit } = badge.status;

          return (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                isUnlocked
                  ? 'bg-gradient-to-b from-[#fafdfa] to-white border-emerald-300/80 hover:border-emerald-500 hover:shadow-md'
                  : 'bg-slate-50/60 border-slate-200/80 hover:border-slate-300 opacity-85 hover:opacity-100'
              }`}
            >
              <div>
                {/* Top Badge Icon & Level */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-transform group-hover:scale-105 ${
                      isUnlocked
                        ? 'bg-emerald-100/70 border-emerald-200 text-emerald-700 shadow-xs'
                        : 'bg-slate-100 border-slate-200 text-slate-400'
                    }`}
                  >
                    {isUnlocked ? getBadgeIcon(badge.iconName, true) : <Lock className="w-4 h-4 text-slate-400" />}
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        badge.badgeLevel === 'Diamond'
                          ? 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                          : badge.badgeLevel === 'Platinum'
                          ? 'bg-purple-50 text-purple-800 border border-purple-200'
                          : badge.badgeLevel === 'Gold'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : badge.badgeLevel === 'Silver'
                          ? 'bg-slate-100 text-slate-700 border border-slate-300'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {badge.badgeLevel}
                    </span>
                  </div>
                </div>

                {/* Badge Name & Criteria */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                  <span>{badge.name}</span>
                  {isUnlocked && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </h3>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {badge.description}
                </p>

                {/* Perk Box */}
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-[11px] text-emerald-900 font-medium">
                  <strong>Perk:</strong> {badge.perk}
                </div>
              </div>

              {/* Progress Bar & Status */}
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-500">
                    {isUnlocked ? 'Unlocked & Active' : 'Progress'}
                  </span>
                  <span className={`font-bold tabular-nums ${isUnlocked ? 'text-emerald-700' : 'text-slate-700'}`}>
                    {current} / {target} {unit}
                  </span>
                </div>

                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isUnlocked ? 'bg-emerald-600' : 'bg-slate-400'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivational Kicker Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-emerald-900">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            You have unlocked <strong>{unlockedCount} of {MILESTONE_BADGES.length}</strong> badges! Next unlock in{' '}
            <strong>
              {Math.max(0, Number((50 - currentUser.totalWasteRecycledKg).toFixed(1)))} kg
            </strong>{' '}
            ('Carbon Crusher').
          </span>
        </div>

        <button
          onClick={() => openDepositModal()}
          className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <span>Deposit More Waste</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Detail Modal if a badge is clicked */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
              {getBadgeIcon(selectedBadge.iconName, true)}
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {selectedBadge.badgeLevel} Tier Badge
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">{selectedBadge.name}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {selectedBadge.description}
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 text-left">
              <div className="font-bold text-slate-900 mb-0.5">Unlocked Benefit:</div>
              <p className="text-slate-600">{selectedBadge.perk}</p>
            </div>

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
