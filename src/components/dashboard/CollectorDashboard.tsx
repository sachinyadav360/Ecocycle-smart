import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Navigation,
  ArrowRight,
  Building2,
  Scale,
  RefreshCw,
} from 'lucide-react';
import { useEcoCycle } from '../../context/EcoCycleContext';
import { CollectionRequest } from '../../types';

export const CollectorDashboard: React.FC = () => {
  const {
    currentUser,
    requests,
    bins,
    facilities,
    acceptCollectionRequest,
    completeCollection,
    setActiveTab,
  } = useEcoCycle();

  const [completingReq, setCompletingReq] = useState<CollectionRequest | null>(null);
  const [collectedWeight, setCollectedWeight] = useState<number>(45);
  const [selectedFacility, setSelectedFacility] = useState<string>(facilities[0]?.id || '');

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const myAcceptedRequests = requests.filter(
    r => r.status === 'accepted' && r.assignedCollectorId === currentUser.id
  );
  const collectedHistory = requests.filter(r => r.status === 'collected');

  const fullBins = bins.filter(b => b.currentFillPercent >= b.thresholdPercent);

  const handleConfirmCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completingReq) return;

    completeCollection(completingReq.id, collectedWeight, selectedFacility);
    setCompletingReq(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
            <Truck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{currentUser.name}</h1>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                Logistics Unit · {currentUser.ecoId}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Assigned Route: Sector 5 & Transit Terminals · 4G Dynamic Dispatch Active
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('map')}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-emerald-600" />
            <span>Open Fleet Route Map</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Urgent Dispatch Queue
          </div>
          <div className="text-2xl font-black text-rose-600 font-mono tabular-nums">
            {pendingRequests.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Bins exceeding configured capacity threshold
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            My Active Route Picks
          </div>
          <div className="text-2xl font-black text-amber-600 font-mono tabular-nums">
            {myAcceptedRequests.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Currently claimed for this collection run
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Total Material Dispatched
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums">
            {currentUser.totalWasteRecycledKg} <span className="text-sm font-medium text-slate-500">kg</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Routed to certified recycling plants
          </div>
        </div>
      </div>

      {/* Active Work Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Pending Requests to Accept */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Incoming Collection Alerts
              </h2>
              <p className="text-xs text-slate-500">Automated IoT sensor threshold triggers</p>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700">
              {pendingRequests.length} Pending
            </span>
          </div>

          <div className="space-y-3">
            {pendingRequests.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                No pending collection alerts right now. Bins are operating normally!
              </div>
            ) : (
              pendingRequests.map(req => (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200/80 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-slate-900">{req.binCode}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                          {req.priority} Priority
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{req.location}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-mono font-black text-rose-600">
                        {req.fillLevelAtRequest}%
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono">Fill Level</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-rose-100">
                    <span className="text-[11px] text-slate-500 font-mono">
                      Alert Triggered: {new Date(req.requestedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                    <button
                      onClick={() => acceptCollectionRequest(req.id)}
                      className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      Accept Collection →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: In-Progress Pickups (Claimed by Collector) */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                My Active Collection Route
              </h2>
              <p className="text-xs text-slate-500">Pick up, weigh, and log delivery to facility</p>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700">
              {myAcceptedRequests.length} Claimed
            </span>
          </div>

          <div className="space-y-3">
            {myAcceptedRequests.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                No active route jobs. Accept an incoming alert on the left to start!
              </div>
            ) : (
              myAcceptedRequests.map(req => (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-mono text-sm font-bold text-slate-900">{req.binCode}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{req.location}</div>
                    </div>
                    <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      In Route
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-amber-100">
                    <span className="text-xs text-slate-500">Ready to unload at bin</span>
                    <button
                      onClick={() => setCompletingReq(req)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      Mark Collected & Dispatch →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Collection History Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
          Recent Completed Route Pickups
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Bin Code</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Collected Weight</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {collectedHistory.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{item.binCode}</td>
                  <td className="py-2.5 px-3 text-slate-600">{item.location}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-800 tabular-nums">
                    {item.collectedWeightKg || 48.5} kg
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Dispatched to Facility
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 font-mono">
                    {item.collectedAt ? new Date(item.collectedAt).toLocaleDateString() : 'Today'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Complete Collection Modal */}
      {completingReq && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="text-base font-bold text-slate-900">
                Log Pickup & Dispatch
              </div>
              <span className="font-mono text-xs text-slate-400">{completingReq.binCode}</span>
            </div>

            <form onSubmit={handleConfirmCollection} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gross Weight Collected (kg)
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  step={0.5}
                  value={collectedWeight}
                  onChange={e => setCollectedWeight(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Measured on vehicle onboard scale or bin load-cell.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Recycling Facility
                </label>
                <select
                  value={selectedFacility}
                  onChange={e => setSelectedFacility(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {facilities.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.facilityType})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800">
                Completing this collection will automatically reset {completingReq.binCode}’s fill level to 0% and create a pending intake shipment at the facility.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCompletingReq(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Confirm Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
