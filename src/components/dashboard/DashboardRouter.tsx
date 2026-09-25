import React from 'react';
import { useEcoCycle } from '../../context/EcoCycleContext';
import { CitizenDashboard } from './CitizenDashboard';
import { CollectorDashboard } from './CollectorDashboard';
import { FacilityDashboard } from './FacilityDashboard';
import { AdminDashboard } from './AdminDashboard';
import { UserCheck, Truck, Building2, ShieldCheck } from 'lucide-react';
import { UserRole } from '../../types';

export const DashboardRouter: React.FC = () => {
  const { currentUser, switchRole } = useEcoCycle();

  const roleTabs: { role: UserRole; label: string; icon: React.ReactNode }[] = [
    { role: 'citizen', label: 'Citizen Portal', icon: <UserCheck className="w-4 h-4" /> },
    { role: 'collector', label: 'Collector Logistics', icon: <Truck className="w-4 h-4" /> },
    { role: 'facility', label: 'Recycling Facility', icon: <Building2 className="w-4 h-4" /> },
    { role: 'admin', label: 'Admin Directorate', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Role Navigation Bar */}
      <div className="p-2 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] font-mono font-semibold uppercase text-slate-400 px-3 hidden sm:inline">
            Active Persona:
          </span>
          {roleTabs.map(tab => (
            <button
              key={tab.role}
              onClick={() => switchRole(tab.role)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                currentUser.role === tab.role
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono text-slate-500 pr-3 hidden md:block">
          Logged in as: <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.ecoId})
        </div>
      </div>

      {/* Render Component based on current active role */}
      {currentUser.role === 'citizen' && <CitizenDashboard />}
      {currentUser.role === 'collector' && <CollectorDashboard />}
      {currentUser.role === 'facility' && <FacilityDashboard />}
      {currentUser.role === 'admin' && <AdminDashboard />}

    </div>
  );
};
