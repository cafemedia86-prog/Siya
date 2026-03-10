import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/admin';

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.message || 'Verification failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neutral-50 rounded-full blur-[120px] opacity-60" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neutral-100 rounded-full blur-[120px] opacity-40" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl relative z-10"
            >
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-neutral-900 mb-8 shadow-2xl shadow-neutral-200"
                    >
                        <ShieldCheck className="text-white" size={32} />
                    </motion.div>
                    <h1 className="text-5xl font-serif font-medium text-neutral-900 mb-4 tracking-tight">Trade Desk Authentication</h1>
                    <p className="text-sm text-neutral-400 font-bold uppercase tracking-[0.2em]">Authorized Personnel Only</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-neutral-50 border border-neutral-100 p-10 lg:p-14 rounded-[3rem] shadow-2xl shadow-neutral-200/50 backdrop-blur-sm"
                >
                    <form onSubmit={handleLogin} className="space-y-8">
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-50 border border-red-100 text-red-500 p-5 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-center"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900 ml-6">Corporate Email</label>
                            <div className="relative">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white border border-neutral-100 rounded-3xl px-14 py-5 text-sm font-bold focus:ring-4 focus:ring-neutral-900/5 outline-none transition-all placeholder:text-neutral-200"
                                    placeholder="admin@siyas.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900 ml-6">Access Code</label>
                            <div className="relative">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white border border-neutral-100 rounded-3xl px-14 py-5 text-sm font-bold focus:ring-4 focus:ring-neutral-900/5 outline-none transition-all placeholder:text-neutral-200"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-neutral-900 text-white p-6 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-black transition-all shadow-xl shadow-neutral-900/20 disabled:opacity-50 group"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Verify Credentials
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-10 border-t border-neutral-200 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                        <div className="flex items-center gap-3">
                            <Globe size={14} />
                            <span>Global Transit Secured</span>
                        </div>
                        <div>Siya Cloud v1.0</div>
                    </div>
                </motion.div>

                <p className="mt-10 text-center text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                    In case of lost access, contact Global Systems Administrator
                </p>
            </motion.div>
        </div>
    );
};
