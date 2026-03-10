import React from 'react';
import { motion } from 'motion/react';
import {
    Package,
    MessageSquare,
    TrendingUp,
    Users,
    ArrowUpRight,
    Globe,
    Activity,
    Zap,
    Ship
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
    const { products, inquiries, isLoading } = useAdmin();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-neutral-100 border-t-neutral-900 rounded-full animate-spin" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Synchronizing Trade Desk...</p>
                </div>
            </div>
        );
    }

    const stats = [
        {
            label: 'Production Index',
            value: products.length,
            sub: 'Active SKUs',
            icon: Package,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            trend: '+4'
        },
        {
            label: 'Lead Pipeline',
            value: inquiries.filter(inq => inq.status === 'Pending').length,
            sub: 'Pending Action',
            icon: Zap,
            color: 'text-brand-terracotta',
            bg: 'bg-brand-terracotta/10',
            trend: 'New'
        },
        {
            label: 'Trade Volume',
            value: '42.8t',
            sub: 'Projected Q1',
            icon: Ship,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            trend: '+12%'
        },
        {
            label: 'Global Partners',
            value: '18',
            sub: 'Countries Active',
            icon: Globe,
            color: 'text-brand-olive',
            bg: 'bg-brand-olive/10',
            trend: '+2'
        },
    ];

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-4xl font-serif font-bold text-neutral-900 mb-2 tracking-tight">Trade Command</h1>
                    <p className="text-sm text-neutral-500 font-medium">Monitoring Siya's global export logistics and partner relations.</p>
                </motion.div>
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-[10px] font-bold text-neutral-900">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">3 Admins Online</p>
                </div>
            </div>

            {/* Performance Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                        className="p-8 rounded-[2.5rem] bg-neutral-50 border border-neutral-100 hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-500 group overflow-hidden relative"
                    >
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className={cn("p-4 rounded-2xl shadow-inner relative z-10", stat.bg, stat.color)}>
                                <stat.icon size={26} className="group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold px-3 py-1 rounded-full border backdrop-blur-md",
                                stat.trend.includes('+') ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" : "text-brand-terracotta border-brand-terracotta/20 bg-brand-terracotta/5"
                            )}>
                                {stat.trend}
                            </span>
                        </div>
                        <div className="relative z-10">
                            <p className="text-4xl font-serif font-bold text-neutral-900 mb-1">{stat.value}</p>
                            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-4">{stat.label}</p>
                            <p className="text-[9px] font-bold text-neutral-400 opacity-80 border-t border-neutral-200 pt-4">{stat.sub}</p>
                        </div>
                        {/* Decorative background element */}
                        <div className={cn("absolute -right-8 -bottom-8 w-40 h-40 blur-[40px] opacity-10 group-hover:opacity-20 transition-opacity duration-700", stat.bg)} />
                        <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent pointer-events-none rounded-[2.5rem]" />
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* Real-time Inquiries Board */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="xl:col-span-2 bg-white rounded-[3rem] border border-neutral-100 overflow-hidden shadow-xl shadow-neutral-100/50 group"
                >
                    <div className="p-10 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 blur-[80px] rounded-full pointer-events-none" />
                        <div className="relative z-10 flex w-full justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-neutral-900 tracking-tight">Live Inquiries</h2>
                                <p className="text-xs text-neutral-500 font-medium">Latest potential trade partnerships from the global desk.</p>
                            </div>
                            <Link to="/admin/inquiries" className="flex items-center gap-2 group/btn relative z-10">
                                <button className="text-[10px] font-bold uppercase tracking-widest text-[#a65d4a] group-hover/btn:text-neutral-900 transition-colors bg-white px-4 py-2 rounded-full border border-neutral-100 shadow-sm">Go to Trade Desk</button>
                                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 group-hover/btn:bg-[#a65d4a] group-hover/btn:text-white transition-colors">
                                    <ArrowUpRight size={14} className="group-hover/btn:scale-110 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-neutral-50 border-b border-neutral-100">
                                <tr>
                                    <th className="px-10 py-5 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">Trade Partner</th>
                                    <th className="px-10 py-5 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">Interest Region</th>
                                    <th className="px-10 py-5 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">Volume Req.</th>
                                    <th className="px-10 py-5 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 text-right">Passport</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {inquiries.slice(0, 5).map((row, i) => (
                                    <tr key={row.id} className="hover:bg-neutral-50 transition-all duration-300 group/row cursor-pointer">
                                        <td className="px-10 py-6 relative">
                                            <div className="flex items-center gap-4 relative z-10">
                                                <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-900 border border-neutral-200 shadow-sm group-hover/row:scale-110 group-hover/row:rotate-3 transition-transform duration-500">
                                                    {row.partner.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-neutral-900 mb-0.5 tracking-tight">{row.partner}</p>
                                                    <p className="text-[9px] font-bold text-[#a65d4a] uppercase tracking-widest">{row.company}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-2 text-xs font-bold text-neutral-700">
                                                <Globe size={12} className="text-[#a65d4a]" />
                                                {row.country}
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <p className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest bg-neutral-100 px-3 py-1.5 rounded-lg inline-block border border-neutral-200/50">{row.volume}</p>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <span className={cn(
                                                "inline-block px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm border",
                                                row.status === 'Pending' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                                    row.status === 'Quoted' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-[#a65d4a]/10 text-[#a65d4a] border-[#a65d4a]/20"
                                            )}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {inquiries.length === 0 && (
                            <div className="py-20 text-center">
                                <Activity size={40} className="mx-auto text-neutral-200 mb-4 opacity-30" />
                                <p className="text-sm text-neutral-400 font-medium">No live trade desk activity.</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Logistics Radar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-neutral-50 rounded-[3rem] border border-neutral-100 p-10 shadow-xl shadow-neutral-100/50 group relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 blur-[80px] rounded-full pointer-events-none" />
                    <div className="relative z-10 flex justify-between items-center mb-10">
                        <h2 className="text-2xl font-serif font-bold tracking-tight text-neutral-900">Stock Logistics</h2>
                        <div className="p-3 bg-neutral-100 text-neutral-900 rounded-2xl group-hover:rotate-12 transition-transform shadow-sm">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <div className="space-y-10">
                        {products.sort((a, b) => b.minOrder - a.minOrder).slice(0, 5).map((p, i) => (
                            <div key={p.id} className="group/item">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-neutral-900 uppercase tracking-[0.1em] group-hover/item:text-[#a65d4a] transition-colors">{p.name}</span>
                                        <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">MIN VOL: {p.minOrder}kg</p>
                                    </div>
                                    <span className="text-[11px] font-bold text-neutral-500">{(95 - i * 7)}% Readiness</span>
                                </div>
                                <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(95 - i * 7)}%` }}
                                        transition={{ duration: 1.5, delay: 0.8 + (i * 0.1) }}
                                        className={cn(
                                            "h-full rounded-full shadow-lg",
                                            (95 - i * 7) < 60 ? "bg-[#a65d4a]" : "bg-neutral-900"
                                        )}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-white/5 relative z-10">
                        <Link to="/admin/products" className="w-full">
                            <button className="w-full py-5 bg-neutral-900 text-white rounded-3xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:shadow-xl transition-all shadow-xl shadow-neutral-900/10 flex items-center justify-center gap-3 group/btn">
                                Expand Global Catalog <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
