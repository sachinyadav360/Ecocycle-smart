import React, { useState } from 'react';
import {
  X,
  Cpu,
  Send,
  Radio,
  Sliders,
  Battery,
  AlertTriangle,
  Code,
  Copy,
  Check,
} from 'lucide-react';
import { useEcoCycle } from '../../context/EcoCycleContext';

export const IoTSimulatorModal: React.FC = () => {
  const {
    isIoTSimulatorOpen,
    closeIoTSimulator,
    bins,
    simulateIoTPayload,
    showToast,
  } = useEcoCycle();

  if (!isIoTSimulatorOpen) return null;

  const [selectedBinId, setSelectedBinId] = useState<string>(bins[1]?.id || bins[0]?.id || '');
  const [fillLevel, setFillLevel] = useState<number>(92);
  const [battery, setBattery] = useState<number>(87);
  const [temperature, setTemperature] = useState<number>(22.4);
  const [copied, setCopied] = useState(false);

  const selectedBin = bins.find(b => b.id === selectedBinId) || bins[0];

  const payload = {
    bin_id: selectedBin.binCode,
    fill_level: fillLevel,
    battery: battery,
    temperature_celsius: temperature,
    threshold_limit: selectedBin.thresholdPercent,
    timestamp: new Date().toISOString(),
    firmware_version: 'EcoNode-ESP32-v2.1',
  };

  const handleSendTelemetry = (e: React.FormEvent) => {
    e.preventDefault();
    simulateIoTPayload(selectedBin.id, fillLevel, battery);
    showToast(`Dispatched telemetry: ${selectedBin.binCode} at ${fillLevel}% fill level.`, 'success');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Copied JSON payload to clipboard', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0f172a] text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-800 my-8 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  IoT Hardware Telemetry Simulator
                </h2>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="text-xs text-slate-400 font-mono">
                HC-SR04 Ultrasonic & LoRaWAN Node Dispatch Tester
              </div>
            </div>
          </div>

          <button
            onClick={closeIoTSimulator}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSendTelemetry} className="space-y-4">
          
          {/* Target Bin Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Select Connected Node Target
            </label>
            <select
              value={selectedBinId}
              onChange={e => {
                const b = bins.find(item => item.id === e.target.value);
                setSelectedBinId(e.target.value);
                if (b) {
                  setFillLevel(b.currentFillPercent);
                  setBattery(b.batteryPercent);
                }
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            >
              {bins.map(b => (
                <option key={b.id} value={b.id}>
                  {b.binCode} — {b.name} (Current: {b.currentFillPercent}%, Threshold: {b.thresholdPercent}%)
                </option>
              ))}
            </select>
          </div>

          {/* Fill Level Slider */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span>Simulated Ultrasonic Depth Fill Level</span>
              </span>
              <span className={`font-mono text-base font-extrabold ${
                fillLevel >= selectedBin.thresholdPercent ? 'text-rose-400' : 'text-emerald-400'
              }`}>
                {fillLevel}%
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={fillLevel}
              onChange={e => setFillLevel(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />

            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% (Empty)</span>
              <span>Threshold Trigger: {selectedBin.thresholdPercent}%</span>
              <span>100% (Critical)</span>
            </div>

            {fillLevel >= selectedBin.thresholdPercent && (
              <div className="text-[11px] text-rose-300 font-mono bg-rose-950/60 border border-rose-900/60 p-2 rounded-lg flex items-center gap-2 mt-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Crossing {selectedBin.thresholdPercent}% threshold will immediately spawn an automated Collector Request and alert the Municipal Dispatch Queue.</span>
              </div>
            )}
          </div>

          {/* Battery Slider */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Battery className="w-3.5 h-3.5 text-slate-400" />
                <span>Solar Battery Charge</span>
              </span>
              <span className="font-mono text-xs font-bold text-slate-200">{battery}%</span>
            </div>

            <input
              type="range"
              min={2}
              max={100}
              value={battery}
              onChange={e => setBattery(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* JSON Payload Inspector */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>POST /api/v1/iot/telemetry Payload</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>

            <pre className="p-3 bg-black/60 border border-slate-800 rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeIoTSimulator}
              className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Telemetry Packet</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
