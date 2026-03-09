import React from 'react';
import { motion } from 'motion/react';
import {
    LayoutDashboard,
    Package,
    MessageSquare,
    Settings,
    LogOut,
    ChevronRight,
    Bell,
    Search,
    User
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { AnimatePresence } from 'motion/react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { name: 'Products', icon: Package, path: '/admin/products' },
        { name: 'Inquiries', icon: MessageSquare, path: '/admin/inquiries' },
        { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ];

    React.useEffect(() => {
        const root = document.documentElement;

        // Disable dark mode when entering admin panel
        root.classList.remove('dark');

        return () => {
            // Restore dark mode when leaving admin panel if preferred
            const stored = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (stored === 'dark' || (!stored && prefersDark)) {
                root.classList.add('dark');
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-brand-cream flex font-sans relative">
            {/* Background Orbs */}
            <div className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-olive/20 blur-[100px] pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-terracotta/20 blur-[120px] pointer-events-none" />

            {/* Sidebar */}
            <aside className="w-64 border-r border-neutral-200 dark:border-white/10 flex flex-col bg-white/70 dark:bg-dark-surface/70 backdrop-blur-2xl sticky top-0 h-screen z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <div className="p-8">
                    <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-brand-olive dark:text-brand-terracotta">
                        Siya's Admin
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative overflow-hidden group",
                                location.pathname === item.path
                                    ? "bg-brand-olive text-white shadow-lg shadow-brand-olive/30"
                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-brand-olive dark:hover:text-white"
                            )}
                        >
                            {location.pathname !== item.path && (
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-olive/0 via-brand-olive/5 to-brand-olive/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            )}
                            <item.icon size={18} />
                            {item.name}
                            {location.pathname === item.path && (
                                <motion.div layoutId="active" className="ml-auto">
                                    <ChevronRight size={14} />
                                </motion.div>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-neutral-200 dark:border-white/10">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={18} />
                        Back to Site
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
                {/* Header */}
                <header className="h-20 border-b border-neutral-200 dark:border-white/10 bg-white/70 dark:bg-dark-surface/70 backdrop-blur-2xl px-8 flex items-center justify-between sticky top-0 z-30 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                    <div className="relative w-96 group">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-olive transition-colors" />
                        <input
                            type="text"
                            placeholder="Search data..."
                            className="w-full pl-10 pr-4 py-2 bg-neutral-100 dark:bg-white/5 border border-transparent focus:border-brand-olive/30 focus:bg-white dark:focus:bg-dark-surface rounded-xl text-sm focus:ring-4 focus:ring-brand-olive/10 outline-none transition-all shadow-inner focus:shadow-none"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-neutral-600 dark:text-neutral-400 hover:text-brand-terracotta transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-brand-terracotta rounded-full border-2 border-white dark:border-dark-surface" />
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-neutral-200 dark:border-white/10">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-neutral-900 dark:text-white">Admin User</p>
                                <p className="text-[10px] text-brand-terracotta font-medium">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-brand-cream dark:bg-brand-olive/20 flex items-center justify-center text-brand-olive">
                                <User size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};
