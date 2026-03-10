import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Package, ArrowRight, Plus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { t, i18n } = useTranslation();
  const { addToCart, items } = useCart();
  const isInCart = items.some(item => item.id === product.id);
  const isRTL = i18n.language === 'ar';

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

        <div className={cn("absolute bottom-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 gap-2", isRTL ? "right-4 left-4" : "left-4 right-4")}>
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
          <div className={cn(isRTL && "text-right")}>
            <span className="block text-[8px] text-brand-ink/40 font-bold uppercase tracking-widest mb-0.5">Wholesale</span>
            <span className="text-lg font-bold text-brand-ink">${product.pricePerKg}<span className="text-[10px] font-medium text-brand-ink/40">/kg</span></span>
          </div>
          <div className={cn("flex items-center gap-1.5 text-[8px] font-bold text-brand-terracotta bg-brand-terracotta/5 px-2.5 py-1 rounded-full uppercase tracking-widest", isRTL && "flex-row-reverse")}>
            <Package size={10} />
            Min. {product.minOrder}kg
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={() => addToCart(product, `${product.minOrder}kg`)}
            className={cn(
              "flex-1 py-3 rounded-xl font-bold uppercase tracking-widest text-[8px] transition-all flex items-center justify-center gap-2 shadow-lg",
              isInCart
                ? "bg-emerald-500 text-white shadow-emerald-500/10"
                : "bg-brand-olive text-white shadow-brand-olive/5 hover:bg-brand-ink hover:scale-[1.02]"
            )}
            aria-label={`Add ${product.name} to inquiry basket`}
          >
            {isInCart ? (
              <>
                <Check size={12} /> {t('catalog.in_basket')}
              </>
            ) : (
              <>
                <Plus size={12} /> {t('catalog.add_to_quote')}
              </>
            )}
          </button>

          <Link
            to="/wholesale"
            className="flex-1 bg-brand-ink text-white py-3 rounded-xl font-bold uppercase tracking-widest text-[8px] hover:bg-brand-olive hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-ink/5 group text-center"
            aria-label={`Direct inquiry for ${product.name}`}
          >
            {t('catalog.direct_inquiry')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
