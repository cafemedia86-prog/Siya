import React from 'react';
import { Hero } from '../components/Hero';
import { CategoryGrid } from '../components/CategoryGrid';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { WholesaleInquiry } from '../components/WholesaleInquiry';
import { motion } from 'motion/react';
import { Shield, Clock, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const valueProps = [
    {
      icon: Shield,
      title: t('home.values.quality'),
      desc: t('home.values.quality_desc'),
    },
    {
      icon: Clock,
      title: t('home.values.supply'),
      desc: t('home.values.supply_desc'),
    },
    {
      icon: Users,
      title: t('home.values.custom'),
      desc: t('home.values.custom_desc'),
    },
  ];
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
              <span className="text-sm font-bold uppercase tracking-[0.3em]">{t('home.trust.ethical')}</span>
              <div className="w-2 h-2 bg-brand-terracotta rounded-full"></div>
              <span className="text-sm font-bold uppercase tracking-[0.3em]">{t('home.trust.premium')}</span>
              <div className="w-2 h-2 bg-brand-terracotta rounded-full"></div>
              <span className="text-sm font-bold uppercase tracking-[0.3em]">{t('home.trust.shipping')}</span>
              <div className="w-2 h-2 bg-brand-terracotta rounded-full"></div>
              <span className="text-sm font-bold uppercase tracking-[0.3em]">{t('home.trust.origin')}</span>
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
