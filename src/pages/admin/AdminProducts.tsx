import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    MoreVertical,
    Filter,
    Package,
    MapPin,
    Tag,
    TrendingUp,
    DollarSign,
    Box,
    Layers,
    ArrowUpDown,
    Globe
} from 'lucide-react';
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES } from '../../constants';
import { cn } from '../../lib/utils';
import { useAdmin } from '../../context/AdminContext';

export const AdminProducts = () => {
    const { products, deleteProduct, addProduct, updateProduct, categories } = useAdmin();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const [sortBy, setSortBy] = React.useState('newest');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingId, setEditingId] = React.useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = React.useState<any>(null);

    const [formData, setFormData] = React.useState({
        name: '',
        category: 'spices' as any,
        description: '',
        pricePerKg: 0,
        minOrder: 0,
        origin: '',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'
    });

    const handleOpenAdd = () => {
        setEditingId(null);
        setFormData({
            name: '',
            category: 'spices' as any,
            description: '',
            pricePerKg: 0,
            minOrder: 0,
            origin: '',
            image: INITIAL_PRODUCTS[0]?.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'
        });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (product: any) => {
        setEditingId(product.id);
        setFormData({
            name: product.name,
            category: product.category,
            description: product.description,
            pricePerKg: product.pricePerKg,
            minOrder: product.minOrder,
            origin: product.origin,
            image: product.image
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            updateProduct(editingId, formData);
        } else {
            addProduct(formData);
        }
        setIsModalOpen(false);
    };

    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
        return matchesSearch && matchesCat;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-high') return b.pricePerKg - a.pricePerKg;
        if (sortBy === 'price-low') return a.pricePerKg - b.pricePerKg;
        // Default: Newest first (id based for simulation)
        return b.id.localeCompare(a.id);
    });

    const stats = [
        { label: 'Total Catalog', value: products.length, icon: Layers, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Avg. Price/kg', value: `$${products.length > 0 ? (products.reduce((acc, p) => acc + p.pricePerKg, 0) / products.length).toFixed(1) : 0}`, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Product Range', value: categories.length, icon: Box, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Export Capacity', value: 'High', icon: TrendingUp, color: 'text-brand-terracotta', bg: 'bg-brand-terracotta/10' },
    ];

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-neutral-900 dark:text-white mb-2">Global Catalog</h1>
                    <p className="text-sm text-neutral-500 font-medium">Control Siya's export portfolio, pricing points, and shipping requirements.</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="bg-brand-olive text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-brand-ink transition-all duration-300 shadow-[0_8px_24px_rgba(182,198,155,0.4)] hover:shadow-[0_8px_32px_rgba(29,35,31,0.3)] flex items-center gap-3 group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700" />
                    <Plus size={18} className="group-hover:rotate-90 transition-transform duration-500 relative z-10" />
                    <span className="relative z-10">List New SKU</span>
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="glass-card p-6 rounded-[2rem] bg-white/40 dark:bg-dark-surface/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 flex items-center gap-5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_32px_rgba(255,255,255,0.02)] transition-all duration-500 overflow-hidden relative group"
                    >
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner relative z-10", stat.bg)}>
                            <stat.icon size={20} className={cn(stat.color, "group-hover:scale-110 transition-transform duration-500")} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 mb-0.5">{stat.label}</p>
                            <p className="text-2xl font-serif font-bold text-neutral-900 dark:text-white">{stat.value}</p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 dark:from-white/5 dark:to-transparent pointer-events-none rounded-[2rem]" />
                    </motion.div>
                ))}
            </div>

            {/* Add/Edit Product Modal */}
            <AnimatePresence mode="wait">
                {isModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 md:px-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-brand-ink/40 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-white/90 dark:bg-dark-surface/90 backdrop-blur-3xl rounded-[3rem] shadow-[0_24px_80px_rgba(0,0,0,0.1)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.4)] overflow-hidden overflow-y-auto max-h-[90vh] border border-white/60 dark:border-white/10"
                        >
                            <div className="p-10 md:p-16">
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <h2 className="text-4xl font-serif font-bold mb-2">{editingId ? 'Refine Product' : 'Register New SKU'}</h2>
                                        <p className="text-neutral-400 font-medium tracking-tight">Define wholesale specifications and export parameters.</p>
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-neutral-200 dark:hover:bg-white/10 transition-all"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                    {/* Left Column: Image Upload Simulation */}
                                    <div className="md:col-span-1 space-y-8">
                                        <div className="space-y-4">
                                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-3">
                                                <span className="w-6 h-[1px] bg-neutral-200 dark:bg-white/10"></span> Visuals
                                            </h3>
                                            <div className="aspect-square rounded-[3rem] overflow-hidden border-4 border-neutral-100 dark:border-white/5 relative group cursor-pointer shadow-xl">
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white px-4 py-2 border border-white/40 rounded-full backdrop-blur-md">Change View</span>
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl px-5 py-4 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-brand-olive outline-none"
                                                placeholder="Image URL..."
                                                value={formData.image}
                                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Right Content */}
                                    <div className="md:col-span-2 space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-4">Product Nomenclature</label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-semibold focus:ring-2 focus:ring-brand-olive outline-none shadow-sm"
                                                    placeholder="e.g. Fine Malabar Pepper"
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-4">Global Category</label>
                                                <div className="relative">
                                                    <select
                                                        className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl px-6 py-4 text-[10px] font-bold uppercase tracking-widest appearance-none focus:ring-2 focus:ring-brand-olive outline-none shadow-sm cursor-pointer"
                                                        value={formData.category}
                                                        onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                                                    >
                                                        {categories.map(cat => <option key={cat.id} value={cat.slug}>{cat.name}</option>)}
                                                    </select>
                                                    <Filter className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={14} />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-4">Geographical Origin</label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-semibold focus:ring-2 focus:ring-brand-olive outline-none shadow-sm"
                                                    placeholder="e.g. Munnar, Kerala"
                                                    value={formData.origin}
                                                    onChange={e => setFormData({ ...formData, origin: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-4 flex items-center gap-2">Price <span className="text-brand-olive">($ / kg)</span></label>
                                                <input
                                                    required
                                                    type="number"
                                                    step="0.01"
                                                    className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-semibold focus:ring-2 focus:ring-brand-olive outline-none shadow-sm"
                                                    value={formData.pricePerKg}
                                                    onChange={e => setFormData({ ...formData, pricePerKg: Number(e.target.value) })}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-4 flex items-center gap-2">Min. Volume <span className="text-brand-terracotta">(kg)</span></label>
                                                <input
                                                    required
                                                    type="number"
                                                    className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-semibold focus:ring-2 focus:ring-brand-olive outline-none shadow-sm"
                                                    value={formData.minOrder}
                                                    onChange={e => setFormData({ ...formData, minOrder: Number(e.target.value) })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-4">Product Narrative</label>
                                            <textarea
                                                rows={4}
                                                className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-[2.5rem] px-8 py-6 text-sm font-medium focus:ring-2 focus:ring-brand-olive outline-none shadow-sm leading-relaxed"
                                                placeholder="Describe the product's premium qualities, harvesting techniques, and export readiness..."
                                                value={formData.description}
                                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            />
                                        </div>

                                        <div className="pt-6 flex gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setIsModalOpen(false)}
                                                className="flex-1 px-10 py-5 rounded-3xl text-[10px] font-bold uppercase tracking-[0.2em] border border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/5 transition-all"
                                            >
                                                Discard
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-[2] bg-brand-olive text-white px-10 py-5 rounded-3xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-ink transition-all shadow-2xl shadow-brand-olive/40"
                                            >
                                                {editingId ? 'Push Updates' : 'Publish to Catalog'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Toolbar */}
            <div className="glass-card p-6 rounded-[2.5rem] bg-white/40 dark:bg-dark-surface/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 flex flex-col md:flex-row items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-olive transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search export index..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-white/60 dark:bg-white/5 border border-transparent focus:border-brand-olive/30 rounded-2xl text-sm focus:ring-4 focus:ring-brand-olive/10 outline-none transition-all placeholder:text-neutral-400 shadow-inner focus:shadow-none"
                    />
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-56 group">
                        <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-hover:text-brand-olive transition-colors" size={16} />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full pl-14 pr-10 py-4 bg-white/60 dark:bg-white/5 border border-transparent hover:border-brand-olive/20 focus:border-brand-olive/30 rounded-2xl text-[10px] font-bold uppercase tracking-widest outline-none transition-all appearance-none cursor-pointer shadow-sm hover:shadow-md"
                        >
                            <option value="all">Every Category</option>
                            {CATEGORIES.map(cat => (
                                <option key={cat.id} value={cat.slug}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="relative flex-1 md:w-56">
                        <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full pl-12 pr-10 py-4 bg-neutral-100 dark:bg-white/5 border-none rounded-2xl text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-brand-olive outline-none transition-all appearance-none cursor-pointer"
                        >
                            <option value="newest">Recent First</option>
                            <option value="price-high">Value: High-Low</option>
                            <option value="price-low">Value: Low-High</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Interactive Table */}
            <div className="glass-card bg-white/50 dark:bg-dark-surface/50 backdrop-blur-3xl rounded-[3rem] border border-white/60 dark:border-white/10 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.04)] relative">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-olive/20 dark:bg-brand-olive/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="overflow-x-auto overflow-y-auto max-h-[600px] scrollbar-hide relative z-10 w-full">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 z-20">
                            <tr className="bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl border-b border-neutral-200/50 dark:border-white/10 shadow-sm">
                                <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 whitespace-nowrap">SKU Identification</th>
                                <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">Classification</th>
                                <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">Price Points</th>
                                <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">Logistics</th>
                                <th className="px-10 py-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100/50 dark:divide-white/5 bg-transparent">
                            <AnimatePresence mode="popLayout">
                                {sortedProducts.map((product, i) => (
                                    <motion.tr
                                        key={product.id}
                                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ delay: i * 0.05, duration: 0.4 }}
                                        onClick={() => handleOpenEdit(product)}
                                        className="hover:bg-white/60 dark:hover:bg-white/5 transition-all duration-300 group cursor-pointer relative"
                                    >
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-6">
                                                <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden border-2 border-neutral-100 dark:border-white/5 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-serif font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-brand-olive transition-colors">{product.name}</p>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[10px] text-neutral-600 dark:text-neutral-400 font-bold flex items-center gap-1.5 uppercase opacity-60">
                                                            <Globe size={10} className="text-brand-terracotta" /> {product.origin}
                                                        </span>
                                                        <span className="text-[10px] text-brand-olive font-bold flex items-center gap-1.5 uppercase">
                                                            <Package size={10} /> ID#{product.id.slice(0, 6).toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 text-[9px] font-bold uppercase tracking-widest border border-neutral-200 dark:border-white/10 group-hover:border-brand-olive/40 transition-colors">
                                                <Tag size={12} className="text-brand-olive" />
                                                {product.category.replace('-', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div>
                                                <p className="text-xl font-bold text-neutral-900 dark:text-white">${product.pricePerKg.toFixed(2)}</p>
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400">Per Kilogram (USD)</p>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                                                    <TrendingUp size={14} className="text-brand-terracotta" /> {product.minOrder}kg Min.
                                                </p>
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400">Ready for Shipment</p>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleOpenEdit(product); }}
                                                    className="w-11 h-11 flex items-center justify-center rounded-2xl bg-brand-olive/10 text-brand-olive hover:bg-brand-olive hover:text-white transition-all shadow-sm border border-brand-olive/10"
                                                    title="Modify Record"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); if (confirm('Remove this product permanently from the public export index?')) deleteProduct(product.id) }}
                                                    className="w-11 h-11 flex items-center justify-center rounded-2xl bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-500/10"
                                                    title="De-list Product"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {sortedProducts.length === 0 && (
                    <div className="py-32 text-center">
                        <Package size={64} className="mx-auto text-neutral-200 mb-8 opacity-20" />
                        <h3 className="text-2xl font-serif font-bold text-neutral-900 dark:text-white mb-3">Index Unmatched</h3>
                        <p className="text-sm text-neutral-400 max-w-xs mx-auto">We couldn't find any products in the catalog matching your current search parameters.</p>
                        <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="mt-8 text-xs font-bold uppercase tracking-widest text-brand-terracotta hover:underline">Reset Global Filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};
