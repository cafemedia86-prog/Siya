import React from 'react';
import { Hero } from '../components/Hero';
import { CategoryGrid } from '../components/CategoryGrid';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { WholesaleInquiry } from '../components/WholesaleInquiry';
import { motion } from 'motion/react';
import { Shield, Clock, Users } from 'lucide-react';

const valueProps = [
  {
    icon: Shield,
    title: 'Quality Certified',
    desc: 'Every batch undergoes rigorous quality testing to meet international food safety standards.',
  },
  {
    icon: Clock,
    title: 'Reliable Supply',
    desc: 'Consistent inventory management ensures your business never runs out of essential ingredients.',
  },
  {
    icon: Users,
    title: 'Custom Blending',
    desc: 'Tailored spice mixes and tea blends developed by our experts for your unique brand requirements.',
  },
];

export const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <CategoryGrid />

      {/* Trust Banner */}
      <section className="py-12 bg-brand-olive text-white overflow-hidden" aria-label="Trust signals">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-8">
              <span className="text-sm font-bold uppercase tracking-[0.3em]">Ethically Sourced</span>
              <div className="w-2 h-2 bg-brand-terracotta rounded-full"></div>
              <span className="text-sm font-bold uppercase tracking-[0.3em]">Premium Quality</span>
              <div className="w-2 h-2 bg-brand-terracotta rounded-full"></div>
              <span className="text-sm font-bold uppercase tracking-[0.3em]">Global Shipping</span>
              <div className="w-2 h-2 bg-brand-terracotta rounded-full"></div>
              <span className="text-sm font-bold uppercase tracking-[0.3em]">Direct From Origin</span>
              <div className="w-2 h-2 bg-brand-terracotta rounded-full"></div>
            </div>
          ))}
        </div>
      </section>

      <FeaturedProducts />

      {/* B2B Value Proposition */}
      <section className="py-24 bg-white" aria-label="Why choose Siya's">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {valueProps.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="text-center space-y-4 group"
              >
                <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mx-auto text-brand-olive mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                  <item.icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif font-bold">{item.title}</h3>
                <p className="text-brand-ink/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WholesaleInquiry />
    </motion.div>
  );
};
