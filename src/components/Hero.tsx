import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden pt-20" aria-label="Hero banner">
      {/* Background with parallax effect */}
      <motion.div style={{ y: y1, scale }} className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1590610330386-89689531518e?auto=format&fit=crop&q=80&w=1920"
          alt="Premium Indian spices and seasonings"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-cream/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-brand-cream/90 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              className={cn(
                "inline-flex items-center gap-3 text-brand-terracotta font-bold tracking-[0.3em] uppercase text-[10px] mb-6 bg-brand-terracotta/10 px-4 py-1.5 rounded-full",
                isRTL && "flex-row-reverse"
              )}
            >
              <span className="w-1.5 h-1.5 bg-brand-terracotta rounded-full animate-pulse" />
              {t('home.hero_tag')}
            </motion.span>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className={cn("text-6xl md:text-8xl font-serif font-bold text-brand-ink leading-[0.85] mb-6 tracking-tighter", isRTL && "text-right mr-auto ml-0")}
            >
              {t('home.hero_title')}
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className={cn("text-lg text-brand-ink/70 mb-10 max-w-lg leading-relaxed font-medium", isRTL && "text-right mr-auto ml-0")}
            >
              {t('home.hero_desc')}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className={cn("flex flex-wrap gap-6", isRTL && "justify-end")}
            >
              <Link
                to="/products"
                className="bg-brand-olive text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-brand-ink hover:scale-105 transition-all group shadow-2xl shadow-brand-olive/20"
              >
                {t('home.cta_explore')}
                <ArrowRight size={18} className={cn("transition-transform", isRTL ? "rotate-180 group-hover:-translate-x-2" : "group-hover:translate-x-2")} />
              </Link>
              <Link
                to="/wholesale"
                className="bg-white/50 backdrop-blur-md border border-brand-olive/20 text-brand-olive px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:scale-105 transition-all text-center shadow-xl"
              >
                {t('home.cta_wholesale')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Elements with Parallax */}
      <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-[40vw] h-[70vh]">
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 12 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 right-0 w-72 h-96 rounded-[5rem] overflow-hidden border-[12px] border-white shadow-2xl animate-float"
        >
          <img src="https://finebuy.co.in/wp-content/uploads/2022/07/Green-Cardamom.webp" alt="Aromatic green cardamom pods" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
          <div className="absolute inset-0 bg-brand-olive/10 mix-blend-overlay" />
        </motion.div>

        <motion.div
          style={{ y: y3 }}
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: -12 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-64 h-80 rounded-[4rem] overflow-hidden border-[12px] border-white shadow-2xl animate-float-delayed"
        >
          <img src="https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=600" alt="Artisanal Indian tea leaves" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
          <div className="absolute inset-0 bg-brand-terracotta/10 mix-blend-overlay" />
        </motion.div>

        {/* Decorative Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-brand-olive/10 rounded-full -z-10 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] border border-brand-olive/5 rounded-full -z-10" />
      </div>
    </section>
  );
};
