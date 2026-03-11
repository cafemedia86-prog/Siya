import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, ShoppingBasket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { CATEGORIES } from '../constants';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import logoImg from '../assets/logo.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { itemCount } = useCart();
  const { isLoading } = useAdmin();
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = React.useState(false);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.products'), path: '/products' },
    { name: t('nav.wholesale'), path: '/wholesale' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const languages = [
    { code: 'en', label: 'English', icon: '🇬🇧' },
    { code: 'es', label: 'Español', icon: '🇪🇸' },
    { code: 'ar', label: 'العربية', icon: '🇦🇪' }
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
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img src={logoImg} alt="Siya's" className="h-10 w-auto" />
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <div key={link.name} className="relative group/nav">
              {link.path === '/products' ? (
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

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-2.5 text-brand-ink/60 hover:text-brand-olive transition-colors flex items-center gap-2"
              aria-label="Change language"
            >
              <Languages size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">{i18n.language.toUpperCase()}</span>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 pt-4 w-48"
                >
                  <div className="glass rounded-2xl p-2 shadow-2xl border border-white/20">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-between",
                          i18n.language === lang.code ? "bg-brand-olive text-white" : "text-brand-ink/60 hover:text-brand-olive hover:bg-brand-cream"
                        )}
                      >
                        <span>{lang.label}</span>
                        <span>{lang.icon}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle />

          {/* Quote Basket */}
          <Link
            to="/wholesale"
            className="relative p-2.5 text-brand-ink/60 hover:text-brand-olive transition-colors group"
            aria-label="View Quote Basket"
          >
            <ShoppingBasket size={22} className="group-hover:scale-110 transition-transform" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-terracotta text-white text-[8px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg transform group-hover:-translate-y-1 transition-transform border-2 border-white">
                {itemCount}
              </span>
            )}
          </Link>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4"
          >
            <Link
              to="/wholesale"
              className="bg-brand-ink text-white px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-olive hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-brand-ink/10"
            >
              <Phone size={14} />
              {t('nav.b2b_inquiry')}
            </Link>
          </motion.div>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/wholesale"
            className="relative p-2 text-brand-ink transition-colors"
          >
            <ShoppingBasket size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-terracotta text-white text-[7px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md border border-white">
                {itemCount}
              </span>
            )}
          </Link>
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
                {t('nav.b2b_inquiry')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
