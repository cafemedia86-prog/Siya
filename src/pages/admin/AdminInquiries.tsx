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
    Globe
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
        { label: 'Conversion', value: `${inquiries.length > 0 ? Math.round((inquiries.filter(i => i.status === 'Closed').length / inquiries.length) * 100) : 0}%`, icon: CheckCircle2, color: 'text-brand-olive', bg: 'bg-brand-olive/10' },
    ];

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-neutral-900 dark:text-white mb-2">B2B Trade Desk</h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Manage global exporter queries and partner direct relationships.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:shadow-lg transition-all duration-300 shadow-sm">Export Data</button>
                    <button className="px-6 py-3 bg-brand-olive text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-ink transition-all duration-300 shadow-[0_8px_24px_rgba(182,198,155,0.4)] hover:shadow-[0_8px_32px_rgba(29,35,31,0.3)] group relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700" />
                        <span className="relative z-10">Mark All Read</span>
                    </button>
                </div>
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
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-600 dark:text-neutral-400 mb-0.5">{stat.label}</p>
                            <p className="text-2xl font-serif font-bold text-neutral-900 dark:text-white">{stat.value}</p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 dark:from-white/5 dark:to-transparent pointer-events-none rounded-[2rem]" />
                    </motion.div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="glass-card p-6 rounded-[2.5rem] bg-white/40 dark:bg-dark-surface/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 flex flex-col md:flex-row items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-olive transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Filter by lead name, company or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-white/60 dark:bg-white/5 border border-transparent focus:border-brand-olive/30 rounded-2xl text-sm focus:ring-4 focus:ring-brand-olive/10 outline-none transition-all placeholder:text-neutral-400 shadow-inner focus:shadow-none"
                    />
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-56 group">
                        <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-hover:text-brand-olive transition-colors" size={16} />
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full pl-14 pr-10 py-4 bg-white/60 dark:bg-white/5 border border-transparent hover:border-brand-olive/20 focus:border-brand-olive/30 rounded-2xl text-[10px] font-bold uppercase tracking-widest outline-none transition-all appearance-none cursor-pointer shadow-sm hover:shadow-md"
                        >
                            <option value="all">Every Lead</option>
                            <option value="Pending">Pending</option>
                            <option value="Replying">Replying</option>
                            <option value="Quoted">Quoted</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                    <div className="relative flex-1 md:w-56 group">
                        <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-hover:text-brand-olive transition-colors" size={16} />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full pl-14 pr-10 py-4 bg-white/60 dark:bg-white/5 border border-transparent hover:border-brand-olive/20 focus:border-brand-olive/30 rounded-2xl text-[10px] font-bold uppercase tracking-widest outline-none transition-all appearance-none cursor-pointer shadow-sm hover:shadow-md"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Inquiries List */}
            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {sortedInquiries.map((inq, i) => (
                        <motion.div
                            key={inq.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => setSelectedInquiry(inq)}
                            className="glass-card bg-white/50 dark:bg-dark-surface/50 backdrop-blur-md rounded-[2.5rem] border border-white/60 dark:border-white/10 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] hover:border-brand-olive/30 transition-all duration-500 group cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-olive/20 dark:bg-brand-olive/5 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="flex flex-col xl:flex-row gap-8 relative z-10">
                                {/* Profile Info */}
                                <div className="flex-1 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-brand-cream to-white dark:from-brand-olive/30 dark:to-brand-olive/10 flex items-center justify-center text-2xl font-bold text-brand-olive shadow-inner border border-brand-olive/20 group-hover:scale-105 transition-transform duration-500">
                                                {inq.partner.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-serif font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-brand-olive transition-colors">{inq.partner}</h3>
                                                <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                                                    <Globe size={12} className="text-brand-terracotta" /> {inq.company} • {inq.country}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={cn(
                                                "px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest shadow-sm border",
                                                inq.status === 'Pending' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                                    inq.status === 'Quoted' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                                        inq.status === 'Closed' ? "bg-neutral-500/10 text-neutral-500 border-neutral-500/20" : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                            )}>
                                                {inq.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400">Total Volume</p>
                                            <p className="text-sm font-bold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-white/5 inline-block px-3 py-1 rounded-lg">{inq.volume}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400">Product Line</p>
                                            <p className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                                                <Package size={14} className="text-brand-terracotta" /> {inq.product}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-1.5"><Mail size={10} /> Contact</p>
                                            <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 truncate">{inq.email}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-1.5"><Clock size={10} /> Date</p>
                                            <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">{inq.date}</p>
                                        </div>
                                    </div>

                                    <div className="bg-neutral-50 dark:bg-white/5 p-6 rounded-3xl border border-neutral-100 dark:border-white/5">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3 block opacity-60">Lead Note Snippet:</p>
                                        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 italic leading-relaxed line-clamp-2">
                                            "{inq.message}"
                                        </p>
                                    </div>
                                </div>

                                <div className="flex xl:flex-col justify-end gap-3 self-end xl:self-center" onClick={(e) => e.stopPropagation()}>
                                    <div className="relative">
                                        <select
                                            className="w-full px-5 py-4 bg-white/60 dark:bg-white/5 text-[9px] font-bold uppercase tracking-widest rounded-2xl focus:ring-4 focus:ring-brand-olive/10 outline-none cursor-pointer appearance-none shadow-sm pr-10 border border-transparent hover:border-brand-olive/20 focus:border-brand-olive/30 transition-all"
                                            value={inq.status}
                                            onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                                        >
                                            <option value="Pending">Waiting</option>
                                            <option value="Replying">In Discussion</option>
                                            <option value="Quoted">Quote Sent</option>
                                            <option value="Closed">Finalized</option>
                                        </select>
                                        <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={12} />
                                    </div>
                                    <button
                                        onClick={() => { if (confirm('Archive this lead record?')) deleteInquiry(inq.id) }}
                                        className="flex items-center justify-center p-4 bg-red-500/5 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/10 shadow-sm"
                                        title="Archive Lead"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {sortedInquiries.length === 0 && (
                    <div className="py-32 text-center glass-card rounded-[4rem] border border-dashed border-neutral-200 dark:border-white/10">
                        <MessageSquare size={64} className="mx-auto text-neutral-200 mb-8 opacity-20" />
                        <h3 className="text-3xl font-serif font-bold text-neutral-900 dark:text-white mb-3">No trade queries match</h3>
                        <p className="text-sm text-neutral-400 max-w-sm mx-auto">Try clearing your search filters to find the right partner leads.</p>
                        <button onClick={() => { setSearchQuery(''); setSelectedStatus('all'); }} className="mt-8 text-xs font-bold uppercase tracking-widest text-brand-terracotta hover:underline">Clear all filters</button>
                    </div>
                )}
            </div>

            {/* Inquiry Detail Modal */}
            <AnimatePresence>
                {selectedInquiry && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 md:px-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedInquiry(null)}
                            className="absolute inset-0 bg-brand-ink/60 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-5xl bg-white/90 dark:bg-dark-surface/90 backdrop-blur-3xl rounded-[4rem] shadow-[0_24px_80px_rgba(0,0,0,0.1)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.4)] overflow-hidden overflow-y-auto max-h-[85vh] border border-white/60 dark:border-white/10 filter drop-shadow-2xl"
                        >
                            <div className="p-12 md:p-20 space-y-16">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                                    <div className="flex items-center gap-8">
                                        <div className="w-24 h-24 rounded-[2rem] bg-brand-olive text-white flex items-center justify-center text-4xl font-bold shadow-2xl shadow-brand-olive/40 border-4 border-white/20">
                                            {selectedInquiry.partner.charAt(0)}
                                        </div>
                                        <div>
                                            <h2 className="text-5xl font-serif font-bold mb-3 tracking-tight">{selectedInquiry.partner}</h2>
                                            <p className="text-brand-terracotta font-bold uppercase tracking-[0.3em] text-xs pb-2 border-b border-brand-terracotta/20 inline-block">{selectedInquiry.company}</p>
                                            <div className="flex items-center gap-6 text-neutral-400 mt-6">
                                                <span className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 bg-neutral-100 dark:bg-white/5 px-4 py-2 rounded-full"><MapPin size={14} className="text-brand-terracotta" /> {selectedInquiry.country}</span>
                                                <span className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 bg-neutral-100 dark:bg-white/5 px-4 py-2 rounded-full"><Clock size={14} className="text-brand-olive" /> {selectedInquiry.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedInquiry(null)}
                                        className="w-14 h-14 rounded-full bg-white/50 dark:bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/10 transition-all shadow-sm border border-transparent hover:border-neutral-200/50 dark:hover:border-white/10"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                                    <div className="lg:col-span-2 space-y-12">
                                        <div className="space-y-6">
                                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-3">
                                                <span className="w-8 h-[1px] bg-neutral-200 dark:bg-white/10"></span>
                                                Lead Message & Requirements
                                            </h3>
                                            <div className="p-10 md:p-12 bg-neutral-50 dark:bg-white/5 rounded-[3rem] border border-neutral-100 dark:border-white/5 leading-relaxed text-xl text-neutral-800 dark:text-rich-white italic font-serif">
                                                "{selectedInquiry.message}"
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="p-8 bg-brand-olive/5 rounded-[2.5rem] border border-brand-olive/10 flex items-center gap-5 group hover:bg-brand-olive/10 transition-colors">
                                                <div className="w-14 h-14 rounded-2xl bg-brand-olive/10 flex items-center justify-center text-brand-olive group-hover:scale-110 transition-transform">
                                                    <Package size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Product Category</p>
                                                    <p className="text-lg font-bold capitalize">{selectedInquiry.interest}</p>
                                                </div>
                                            </div>
                                            <div className="p-8 bg-brand-terracotta/5 rounded-[2.5rem] border border-brand-terracotta/10 flex items-center gap-5 group hover:bg-brand-terracotta/10 transition-colors">
                                                <div className="w-14 h-14 rounded-2xl bg-brand-terracotta/10 flex items-center justify-center text-brand-terracotta group-hover:scale-110 transition-transform">
                                                    <TrendingUp size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Target Volume</p>
                                                    <p className="text-lg font-bold">{selectedInquiry.volume}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-10">
                                        <div className="space-y-6">
                                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-3">
                                                <span className="w-8 h-[1px] bg-neutral-200 dark:bg-white/10"></span>
                                                Lead Intelligence
                                            </h3>
                                            <div className="space-y-6 glass-card p-10 rounded-[3rem] border border-neutral-100 dark:border-white/5 shadow-inner">
                                                <div className="group">
                                                    <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-2 underline decoration-brand-olive decoration-2 underline-offset-4">Direct Communication</p>
                                                    <a href={`mailto:${selectedInquiry.email}`} className="text-md font-bold text-neutral-900 dark:text-white group-hover:text-brand-olive flex items-center gap-3 transition-colors break-all">
                                                        <Mail size={16} /> {selectedInquiry.email}
                                                    </a>
                                                </div>
                                                <div className="pt-4 border-t border-neutral-100 dark:border-white/5">
                                                    <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Tracking Passport</p>
                                                    <p className="text-sm font-mono text-brand-olive font-bold">LEA-{selectedInquiry.id.slice(0, 8).toUpperCase()}</p>
                                                </div>
                                                <div className="pt-4 border-t border-neutral-100 dark:border-white/5">
                                                    <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-3">Lifecycle Status</p>
                                                    <select
                                                        className="w-full bg-neutral-100 dark:bg-white/10 border-none rounded-2xl px-5 py-4 text-[10px] font-bold uppercase tracking-[0.1em] outline-none shadow-sm focus:ring-2 focus:ring-brand-olive transition-all"
                                                        value={selectedInquiry.status}
                                                        onChange={(e) => {
                                                            updateInquiryStatus(selectedInquiry.id, e.target.value as any);
                                                            setSelectedInquiry({ ...selectedInquiry, status: e.target.value });
                                                        }}
                                                    >
                                                        <option value="Pending">New Opportunity</option>
                                                        <option value="Replying">Engaged / Replying</option>
                                                        <option value="Quoted">Formally Quoted</option>
                                                        <option value="Closed">Closed / Archived</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6">
                                            <a
                                                href={`mailto:${selectedInquiry.email}?subject=Regarding your bulk export inquiry for Siya's ${selectedInquiry.interest}&body=Dear ${selectedInquiry.partner},\n\nWe appreciate your professional interest in Siya's premium exports. Our team has reviewed your company profile (${selectedInquiry.company}) and we are pleased to discuss the ${selectedInquiry.volume} requirements for ${selectedInquiry.interest} in ${selectedInquiry.country}...\n\nBest Regards,\nLead Account Manager\nSiya B2B Team`}
                                                className="w-full inline-flex items-center justify-center gap-3 bg-brand-ink text-white py-5 rounded-3xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-brand-olive transition-all shadow-2xl shadow-brand-ink/40 group"
                                            >
                                                <Reply size={18} className="group-hover:-translate-x-1 transition-transform" /> Draft Official Reply
                                            </a>
                                            <p className="text-[10px] text-center text-neutral-400 mt-6 font-medium italic">Opening default mail client for direct engagement.</p>
                                        </div>
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
