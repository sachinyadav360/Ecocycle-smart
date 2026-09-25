import React from 'react';
import { EcoCycleProvider, useEcoCycle } from './context/EcoCycleContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { SmartBinMap } from './components/bins/SmartBinMap';
import { DashboardRouter } from './components/dashboard/DashboardRouter';
import { RewardsShop } from './components/rewards/RewardsShop';
import { ImpactView } from './components/impact/ImpactView';
import { HowItWorksSection } from './components/landing/HowItWorksSection';
import { CategoriesSection } from './components/landing/CategoriesSection';
import { AboutSection } from './components/landing/AboutSection';
import { ContactSection } from './components/landing/ContactSection';
import { DepositModal } from './components/iot/DepositModal';
import { IoTSimulatorModal } from './components/iot/IoTSimulatorModal';
import { ProjectDocsModal } from './components/docs/ProjectDocsModal';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, toast } = useEcoCycle();

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fbf9]">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'home' && <LandingPage />}
        {activeTab === 'map' && <SmartBinMap />}
        {activeTab === 'dashboard' && <DashboardRouter />}
        {activeTab === 'rewards' && <RewardsShop />}
        {activeTab === 'impact' && <ImpactView />}
        {activeTab === 'how-it-works' && (
          <div className="pt-6">
            <HowItWorksSection />
          </div>
        )}
        {activeTab === 'categories' && (
          <div className="pt-6">
            <CategoriesSection />
          </div>
        )}
        {activeTab === 'about' && (
          <div className="pt-6">
            <AboutSection />
          </div>
        )}
        {activeTab === 'contact' && (
          <div className="pt-6">
            <ContactSection />
          </div>
        )}
      </main>

      <Footer />

      {/* Global Modals */}
      <DepositModal />
      <IoTSimulatorModal />
      <ProjectDocsModal />

      {/* Toast Notification Banner */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div className={`p-4 rounded-2xl shadow-xl border flex items-center gap-3 text-xs font-semibold ${
            toast.type === 'success'
              ? 'bg-emerald-900 text-white border-emerald-700'
              : toast.type === 'warning'
              ? 'bg-amber-900 text-white border-amber-700'
              : 'bg-slate-900 text-white border-slate-700'
          }`}>
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <EcoCycleProvider>
      <MainContent />
    </EcoCycleProvider>
  );
}
