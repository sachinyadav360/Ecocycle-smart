import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Filter,
  Cpu,
  Battery,
  Clock,
  Sparkles,
  ArrowRight,
  Plus,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { useEcoCycle } from '../../context/EcoCycleContext';
import { SmartBin, BinStatus, WasteCategoryKey } from '../../types';

export const SmartBinMap: React.FC = () => {
  const {
    bins,
    categories,
    openDepositModal,
    openBinDetail,
    selectedBinDetail,
    closeBinDetail,
    openIoTSimulator,
    simulateIoTPayload,
  } = useEcoCycle();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedBinId, setSelectedBinId] = useState<string>(bins[0]?.id || '');

  const filteredBins = bins.filter(b => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.binCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || b.primaryWasteType === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const activeBin = bins.find(b => b.id === selectedBinId) || filteredBins[0] || bins[0];

  const getStatusBadge = (status: BinStatus) => {
    switch (status) {
      case 'available':
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Available</span>
          </span>
        );
      case 'almost_full':
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Almost Full</span>
          </span>
        );
      case 'collection_required':
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>Collection Required</span>
          </span>
        );
      case 'offline':
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            <span>Offline</span>
          </span>
        );
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Title & Overview Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md inline-block mb-1 border border-emerald-200">
            Municipal IoT Telemetry Grid
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Smart Dustbin Network
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time ultrasonic fill tracking, battery status, and automated collector dispatch triggers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openIoTSimulator}
            className="px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simulate Sensor Telemetry</span>
          </button>
          <button
            onClick={() => openDepositModal(activeBin)}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Deposit Waste Here</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by code (e.g. EC-102), location, or address..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {[
            { id: 'all', label: 'All Status' },
            { id: 'available', label: '🟢 Available' },
            { id: 'almost_full', label: '🟡 Almost Full' },
            { id: 'collection_required', label: '🔴 Collection Required' },
            { id: 'offline', label: '⚫ Offline' },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setStatusFilter(s.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === s.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Waste Streams</option>
            {categories.map(c => (
              <option key={c.key} value={c.key}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Map & Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Interactive Map Grid Canvas */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          
          {/* Simulated Cartographic Map UI with Real Coordinates and Responsive Pins */}
          <div className="relative aspect-[16/10] bg-[#eef3ee] overflow-hidden select-none border-b border-slate-200">
            {/* Map Grid Roads Background SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="city-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="0" cy="0" r="3" fill="#64748b" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#city-grid)" />
              {/* Stylized River */}
              <path
                d="M -10,320 C 200,280 400,360 700,310 C 900,280 1100,340 1300,300"
                fill="none"
                stroke="#93c5fd"
                strokeWidth="28"
                strokeLinecap="round"
                className="opacity-70"
              />
              <path
                d="M -10,320 C 200,280 400,360 700,310 C 900,280 1100,340 1300,300"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="8"
                strokeLinecap="round"
                className="opacity-60"
              />
              {/* Arterial Boulevards */}
              <line x1="80" y1="0" x2="650" y2="600" stroke="#cbd5e1" strokeWidth="12" />
              <line x1="0" y1="200" x2="1200" y2="220" stroke="#cbd5e1" strokeWidth="14" />
              <line x1="200" y1="0" x2="240" y2="600" stroke="#cbd5e1" strokeWidth="10" />
              <line x1="750" y1="0" x2="800" y2="600" stroke="#cbd5e1" strokeWidth="10" />
            </svg>

            {/* City Zone Labels */}
            <div className="absolute top-4 left-6 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded">
              Sector 5 · Green Valley
            </div>
            <div className="absolute bottom-4 right-6 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded">
              Waterfront Logistics Zone
            </div>

            {/* Interactive Pins on Map */}
            {filteredBins.map((bin, index) => {
              const isSelected = activeBin.id === bin.id;
              
              // Normalize lat/lng to viewport percentages for demo map
              // Base: 37.75 - 37.80 Lat (Y), -122.45 to -122.39 Lng (X)
              const latMin = 37.745;
              const latMax = 37.800;
              const lngMin = -122.455;
              const lngMax = -122.390;

              const posX = Math.max(8, Math.min(92, ((bin.longitude - lngMin) / (lngMax - lngMin)) * 100));
              const posY = Math.max(10, Math.min(90, (1 - (bin.latitude - latMin) / (latMax - latMin)) * 100));

              let pinColor = 'bg-emerald-600 text-white border-white';
              let ringColor = 'ring-emerald-400';
              if (bin.status === 'almost_full') {
                pinColor = 'bg-amber-500 text-white border-white';
                ringColor = 'ring-amber-400';
              } else if (bin.status === 'collection_required') {
                pinColor = 'bg-rose-600 text-white border-white animate-bounce';
                ringColor = 'ring-rose-500';
              } else if (bin.status === 'offline') {
                pinColor = 'bg-slate-600 text-white border-white';
                ringColor = 'ring-slate-400';
              }

              return (
                <div
                  key={bin.id}
                  style={{ left: `${posX}%`, top: `${posY}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                  onClick={() => setSelectedBinId(bin.id)}
                >
                  <div
                    className={`relative p-1.5 rounded-full border-2 shadow-lg transition-transform hover:scale-125 ${pinColor} ${
                      isSelected ? `scale-125 ring-4 ${ringColor}` : ''
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  
                  {/* Pin Tooltip Tag */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 -bottom-6 px-2 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap shadow-sm pointer-events-none transition-opacity ${
                      isSelected ? 'bg-slate-900 text-white opacity-100 z-30' : 'bg-white/90 text-slate-800 opacity-80'
                    }`}
                  >
                    {bin.binCode} · {bin.currentFillPercent}%
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Footer Bar */}
          <div className="p-4 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-4">
              <span>Showing <strong>{filteredBins.length}</strong> of {bins.length} connected bins</span>
              <span className="hidden sm:inline text-slate-400">|</span>
              <span className="hidden sm:inline">Coordinates calibrated for municipal test district</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-medium text-slate-500">Legend:</span>
              <span className="flex items-center gap-1 text-[11px]"><span className="w-2 h-2 rounded-full bg-emerald-500" /> &lt;70%</span>
              <span className="flex items-center gap-1 text-[11px]"><span className="w-2 h-2 rounded-full bg-amber-500" /> 70-84%</span>
              <span className="flex items-center gap-1 text-[11px]"><span className="w-2 h-2 rounded-full bg-rose-500" /> ≥85%</span>
            </div>
          </div>
        </div>

        {/* Right Side: Selected Bin Detail Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                Active Node Selection
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {activeBin.name}
              </h2>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                {activeBin.binCode} · {activeBin.address}
              </div>
            </div>

            <div>{getStatusBadge(activeBin.status)}</div>
          </div>

          {/* Fill Gauge */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-semibold text-slate-600">Fill Level (Ultrasonic Depth)</span>
              <span className={`text-2xl font-mono font-extrabold tabular-nums ${
                activeBin.currentFillPercent >= activeBin.thresholdPercent ? 'text-rose-600' : 'text-slate-900'
              }`}>
                {activeBin.currentFillPercent}%
              </span>
            </div>

            <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  activeBin.currentFillPercent >= activeBin.thresholdPercent
                    ? 'bg-rose-500'
                    : activeBin.currentFillPercent >= 70
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${activeBin.currentFillPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Threshold: {activeBin.thresholdPercent}%</span>
              <span>Available Capacity: ~{Math.round(activeBin.capacityLiters * (1 - activeBin.currentFillPercent / 100))} L</span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-slate-400 text-[10px] uppercase font-mono">Stream Type</div>
              <div className="font-bold text-slate-800 capitalize mt-0.5">{activeBin.primaryWasteType}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-slate-400 text-[10px] uppercase font-mono">Battery State</div>
              <div className="font-bold text-slate-800 font-mono mt-0.5 flex items-center gap-1">
                <Battery className="w-3.5 h-3.5 text-emerald-600" />
                <span>{activeBin.batteryPercent}%</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-slate-400 text-[10px] uppercase font-mono">Last Collection</div>
              <div className="font-semibold text-slate-700 text-[11px] mt-0.5">
                {new Date(activeBin.lastCollectionAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-slate-400 text-[10px] uppercase font-mono">Internal Temp</div>
              <div className="font-bold text-slate-800 font-mono mt-0.5">
                {activeBin.temperatureCelsius || 21.5}°C
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => openDepositModal(activeBin)}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Deposit Recyclable Material Here</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                // Quick calibrate fill to 94% to trigger collection
                simulateIoTPayload(activeBin.id, 94, activeBin.batteryPercent);
              }}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Simulate Trigger Full (94%)</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
