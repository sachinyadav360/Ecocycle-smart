import React, { useState } from 'react';
import {
  Building2,
  Layers,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Package,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useEcoCycle } from '../../context/EcoCycleContext';
import { ProcessingStage, RecyclingRecord } from '../../types';

export const FacilityDashboard: React.FC = () => {
  const {
    currentUser,
    recyclingRecords,
    facilities,
    updateRecyclingStage,
  } = useEcoCycle();

  const currentFacility = facilities[0];

  const stages: { stage: ProcessingStage; label: string; desc: string }[] = [
    { stage: 'received', label: '1. Received', desc: 'Arrived at gate & weighed' },
    { stage: 'sorted', label: '2. Sorted', desc: 'Separated by resin & grade' },
    { stage: 'processed', label: '3. Processed', desc: 'Washed, decontaminated, shredded' },
    { stage: 'recycled', label: '4. Recycled', desc: 'Extruded into pure flakes / pellets' },
    { stage: 'reused', label: '5. Reused', desc: 'Shipped to partner manufacturer' },
  ];

  // Mass balance summary
  const totalCollected = recyclingRecords.reduce((acc, r) => acc + r.collectedWeightKg, 0);
  const totalSorted = recyclingRecords.reduce((acc, r) => acc + r.sortedWeightKg, 0);
  const totalProcessed = recyclingRecords.reduce((acc, r) => acc + r.processedWeightKg, 0);
  const totalYield = recyclingRecords.reduce((acc, r) => acc + r.recycledMaterialYieldKg, 0);

  const getStageIndex = (st: ProcessingStage) => {
    switch (st) {
      case 'received': return 0;
      case 'sorted': return 1;
      case 'processed': return 2;
      case 'recycled': return 3;
      case 'reused': return 4;
    }
  };

  const advanceStage = (rec: RecyclingRecord) => {
    const curIdx = getStageIndex(rec.processingStatus);
    if (curIdx < stages.length - 1) {
      const nextStage = stages[curIdx + 1].stage;
      updateRecyclingStage(rec.id, nextStage);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{currentFacility.name}</h1>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                Certified Circular Processor
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {currentFacility.location} · {currentFacility.facilityType} · Capacity: {currentFacility.dailyCapacityKg} kg/day
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs font-semibold text-slate-400 uppercase font-mono">Certified Mass Yield Rate</div>
          <div className="text-xl font-bold text-emerald-700 font-mono">
            {totalSorted > 0 ? ((totalYield / totalSorted) * 100).toFixed(1) : '89.5'}% Circular Efficiency
          </div>
        </div>
      </div>

      {/* Mass-Balance Stage Progression Cards (Database Driven) */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Facility-Wide Mass Balance & Yield Accounting
            </h2>
            <p className="text-xs text-slate-500">
              Database-driven tracking through each physical transformation stage
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">Total Batches: {recyclingRecords.length}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] font-semibold text-slate-400 uppercase font-mono">1. Total Intake</div>
            <div className="text-2xl font-black text-slate-900 font-mono mt-1 tabular-nums">
              {totalCollected} <span className="text-xs text-slate-500">kg</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Gross delivered by trucks</div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
            <div className="text-[11px] font-semibold text-blue-700 uppercase font-mono">2. Sorted Mass</div>
            <div className="text-2xl font-black text-blue-900 font-mono mt-1 tabular-nums">
              {totalSorted} <span className="text-xs text-blue-600">kg</span>
            </div>
            <div className="text-[11px] text-blue-700 mt-1">Clean polymer / scrap grade</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
            <div className="text-[11px] font-semibold text-amber-700 uppercase font-mono">3. Processed Flakes</div>
            <div className="text-2xl font-black text-amber-900 font-mono mt-1 tabular-nums">
              {totalProcessed} <span className="text-xs text-amber-600">kg</span>
            </div>
            <div className="text-[11px] text-amber-700 mt-1">Washed & decontaminated</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <div className="text-[11px] font-semibold text-emerald-800 uppercase font-mono">4. Recycled Material Output</div>
            <div className="text-2xl font-black text-emerald-900 font-mono mt-1 tabular-nums">
              {totalYield} <span className="text-xs text-emerald-700">kg</span>
            </div>
            <div className="text-[11px] text-emerald-700 mt-1">Virgin-grade circular pellets</div>
          </div>
        </div>
      </div>

      {/* Incoming Waste Shipments & Interactive Workflow Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Active Processing Batches
            </h2>
            <p className="text-xs text-slate-500">
              Click “Advance Stage” to simulate batch workflow from Received to Reused
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {recyclingRecords.map(rec => {
            const currentIdx = getStageIndex(rec.processingStatus);
            return (
              <div
                key={rec.id}
                className="p-5 rounded-2xl bg-[#fafcfa] border border-slate-200 hover:border-emerald-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                      {rec.batchCode}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-800 capitalize">
                        {rec.wasteType} · {rec.collectedWeightKg} kg Gross Intake
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        Source: {rec.sourceCollector} · Date: {rec.collectedDate}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 capitalize">
                      Stage: {rec.processingStatus}
                    </span>
                    {currentIdx < stages.length - 1 && (
                      <button
                        onClick={() => advanceStage(rec)}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Advance Stage →
                      </button>
                    )}
                  </div>
                </div>

                {/* 5-Step Stage Indicator */}
                <div className="grid grid-cols-5 gap-1.5">
                  {stages.map((st, sIdx) => {
                    const isDone = sIdx <= currentIdx;
                    const isCurrent = sIdx === currentIdx;
                    return (
                      <div
                        key={st.stage}
                        className={`p-2 rounded-lg text-center text-[10px] font-mono border transition-colors ${
                          isCurrent
                            ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-xs'
                            : isDone
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold'
                            : 'bg-slate-100 text-slate-400 border-slate-200'
                        }`}
                      >
                        <div className="truncate">{st.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Mass Yield Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1 text-slate-600">
                  <div className="p-2 bg-white rounded-lg border border-slate-200/80">
                    <span className="text-slate-400 text-[10px] block">Intake Weight</span>
                    <strong className="font-mono text-slate-800">{rec.collectedWeightKg} kg</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200/80">
                    <span className="text-slate-400 text-[10px] block">Sorted Weight</span>
                    <strong className="font-mono text-slate-800">{rec.sortedWeightKg || '—'} kg</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200/80">
                    <span className="text-slate-400 text-[10px] block">Clean Flakes</span>
                    <strong className="font-mono text-slate-800">{rec.processedWeightKg || '—'} kg</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200/80">
                    <span className="text-slate-400 text-[10px] block">Circular Output</span>
                    <strong className="font-mono text-emerald-700">{rec.recycledMaterialYieldKg || '—'} kg</strong>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 italic">
                  Intended Application: {rec.intendedOutput}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
