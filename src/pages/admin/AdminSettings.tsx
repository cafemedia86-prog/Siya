import React from 'react';
import { motion } from 'motion/react';
import {
    Settings,
    ShieldCheck,
    Save,
    Globe
} from 'lucide-react';

import { useAdmin } from '../../context/AdminContext';

export const AdminSettings = () => {
    const { companyInfo, updateCompanyInfo } = useAdmin();
    const [localInfo, setLocalInfo] = React.useState(companyInfo);
    const [isSaving, setIsSaving] = React.useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        updateCompanyInfo(localInfo);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        alert('Settings saved successfully!');
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold text-neutral-900 dark:text-white mb-2">Company Settings</h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Manage your business address, contact points, and security configurations.</p>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* General Settings */}
                <div className="xl:col-span-2 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="glass-card bg-white/50 dark:bg-dark-surface/50 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-olive/20 dark:bg-brand-olive/10 blur-[120px] rounded-full pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                                <Globe className="text-brand-terracotta" size={24} /> General Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 ml-2">Company Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-neutral-100 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-brand-olive transition-all"
                                        value={localInfo.name}
                                        onChange={e => setLocalInfo({ ...localInfo, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 ml-2">Business Email</label>
                                    <input
                                        type="email"
                                        className="w-full bg-neutral-100 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-brand-olive transition-all"
                                        value={localInfo.email}
                                        onChange={e => setLocalInfo({ ...localInfo, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 ml-2">Primary Phone</label>
                                    <input
                                        type="text"
                                        className="w-full bg-neutral-100 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-brand-olive transition-all"
                                        value={localInfo.phone}
                                        onChange={e => setLocalInfo({ ...localInfo, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 ml-2">Country Headquarters</label>
                                    <input
                                        type="text"
                                        className="w-full bg-neutral-100 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-brand-olive transition-all"
                                        value={localInfo.country}
                                        onChange={e => setLocalInfo({ ...localInfo, country: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 ml-2">Headquarters Address</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-neutral-100 dark:bg-white/5 border-none rounded-3xl px-6 py-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-brand-olive transition-all leading-relaxed"
                                        value={localInfo.address}
                                        onChange={e => setLocalInfo({ ...localInfo, address: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="pt-10 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-brand-olive text-white px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-brand-terracotta transition-all shadow-xl shadow-brand-olive/20 group disabled:opacity-50"
                                >
                                    <Save size={16} className={isSaving ? "animate-spin" : "group-hover:scale-110 transition-transform"} />
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card bg-white/50 dark:bg-dark-surface/50 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-terracotta/20 dark:bg-brand-terracotta/10 blur-[120px] rounded-full pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                                <ShieldCheck className="text-brand-terracotta" size={24} /> Security & Access
                            </h2>

                            <div className="flex flex-col md:flex-row justify-between items-center bg-amber-500/5 p-6 rounded-3xl border border-amber-500/10 gap-6">
                                <div>
                                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">Two-Factor Authentication</h3>
                                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400">Increase your account security by enabling 2FA for all admin logins.</p>
                                </div>
                                <button type="button" className="px-6 py-3 bg-white dark:bg-white/10 text-[10px] font-bold uppercase tracking-widest border border-neutral-200 dark:border-white/10 rounded-xl hover:bg-amber-500 hover:text-white transition-all">
                                    Enable Now
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar Cards */}
                <div className="space-y-8">
                    <div className="glass-card p-8 rounded-[2.5rem] bg-brand-olive text-white shadow-2xl shadow-brand-olive/20 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-serif font-bold mb-4">Export Settings</h3>
                            <p className="text-[11px] text-white/60 mb-8 leading-relaxed">
                                Need to update your GSTIN or IEC codes? Contact our corporate team for official documentation updates.
                            </p>
                            <button type="button" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-terracotta hover:underline group">
                                Contact Team <Settings size={14} className="group-hover:rotate-45 transition-transform" />
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-xl" />
                    </div>

                    <div className="glass-card p-8 rounded-[2.5rem] border border-neutral-200 dark:border-white/10">
                        <h3 className="text-lg font-serif font-bold mb-6">Social Connections</h3>
                        <div className="space-y-4">
                            {['Instagram', 'Facebook', 'LinkedIn', 'Twitter'].map(social => (
                                <div key={social} className="flex justify-between items-center p-3 rounded-2xl bg-neutral-100 dark:bg-white/5">
                                    <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 group-hover:text-brand-olive transition-colors">{social}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500">Connected</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
