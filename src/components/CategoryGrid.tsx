import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGrid = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textX = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-32 bg-brand-cream overflow-hidden">
      <div className="relative mb-20">
        <motion.div
          style={{ x: textX }}
          className="whitespace-nowrap text-[12vw] font-serif font-black text-brand-olive/5 uppercase leading-none select-none"
        >
          Premium Selection &bull; Global Sourcing &bull; Artisanal Quality &bull; Wholesale Program
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute inset-0 flex items-center">
          <div>
            <span className="text-brand-terracotta font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Our Specialties</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-ink">Curated Collections.</h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-brand-olive cursor-pointer shadow-xl shadow-brand-ink/5"
            >
              <Link to={`/products#${category.slug}`}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/40 to-transparent p-10 flex flex-col justify-end">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-brand-terracotta text-white text-[8px] font-bold uppercase tracking-widest mb-4">
                      Premium Grade
                    </span>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-white/60 text-xs leading-relaxed max-w-xs line-clamp-2">
                      {category.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-[9px] translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    View Collection
                    <ArrowUpRight size={14} className="text-brand-terracotta" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
