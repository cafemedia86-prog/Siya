import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../constants';
import { cn } from '../lib/utils';
import { useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export const ProductsPage = () => {
  const { products } = useAdmin();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [sortBy, setSortBy] = React.useState<'trending' | 'price-low' | 'price-high'>('trending');
  const location = useLocation();

  // Handle hash changes for category deep-linking
  React.useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      const category = CATEGORIES.find(c => c.slug === hash);
      if (category) {
        setSelectedCategory(category.id);
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
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
            className="max-w-3xl"
          >
            <span className="text-brand-terracotta font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Product Catalog</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">World-Class Ingredients</h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Explore our curated selection of premium spices, teas, and dry fruits. Sourced directly from local farmers and processed with artisanal care.
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/40" size={18} />
              <input
                type="text"
                placeholder="Search premium spices, teas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-brand-cream/50 border-none rounded-xl focus:ring-2 focus:ring-brand-olive outline-none text-sm transition-all"
                aria-label="Search products"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-48">
                <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/40" size={16} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full pl-12 pr-4 py-3 bg-brand-cream/50 border-none rounded-xl focus:ring-2 focus:ring-brand-olive outline-none text-sm transition-all appearance-none"
                  aria-label="Sort products"
                >
                  <option value="trending">Trending</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
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
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 mb-6 flex items-center gap-2">
                <Filter size={14} />
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={cn(
                    "w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                    selectedCategory === 'all'
                      ? "bg-brand-olive text-white shadow-lg shadow-brand-olive/20"
                      : "text-brand-ink/60 hover:bg-white hover:text-brand-olive"
                  )}
                >
                  All Products
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                      selectedCategory === cat.id
                        ? "bg-brand-olive text-white shadow-lg shadow-brand-olive/20"
                        : "text-brand-ink/60 hover:bg-white hover:text-brand-olive"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Offer Card */}
            <div className="bg-brand-terracotta rounded-[2rem] p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-xl font-serif font-bold mb-2">Bulk Pricing</h4>
                <p className="text-xs text-white/80 mb-6 leading-relaxed">
                  Unlock exclusive wholesale rates for orders above 500kg.
                </p>
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                  Learn More <ArrowRight size={14} />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 border-b border-brand-cream pb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-brand-ink/40">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
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
                <h3 className="text-2xl font-serif font-bold mb-2">No products found</h3>
                <p className="text-brand-ink/60 text-sm">Try adjusting your search or filters to find what you're looking for.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="mt-8 text-brand-terracotta font-bold uppercase tracking-widest text-[10px] hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
};
