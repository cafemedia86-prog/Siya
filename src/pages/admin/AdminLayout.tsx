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
            {/* Background Gradient */}
            <div className="fixed inset-0 bg-[#F5F5ED] dark:bg-dark-bg transition-colors duration-500" />
            <div className="fixed top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl from-brand-olive/5 via-transparent to-transparent pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tr from-brand-terracotta/5 via-transparent to-transparent pointer-events-none" />

            {/* Sidebar */}
            <aside className="w-72 flex flex-col bg-[#2D2D2D] text-white sticky top-0 h-screen z-40 shadow-2xl">
                <div className="p-10">
                    <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-[#D47A6A] hover:opacity-80 transition-opacity">
                        Siya's Admin
                    </Link>
                </div>

                <nav className="flex-1 px-6 py-4 space-y-3">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 relative group",
                                location.pathname === item.path
                                    ? "bg-[#4A4A35] text-white shadow-lg"
                                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon size={20} className={cn(
                                "transition-colors",
                                location.pathname === item.path ? "text-white" : "text-neutral-500 group-hover:text-white"
                            )} />
                            {item.name}
                            {location.pathname === item.path && (
                                <motion.div layoutId="active" className="ml-auto">
                                    <ChevronRight size={16} />
                                </motion.div>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="p-8 mt-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-sm font-bold text-[#D47A6A] hover:bg-white/5 transition-all group"
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Site
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
                {/* Header */}
                <header className="h-24 px-10 flex items-center justify-between sticky top-0 z-30">
                    <div className="relative w-[450px] group">
                        <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-olive transition-colors" />
                        <input
                            type="text"
                            placeholder="Search data..."
                            className="w-full pl-16 pr-6 py-4 bg-white/40 backdrop-blur-md border border-white/20 focus:border-brand-olive/30 focus:bg-white rounded-2xl text-sm shadow-sm focus:shadow-md outline-none transition-all placeholder:text-neutral-400"
                        />
                    </div>

                    <div className="flex items-center gap-8">
                        <button className="relative w-12 h-12 rounded-full bg-white/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-neutral-600 hover:text-brand-terracotta transition-all shadow-sm hover:shadow-md">
                            <Bell size={20} />
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-brand-terracotta rounded-full border-2 border-white" />
                        </button>

                        <div className="flex items-center gap-4 pl-8 border-l border-neutral-200">
                            <div className="text-right">
                                <p className="text-sm font-bold text-neutral-900">Admin User</p>
                                <p className="text-[11px] text-[#D47A6A] font-bold uppercase tracking-wider">Super Admin</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-[#E5E5DA] flex items-center justify-center text-[#5A5A40] shadow-inner overflow-hidden border-2 border-white">
                                <User size={24} />
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
