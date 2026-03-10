import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../constants';
import { cn } from '../lib/utils';
import { useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useTranslation } from 'react-i18next';

export const ProductsPage = () => {
  const { t, i18n } = useTranslation();
  const { products, categories, isLoading } = useAdmin();
  const isRTL = i18n.language === 'ar';
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [sortBy, setSortBy] = React.useState<'trending' | 'price-low' | 'price-high'>('trending');
  const [filters, setFilters] = React.useState({
    pungency: 'all',
    grade: 'all',
    origin: 'all'
  });
  const location = useLocation();

  // Handle hash changes for category deep-linking
  React.useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && categories.length > 0) {
      const category = categories.find(c => c.slug === hash);
      if (category) {
        setSelectedCategory(category.slug);
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
    }
  }, [location.hash, categories]);

  if (isLoading) {
    return (
      <div className="pt-40 min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-cream border-t-brand-olive rounded-full animate-spin" />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-olive opacity-40">{t('catalog.header_tag')}...</p>
        </div>
      </div>
    );
  }

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPungency = filters.pungency === 'all' || product.pungency === filters.pungency;
      const matchesGrade = filters.grade === 'all' || product.grade === filters.grade;
      const matchesOrigin = filters.origin === 'all' || product.origin.includes(filters.origin);

      return matchesSearch && matchesCategory && matchesPungency && matchesGrade && matchesOrigin;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerKg - b.pricePerKg;
      if (sortBy === 'price-high') return b.pricePerKg - a.pricePerKg;
      return 0; // Trending/Default
    });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 min-h-screen bg-brand-cream"
    >
      {/* Header Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-olive text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("max-w-3xl", isRTL && "text-right mr-auto ml-0")}
          >
            <span className="text-brand-terracotta font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">{t('catalog.header_tag')}</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">{t('catalog.header_title')}</h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              {t('catalog.header_desc')}
            </p>
          </motion.div>
        </div>
        {/* Abstract decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-brand-terracotta/20 rounded-full blur-3xl" />
      </section>

      {/* Toolbar & Filters */}
      <section className="sticky top-20 z-30 px-4 py-4 -mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col md:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className={cn("absolute top-1/2 -translate-y-1/2 text-brand-ink/40", isRTL ? "right-4" : "left-4")} size={18} />
              <input
                type="text"
                placeholder={t('catalog.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full py-3 bg-brand-cream/50 border-none rounded-xl focus:ring-2 focus:ring-brand-olive outline-none text-sm transition-all",
                  isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
                )}
                aria-label="Search products"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-48">
                <SlidersHorizontal className={cn("absolute top-1/2 -translate-y-1/2 text-brand-ink/40", isRTL ? "right-4" : "left-4")} size={16} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className={cn(
                    "w-full py-3 bg-brand-cream/50 border-none rounded-xl focus:ring-2 focus:ring-brand-olive outline-none text-sm transition-all appearance-none",
                    isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
                  )}
                  aria-label="Sort products"
                >
                  <option value="trending">{t('catalog.sorting')} : {t('catalog.sort_trending')}</option>
                  <option value="price-low">{t('catalog.sorting')} : {t('catalog.sort_low')}</option>
                  <option value="price-high">{t('catalog.sorting')} : {t('catalog.sort_high')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Categories Sidebar */}
          <aside className="w-full lg:w-64 space-y-8">
            <div>
              <h3 className={cn("text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 mb-6 flex items-center gap-2", isRTL && "flex-row-reverse")}>
                <Filter size={14} />
                {t('catalog.categories')}
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={cn(
                    "w-full px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                    isRTL ? "text-right" : "text-left",
                    selectedCategory === 'all'
                      ? "bg-brand-olive text-white shadow-lg shadow-brand-olive/20"
                      : "text-brand-ink/60 hover:bg-white hover:text-brand-olive"
                  )}
                >
                  {t('catalog.all_products')}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={cn(
                      "w-full px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                      isRTL ? "text-right" : "text-left",
                      selectedCategory === cat.slug
                        ? "bg-brand-olive text-white shadow-lg shadow-brand-olive/20"
                        : "text-brand-ink/60 hover:bg-white hover:text-brand-olive"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Filters */}
            {(selectedCategory === 'spices' || selectedCategory === 'all') && (
              <div className="space-y-4">
                <h3 className={cn("text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 mb-3 ml-2", isRTL && "mr-2 ml-0 text-right font-black")}>{t('catalog.pungency')}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['all', 'Mild', 'Medium', 'Hot', 'Extra Hot'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setFilters(f => ({ ...f, pungency: p }))}
                      className={cn(
                        "text-[9px] font-bold uppercase tracking-widest px-3 py-2 rounded-lg border transition-all",
                        filters.pungency === p
                          ? "bg-brand-terracotta/10 border-brand-terracotta text-brand-terracotta"
                          : "border-brand-cream text-brand-ink/40 hover:border-brand-ink/20"
                      )}
                    >
                      {p === 'all' ? t('catalog.all_heat') : p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(selectedCategory === 'teas' || selectedCategory === 'dry-fruits' || selectedCategory === 'all') && (
              <div className="space-y-4">
                <h3 className={cn("text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 mb-3 ml-2", isRTL && "mr-2 ml-0 text-right font-black")}>{t('catalog.grade')}</h3>
                <div className="flex flex-wrap gap-2">
                  {['all', 'W240', 'W320', 'CTC', 'Extra Bold'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setFilters(f => ({ ...f, grade: g }))}
                      className={cn(
                        "text-[9px] font-bold uppercase tracking-widest px-3 py-2 rounded-lg border transition-all",
                        filters.grade === g
                          ? "bg-brand-olive text-white border-brand-olive"
                          : "border-brand-cream text-brand-ink/40 hover:border-brand-ink/20"
                      )}
                    >
                      {g === 'all' ? t('catalog.all_grades') : g}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Special Offer Card */}
            <div className="bg-brand-terracotta rounded-[2rem] p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className={cn("text-xl font-serif font-bold mb-2", isRTL && "text-right")}>{t('catalog.bulk_card_title')}</h4>
                <p className={cn("text-xs text-white/80 mb-6 leading-relaxed", isRTL && "text-right")}>
                  {t('catalog.bulk_card_desc')}
                </p>
                <button className={cn("flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform", isRTL && "flex-row-reverse mr-auto ml-0")}>
                  {t('catalog.learn_more')} {isRTL ? <ArrowRight className="rotate-180" size={14} /> : <ArrowRight size={14} />}
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 border-b border-brand-cream pb-4">
              <h2 className={cn("text-sm font-bold uppercase tracking-widest text-brand-ink/40", isRTL && "w-full text-right")}>
                {t('catalog.showing')} {filteredProducts.length} {filteredProducts.length === 1 ? t('catalog.product') : t('catalog.products')}
              </h2>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32 glass-card rounded-[3rem]"
              >
                <Search size={48} className="mx-auto text-brand-ink/10 mb-6" strokeWidth={1} />
                <h3 className="text-2xl font-serif font-bold mb-2">{t('catalog.no_products')}</h3>
                <p className="text-brand-ink/60 text-sm">{t('catalog.no_products_desc')}</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setFilters({ pungency: 'all', grade: 'all', origin: 'all' });
                  }}
                  className="mt-8 text-brand-terracotta font-bold uppercase tracking-widest text-[10px] hover:underline"
                >
                  {t('catalog.clear_filters')}
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
};
