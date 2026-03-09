import React from 'react';
import { motion } from 'motion/react';
import {
    Settings,
    ShieldCheck,
    Save,
    Globe,
    Building2,
    Mail,
    Phone,
    MapPin,
    ArrowRight
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
        <div className="pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-5xl font-serif font-medium text-neutral-900 mb-4 tracking-tight">System Configuration</h1>
                    <p className="text-sm text-neutral-500 font-medium max-w-2xl leading-relaxed">Manage Siya's global identity, contact protocols, and security perimeters.</p>
                </div>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                {/* General Settings */}
                <div className="xl:col-span-8 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-12 rounded-[3.5rem] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.02)] relative overflow-hidden"
                    >
                        <h2 className="text-3xl font-serif font-medium mb-12 flex items-center gap-4 text-neutral-900">
                            <Globe className="text-[#a65d4a]" size={28} /> General Identity
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#5A5A40] ml-6">Legal Entity Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-neutral-50 border-none rounded-3xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-[#3D3D2D] outline-none shadow-inner transition-all"
                                    value={localInfo.name}
                                    onChange={e => setLocalInfo({ ...localInfo, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#5A5A40] ml-6">Corporate Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-neutral-50 border-none rounded-3xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-[#3D3D2D] outline-none shadow-inner transition-all"
                                    value={localInfo.email}
                                    onChange={e => setLocalInfo({ ...localInfo, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#5A5A40] ml-6">Primary Trade Line</label>
                                <input
                                    type="text"
                                    className="w-full bg-neutral-50 border-none rounded-3xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-[#3D3D2D] outline-none shadow-inner transition-all"
                                    value={localInfo.phone}
                                    onChange={e => setLocalInfo({ ...localInfo, phone: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#5A5A40] ml-6">HQ Jurisdiction</label>
                                <input
                                    type="text"
                                    className="w-full bg-neutral-50 border-none rounded-3xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-[#3D3D2D] outline-none shadow-inner transition-all"
                                    value={localInfo.country}
                                    onChange={e => setLocalInfo({ ...localInfo, country: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2 space-y-3">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#5A5A40] ml-6">Global Headquarters Address</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-neutral-50 border-none rounded-[2.5rem] px-8 py-6 text-sm font-bold focus:ring-2 focus:ring-[#3D3D2D] outline-none shadow-inner transition-all leading-relaxed"
                                    value={localInfo.address}
                                    onChange={e => setLocalInfo({ ...localInfo, address: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="pt-12 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="bg-[#3D3D2D] text-white px-12 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-[#3D3D2D]/20 group disabled:opacity-50"
                            >
                                <Save size={18} className={isSaving ? "animate-spin" : "group-hover:scale-110 transition-transform"} />
                                {isSaving ? "Synchronizing..." : "Authorize Changes"}
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-12 rounded-[3.5rem] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.02)] relative overflow-hidden"
                    >
                        <h2 className="text-3xl font-serif font-medium mb-12 flex items-center gap-4 text-neutral-900">
                            <ShieldCheck className="text-[#5A5A40]" size={28} /> Security Perimeters
                        </h2>

                        <div className="flex flex-col md:flex-row justify-between items-center bg-neutral-50 p-8 rounded-[2.5rem] border border-neutral-100 gap-8">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-neutral-900 mb-2">Two-Factor Authentication</h3>
                                <p className="text-sm text-neutral-500 font-medium">Elevate your administrative access security through multi-layered verification protocols.</p>
                            </div>
                            <button type="button" className="px-10 py-5 bg-white text-[11px] font-bold uppercase tracking-widest border border-neutral-200 rounded-full hover:bg-[#5A5A40] hover:text-white hover:border-[#5A5A40] transition-all shadow-sm">
                                Activate Portal 2FA
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar Contextual Cards */}
                <div className="xl:col-span-4 space-y-8">
                    <div className="bg-[#3D3D2D] p-10 rounded-[3.5rem] text-white shadow-2xl shadow-[#3D3D2D]/30 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-serif font-medium mb-6">Trade Compliance</h3>
                            <p className="text-sm text-white/60 mb-10 font-medium leading-relaxed">
                                Updating your GSTIN or formal export licensing indices? Direct communication with the compliance desk is required for audit trails.
                            </p>
                            <button type="button" className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#D47A6A] hover:text-white transition-colors group">
                                Open Ticket <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                    </div>

                    <div className="bg-white p-10 rounded-[3.5rem] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
                        <h3 className="text-xl font-serif font-medium mb-8 text-neutral-900">Digital Footprint</h3>
                        <div className="space-y-4">
                            {['Corporate Instagram', 'Global Facebook', 'Trade LinkedIn', 'Marketplace X'].map(social => (
                                <div key={social} className="flex justify-between items-center p-5 rounded-2xl bg-neutral-50 hover:bg-[#5A5A40]/5 transition-colors group cursor-pointer">
                                    <span className="text-xs font-bold text-neutral-600 group-hover:text-[#5A5A40] transition-colors">{social}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">Active</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
