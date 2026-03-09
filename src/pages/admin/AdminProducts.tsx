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
                    className="bg-[#3D3D2D] text-white px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all duration-500 shadow-xl flex items-center gap-4 group"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                    <span>List New SKU</span>
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="bg-white p-8 rounded-[2.5rem] flex items-center gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-white hover:shadow-[0_15px_50px_rgba(0,0,0,0.05)] transition-all duration-500"
                    >
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", stat.bg)}>
                            <stat.icon size={24} className={stat.color} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">{stat.label}</p>
                            <p className="text-3xl font-serif font-medium text-neutral-900">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Unified Toolbar */}
            <div className="bg-white p-4 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-white flex flex-col md:flex-row items-center gap-4 mb-12">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-neutral-300" size={22} />
                    <input
                        type="text"
                        placeholder="Search export index..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-18 pr-8 py-6 bg-neutral-50/50 border-none rounded-full text-sm focus:ring-4 focus:ring-neutral-100/50 outline-none transition-all placeholder:text-neutral-400"
                    />
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto pr-4">
                    <div className="relative min-w-[220px]">
                        <Filter className="absolute left-7 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full pl-16 pr-10 py-6 bg-neutral-50/50 border-none rounded-full text-[11px] font-bold uppercase tracking-[0.15em] outline-none transition-all appearance-none cursor-pointer"
                        >
                            <option value="all">Every Category</option>
                            {CATEGORIES.map(cat => (
                                <option key={cat.id} value={cat.slug}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative min-w-[220px]">
                        <ArrowUpDown className="absolute left-7 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full pl-16 pr-10 py-6 bg-neutral-50/50 border-none rounded-full text-[11px] font-bold uppercase tracking-[0.15em] outline-none transition-all appearance-none cursor-pointer"
                        >
                            <option value="newest">Recent First</option>
                            <option value="price-high">Value: High-Low</option>
                            <option value="price-low">Value: Low-High</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Table Headers */}
            <div className="px-14 py-6 grid grid-cols-12 gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                <div className="col-span-4">SKU Identification</div>
                <div className="col-span-2 text-center">Classification</div>
                <div className="col-span-2 text-center">Price Points</div>
                <div className="col-span-2 text-center">Logistics</div>
                <div className="col-span-2 text-right">Operations</div>
            </div>

            {/* Product Cards Grid */}
            <div className="space-y-6">
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
                            className="bg-white rounded-[3rem] p-10 grid grid-cols-12 gap-8 items-center shadow-[0_10px_40px_rgba(0,0,0,0.01)] border border-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] hover:scale-[1.005] transition-all duration-500 cursor-pointer group"
                        >
                            {/* SKU Identification */}
                            <div className="col-span-4 flex items-center gap-10">
                                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-neutral-50 shadow-xl group-hover:rotate-2 transition-transform duration-700">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-serif font-medium text-neutral-900 group-hover:text-[#a65d4a] transition-colors">{product.name}</h3>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-3">
                                            <Globe size={14} className="text-[#a65d4a]" /> {product.origin}
                                        </span>
                                        <span className="text-[11px] text-[#5A5A40] font-bold uppercase tracking-wider flex items-center gap-3">
                                            <Package size={14} /> ID#{product.id.slice(0, 6).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Classification */}
                            <div className="col-span-2 flex justify-center">
                                <span className="flex items-center gap-3 px-6 py-3 rounded-full bg-neutral-50 text-neutral-500 text-[10px] font-bold uppercase tracking-widest border border-neutral-100 group-hover:bg-[#5A5A40]/5 group-hover:border-[#5A5A40]/20 transition-all">
                                    <Tag size={14} className="text-[#5A5A40]" />
                                    {product.category.replace('-', ' ')}
                                </span>
                            </div>

                            {/* Price Points */}
                            <div className="col-span-2 text-center text-neutral-900">
                                <p className="text-4xl font-serif font-medium mb-1">${product.pricePerKg.toFixed(2)}</p>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Per Kilogram (USD)</p>
                            </div>

                            {/* Logistics */}
                            <div className="col-span-2 text-center">
                                <div className="inline-flex flex-col items-center">
                                    <p className="text-sm font-bold text-neutral-800 flex items-center gap-3 mb-1">
                                        <TrendingUp size={18} className="text-[#a65d4a]" /> {product.minOrder}kg Min.
                                    </p>
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Ready for Shipment</p>
                                </div>
                            </div>

                            {/* Operations */}
                            <div className="col-span-2 flex items-center justify-end gap-5">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleOpenEdit(product); }}
                                    className="w-14 h-14 flex items-center justify-center rounded-[1.5rem] bg-neutral-50 text-neutral-400 hover:bg-[#5A5A40] hover:text-white transition-all duration-300"
                                >
                                    <Edit2 size={20} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); if (confirm('Remove this product permanently?')) deleteProduct(product.id) }}
                                    className="w-14 h-14 flex items-center justify-center rounded-[1.5rem] bg-red-50/50 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                                >
                                    <Trash2 size={20} />
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
                            className="absolute inset-0 bg-[#3D3D2D]/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-white rounded-[4rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] border border-white p-16"
                        >
                            <div className="flex justify-between items-start mb-16">
                                <div>
                                    <h2 className="text-4xl font-serif font-medium mb-4">{editingId ? 'Refine Product' : 'Register New SKU'}</h2>
                                    <p className="text-neutral-400 font-medium">Define wholesale specifications and export parameters.</p>
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
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-[#5A5A40] ml-6">Product Nomenclature</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-neutral-50 border-none rounded-3xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-[#3D3D2D] outline-none shadow-inner"
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
                                                className="w-full bg-neutral-50 border-none rounded-3xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-[#3D3D2D] outline-none shadow-inner"
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
                                            className="flex-[2] bg-[#3D3D2D] text-white px-10 py-6 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-[#3D3D2D]/40 font-bold"
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
