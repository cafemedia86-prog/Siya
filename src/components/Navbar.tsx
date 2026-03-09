import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { CATEGORIES } from '../constants';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Wholesale', path: '/wholesale' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 py-4",
        scrolled ? "py-2" : "py-6"
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto px-6 h-16 rounded-2xl transition-all duration-500 flex items-center justify-between",
          scrolled ? "glass shadow-lg" : "bg-transparent"
        )}
      >
        <Link to="/" className="flex items-center gap-2 group" aria-label="Siya's Home">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-serif font-bold tracking-tight text-brand-olive group-hover:text-brand-terracotta transition-colors"
          >
            Siya's
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link, i) => (
            <div key={link.name} className="relative group/nav">
              {link.name === 'Products' ? (
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 link-underline",
                      location.pathname === link.path ? "text-brand-terracotta" : "text-brand-ink/60 hover:text-brand-ink"
                    )}
                  >
                    {link.name}
                  </Link>
                  <ChevronDown size={12} className={cn("transition-transform duration-300", isCategoriesOpen ? "rotate-180" : "")} />

                  {/* Dropdown */}
                  <AnimatePresence>
                    {isCategoriesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64"
                      >
                        <div className="glass rounded-2xl p-4 shadow-2xl border border-white/20">
                          {CATEGORIES.map((cat) => (
                            <Link
                              key={cat.id}
                              to={`/products#${cat.slug}`}
                              className="block px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-brand-ink/60 hover:text-brand-olive hover:bg-brand-cream rounded-xl transition-all"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 link-underline",
                      location.pathname === link.path ? "text-brand-terracotta" : "text-brand-ink/60 hover:text-brand-ink"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              )}
            </div>
          ))}

          {/* Theme toggle */}
          <ThemeToggle />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/wholesale"
              className="bg-brand-ink text-white px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-olive hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-brand-ink/10"
            >
              <Phone size={14} />
              B2B Inquiry
            </Link>
          </motion.div>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-brand-ink p-2 hover:bg-brand-cream rounded-full transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-24 left-4 right-4 glass rounded-[2.5rem] overflow-hidden shadow-2xl md:hidden border border-white/20"
          >
            <div className="p-8 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-6 py-4 text-sm font-bold uppercase tracking-widest rounded-2xl transition-colors",
                      location.pathname === link.path ? "bg-brand-olive text-white shadow-lg shadow-brand-olive/20" : "text-brand-ink hover:bg-brand-cream"
                    )}
                  >
                    {link.name}
                  </Link>
                  {link.name === 'Products' && (
                    <div className="mt-2 ml-6 grid grid-cols-1 gap-1">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/products#${cat.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-brand-ink/40 hover:text-brand-olive transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/wholesale"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-brand-ink text-white px-6 py-5 rounded-2xl text-sm font-bold uppercase tracking-widest mt-6 shadow-xl shadow-brand-ink/10"
              >
                Wholesale Inquiry
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
