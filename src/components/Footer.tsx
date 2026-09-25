import React from 'react';
import { Recycle, Heart, Shield, FileText, Mail, MapPin } from 'lucide-react';
import { useEcoCycle } from '../context/EcoCycleContext';

export const Footer: React.FC = () => {
  const { setActiveTab, openDocsModal } = useEcoCycle();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1: Brand & Tagline */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Recycle className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                EcoCycle <span className="text-emerald-400">Smart</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              “Waste Today. Resource Tomorrow.” Connecting IoT smart dustbins, conscious citizens, municipal collectors, and circular recycling facilities.
            </p>

            <div className="text-[11px] text-slate-500 font-mono">
              Designed for Hackathon & SIH Technical Demonstration.
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div className="space-y-2.5">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px] font-mono">
              Platform
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-white transition-colors cursor-pointer">
                  Smart Bin Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('categories')} className="hover:text-white transition-colors cursor-pointer">
                  Waste Streams
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('rewards')} className="hover:text-white transition-colors cursor-pointer">
                  EcoCoins Shop
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Operational Dashboards */}
          <div className="space-y-2.5">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px] font-mono">
              Dashboards
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors cursor-pointer">
                  Citizen Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors cursor-pointer">
                  Collector Dispatch
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors cursor-pointer">
                  Recycling Facility
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors cursor-pointer">
                  Admin Governance
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & Integrity */}
          <div className="space-y-2.5">
            <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px] font-mono">
              Integrity & Specs
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={openDocsModal} className="hover:text-white transition-colors cursor-pointer text-emerald-400 font-semibold">
                  Technical Docs & DDL
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('impact')} className="hover:text-white transition-colors cursor-pointer">
                  EPA WARM Standard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors cursor-pointer">
                  Academic Limitations
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Facility Onboarding
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} EcoCycle Smart Systems Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Anti-Fraud Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
