import React, { useState } from 'react';
import {
  Recycle,
  MapPin,
  Cpu,
  Bell,
  Coins,
  ShieldCheck,
  UserCheck,
  Truck,
  Building2,
  Menu,
  X,
  FileCode,
  RotateCcw,
} from 'lucide-react';
import { useEcoCycle } from '../context/EcoCycleContext';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    switchRole,
    activeTab,
    setActiveTab,
    openDepositModal,
    openIoTSimulator,
    openDocsModal,
    notifications,
    markAllNotificationsAsRead,
    resetToDemoDefaults,
  } = useEcoCycle();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'map', label: 'Smart Bins' },
    { id: 'categories', label: 'Categories' },
    { id: 'impact', label: 'Impact' },
    { id: 'rewards', label: 'Rewards' },
    { id: 'dashboard', label: 'Dashboard' },
  ];

  const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    { role: 'citizen', label: 'Citizen (Maya)', icon: <UserCheck className="w-4 h-4 text-emerald-600" />, desc: 'Recycle waste & earn EcoCoins' },
    { role: 'collector', label: 'Collector (Marcus)', icon: <Truck className="w-4 h-4 text-amber-600" />, desc: 'Route alerts & bin pickups' },
    { role: 'facility', label: 'Recycling Facility', icon: <Building2 className="w-4 h-4 text-blue-600" />, desc: 'Material sorting & processing' },
    { role: 'admin', label: 'Admin Console', icon: <ShieldCheck className="w-4 h-4 text-purple-600" />, desc: 'Network oversight & rules' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10">
      {/* Demo Mode Notice Banner */}
      <div className="bg-emerald-900 text-emerald-100 text-xs px-4 py-1.5 flex items-center justify-between font-mono">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-semibold text-emerald-200">DEMO ENVIRONMENT</span>
          <span className="hidden sm:inline text-emerald-300/80">· Simulated IoT sensor streams & EPA standard impact formulas</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={openDocsModal}
            className="text-emerald-200 hover:text-white underline flex items-center gap-1 cursor-pointer transition-colors"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Architecture & Docs</span>
          </button>
          <span className="text-emerald-700">|</span>
          <button
            onClick={resetToDemoDefaults}
            title="Reset demo data to initial state"
            className="text-emerald-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden md:inline">Reset Data</span>
          </button>
        </div>
      </div>

      {/* Main Top Bar (Strict 3-zone contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm group-hover:bg-emerald-700 transition-colors">
            <Recycle className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">
              EcoCycle <span className="text-emerald-600">Smart</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide">
              IoT Circular Waste
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
          {navLinks.map(link => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick IoT Hardware Simulator Button */}
          <button
            onClick={openIoTSimulator}
            title="Simulate IoT Hardware & Telemetry"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden md:inline">IoT Sim</span>
          </button>

          {/* Persona / Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-xs font-medium text-slate-800 transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="capitalize font-semibold">{currentUser.role}</span>
              <span className="text-slate-400">▾</span>
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Active Persona
                </div>
                {roles.map(r => (
                  <button
                    key={r.role}
                    onClick={() => {
                      switchRole(r.role);
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-start gap-2.5 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      currentUser.role === r.role ? 'bg-emerald-50 text-emerald-900' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="mt-0.5">{r.icon}</div>
                    <div>
                      <div className="text-xs font-semibold">{r.label}</div>
                      <div className="text-[11px] text-slate-500">{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User EcoCoins Quick Badge */}
          {currentUser.role === 'citizen' && (
            <button
              onClick={() => setActiveTab('rewards')}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200/60 text-xs font-bold text-amber-900 cursor-pointer hover:bg-amber-100 transition-colors"
            >
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span className="tabular-nums">{currentUser.ecoCoins}</span>
              <span className="text-[10px] font-medium text-amber-700">Coins</span>
            </button>
          )}

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Drawer Popover */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-800">
                    Live System Alerts ({notifications.length})
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-[11px] text-emerald-600 hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto space-y-2 mt-2">
                  {notifications.slice(0, 6).map(n => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-lg text-xs transition-colors ${
                        n.read ? 'bg-slate-50 text-slate-600' : 'bg-emerald-50/70 border border-emerald-100 text-slate-900 font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                        <span className="uppercase font-semibold tracking-wider text-emerald-700">{n.type}</span>
                        <span>{new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="font-semibold text-slate-900">{n.title}</div>
                      <div className="text-slate-600 text-[11px] mt-0.5">{n.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Primary Action Button: Recycle Waste */}
          <button
            onClick={() => openDepositModal()}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Recycle className="w-3.5 h-3.5" />
            <span>Recycle Waste</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3 py-2 text-xs font-medium rounded-lg text-left ${
                  activeTab === link.id ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">
              Switch Persona
            </div>
            <div className="grid grid-cols-2 gap-2">
              {roles.map(r => (
                <button
                  key={r.role}
                  onClick={() => {
                    switchRole(r.role);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-lg text-xs font-medium text-left border ${
                    currentUser.role === r.role
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <div className="font-semibold">{r.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
