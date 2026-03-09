import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedProducts = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const featured = PRODUCTS.filter(p => p.featured).slice(0, 4);

  return (
    <section ref={containerRef} className="py-32 bg-white relative overflow-hidden">
      {/* Decorative text */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-0 text-[15vw] font-serif font-black text-brand-olive/5 uppercase pointer-events-none select-none italic"
      >
        Featured Selection
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-brand-terracotta" size={16} />
              <span className="text-brand-terracotta font-bold tracking-[0.3em] uppercase text-[10px]">Premium Grade</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">Our Finest Harvest.</h2>
            <p className="text-brand-ink/60 text-lg leading-relaxed">
              Hand-picked from the most recent harvests, these top-tier selection of spices and teas set the industry standard for quality.
            </p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-4 text-brand-ink hover:text-brand-terracotta transition-colors group mb-4 pb-2 border-b border-brand-ink/10"
          >
            <span className="text-[11px] font-bold uppercase tracking-widest leading-none">Explore All Products</span>
            <div className="w-10 h-10 rounded-full border border-brand-ink/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-olive group-hover:text-white group-hover:border-transparent transition-all">
              <ArrowRight size={18} />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* B2B call-to-action banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 p-12 bg-brand-olive rounded-[3.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl shadow-brand-olive/20"
        >
          <div className="relative z-10 max-w-xl">
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">Need a custom wholesale solution?</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Connect with our trade experts for custom blends, white-labeling services, and specialized bulk logistics. We support multi-port shipping and structured periodic delivery contracts.
            </p>
          </div>

          <Link
            to="/wholesale"
            className="relative z-10 bg-brand-terracotta text-white px-10 py-5 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-brand-terracotta/90 hover:scale-105 transition-all shadow-xl shadow-brand-terracotta/20 flex-shrink-0"
          >
            Discuss B2B Partnership
          </Link>

          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl p-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl p-10 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};
