import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Phone, Building2, HelpCircle } from 'lucide-react';
import { useEcoCycle } from '../../context/EcoCycleContext';

export const ContactSection: React.FC = () => {
  const { showToast } = useEcoCycle();
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill in all required fields.', 'warning');
      return;
    }
    setSubmitted(true);
    showToast('Inquiry submitted! Our sustainability team will reach out shortly.', 'success');
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#f9fbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Context & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Connect With EcoCycle Smart
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Whether you are an academic researcher, municipal authority, private waste collector, or recycling facility operator, we welcome collaboration to deploy circular networks.
            </p>

            <div className="space-y-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3">
                <Building2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Recycling Facility Onboarding</div>
                  <div className="text-xs text-slate-500">Integrate certified batch intake and circular resin reporting.</div>
                  <div className="text-xs text-emerald-700 font-semibold mt-1">facilities@ecocyclesmart.org</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Municipal & Collector Partnerships</div>
                  <div className="text-xs text-slate-500">IoT bin fleet trials, route optimization, and citizen rewards.</div>
                  <div className="text-xs text-blue-700 font-semibold mt-1">partners@ecocyclesmart.org</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3">
                <Phone className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Academic & Hackathon Inquiries</div>
                  <div className="text-xs text-slate-500">Open documentation, sensor pinouts, and test datasets.</div>
                  <div className="text-xs text-purple-700 font-semibold mt-1">research@ecocyclesmart.org</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Onboarding Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Inquiry Received</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, {form.name}. Your message regarding <em>{form.organization || 'your project'}</em> has been routed to our project lead.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', organization: '', inquiryType: 'general', message: '' });
                    }}
                    className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
                  >
                    Send another inquiry →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-lg font-bold text-slate-900 mb-1">
                    Send a Message or Pilot Request
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Maya Lin"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Organization / College / City
                      </label>
                      <input
                        type="text"
                        value={form.organization}
                        onChange={e => setForm({ ...form, organization: e.target.value })}
                        placeholder="e.g. Tech Institute / Green Valley"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={form.inquiryType}
                        onChange={e => setForm({ ...form, inquiryType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="facility">Recycling Facility Onboarding</option>
                        <option value="collector">Municipal Collector Fleet Trial</option>
                        <option value="research">Academic / SIH / Hackathon Project</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your proposed deployment, bin locations, or integration requirements..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
