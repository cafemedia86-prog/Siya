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
    User,
    Globe,
    LayoutGrid
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signOut, user } = useAuth();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { name: 'Products', icon: Package, path: '/admin/products' },
        { name: 'Collections', icon: LayoutGrid, path: '/admin/categories' },
        { name: 'Inquiries', icon: MessageSquare, path: '/admin/inquiries' },
        { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
        <div className="min-h-screen bg-white flex font-sans relative overflow-x-hidden">
            {/* Background Gradient */}
            <div className="fixed inset-0 bg-white transition-colors duration-500" />
            <div className="fixed top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl from-slate-100 via-transparent to-transparent pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tr from-slate-50 via-transparent to-transparent pointer-events-none" />

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:sticky top-0 left-0 h-screen w-72 flex flex-col bg-neutral-50/50 border-r border-neutral-100 text-neutral-900 z-40 transition-transform duration-500 lg:translate-x-0 outline-none",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-10 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-[#D47A6A] hover:opacity-80 transition-opacity">
                        Siya's Admin
                    </Link>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="lg:hidden text-neutral-400 hover:text-neutral-900"
                    >
                        ✕
                    </button>
                </div>

                <nav className="flex-1 px-6 py-4 space-y-3">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 relative group",
                                location.pathname === item.path
                                    ? "bg-white text-neutral-900 shadow-sm border border-neutral-200"
                                    : "text-neutral-500 hover:text-neutral-900 hover:bg-white/50"
                            )}
                        >
                            <item.icon size={20} className={cn(
                                "transition-colors",
                                location.pathname === item.path ? "text-[#a65d4a]" : "text-neutral-400 group-hover:text-neutral-900"
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

                <div className="p-8 mt-auto space-y-2">
                    <button
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            navigate('/');
                        }}
                        className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-sm font-bold text-neutral-500 hover:bg-white hover:text-neutral-900 transition-all group"
                    >
                        <Globe size={20} className="group-hover:scale-110 transition-transform" />
                        Portal Home
                    </button>
                    <button
                        onClick={async () => {
                            setIsMobileMenuOpen(false);
                            await signOut();
                            navigate('/admin/login');
                        }}
                        className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-50 transition-all group"
                    >
                        <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                        Secure Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 relative">
                {/* Header */}
                <header className="h-20 lg:h-24 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-30 bg-white/80 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none border-b border-neutral-100 lg:border-none">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="w-12 h-12 rounded-xl bg-white border border-neutral-100 flex lg:hidden items-center justify-center text-neutral-600 shadow-sm"
                        >
                            <LayoutDashboard size={20} />
                        </button>
                        <div className="relative w-[280px] md:w-[450px] group hidden sm:block">
                            <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-brand-olive transition-colors" />
                            <input
                                type="text"
                                placeholder="Search data..."
                                className="w-full pl-16 pr-6 py-3 lg:py-4 bg-neutral-50/50 border border-neutral-100 focus:border-neutral-200 focus:bg-white rounded-2xl text-sm shadow-sm focus:shadow-md outline-none transition-all placeholder:text-neutral-400 text-neutral-900"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-8">
                        <button className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-all shadow-sm">
                            <Bell size={18} />
                            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#a65d4a] rounded-full border-2 border-white" />
                        </button>

                        <div className="flex items-center gap-4 pl-4 lg:pl-8 border-l border-neutral-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-neutral-900 line-clamp-1 max-w-[150px]">{user?.email?.split('@')[0] || 'Admin'}</p>
                                <p className="text-[11px] text-[#D47A6A] font-bold uppercase tracking-wider">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 shadow-inner overflow-hidden border-2 border-white">
                                <User size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="flex-1 p-6 lg:p-10">
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
