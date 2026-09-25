import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Cpu,
  Layers,
  Coins,
  Truck,
  Building2,
  Plus,
  Trash2,
  Edit2,
  AlertTriangle,
  CheckCircle2,
  SlidersHorizontal,
  FileText,
} from 'lucide-react';
import { useEcoCycle } from '../../context/EcoCycleContext';
import { SmartBin, WasteCategory, User, UserRole, WasteCategoryKey } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    users,
    bins,
    categories,
    requests,
    recyclingRecords,
    coinTransactions,
    conversionFactors,
    updateSmartBin,
    addSmartBin,
    deleteSmartBin,
    updateCategoryRewardRate,
    toggleCategoryStatus,
    updateConversionFactors,
    toggleUserSuspension,
    showToast,
  } = useEcoCycle();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'bins' | 'categories' | 'users' | 'transactions'>('overview');

  // Form states for adding/editing bins
  const [isAddBinModalOpen, setIsAddBinModalOpen] = useState(false);
  const [newBin, setNewBin] = useState({
    binCode: 'EC-109',
    name: '',
    location: '',
    address: '',
    capacityLiters: 120,
    primaryWasteType: 'plastic' as WasteCategoryKey,
    thresholdPercent: 85,
  });

  const handleAddBin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBin.name || !newBin.location) {
      showToast('Please provide bin name and location.', 'warning');
      return;
    }
    addSmartBin({
      binCode: newBin.binCode,
      name: newBin.name,
      location: newBin.location,
      address: newBin.address || `${newBin.location} Ave`,
      latitude: 37.775 + (Math.random() - 0.5) * 0.04,
      longitude: -122.419 + (Math.random() - 0.5) * 0.04,
      capacityLiters: newBin.capacityLiters,
      currentFillPercent: 0,
      status: 'available',
      primaryWasteType: newBin.primaryWasteType,
      batteryPercent: 100,
      lastCollectionAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      thresholdPercent: newBin.thresholdPercent,
      temperatureCelsius: 21.0,
    });
    setIsAddBinModalOpen(false);
    setNewBin({
      binCode: `EC-${Math.floor(110 + Math.random() * 50)}`,
      name: '',
      location: '',
      address: '',
      capacityLiters: 120,
      primaryWasteType: 'plastic',
      thresholdPercent: 85,
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-700 text-white flex items-center justify-center font-bold shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{currentUser.name}</h1>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
                System Administrator · {currentUser.ecoId}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Municipal Circular Network Governance & Reward Configuration Panel
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddBinModalOpen(true)}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Deploy New Smart Bin</span>
          </button>
        </div>
      </div>

      {/* Admin Sub Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
        {[
          { id: 'overview', label: 'Network Overview', icon: <Building2 className="w-3.5 h-3.5" /> },
          { id: 'bins', label: `Smart Bins (${bins.length})`, icon: <Cpu className="w-3.5 h-3.5" /> },
          { id: 'categories', label: `Waste Streams (${categories.length})`, icon: <Layers className="w-3.5 h-3.5" /> },
          { id: 'users', label: `Users & Roles (${users.length})`, icon: <Users className="w-3.5 h-3.5" /> },
          { id: 'transactions', label: 'Anti-Fraud & Ledger', icon: <Coins className="w-3.5 h-3.5" /> },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveAdminTab(t.id as any)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeAdminTab === t.id
                ? 'bg-purple-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-xs font-semibold text-slate-400 uppercase font-mono">Active Connected Nodes</div>
              <div className="text-2xl font-black text-slate-900 font-mono mt-1 tabular-nums">
                {bins.filter(b => b.status !== 'offline').length} / {bins.length}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {bins.filter(b => b.status === 'collection_required').length} requiring immediate collection
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-xs font-semibold text-slate-400 uppercase font-mono">Registered Participants</div>
              <div className="text-2xl font-black text-slate-900 font-mono mt-1 tabular-nums">
                {users.length}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Citizens, collectors & facility staff
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-xs font-semibold text-slate-400 uppercase font-mono">Total Coins Minted</div>
              <div className="text-2xl font-black text-amber-600 font-mono mt-1 tabular-nums">
                {users.reduce((acc, u) => acc + u.ecoCoins, 0)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Backed by verified recyclable mass</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-xs font-semibold text-slate-400 uppercase font-mono">Total Network Diversion</div>
              <div className="text-2xl font-black text-emerald-700 font-mono mt-1 tabular-nums">
                {users.reduce((acc, u) => acc + u.totalWasteRecycledKg, 0).toFixed(1)} <span className="text-xs text-slate-500">kg</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Diverted from open landfill</div>
            </div>
          </div>

          {/* Configurable Impact Conversion Factors Setting */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Municipal Environmental Conversion Factors (EPA Standard)
                </h3>
                <p className="text-xs text-slate-500">
                  Coefficients used to compute estimated CO₂, water, and energy savings from raw recycled weights
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <label className="text-[10px] font-mono font-semibold text-slate-500 uppercase block">
                  CO₂ Factor (kg CO₂e / kg)
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={conversionFactors.co2SavedPerKg}
                  onChange={e => updateConversionFactors({ co2SavedPerKg: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-mono font-bold bg-white"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <label className="text-[10px] font-mono font-semibold text-slate-500 uppercase block">
                  Tree Seedling Factor (tree / kg)
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={conversionFactors.treesSavedFactor}
                  onChange={e => updateConversionFactors({ treesSavedFactor: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-mono font-bold bg-white"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <label className="text-[10px] font-mono font-semibold text-slate-500 uppercase block">
                  Water Factor (Liters / kg)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={conversionFactors.waterSavedLitersPerKg}
                  onChange={e => updateConversionFactors({ waterSavedLitersPerKg: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-mono font-bold bg-white"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <label className="text-[10px] font-mono font-semibold text-slate-500 uppercase block">
                  Energy Factor (kWh / kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={conversionFactors.energySavedKwhPerKg}
                  onChange={e => updateConversionFactors({ energySavedKwhPerKg: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-mono font-bold bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SMART BINS MANAGEMENT */}
      {activeAdminTab === 'bins' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Connected Smart Bins Network ({bins.length})
              </h2>
              <p className="text-xs text-slate-500">Configure alert thresholds, calibrate fill levels, and manage nodes</p>
            </div>
            <button
              onClick={() => setIsAddBinModalOpen(true)}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Smart Bin</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Bin Code</th>
                  <th className="py-2.5 px-3">Name & Location</th>
                  <th className="py-2.5 px-3">Waste Stream</th>
                  <th className="py-2.5 px-3">Fill Level</th>
                  <th className="py-2.5 px-3">Threshold Trigger</th>
                  <th className="py-2.5 px-3">Battery</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bins.map(bin => (
                  <tr key={bin.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{bin.binCode}</td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800">{bin.name}</div>
                      <div className="text-[11px] text-slate-500">{bin.location}</div>
                    </td>
                    <td className="py-3 px-3 capitalize font-medium text-slate-700">
                      {bin.primaryWasteType}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900 tabular-nums">
                      {bin.currentFillPercent}%
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={50}
                          max={95}
                          value={bin.thresholdPercent}
                          onChange={e => updateSmartBin(bin.id, { thresholdPercent: Number(e.target.value) })}
                          className="w-16 px-2 py-1 rounded border border-slate-200 font-mono text-xs"
                        />
                        <span className="text-slate-400 font-mono">%</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <span className={bin.batteryPercent < 15 ? 'text-rose-600 font-bold' : 'text-slate-700'}>
                        {bin.batteryPercent}%
                      </span>
                    </td>
                    <td className="py-3 px-3 capitalize">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        bin.status === 'collection_required'
                          ? 'bg-rose-100 text-rose-800'
                          : bin.status === 'almost_full'
                          ? 'bg-amber-100 text-amber-800'
                          : bin.status === 'offline'
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {bin.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => deleteSmartBin(bin.id)}
                        title="Remove bin"
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: WASTE CATEGORIES & REWARD RATES */}
      {activeAdminTab === 'categories' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Configurable Reward Rules & Waste Streams
              </h2>
              <p className="text-xs text-slate-500">
                Change EcoCoins rewarded per kg in real-time according to secondary market commodity economics
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(cat => (
              <div
                key={cat.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 capitalize text-sm">{cat.name}</h3>
                  <button
                    onClick={() => toggleCategoryStatus(cat.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      cat.isAccepting ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {cat.isAccepting ? 'Accepting' : 'Suspended'}
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600">
                    EcoCoins Reward Rate (Coins / kg)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={200}
                      value={cat.rewardRateCoinsPerKg}
                      onChange={e => updateCategoryRewardRate(cat.id, Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-mono font-bold text-sm"
                    />
                    <span className="text-xs text-slate-500 font-mono shrink-0">Coins/kg</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500">
                  Est. Avoided CO₂: <strong>{cat.co2SavedPerKg} kg / kg</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: USERS & ROLES */}
      {activeAdminTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                User Directory & Role Permissions
              </h2>
              <p className="text-xs text-slate-500">Citizens, Municipal Collectors, Facility Managers, and Administrators</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">User</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Eco ID</th>
                  <th className="py-2.5 px-3">Total Recycled</th>
                  <th className="py-2.5 px-3">Coins Balance</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{u.name}</div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                    </td>
                    <td className="py-3 px-3 capitalize font-mono font-medium">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-emerald-700">{u.ecoId}</td>
                    <td className="py-3 px-3 font-mono">{u.totalWasteRecycledKg} kg</td>
                    <td className="py-3 px-3 font-mono font-bold text-amber-600">{u.ecoCoins}</td>
                    <td className="py-3 px-3">
                      {u.isSuspended ? (
                        <span className="text-rose-600 font-bold text-[10px]">Suspended</span>
                      ) : (
                        <span className="text-emerald-700 font-semibold text-[10px]">Active</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => toggleUserSuspension(u.id)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                            u.isSuspended
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                          } transition-colors`}
                        >
                          {u.isSuspended ? 'Reactivate' : 'Suspend'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: ANTI-FRAUD & TRANSACTIONS */}
      {activeAdminTab === 'transactions' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                EcoCoin Ledger & Anti-Fraud Security Audit
              </h2>
              <p className="text-xs text-slate-500">
                All coin transactions are validated against volumetric hardware thresholds to prevent spoofing
              </p>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Anti-Fraud Safeguards Active</span>
            </div>
            <p>
              1. Single-deposit cap: Max 15 kg per transaction without physical attendant override.
              <br />
              2. Volumetric density sanity check: Weight must match ultrasonic chamber displacement.
              <br />
              3. Rate limiting: Max 3 deposit events per citizen within a 4-hour window.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {coinTransactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-medium text-slate-800">{tx.description}</td>
                    <td className="py-3 px-3 font-mono uppercase text-[10px] text-slate-500">{tx.type}</td>
                    <td className="py-3 px-3 font-mono font-bold">
                      <span className={tx.amount > 0 ? 'text-emerald-700' : 'text-slate-700'}>
                        {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Verified Valid
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 font-mono">
                      {new Date(tx.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Smart Bin Modal */}
      {isAddBinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Provision New Smart Bin</h3>
              <span className="text-xs font-mono text-slate-400">{newBin.binCode}</span>
            </div>

            <form onSubmit={handleAddBin} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bin Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Quad EcoStation"
                  value={newBin.name}
                  onChange={e => setNewBin({ ...newBin, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location District *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sector 8, Innovation Park"
                  value={newBin.location}
                  onChange={e => setNewBin({ ...newBin, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Waste Stream</label>
                  <select
                    value={newBin.primaryWasteType}
                    onChange={e => setNewBin({ ...newBin, primaryWasteType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {categories.map(c => (
                      <option key={c.key} value={c.key}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Capacity (Liters)</label>
                  <input
                    type="number"
                    min={50}
                    max={500}
                    value={newBin.capacityLiters}
                    onChange={e => setNewBin({ ...newBin, capacityLiters: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Alert Threshold (%)</label>
                <input
                  type="number"
                  min={50}
                  max={95}
                  value={newBin.thresholdPercent}
                  onChange={e => setNewBin({ ...newBin, thresholdPercent: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddBinModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs"
                >
                  Deploy Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
