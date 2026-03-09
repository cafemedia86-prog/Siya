import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 group flex flex-col h-full hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={`${product.name} — premium ${product.category.replace('-', ' ')} from ${product.origin}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.05)] pointer-events-none" />

        <div className="absolute top-4 left-4">
          <div className="glass px-3 py-1 rounded-full text-[8px] font-bold text-brand-ink uppercase tracking-widest">
            {product.category.replace('-', ' ')}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="glass px-2.5 py-1 rounded-lg text-[8px] font-bold text-brand-ink uppercase tracking-widest flex items-center gap-1">
            <MapPin size={10} />
            {product.origin}
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold mb-2 text-brand-ink group-hover:text-brand-olive transition-colors leading-tight">
          {product.name}
        </h3>
        <p className="text-[11px] text-brand-ink/60 mb-4 line-clamp-2 font-medium leading-relaxed flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-brand-cream">
          <div>
            <span className="block text-[8px] text-brand-ink/40 font-bold uppercase tracking-widest mb-0.5">Wholesale</span>
            <span className="text-lg font-bold text-brand-ink">${product.pricePerKg}<span className="text-[10px] font-medium text-brand-ink/40">/kg</span></span>
          </div>
          <div className="flex items-center gap-1.5 text-[8px] font-bold text-brand-terracotta bg-brand-terracotta/5 px-2.5 py-1 rounded-full uppercase tracking-widest">
            <Package size={10} />
            Min. {product.minOrder}kg
          </div>
        </div>

        <Link
          to="/wholesale"
          className="w-full mt-5 bg-brand-ink text-white py-3 rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-brand-olive hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-ink/5 group"
          aria-label={`Request a quote for ${product.name}`}
        >
          Request Quote
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};
