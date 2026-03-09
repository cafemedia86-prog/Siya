import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Shield, Users, Leaf, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Years Experience', value: '25+', icon: Globe },
  { label: 'Global Partners', value: '150+', icon: Users },
  { label: 'Quality Standards', value: 'ISO 22000', icon: Shield },
  { label: 'Sustainable Farms', value: '500+', icon: Leaf },
];

export const AboutPage = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-brand-cream min-h-screen"
    >
      {/* Hero Section */}
      <section ref={containerRef} className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 px-4 sm:px-6 lg:px-8">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1920"
            alt="Vibrant spice market background"
            className="w-full h-full object-cover grayscale-[30%] opacity-40 mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/10 via-brand-cream/50 to-brand-cream" />
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-brand-terracotta font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Our Heritage</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-tight">Authenticity in every grain.</h1>
            <p className="text-brand-ink/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Since 1998, Siya's has been bridging the gap between small-scale Indian spice farmers and global wholesale buyers. We believe in transparency, quality, and fair trade.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="bg-brand-ink text-white px-8 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-brand-olive transition-all shadow-xl shadow-brand-ink/10">
                Explore Catalog
              </Link>
              <Link to="/wholesale" className="bg-white text-brand-ink px-8 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-brand-cream transition-all shadow-xl">
                Wholesale Program
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 w-full aspect-[4/5] rounded-[4rem] overflow-hidden border-[15px] border-white shadow-2xl animate-float">
              <img
                src="https://images.unsplash.com/photo-1514733670139-4d87a1941d5e?auto=format&fit=crop&q=80&w=800"
                alt="Small-scale Indian spice farmer harvesting crops"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-terracotta/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-olive/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-brand-olive text-brand-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <stat.icon size={24} className="mx-auto mb-6 text-brand-terracotta" />
                <h3 className="text-4xl md:text-5xl font-serif font-bold mb-2">{stat.value}</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-white/5 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-white px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="text-brand-terracotta font-bold tracking-[0.3em] uppercase text-[10px] block">Sustainability First</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Respecting the land, supporting the community.</h2>
            <p className="text-brand-ink/60 text-lg leading-relaxed">
              Our mission is to create a sustainable supply chain that benefits everyone from the farmer to the end consumer. We work directly with over 500 family-owned farms across India to ensure ethical practices and the highest quality ingredients.
            </p>
            <div className="space-y-6">
              {[
                'Direct-to-farmer fair pricing models',
                'Reduced carbon footprint through optimized logistics',
                '100% plastic-free wholesale packaging options',
                'Continuous regenerative farming training for cooperatives'
              ].map((point, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="w-6 h-6 rounded-full bg-brand-cream flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 group-hover:bg-brand-olive group-hover:text-white transition-all">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-sm font-medium text-brand-ink/80 group-hover:text-brand-ink transition-colors">{point}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl relative z-10">
              <img
                src="https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=800"
                alt="Drying tea leaves in high altitude garden"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-brand-cream rounded-full -z-10 opacity-50" />
            <div className="absolute -bottom-10 -right-10 bg-brand-terracotta text-white p-12 rounded-[2.5rem] shadow-2xl z-20 hidden md:block animate-float">
              <Shield size={32} className="mb-4" />
              <p className="text-xl font-serif font-bold italic">"Quality is never an accident; it is always the result of high intention."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="py-24 bg-brand-cream px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Global Footprint</h2>
          <p className="text-brand-ink/60 max-w-2xl mx-auto">
            Strategically located distribution centers in Mumbai, London, Dubai, and New York allow us to serve buyers across 40+ countries with minimal lead times.
          </p>
        </div>
        <div className="relative w-full aspect-[21/9] rounded-[4rem] overflow-hidden bg-brand-ink shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80&w=1920"
            alt="Global shipping routes map (conceptual representation)"
            className="w-full h-full object-cover opacity-30 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-terracotta mb-6">Partners Worldwide</p>
              <div className="flex flex-wrap justify-center gap-12 grayscale opacity-50">
                {/* Logistics partner placeholder logos could go here */}
                <span className="text-2xl font-serif font-bold text-white/40">DART LOGISTICS</span>
                <span className="text-2xl font-serif font-bold text-white/40">GLOBAL MARITIME</span>
                <span className="text-2xl font-serif font-bold text-white/40">SKY CARGO</span>
                <span className="text-2xl font-serif font-bold text-white/40">ASIA EXPRESS</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
