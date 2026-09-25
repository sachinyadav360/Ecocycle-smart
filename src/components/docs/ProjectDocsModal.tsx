import React, { useState } from 'react';
import {
  X,
  FileCode,
  Database,
  Cpu,
  Server,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { useEcoCycle } from '../../context/EcoCycleContext';

export const ProjectDocsModal: React.FC = () => {
  const { isDocsModalOpen, closeDocsModal, showToast } = useEcoCycle();
  const [activeDocTab, setActiveDocTab] = useState<string>('architecture');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isDocsModalOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
    showToast('Copied to clipboard', 'info');
  };

  const navItems = [
    { id: 'architecture', label: '1. Architecture & Structure' },
    { id: 'setup', label: '2. Setup Instructions' },
    { id: 'env', label: '3. Environment Variables' },
    { id: 'schema', label: '4. PostgreSQL Schema (DDL)' },
    { id: 'api', label: '5. REST API Documentation' },
    { id: 'credentials', label: '6. Demo Personas & Credentials' },
    { id: 'iot', label: '7. Hardware & ESP32 Integration' },
    { id: 'deployment', label: '8. Deployment Guide' },
    { id: 'limitations', label: '9. Known Limitations' },
    { id: 'future', label: '10. Future Roadmap' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-4">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                EcoCycle Smart — Technical Specifications & Documentation
              </h2>
              <div className="text-xs text-slate-400 font-mono">
                System Blueprint · IoT Integration · Database DDL · API Contracts
              </div>
            </div>
          </div>

          <button
            onClick={closeDocsModal}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Sidebar Tabs */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Navigation Sidebar */}
          <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-3 space-y-1 overflow-y-auto shrink-0">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveDocTab(item.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  activeDocTab === item.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto text-xs text-slate-700 space-y-6 leading-relaxed">
            
            {/* 1. Architecture */}
            {activeDocTab === 'architecture' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">1. Complete Project Structure</h3>
                <p>
                  EcoCycle Smart is built as a modular circular waste-management web application. The frontend is built with React 19 + TypeScript + Vite and Tailwind CSS. The state store orchestrates IoT bin telemetry, citizen coin balances, collection requests, and 5-stage recycling batch flows.
                </p>
                <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-2xl overflow-x-auto leading-relaxed">
{`/ecocycle-smart
├── /src
│   ├── /assets/images          # Photorealistic AI-generated visual assets
│   ├── /components
│   │   ├── /landing            # Landing hero, problem, solution, 5-step flow, roadmap
│   │   ├── /bins               # Interactive SmartBinMap & pin telemetry drawer
│   │   ├── /dashboard          # Role-based dashboards (Citizen, Collector, Facility, Admin)
│   │   ├── /rewards            # EcoCoins marketplace & digital coupon generator
│   │   ├── /impact             # EPA WARM standard diversion analytics & charts
│   │   ├── /iot                # Deposit modal & real-time IoT hardware simulator
│   │   ├── /docs               # Architecture, DDL, and API specifications
│   │   └── Navbar.tsx, Footer.tsx
│   ├── /context
│   │   └── EcoCycleContext.tsx # Central circular economy state & persistence
│   ├── /data
│   │   └── initialData.ts      # Seed bins, municipal users, categories & conversion factors
│   ├── /types
│   │   └── index.ts            # Domain data interfaces & typescript models
│   ├── App.tsx, main.tsx, index.css
├── package.json, vite.config.ts, tsconfig.json`}
                </pre>
              </div>
            )}

            {/* 2. Setup Instructions */}
            {activeDocTab === 'setup' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">2. Setup Instructions</h3>
                <p>Follow these steps to run the application locally or in a dev container:</p>
                <div className="space-y-2">
                  <div className="font-semibold text-slate-900">Prerequisites:</div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Node.js v18.0.0 or higher</li>
                    <li>npm v9.0.0 or higher</li>
                  </ul>
                </div>
                <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-2xl overflow-x-auto">
{`# 1. Clone repository
git clone https://github.com/ecocycle/ecocycle-smart.git
cd ecocycle-smart

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
http://localhost:3000`}
                </pre>
              </div>
            )}

            {/* 3. Environment Variables */}
            {activeDocTab === 'env' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">3. Environment Variables Required</h3>
                <p>Configuration keys for development, production, and cloud deployment:</p>
                <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-2xl overflow-x-auto leading-relaxed">
{`# Application Port & URL
PORT=3000
VITE_APP_URL="http://localhost:3000"

# Optional Cloud Database Connection
DATABASE_URL="postgresql://ecocycle_user:password@localhost:5432/ecocycle_db"

# Optional IoT Ingestion Security Token
IOT_DEVICE_API_KEY="eco_device_sec_7894a8c"

# Optional Gemini API Key for Edge Waste Vision Classification
GEMINI_API_KEY="your_api_key_here"`}
                </pre>
              </div>
            )}

            {/* 4. Database Schema (PostgreSQL DDL) */}
            {activeDocTab === 'schema' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">4. Relational Database Schema (PostgreSQL DDL)</h3>
                  <button
                    onClick={() => copyToClipboard(`CREATE TABLE users ...`, 'ddl')}
                    className="text-emerald-700 font-mono flex items-center gap-1 hover:underline"
                  >
                    {copiedSection === 'ddl' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy SQL</span>
                  </button>
                </div>
                <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-2xl overflow-x-auto max-h-96 leading-relaxed">
{`-- 1. Users Table (Citizens, Collectors, Facilities, Admins)
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(180) UNIQUE NOT NULL,
    phone VARCHAR(30),
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('citizen', 'collector', 'facility', 'admin')),
    eco_coins INTEGER DEFAULT 0,
    eco_level VARCHAR(30) DEFAULT 'Eco Beginner',
    total_waste_recycled_kg NUMERIC(10,2) DEFAULT 0.00,
    recycling_events_count INTEGER DEFAULT 0,
    location VARCHAR(120),
    eco_id VARCHAR(30) UNIQUE NOT NULL,
    is_suspended BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Smart Dustbins Table (IoT Telemetry Nodes)
CREATE TABLE smart_bins (
    id VARCHAR(36) PRIMARY KEY,
    bin_code VARCHAR(30) UNIQUE NOT NULL,
    name VARCHAR(120) NOT NULL,
    location VARCHAR(120) NOT NULL,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    capacity_liters INTEGER NOT NULL,
    current_fill_percent INTEGER DEFAULT 0 CHECK (current_fill_percent BETWEEN 0 AND 100),
    status VARCHAR(30) DEFAULT 'available' CHECK (status IN ('available', 'almost_full', 'collection_required', 'offline')),
    primary_waste_type VARCHAR(30) NOT NULL,
    battery_percent INTEGER DEFAULT 100,
    threshold_percent INTEGER DEFAULT 85,
    temperature_celsius NUMERIC(4,1),
    last_collection_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Waste Records (Individual Deposit Events)
CREATE TABLE waste_records (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
    bin_id VARCHAR(36) REFERENCES smart_bins(id) ON DELETE RESTRICT,
    waste_type VARCHAR(30) NOT NULL,
    weight_kg NUMERIC(8,2) NOT NULL,
    coins_earned INTEGER NOT NULL,
    verified_status VARCHAR(20) DEFAULT 'verified',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. EcoCoin Ledger Transactions
CREATE TABLE coin_transactions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('earned', 'redeemed', 'bonus', 'donation')),
    description TEXT NOT NULL,
    reference_id VARCHAR(36),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Collection Requests Queue (On-Demand Dispatch)
CREATE TABLE collection_requests (
    id VARCHAR(36) PRIMARY KEY,
    bin_id VARCHAR(36) REFERENCES smart_bins(id) ON DELETE CASCADE,
    collector_id VARCHAR(36) REFERENCES users(id),
    fill_level_at_request INTEGER NOT NULL,
    priority VARCHAR(20) DEFAULT 'urgent' CHECK (priority IN ('normal', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_transit', 'collected')),
    collected_weight_kg NUMERIC(8,2),
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    collected_at TIMESTAMP WITH TIME ZONE
);

-- 6. Circular Recycling Facilities & Batch Mass Balance
CREATE TABLE recycling_records (
    id VARCHAR(36) PRIMARY KEY,
    batch_code VARCHAR(30) UNIQUE NOT NULL,
    facility_id VARCHAR(36) NOT NULL,
    waste_type VARCHAR(30) NOT NULL,
    collected_weight_kg NUMERIC(10,2) NOT NULL,
    sorted_weight_kg NUMERIC(10,2) DEFAULT 0.00,
    processed_weight_kg NUMERIC(10,2) DEFAULT 0.00,
    recycled_material_yield_kg NUMERIC(10,2) DEFAULT 0.00,
    processing_status VARCHAR(20) DEFAULT 'received' CHECK (processing_status IN ('received', 'sorted', 'processed', 'recycled', 'reused')),
    collected_date DATE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
                </pre>
              </div>
            )}

            {/* 5. REST API Documentation */}
            {activeDocTab === 'api' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">5. REST API Endpoints</h3>
                <div className="space-y-3 font-mono text-[11px]">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-blue-700">POST</span> /api/v1/auth/login
                    <div className="text-slate-500 font-sans mt-1">Authenticate user by email/password; returns JWT session token.</div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-emerald-700">POST</span> /api/v1/iot/telemetry
                    <div className="text-slate-500 font-sans mt-1">Ingests ESP32/sensor packet ({'{ bin_id, fill_level, battery }'}). Automatically triggers collection if &gt; threshold.</div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-emerald-700">POST</span> /api/v1/waste-records
                    <div className="text-slate-500 font-sans mt-1">Logs citizen waste deposit, validates anti-fraud caps, and credits EcoCoins.</div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-purple-700">GET</span> /api/v1/bins
                    <div className="text-slate-500 font-sans mt-1">Fetches all connected smart bins with fill percentages, GPS coords, and status.</div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-amber-700">PATCH</span> /api/v1/collection-requests/:id/accept
                    <div className="text-slate-500 font-sans mt-1">Collector claims pending request for route pickup.</div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-amber-700">PATCH</span> /api/v1/collection-requests/:id/complete
                    <div className="text-slate-500 font-sans mt-1">Marks bin collected, resets bin fill to 0%, and dispatches batch to recycling facility.</div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. Demo Credentials */}
            {activeDocTab === 'credentials' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">6. Demo Personas & Credentials</h3>
                <p>You can instantly switch perspectives using the Persona Switcher in the top navigation bar, or log in with these demo accounts:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                    <div className="font-bold text-slate-900">Citizen: Maya Lin</div>
                    <div className="text-slate-500 font-mono text-[11px]">Email: maya.lin@ecocycle.org</div>
                    <div className="text-slate-500 font-mono text-[11px]">Role: citizen (Eco Explorer)</div>
                    <div className="text-emerald-700 font-semibold text-[11px]">Password: citizen123</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                    <div className="font-bold text-slate-900">Collector: Marcus Vance</div>
                    <div className="text-slate-500 font-mono text-[11px]">Email: marcus.vance@citylogistics.io</div>
                    <div className="text-slate-500 font-mono text-[11px]">Role: collector (Logistics Route #4)</div>
                    <div className="text-amber-700 font-semibold text-[11px]">Password: collector123</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                    <div className="font-bold text-slate-900">Facility: Elena Rostova</div>
                    <div className="text-slate-500 font-mono text-[11px]">Email: elena@greentechloop.org</div>
                    <div className="text-slate-500 font-mono text-[11px]">Role: facility (Polymer Recovery)</div>
                    <div className="text-blue-700 font-semibold text-[11px]">Password: facility123</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                    <div className="font-bold text-slate-900">Admin: Sarah Jenkins</div>
                    <div className="text-slate-500 font-mono text-[11px]">Email: sarah.jenkins@ecocycle.gov</div>
                    <div className="text-slate-500 font-mono text-[11px]">Role: admin (Directorate)</div>
                    <div className="text-purple-700 font-semibold text-[11px]">Password: admin123</div>
                  </div>
                </div>
              </div>
            )}

            {/* 7. IoT Hardware & ESP32 Integration */}
            {activeDocTab === 'iot' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">7. Connecting Real IoT Hardware</h3>
                <p>
                  To interface a physical smart dustbin, connect an <strong>ESP32 Microcontroller</strong> with an <strong>HC-SR04 Ultrasonic Sensor</strong> (mounted inside bin lid) and an <strong>HX711 4-Point Load Cell</strong> (mounted on base platform).
                </p>
                <div className="space-y-1">
                  <div className="font-semibold text-slate-900">Pinout Connections:</div>
                  <ul className="list-disc pl-5 space-y-0.5 font-mono text-[11px]">
                    <li>HC-SR04 TRIG: GPIO 5</li>
                    <li>HC-SR04 ECHO: GPIO 18</li>
                    <li>HX711 DOUT: GPIO 21, SCK: GPIO 22</li>
                    <li>Power: 3.7V 18650 Li-ion + TP4056 5V Solar Step-up</li>
                  </ul>
                </div>

                <div className="font-semibold text-slate-900">Sample Arduino C++ Code:</div>
                <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-2xl overflow-x-auto leading-relaxed">
{`#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverUrl = "https://your-domain.com/api/v1/iot/telemetry";

const int TRIG_PIN = 5;
const int ECHO_PIN = 18;
const float BIN_DEPTH_CM = 100.0; // Total height of bin

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  WiFi.begin(ssid, password);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // 1. Measure distance via ultrasound
    digitalWrite(TRIG_PIN, LOW); delayMicroseconds(2);
    digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(10);
    digitalWrite(TRIG_PIN, LOW);
    long duration = pulseIn(ECHO_PIN, HIGH);
    float distanceCm = duration * 0.034 / 2;

    // 2. Compute fill percentage
    int fillPercent = constrain(map(BIN_DEPTH_CM - distanceCm, 0, BIN_DEPTH_CM, 0, 100), 0, 100);

    // 3. Post telemetry payload
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    StaticJsonDocument<200> doc;
    doc["bin_id"] = "EC-102";
    doc["fill_level"] = fillPercent;
    doc["battery"] = 92;

    String requestBody;
    serializeJson(doc, requestBody);
    int httpResponseCode = http.POST(requestBody);
    Serial.println(httpResponseCode);
    http.end();
  }
  delay(60000); // Send telemetry every 60 seconds
}`}
                </pre>
              </div>
            )}

            {/* 8. Deployment */}
            {activeDocTab === 'deployment' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">8. Deployment Guide</h3>
                <p>The application builds cleanly for modern containerized cloud hosting (Google Cloud Run, AWS App Runner, Vercel):</p>
                <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-2xl overflow-x-auto leading-relaxed">
{`# 1. Compile optimized frontend assets
npm run build

# 2. Output is located in /dist
# 3. For Docker deployment, use standard Node 20 alpine image:
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}
                </pre>
              </div>
            )}

            {/* 9. Known Limitations */}
            {activeDocTab === 'limitations' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">9. Known Limitations & Integrity Statement</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Simulated Sensor Feeds in Prototype:</strong> Unless physical microcontrollers are actively streaming to the webhook endpoint, bin fullness is updated via realistic mock events and the IoT Simulator panel.
                  </li>
                  <li>
                    <strong>Environmental Factors:</strong> Carbon, energy, and water metrics are scientific estimates based on published US EPA WARM v15 recovery coefficients, not absolute physical laboratory measurements.
                  </li>
                  <li>
                    <strong>Internal Loyalty Points:</strong> EcoCoins are digital loyalty credits intended for partner merchandise, local discounts, and tree donations; they do not constitute legal tender or guaranteed currency.
                  </li>
                </ul>
              </div>
            )}

            {/* 10. Future Improvements */}
            {activeDocTab === 'future' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">10. Future Improvements</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Edge-AI camera classification directly on Raspberry Pi / ESP32-CAM to prevent mixed-waste contamination before flap unlock.</li>
                  <li>LoRaWAN gateways for ultra-low power transmission in dense underground subway stations.</li>
                  <li>Dynamic vehicle routing algorithm integrating live GPS traffic data for municipal truck dispatch.</li>
                  <li>Blockchain / verifiable decentralized ESG ledger for corporate carbon credit certification.</li>
                </ul>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
