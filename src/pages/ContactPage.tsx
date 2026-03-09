import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const contactCards = [
  { icon: Phone, title: 'Phone', lines: ['+91 9999990469'] },
  { icon: Mail, title: 'Email', lines: ['wholesale@siyas.com', 'support@siyas.com'] },
  { icon: MapPin, title: 'Location', lines: ['524, Sector 38, Gurgaon (HR), INDIA 122001', 'Headquarters & Distribution'] },
];

export const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20 bg-brand-cream min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-terracotta font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Get in Touch</span>
            <h1 className="text-5xl font-serif font-bold mb-4">Contact Us</h1>
            <p className="text-brand-ink/60 max-w-2xl mx-auto">
              Have questions about our products or wholesale program? Our team is here to help you scale your business with the finest ingredients.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {contactCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card p-8 rounded-[2.5rem] hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-center group"
            >
              <div className="w-14 h-14 bg-brand-cream rounded-2xl flex items-center justify-center text-brand-olive mx-auto mb-6 group-hover:scale-110 transition-transform">
                <card.icon size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-4">{card.title}</h3>
              <div className="space-y-2">
                {card.lines.map((line) => (
                  <p key={line} className="text-brand-ink/60 font-medium">{line}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-10 rounded-[3rem] shadow-2xl shadow-brand-ink/5"
          >
            <h2 className="text-3xl font-serif font-bold mb-8">Send a Message</h2>
            <form className="space-y-6" aria-label="Contact form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-[9px] font-bold uppercase tracking-widest text-brand-ink/40 ml-2">Name</label>
                  <input id="contact-name" type="text" className="w-full bg-brand-cream/50 border-none rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-brand-olive outline-none transition-all text-sm" placeholder="Your Name" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-[9px] font-bold uppercase tracking-widest text-brand-ink/40 ml-2">Email</label>
                  <input id="contact-email" type="email" className="w-full bg-brand-cream/50 border-none rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-brand-olive outline-none transition-all text-sm" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="block text-[9px] font-bold uppercase tracking-widest text-brand-ink/40 ml-2">Subject</label>
                <input id="contact-subject" type="text" className="w-full bg-brand-cream/50 border-none rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-brand-olive outline-none transition-all text-sm" placeholder="How can we help?" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-[9px] font-bold uppercase tracking-widest text-brand-ink/40 ml-2">Message</label>
                <textarea id="contact-message" rows={5} className="w-full bg-brand-cream/50 border-none rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-brand-olive outline-none transition-all text-sm" placeholder="Your message..."></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-ink text-white py-5 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-olive hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-ink/10 group">
                Send Message
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-brand-olive text-white p-10 rounded-[3rem] shadow-2xl shadow-brand-olive/20"
            >
              <h3 className="text-2xl font-serif font-bold mb-6">Business Hours</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60">Monday - Friday</span>
                  <span className="text-sm font-medium">9:00 AM - 6:00 PM (IST)</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60">Saturday</span>
                  <span className="text-sm font-medium">10:00 AM - 4:00 PM (IST)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60">Sunday</span>
                  <span className="text-sm font-medium">Closed</span>
                </div>
              </div>
              <div className="mt-10 flex items-center gap-4 p-4 bg-white/10 rounded-2xl">
                <Clock className="text-brand-terracotta" size={24} />
                <p className="text-xs leading-relaxed opacity-80">
                  Our online inquiry system is available 24/7. We typically respond to all wholesale queries within 1 business day.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800"
                alt="Siya's spice warehouse and packaging facility"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-ink/20" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
