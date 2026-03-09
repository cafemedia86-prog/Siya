import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    MessageSquare,
    Search,
    Filter,
    Trash2,
    Archive,
    Reply,
    Clock,
    MapPin,
    Mail,
    Building2,
    Package,
    TrendingUp,
    CheckCircle2,
    Globe,
    FileText,
    Download
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../lib/utils';

export const AdminInquiries = () => {
    const { inquiries, updateInquiryStatus, deleteInquiry } = useAdmin();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedStatus, setSelectedStatus] = React.useState('all');
    const [selectedInquiry, setSelectedInquiry] = React.useState<any>(null);
    const [sortBy, setSortBy] = React.useState('newest');

    const filteredInquiries = inquiries.filter((inq) => {
        const matchesSearch = inq.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inq.company.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || inq.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const sortedInquiries = [...filteredInquiries].sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    const stats = [
        { label: 'Total Inquiries', value: inquiries.length, icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Pending Action', value: inquiries.filter(i => i.status === 'Pending').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Active Leads', value: inquiries.filter(i => i.status === 'Quoted' || i.status === 'Replying').length, icon: TrendingUp, color: 'text-brand-terracotta', bg: 'bg-brand-terracotta/10' },
        { label: 'Conversion Rate', value: `${inquiries.length > 0 ? Math.round((inquiries.filter(i => i.status === 'Closed').length / inquiries.length) * 100) : 0}%`, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    ];

    return (
        <div className="pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-5xl font-serif font-medium text-neutral-900 mb-4 tracking-tight">B2B Trade Desk</h1>
                    <p className="text-sm text-neutral-500 font-medium max-w-2xl leading-relaxed">Manage global exporter queries and partner direct relationships.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-10 py-5 bg-white border border-neutral-100 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-neutral-50 transition-all duration-300 shadow-sm flex items-center gap-3">
                        <Download size={18} /> Export CSV
                    </button>
                    <button className="bg-[#3D3D2D] text-white px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all duration-500 shadow-xl flex items-center gap-3">
                        Mark All Read
                    </button>
                </div>
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
                        placeholder="Filter by lead name, company or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-18 pr-8 py-6 bg-neutral-50/50 border-none rounded-full text-sm focus:ring-4 focus:ring-neutral-100/50 outline-none transition-all placeholder:text-neutral-400"
                    />
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto pr-4">
                    <div className="relative min-w-[220px]">
                        <Filter className="absolute left-7 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full pl-16 pr-10 py-6 bg-neutral-50/50 border-none rounded-full text-[11px] font-bold uppercase tracking-[0.15em] outline-none transition-all appearance-none cursor-pointer"
                        >
                            <option value="all">Every Lead</option>
                            <option value="Pending">Pending</option>
                            <option value="Replying">Replying</option>
                            <option value="Quoted">Quoted</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    <div className="relative min-w-[220px]">
                        <Clock className="absolute left-7 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full pl-16 pr-10 py-6 bg-neutral-50/50 border-none rounded-full text-[11px] font-bold uppercase tracking-[0.15em] outline-none transition-all appearance-none cursor-pointer"
                        >
                            <option value="newest">Recent First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Inquiries List */}
            <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                    {sortedInquiries.map((inq, i) => (
                        <motion.div
                            key={inq.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            onClick={() => setSelectedInquiry(inq)}
                            className="bg-white rounded-[3rem] p-10 grid grid-cols-12 gap-8 items-center shadow-[0_10px_40px_rgba(0,0,0,0.01)] border border-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] hover:scale-[1.005] transition-all duration-500 cursor-pointer group"
                        >
                            {/* Partner Profile */}
                            <div className="col-span-4 flex items-center gap-10">
                                <div className="w-24 h-24 rounded-[2rem] bg-neutral-50 flex items-center justify-center text-3xl font-serif font-bold text-[#5A5A40] border-4 border-white shadow-xl group-hover:rotate-2 transition-transform duration-700">
                                    {inq.partner.charAt(0)}
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-serif font-medium text-neutral-900 group-hover:text-[#a65d4a] transition-colors">{inq.partner}</h3>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-3">
                                            <Globe size={14} className="text-[#a65d4a]" /> {inq.company} • {inq.country}
                                        </span>
                                        <span className="text-[11px] text-[#5A5A40] font-bold uppercase tracking-wider flex items-center gap-3">
                                            <FileText size={14} /> LEA#{inq.id.slice(0, 8).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Logistics / Product Details */}
                            <div className="col-span-3 flex flex-col gap-2">
                                <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-neutral-50 text-neutral-500 text-[10px] font-bold uppercase tracking-widest border border-neutral-100 w-fit">
                                    <Package size={14} className="text-[#5A5A40]" />
                                    {inq.product}
                                </div>
                                <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-neutral-50 text-neutral-500 text-[10px] font-bold uppercase tracking-widest border border-neutral-100 w-fit">
                                    <TrendingUp size={14} className="text-[#a65d4a]" />
                                    {inq.volume} Required
                                </div>
                            </div>

                            {/* Status */}
                            <div className="col-span-2 text-center">
                                <span className={cn(
                                    "px-6 py-3 rounded-full text-[9px] font-bold uppercase tracking-widest border",
                                    inq.status === 'Pending' ? "bg-amber-500/5 text-amber-500 border-amber-500/20" :
                                        inq.status === 'Quoted' ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20" :
                                            inq.status === 'Closed' ? "bg-neutral-500/5 text-neutral-500 border-neutral-500/20" : "bg-blue-500/5 text-blue-500 border-blue-500/20"
                                )}>
                                    {inq.status}
                                </span>
                            </div>

                            {/* Operations */}
                            <div className="col-span-3 flex items-center justify-end gap-5">
                                <div className="relative min-w-[140px]" onClick={e => e.stopPropagation()}>
                                    <select
                                        className="w-full bg-neutral-50 border-none rounded-2xl px-5 py-4 text-[9px] font-bold uppercase tracking-widest cursor-pointer outline-none hover:bg-neutral-100 transition-colors"
                                        value={inq.status}
                                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                                    >
                                        <option value="Pending">Queue</option>
                                        <option value="Replying">Engaged</option>
                                        <option value="Quoted">Quoted</option>
                                        <option value="Closed">Finalized</option>
                                    </select>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); if (confirm('Remove this inquiry?')) deleteInquiry(inq.id) }}
                                    className="w-14 h-14 flex items-center justify-center rounded-[1.5rem] bg-red-50/50 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {sortedInquiries.length === 0 && (
                <div className="py-40 text-center bg-white rounded-[4rem] shadow-sm border border-white mx-auto mt-10">
                    <MessageSquare size={80} className="mx-auto text-neutral-100 mb-8" />
                    <h3 className="text-3xl font-serif font-medium text-neutral-900 mb-4">No trade queries match</h3>
                    <p className="text-neutral-400 font-medium max-w-sm mx-auto">Try clearing your search filters to find the right partner leads.</p>
                    <button onClick={() => { setSearchQuery(''); setSelectedStatus('all'); }} className="mt-10 text-xs font-bold uppercase tracking-widest text-[#a65d4a] border-b-2 border-[#a65d4a]/20 hover:border-[#a65d4a] transition-all pb-1 font-bold">Clear all filters</button>
                </div>
            )}

            {/* Inquiry Detail Modal */}
            <AnimatePresence>
                {selectedInquiry && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedInquiry(null)}
                            className="absolute inset-0 bg-[#3D3D2D]/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-5xl bg-white rounded-[4rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] border border-white p-16"
                        >
                            <div className="flex justify-between items-start mb-16">
                                <div className="flex items-center gap-10">
                                    <div className="w-32 h-32 rounded-[3rem] bg-[#5A5A40] text-white flex items-center justify-center text-5xl font-serif font-bold shadow-2xl shadow-[#5A5A40]/40 border-4 border-white">
                                        {selectedInquiry.partner.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-5xl font-serif font-medium mb-4">{selectedInquiry.partner}</h2>
                                        <p className="text-[#a65d4a] font-bold uppercase tracking-[0.3em] text-[11px] mb-2">{selectedInquiry.company}</p>
                                        <div className="flex items-center gap-6 text-neutral-400">
                                            <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 bg-neutral-50 px-5 py-2 rounded-full"><MapPin size={14} className="text-[#a65d4a]" /> {selectedInquiry.country}</span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 bg-neutral-50 px-5 py-2 rounded-full"><Clock size={14} className="text-[#5A5A40]" /> {selectedInquiry.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedInquiry(null)}
                                    className="w-14 h-14 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 hover:bg-neutral-100 transition-all font-bold"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                                <div className="lg:col-span-2 space-y-12">
                                    <div className="space-y-6">
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5A5A40] flex items-center gap-3">
                                            Lead Message & Requirements
                                        </h3>
                                        <div className="p-12 bg-neutral-50 rounded-[3rem] border border-neutral-100 leading-relaxed text-2xl text-neutral-800 italic font-serif">
                                            "{selectedInquiry.message}"
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="p-8 bg-neutral-50 rounded-[2.5rem] border border-neutral-100 flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-[#5A5A40]/10 flex items-center justify-center text-[#5A5A40]">
                                                <Package size={28} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Product Category</p>
                                                <p className="text-xl font-bold">{selectedInquiry.product}</p>
                                            </div>
                                        </div>
                                        <div className="p-8 bg-neutral-50 rounded-[2.5rem] border border-neutral-100 flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-[#a65d4a]/10 flex items-center justify-center text-[#a65d4a]">
                                                <TrendingUp size={28} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Target Volume</p>
                                                <p className="text-xl font-bold">{selectedInquiry.volume}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-12">
                                    <div className="space-y-8 p-10 bg-neutral-50 rounded-[3rem] border border-neutral-100 shadow-inner">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">Direct Communication</p>
                                            <a href={`mailto:${selectedInquiry.email}`} className="text-lg font-bold text-neutral-900 hover:text-[#a65d4a] flex items-center gap-3 transition-colors break-all">
                                                <Mail size={18} /> {selectedInquiry.email}
                                            </a>
                                        </div>
                                        <div className="pt-8 border-t border-neutral-200/50">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">Lifecycle Status</p>
                                            <select
                                                className="w-full bg-white border-none rounded-2xl px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] outline-none shadow-sm focus:ring-2 focus:ring-[#3D3D2D] transition-all cursor-pointer"
                                                value={selectedInquiry.status}
                                                onChange={(e) => {
                                                    updateInquiryStatus(selectedInquiry.id, e.target.value as any);
                                                    setSelectedInquiry({ ...selectedInquiry, status: e.target.value });
                                                }}
                                            >
                                                <option value="Pending">Queue</option>
                                                <option value="Replying">Engaged</option>
                                                <option value="Quoted">Quoted</option>
                                                <option value="Closed">Finalized</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <a
                                            href={`mailto:${selectedInquiry.email}?subject=Regarding your inquiry for ${selectedInquiry.product}`}
                                            className="w-full inline-flex items-center justify-center gap-4 bg-[#3D3D2D] text-white py-6 rounded-3xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl group"
                                        >
                                            <Reply size={20} className="group-hover:-translate-x-1 transition-transform" /> Draft Official Reply
                                        </a>
                                        <p className="text-[10px] text-center text-neutral-400 font-medium italic">Opening default mail client for direct engagement.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
