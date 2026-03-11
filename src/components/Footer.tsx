import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import logoImg from '../assets/logo.png';

export const Footer = () => {
  return (
    <footer className="bg-brand-ink text-white py-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link to="/" className="inline-block" aria-label="Siya's Home">
              <img src={logoImg} alt="Siya's" className="h-10 w-auto rounded-lg" />
            </Link>
            <p className="text-white/60 text-xs leading-relaxed max-w-xs">
              Premium B2B supplier of the world's finest spices, dry fruits, and teas. Committed to quality, sustainability, and authentic flavor.
            </p>
            <div className="flex gap-3" role="list" aria-label="Social media links">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-terracotta hover:scale-110 transition-all" aria-label="Instagram" role="listitem">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-terracotta hover:scale-110 transition-all" aria-label="Facebook" role="listitem">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-terracotta hover:scale-110 transition-all" aria-label="Twitter" role="listitem">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-terracotta hover:scale-110 transition-all" aria-label="LinkedIn" role="listitem">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          <nav aria-label="Quick links">
            <h4 className="font-serif text-lg font-bold mb-5">Quick Links</h4>
            <ul className="space-y-3 text-white/60 text-xs">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Product Catalog</Link></li>
              <li><Link to="/wholesale" className="hover:text-white transition-colors">Wholesale Program</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </nav>

          <nav aria-label="Product categories">
            <h4 className="font-serif text-lg font-bold mb-5">Categories</h4>
            <ul className="space-y-3 text-white/60 text-xs">
              <li><Link to="/products#spices" className="hover:text-white transition-colors">Spices</Link></li>
              <li><Link to="/products#dry-fruits" className="hover:text-white transition-colors">Dry Fruits</Link></li>
              <li><Link to="/products#teas" className="hover:text-white transition-colors">Teas</Link></li>
              <li><Link to="/products#herbal-teas" className="hover:text-white transition-colors">Herbal Teas</Link></li>
              <li><Link to="/products#pulses-lentils" className="hover:text-white transition-colors">Pulses & Lentils</Link></li>
            </ul>
          </nav>

          <div>
            <h4 className="font-serif text-lg font-bold mb-5">Newsletter</h4>
            <p className="text-white/60 text-xs mb-5">Subscribe to get wholesale price updates and new arrivals.</p>
            <form className="flex gap-2" aria-label="Newsletter subscription">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-none rounded-lg px-4 py-2 flex-1 text-xs focus:ring-2 focus:ring-brand-terracotta outline-none"
              />
              <button
                type="submit"
                className="bg-brand-terracotta text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-brand-terracotta/90 hover:scale-105 transition-all"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Siya's Premium Spices & Teas. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link to="/admin" className="hover:text-white transition-colors">Admin Portal</Link>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
