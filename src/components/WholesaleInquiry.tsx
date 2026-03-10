import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Building2, Package, Mail, User, Info, MapPin, Trash2, ShoppingBasket } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';

export const WholesaleInquiry = () => {
  const { addInquiry } = useAdmin();
  const { items, removeFromCart, clearCart } = useCart();
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: 'spices',
    volume: '100-500kg',
    message: '',
    country: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const basketDetails = items.length > 0
      ? `\n\nBasket Items:\n${items.map(item => `- ${item.name} (${item.quantity})`).join('\n')}`
      : '';

    // Connect to Admin Context
    addInquiry({
      partner: formData.name,
      company: formData.company,
      email: formData.email,
      interest: items.length > 0 ? 'Mixed (Basket)' : formData.interest,
      volume: formData.volume,
      country: formData.country || 'Global',
      message: (formData.message || 'Standard wholesale enquiry.') + basketDetails
    });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    clearCart();
  };

  const steps = [
    { title: 'Business Profile', icon: Building2 },
    { title: 'Requirements', icon: Package },
    { title: 'Details', icon: Mail },
  ];

  if (isSuccess) {
    return (
      <section className="py-24 bg-brand-cream px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto glass-card p-12 rounded-[3.5rem] shadow-2xl"
        >
          <div className="w-20 h-20 bg-brand-olive rounded-full flex items-center justify-center mx-auto mb-8 text-white scale-125">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-4xl font-serif font-bold mb-4">Inquiry Received</h2>
          <p className="text-brand-ink/60 mb-8 leading-relaxed">
            Thank you for your interest in Siya's wholesale program. Our B2B partnership manager will review your profile and contact you within 24 business hours.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="bg-brand-ink text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-olive transition-all"
          >
            Send Another Inquiry
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-brand-cream relative overflow-hidden" id="wholesale-form">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-brand-olive/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-brand-terracotta/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-brand-terracotta font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Bulk Orders & Export</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-6">Partner with the source.</h2>
              <p className="text-brand-ink/60 text-lg leading-relaxed max-w-md">
                We handle the end-to-end export process, documentation, and quality assurance. Fill out our tiered inquiry form for custom wholesale pricing.
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                { title: 'Streamlined Logistics', desc: 'Customs-cleared shipping to over 40 global ports.' },
                { title: 'Tiered Pricing', desc: 'Volume-based discounts starting from 100kg orders.' },
                { title: 'Quality Assurance', desc: 'SGS/Intertek certification available upon request.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="w-1.5 h-12 bg-brand-terracotta/20 rounded-full group-hover:bg-brand-terracotta transition-colors" />
                  <div>
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-brand-ink/40 font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-12 rounded-[4rem] shadow-2xl relative"
          >
            {/* Step Progress */}
            <div className="flex justify-between mb-12">
              {steps.map((s, i) => (
                <div key={s.title} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => (i + 1 < step) && setStep(i + 1)}>
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                    step === i + 1 ? "bg-brand-olive text-white scale-125 shadow-lg shadow-brand-olive/20" :
                      step > i + 1 ? "bg-brand-terracotta text-white" : "bg-brand-cream text-brand-ink/20"
                  )}>
                    <s.icon size={18} />
                  </div>
                  <span className={cn(
                    "text-[8px] font-bold uppercase tracking-widest transition-opacity",
                    step === i + 1 ? "opacity-100" : "opacity-40"
                  )}>{s.title}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8" aria-label="Wholesale inquiry form">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-brand-ink/40 ml-2">Your Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/20" size={16} />
                          <input
                            required
                            type="text"
                            placeholder="John Doe"
                            className="w-full pl-12 pr-5 py-3.5 bg-brand-cream/50 border-none rounded-2xl focus:ring-2 focus:ring-brand-olive outline-none transition-all text-sm"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-brand-ink/40 ml-2">Company Name</label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/20" size={16} />
                          <input
                            required
                            type="text"
                            placeholder="Global Foods Inc."
                            className="w-full pl-12 pr-5 py-3.5 bg-brand-cream/50 border-none rounded-2xl focus:ring-2 focus:ring-brand-olive outline-none transition-all text-sm"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-brand-ink/40 ml-2">Business Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/20" size={16} />
                        <input
                          required
                          type="email"
                          placeholder="john@globalfoods.com"
                          className="w-full pl-12 pr-5 py-3.5 bg-brand-cream/50 border-none rounded-2xl focus:ring-2 focus:ring-brand-olive outline-none transition-all text-sm"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-brand-ink/40 ml-2">Operating Country</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/20" size={16} />
                        <input
                          required
                          type="text"
                          placeholder="United Kingdom"
                          className="w-full pl-12 pr-5 py-3.5 bg-brand-cream/50 border-none rounded-2xl focus:ring-2 focus:ring-brand-olive outline-none transition-all text-sm"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-6">
                      {items.length > 0 ? (
                        <div className="space-y-4">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-brand-ink/40 ml-2">Quote Basket ({items.length})</label>
                          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {items.map((item) => (
                              <div key={item.id} className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-brand-cream/50 group">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-bold text-brand-ink">{item.name}</p>
                                    <p className="text-[8px] text-brand-ink/40 font-bold uppercase tracking-widest leading-none">Min. {item.minOrder}kg</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                          <p className="text-[9px] text-brand-ink/40 italic ml-2">These will be included in your custom RFQ.</p>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-brand-ink/40 ml-2">Primary Interest</label>
                          <div className="relative">
                            <ShoppingBasket className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/20" size={16} />
                            <select
                              className="w-full pl-12 pr-5 py-3.5 bg-brand-cream/50 border-none rounded-2xl focus:ring-2 focus:ring-brand-olive outline-none transition-all text-sm appearance-none cursor-pointer"
                              value={formData.interest}
                              onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                            >
                              <option value="spices">Premium Spices</option>
                              <option value="dry-fruits">Bulk Dry Fruits</option>
                              <option value="teas">Artisanal Teas</option>
                              <option value="herbal-teas">Herbal & Wellness Teas</option>
                              <option value="multiple">Multiple Categories</option>
                            </select>
                          </div>
                        </div>
                      )}

                      <div className="space-y-4 pt-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-brand-ink/40 ml-2">Estimated Monthly Volume</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['100-500kg', '500kg-2t', '2t-5t', '5t+'].map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => setFormData({ ...formData, volume: v })}
                              className={cn(
                                "px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all",
                                formData.volume === v
                                  ? "bg-brand-olive border-brand-olive text-white shadow-lg shadow-brand-olive/20"
                                  : "border-brand-cream text-brand-ink/60 hover:border-brand-olive hover:text-brand-olive bg-white/50"
                              )}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-brand-ink/40 ml-2">Specific Requirements</label>
                      <textarea
                        rows={6}
                        placeholder="Please tell us about your specific quality requirements, packaging needs, or delivery timelines..."
                        className="w-full px-6 py-4 bg-brand-cream/50 border-none rounded-3xl focus:ring-2 focus:ring-brand-olive outline-none transition-all text-sm leading-relaxed"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-brand-olive/5 rounded-2xl">
                      <Info size={16} className="text-brand-olive flex-shrink-0" />
                      <p className="text-[10px] font-medium text-brand-ink/60 leading-relaxed italic">
                        Your data is stored securely and will only be used to process your b2b inquiry.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-4 pt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-white text-brand-ink py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] border border-brand-cream hover:bg-brand-cream transition-all shadow-xl shadow-brand-ink/5"
                  >
                    Back
                  </button>
                )}
                <button
                  type={step === 3 ? 'submit' : 'button'}
                  onClick={step === 3 ? undefined : nextStep}
                  disabled={isSubmitting}
                  className={cn(
                    "flex-[2] bg-brand-ink text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-olive transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-ink/10 group disabled:opacity-50",
                    step === 3 && "bg-brand-terracotta hover:bg-brand-terracotta/90"
                  )}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      {step === 3 ? 'Submit Inquiry' : 'Continue'}
                      <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
