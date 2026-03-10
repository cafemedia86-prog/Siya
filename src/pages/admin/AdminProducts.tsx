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
    const { products, deleteProduct, addProduct, updateProduct, categories, isLoading } = useAdmin();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-neutral-100 border-t-neutral-900 rounded-full animate-spin" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Loading Catalog...</p>
                </div>
            </div>
        );
    }
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
        return b.id.localeCompare(a.id);
    });

    const stats = [
        { label: 'Total Catalog', value: products.length, icon: Layers, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Avg. Price/kg', value: `$${products.length > 0 ? (products.reduce((acc, p) => acc + p.pricePerKg, 0) / products.length).toFixed(1) : 0}`, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Product Range', value: categories.length, icon: Box, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Export Capacity', value: 'High', icon: TrendingUp, color: 'text-brand-terracotta', bg: 'bg-brand-terracotta/10' },
    ];

    return (
        <div className="pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-5xl font-serif font-medium text-neutral-900 mb-4 tracking-tight">Global Catalog</h1>
                    <p className="text-sm text-neutral-500 font-medium max-w-2xl leading-relaxed">Control Siya's export portfolio, pricing points, and shipping requirements.</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="bg-neutral-900 text-white px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all duration-500 shadow-xl flex items-center gap-4 group"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                    <span>List New SKU</span>
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="bg-neutral-50 p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] flex items-center gap-6 border border-neutral-100/50 hover:shadow-xl hover:shadow-neutral-100/50 transition-all duration-500"
                    >
                        <div className={cn("w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl flex items-center justify-center", stat.bg)}>
                            <stat.icon size={20} className={stat.color} />
                        </div>
                        <div>
                            <p className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">{stat.label}</p>
                            <p className="text-2xl lg:text-3xl font-serif font-medium text-neutral-900">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Unified Toolbar */}
            <div className="bg-neutral-50/50 p-4 rounded-[2.5rem] border border-neutral-100 flex flex-col md:flex-row items-center gap-4 mb-12">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-neutral-300" size={22} />
                    <input
                        type="text"
                        placeholder="Search export index..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-18 pr-8 py-6 bg-white border border-neutral-100 rounded-full text-sm focus:ring-4 focus:ring-neutral-200/20 outline-none transition-all placeholder:text-neutral-400 text-neutral-900"
                    />
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto pr-4">
                    <div className="relative min-w-[220px]">
                        <Filter className="absolute left-7 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full pl-16 pr-10 py-6 bg-white border border-neutral-100 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] outline-none transition-all appearance-none cursor-pointer text-neutral-900"
                        >
                            <option value="all">Every Category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.slug}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative min-w-[220px]">
                        <ArrowUpDown className="absolute left-7 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full pl-16 pr-10 py-6 bg-white border border-neutral-100 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] outline-none transition-all appearance-none cursor-pointer text-neutral-900"
                        >
                            <option value="newest">Recent First</option>
                            <option value="price-high">Value: High-Low</option>
                            <option value="price-low">Value: Low-High</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Table Headers - Hidden on Small Screens */}
            <div className="hidden lg:grid px-14 py-6 grid-cols-12 gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                <div className="col-span-4">SKU Identification</div>
                <div className="col-span-2 text-center">Classification</div>
                <div className="col-span-2 text-center">Price Points</div>
                <div className="col-span-2 text-center">Logistics</div>
                <div className="col-span-2 text-right">Operations</div>
            </div>

            {/* Product Cards Grid */}
            <div className="space-y-4 lg:space-y-6">
                <AnimatePresence mode="popLayout">
                    {sortedProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            onClick={() => handleOpenEdit(product)}
                            className="bg-neutral-50 rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-10 flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-start lg:items-center border border-neutral-100 transition-all duration-500 cursor-pointer group hover:bg-white hover:shadow-2xl hover:shadow-neutral-200/50"
                        >
                            {/* SKU Identification */}
                            <div className="w-full lg:col-span-4 flex items-center gap-6 lg:gap-10">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border-2 lg:border-4 border-white shadow-lg group-hover:rotate-2 transition-transform duration-700 shrink-0">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-2 lg:space-y-3">
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-medium text-neutral-900 group-hover:text-[#a65d4a] transition-colors line-clamp-1">{product.name}</h3>
                                    <div className="flex flex-col gap-1 sm:gap-2">
                                        <span className="text-[9px] sm:text-[10px] lg:text-[11px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-2 lg:gap-3">
                                            <Globe size={12} className="text-[#a65d4a]" /> {product.origin}
                                        </span>
                                        <span className="text-[9px] sm:text-[10px] lg:text-[11px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-2 lg:gap-3">
                                            <Package size={12} /> ID#{product.id.slice(0, 6).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Classification */}
                            <div className="w-full lg:col-span-2 flex lg:justify-center border-t border-neutral-100 lg:border-none pt-4 lg:pt-0">
                                <span className="flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2 lg:py-3 rounded-full bg-white text-neutral-500 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest border border-neutral-100 group-hover:border-neutral-200 transition-all">
                                    <Tag size={12} className="text-neutral-400" />
                                    {product.category.replace('-', ' ')}
                                </span>
                            </div>

                            {/* Price Points */}
                            <div className="w-full lg:col-span-2 flex lg:flex-col lg:text-center justify-between items-center text-neutral-900 border-t border-neutral-50 lg:border-none pt-4 lg:pt-0">
                                <p className="text-2xl lg:text-4xl font-serif font-medium lg:mb-1">${product.pricePerKg.toFixed(2)}</p>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">USD / Kilogram</p>
                            </div>

                            {/* Logistics */}
                            <div className="w-full lg:col-span-2 flex lg:flex-col lg:text-center justify-between items-center border-t border-neutral-50 lg:border-none pt-4 lg:pt-0">
                                <p className="text-xs sm:text-sm font-bold text-neutral-800 flex items-center gap-2 lg:gap-3 lg:mb-1">
                                    <TrendingUp size={16} className="text-[#a65d4a]" /> {product.minOrder}kg Min.
                                </p>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Global Shipment</p>
                            </div>

                            {/* Operations */}
                            <div className="w-full lg:col-span-2 flex items-center justify-end gap-3 lg:gap-5 border-t border-neutral-50 lg:border-none pt-6 lg:pt-0">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleOpenEdit(product); }}
                                    className="flex-1 lg:flex-none h-12 lg:w-14 lg:h-14 flex items-center justify-center gap-2 lg:gap-0 rounded-xl lg:rounded-[1.5rem] bg-neutral-100 text-neutral-500 hover:bg-neutral-900 hover:text-white transition-all duration-300"
                                >
                                    <Edit2 size={18} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest lg:hidden">Edit Record</span>
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); if (confirm('Remove this product permanently?')) deleteProduct(product.id) }}
                                    className="h-12 w-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl lg:rounded-[1.5rem] bg-red-50/50 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 shrink-0"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {sortedProducts.length === 0 && (
                <div className="py-40 text-center bg-white rounded-[4rem] shadow-sm border border-white mx-auto mt-10">
                    <Package size={80} className="mx-auto text-neutral-100 mb-8" />
                    <h3 className="text-3xl font-serif font-medium text-neutral-900 mb-4">Index Unmatched</h3>
                    <p className="text-neutral-400 font-medium max-w-sm mx-auto">We couldn't find any products in the catalog matching your current search parameters.</p>
                    <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="mt-10 text-xs font-bold uppercase tracking-widest text-[#a65d4a] border-b-2 border-[#a65d4a]/20 hover:border-[#a65d4a] transition-all pb-1 font-bold">Reset Global Filters</button>
                </div>
            )}

            {/* Modal - Kept for functionality, but needs styling to match */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-white rounded-[4rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] border border-white p-16"
                        >
                            <div className="flex justify-between items-start mb-16">
                                <div>
                                    <h2 className="text-4xl font-serif font-medium mb-4 text-neutral-900">{editingId ? 'Refine Product' : 'Register New SKU'}</h2>
                                    <p className="text-neutral-500 font-medium">Define wholesale specifications and export parameters.</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-14 h-14 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 hover:bg-neutral-100 transition-all"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-16">
                                <div className="md:col-span-1 space-y-8">
                                    <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-neutral-50 relative group cursor-pointer shadow-2xl">
                                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-white px-6 py-3 border border-white/40 rounded-full backdrop-blur-md">Change View</span>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full bg-neutral-50 border-none rounded-2xl px-6 py-5 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#3D3D2D] outline-none transition-all shadow-inner"
                                        placeholder="Image URL..."
                                        value={formData.image}
                                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    />
                                </div>

                                <div className="md:col-span-2 space-y-12">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="md:col-span-2 space-y-3">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-neutral-900 ml-6">Product Nomenclature</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-neutral-50 border border-neutral-100 rounded-3xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-neutral-900 outline-none shadow-inner text-neutral-900"
                                                placeholder="e.g. Fine Malabar Pepper"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-[#5A5A40] ml-6">Global Category</label>
                                            <select
                                                className="w-full bg-neutral-50 border-none rounded-3xl px-8 py-5 text-[11px] font-bold uppercase tracking-widest appearance-none focus:ring-2 focus:ring-[#3D3D2D] outline-none shadow-inner cursor-pointer"
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                                            >
                                                {categories.map(cat => <option key={cat.id} value={cat.slug}>{cat.name}</option>)}
                                            </select>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-[#5A5A40] ml-6">Origin</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-neutral-50 border-none rounded-3xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-[#3D3D2D] outline-none shadow-inner"
                                                value={formData.origin}
                                                onChange={e => setFormData({ ...formData, origin: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-[#5A5A40] ml-6">Price ($/kg)</label>
                                            <input
                                                required
                                                type="number"
                                                className="w-full bg-neutral-50 border-none rounded-3xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-[#3D3D2D] outline-none shadow-inner"
                                                value={formData.pricePerKg}
                                                onChange={e => setFormData({ ...formData, pricePerKg: Number(e.target.value) })}
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-[#5A5A40] ml-6">Min. Volume (kg)</label>
                                            <input
                                                required
                                                type="number"
                                                className="w-full bg-neutral-50 border border-neutral-100 rounded-3xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-neutral-900 outline-none shadow-inner text-neutral-900"
                                                value={formData.minOrder}
                                                onChange={e => setFormData({ ...formData, minOrder: Number(e.target.value) })}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-8 flex gap-6">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="flex-1 px-10 py-6 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] border border-neutral-100 hover:bg-neutral-50 transition-all font-bold"
                                        >
                                            Discard
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-[2] bg-neutral-900 text-white px-10 py-6 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-neutral-900/40 font-bold"
                                        >
                                            {editingId ? 'Push Updates' : 'Publish to Catalog'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
