import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    MessageSquare,
    Search,
    Filter,
    Trash2,
    Archive,
    Reply,
    Clock,
    MapPin,
    Mail,
    Building2,
    Package,
    TrendingUp,
    CheckCircle2,
    Globe,
    FileText,
    Download,
    FileDown,
    Printer
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../lib/utils';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const AdminInquiries = () => {
    const { inquiries, updateInquiryStatus, deleteInquiry, isLoading } = useAdmin();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-neutral-100 border-t-neutral-900 rounded-full animate-spin" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Fetching Leads...</p>
                </div>
            </div>
        );
    }
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedStatus, setSelectedStatus] = React.useState('all');
    const [selectedInquiry, setSelectedInquiry] = React.useState<any>(null);
    const [sortBy, setSortBy] = React.useState('newest');
    const [isQuoteFormOpen, setIsQuoteFormOpen] = React.useState(false);
    const [quoteItems, setQuoteItems] = React.useState<{ name: string; price: string }[]>([]);

    const parseBasketItems = (message: string) => {
        const basketSection = message.split('Basket Items:')[1];
        if (!basketSection) return [];
        return basketSection.trim().split('\n').map(line => {
            const match = line.match(/^-\s*(.*?)\s*\((.*?)\)$/);
            return match ? { name: match[1], volume: match[2] } : { name: line.replace('- ', '').trim(), volume: 'As per demand' };
        });
    };

    const filteredInquiries = inquiries.filter((inq) => {
        const matchesSearch = inq.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inq.company.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || inq.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const sortedInquiries = [...filteredInquiries].sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    const handleExportCSV = () => {
        const headers = ['ID', 'Date', 'Partner', 'Company', 'Email', 'Country', 'Product/Interest', 'Volume', 'Status', 'Message'];
        const rows = sortedInquiries.map(inq => [
            inq.id,
            inq.date,
            inq.partner,
            inq.company,
            inq.email,
            inq.country,
            inq.interest,
            inq.volume,
            inq.status,
            inq.message.replace(/"/g, '""')
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `inquiries_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const generatePDFQuote = (inq: any, customPrices?: { name: string; price: string }[]) => {
        const doc = new jsPDF();
        const date = new Date().toLocaleDateString();
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        // Layout Constants
        const olive: [number, number, number] = [61, 61, 45];
        const terracotta: [number, number, number] = [166, 93, 74];
        const margin = 20;

        // Header Background
        doc.setFillColor(olive[0], olive[1], olive[2]);
        doc.rect(0, 0, 210, 60, 'F');

        // Brand Identity
        doc.setTextColor(255, 255, 255);
        doc.setFont('times', 'bold');
        doc.setFontSize(32);
        doc.text("SIYA'S", margin, 35);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text("PREMIUM SPICES & TEAS EXPORT", margin, 42);

        // Invoice/Quote Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text("WHOLESALE QUOTATION", 210 - margin, 35, { align: 'right' });
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text(`REFERENCE: #QSYS-${inq.id.slice(0, 8).toUpperCase()}`, 210 - margin, 42, { align: 'right' });

        // Seller & Buyer Section
        doc.setTextColor(50, 50, 50);
        const startY = 80;

        // Seller Info (Left)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text("FROM:", margin, startY);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text("Siya's Premium Spices (Exports Division)", margin, startY + 6);
        doc.text("524, Sector 38, B2B Trade Desk", margin, startY + 11);
        doc.text("Gurgaon, Haryana, 122001, INDIA", margin, startY + 16);
        doc.text("GSTIN: 07AAACS1234F1Z5", margin, startY + 21);

        // Buyer Info (Right)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text("PREPARED FOR:", 210 - margin, startY, { align: 'right' });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text(inq.partner, 210 - margin, startY + 7, { align: 'right' });
        doc.setFontSize(9);
        doc.text(inq.company, 210 - margin, startY + 12, { align: 'right' });
        doc.text(inq.country, 210 - margin, startY + 17, { align: 'right' });
        doc.text(inq.email, 210 - margin, startY + 22, { align: 'right' });

        // Dates Section
        doc.setDrawColor(240, 240, 240);
        doc.line(margin, startY + 32, 210 - margin, startY + 32);
        doc.setFontSize(8);
        doc.text(`ISSUE DATE: ${date}`, margin, startY + 38);
        doc.text(`EXPIRY DATE: ${expiryDate.toLocaleDateString()}`, 210 - margin, startY + 38, { align: 'right' });

        // Table Implementation
        const itemsToProcess = customPrices && customPrices.length > 0
            ? customPrices.map(p => [p.name || inq.interest, inq.volume, "Custom B2B", `$ ${p.price || '---'}`])
            : [[inq.interest || "Premium Selection", inq.volume, "Standard", "Contact for Rate"]];

        autoTable(doc, {
            startY: startY + 45,
            margin: { left: margin, right: margin },
            head: [['PRODUCT DESCRIPTION', 'REQUISITION VOLUME', 'COMMERCIAL TIER', 'UNIT PRICE (FOB)']],
            body: itemsToProcess,
            styles: {
                font: 'helvetica',
                fontSize: 9,
                cellPadding: 6,
                lineWidth: 0.1,
                lineColor: [240, 240, 240]
            },
            headStyles: {
                fillColor: olive,
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                halign: 'center'
            },
            columnStyles: {
                0: { fontStyle: 'bold' },
                1: { halign: 'center' },
                2: { halign: 'center' },
                3: { halign: 'right', fontStyle: 'bold', textColor: terracotta }
            }
        });

        const endY = (doc as any).lastAutoTable.finalY + 15;

        // Logistics & Terms
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text("DELIVERY & COMMERCIAL TERMS", margin, endY);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        const terms = [
            "• Pricing is quoted in FOB (Free on Board) incoterms unless specified otherwise.",
            "• Minimum Order Quantity (MOQ) varies by product category.",
            "• Payment Terms: 30% Advance, 70% against BL/Shipping Documents.",
            "• Export documentation like Certificate of Origin, Phytosanitary, and SGS/Intertek provided as per order."
        ];
        terms.forEach((term, i) => doc.text(term, margin, endY + 8 + (5 * i)));

        // Additional Message/Note
        if (inq.message) {
            doc.setFont('helvetica', 'bold');
            doc.text("REMARKS:", margin, endY + 35);
            doc.setFont('helvetica', 'normal');
            const splitMsg = doc.splitTextToSize(inq.message, 170);
            doc.text(splitMsg, margin, endY + 41);
        }

        // Signature Section
        const sigY = 250;
        doc.setFillColor(248, 248, 248);
        doc.rect(margin, sigY, 210 - (margin * 2), 30, 'F');

        // Left: Signatory Line
        doc.setDrawColor(terracotta[0], terracotta[1], terracotta[2]);
        doc.setLineWidth(0.5);
        doc.line(margin + 10, sigY + 18, margin + 70, sigY + 18);
        doc.setFontSize(7);
        doc.setTextColor(50, 50, 50);
        doc.text("AUTHORIZED SIGNATORY", margin + 10, sigY + 24);

        // Right: Disclaimer Text
        doc.setFontSize(7);
        doc.setTextColor(150, 150, 150);
        const disclaimer = "This is a computer-generated quotation and does not require a physical stamp for digital validation. Valid for 30 days.";
        const splitDisclaimer = doc.splitTextToSize(disclaimer, 80);
        doc.text(splitDisclaimer, 210 - margin - 10, sigY + 12, { align: 'right' });

        // Contact Footer
        doc.setFillColor(olive[0], olive[1], olive[2]);
        doc.rect(0, 287, 210, 10, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(7);
        doc.text("www.siyas.com | export@siyas.com | +91 9999990469 | Siya's Spices Mumbai Branch", 105, 293, { align: 'center' });

        doc.save(`Siya_Quotation_${inq.partner.replace(/\s/g, '_')}.pdf`);
    };

    const stats = [
        { label: 'Total Inquiries', value: inquiries.length, icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Pending Action', value: inquiries.filter(i => i.status === 'Pending').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Active Leads', value: inquiries.filter(i => i.status === 'Quoted' || i.status === 'Replying').length, icon: TrendingUp, color: 'text-brand-terracotta', bg: 'bg-brand-terracotta/10' },
        { label: 'Conversion Rate', value: `${inquiries.length > 0 ? Math.round((inquiries.filter(i => i.status === 'Closed').length / inquiries.length) * 100) : 0}%`, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    ];

    return (
        <div className="pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-5xl font-serif font-medium text-neutral-900 mb-4 tracking-tight">B2B Trade Desk</h1>
                    <p className="text-sm text-neutral-500 font-medium max-w-2xl leading-relaxed">Manage global exporter queries and partner direct relationships.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleExportCSV}
                        className="px-8 py-4 bg-white border border-neutral-200 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-neutral-50 transition-all duration-300 shadow-sm flex items-center gap-2 text-neutral-900"
                    >
                        <Download size={16} /> Export CSV
                    </button>
                    <button className="bg-neutral-900 text-white px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all duration-500 shadow-xl flex items-center gap-3">
                        Mark All Read
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="bg-neutral-50 p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] flex items-center gap-6 border border-neutral-100/50 hover:shadow-xl hover:shadow-neutral-100/50 transition-all duration-500"
                    >
                        <div className={cn("w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl flex items-center justify-center", stat.bg)}>
                            <stat.icon size={20} className={stat.color} />
                        </div>
                        <div>
                            <p className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">{stat.label}</p>
                            <p className="text-2xl lg:text-3xl font-serif font-medium text-neutral-900">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Unified Toolbar */}
            <div className="bg-neutral-50/50 p-3 lg:p-4 rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 flex flex-col lg:flex-row items-center gap-3 lg:gap-4 mb-12">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 text-neutral-300" size={20} />
                    <input
                        type="text"
                        placeholder="Filter by lead name, company or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 lg:pl-18 pr-6 lg:pr-8 py-4 lg:py-6 bg-white border border-neutral-100 rounded-full text-sm focus:ring-4 focus:ring-neutral-200/20 outline-none transition-all placeholder:text-neutral-400 text-neutral-900"
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 lg:gap-4 w-full lg:w-auto lg:pr-4">
                    <div className="relative w-full sm:min-w-[200px] lg:min-w-[220px]">
                        <Filter className="absolute left-6 lg:left-7 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full pl-14 lg:pl-16 pr-10 py-4 lg:py-6 bg-white border border-neutral-100 rounded-full text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] outline-none transition-all appearance-none cursor-pointer text-neutral-900"
                        >
                            <option value="all">Every Lead</option>
                            <option value="Pending">Pending</option>
                            <option value="Replying">Replying</option>
                            <option value="Quoted">Quoted</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    <div className="relative w-full sm:min-w-[200px] lg:min-w-[220px]">
                        <Clock className="absolute left-6 lg:left-7 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full pl-14 lg:pl-16 pr-10 py-4 lg:py-6 bg-white border border-neutral-100 rounded-full text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] outline-none transition-all appearance-none cursor-pointer text-neutral-900"
                        >
                            <option value="newest">Recent First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Inquiries List */}
            <div className="space-y-4 lg:space-y-6">
                <AnimatePresence mode="popLayout">
                    {sortedInquiries.map((inq, i) => (
                        <motion.div
                            key={inq.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedInquiry(inq)}
                            className="bg-neutral-50 rounded-[1.5rem] lg:rounded-[2rem] p-4 lg:p-5 flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-6 items-start lg:items-center border border-neutral-100 transition-all duration-400 cursor-pointer group hover:bg-white hover:shadow-xl hover:shadow-neutral-100/30"
                        >
                            {/* Partner Profile */}
                            <div className="w-full lg:col-span-4 flex items-center gap-4 lg:gap-5">
                                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-white flex items-center justify-center text-lg lg:text-xl font-serif font-bold text-neutral-900 border lg:border-2 border-neutral-50 shadow-md group-hover:rotate-1 transition-transform duration-500 shrink-0">
                                    {inq.partner.charAt(0)}
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="text-base lg:text-lg font-serif font-medium text-neutral-900 group-hover:text-[#a65d4a] transition-colors line-clamp-1">{inq.partner}</h3>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[8px] lg:text-[9px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                            <Globe size={10} className="text-[#a65d4a]" /> {inq.company} • {inq.country}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Logistics / Product Details */}
                            <div className="w-full lg:col-span-3 flex flex-row lg:flex-row gap-2 border-t lg:border-none border-neutral-100/50 pt-3 lg:pt-0">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-neutral-500 text-[8px] font-bold uppercase tracking-wider border border-neutral-100">
                                    <Package size={10} className="text-neutral-400" />
                                    {inq.interest}
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100/50 text-neutral-500 text-[8px] font-bold uppercase tracking-wider border border-neutral-100">
                                    <TrendingUp size={10} className="text-[#a65d4a]" />
                                    {inq.volume}
                                </div>
                            </div>

                            {/* Status */}
                            <div className="w-full lg:col-span-2 flex lg:justify-center border-t lg:border-none border-neutral-100/50 pt-3 lg:pt-0">
                                <span className={cn(
                                    "px-3 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest border",
                                    inq.status === 'Pending' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                        inq.status === 'Quoted' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                            inq.status === 'Closed' ? "bg-neutral-500/10 text-neutral-500 border-neutral-500/20" : "bg-neutral-900/10 text-neutral-900 border-neutral-900/20"
                                )}>
                                    {inq.status}
                                </span>
                            </div>

                            {/* Operations */}
                            <div className="w-full lg:col-span-3 flex items-center justify-end gap-3 border-t lg:border-none border-neutral-100/50 pt-3 lg:pt-0">
                                <div className="relative flex-1 lg:min-w-[120px]" onClick={e => e.stopPropagation()}>
                                    <select
                                        className="w-full bg-neutral-100 border-none rounded-xl px-4 py-3 text-[8px] font-bold uppercase tracking-widest cursor-pointer outline-none hover:bg-neutral-200 transition-colors text-neutral-900"
                                        value={inq.status}
                                        onChange={(e) => {
                                            const newStatus = e.target.value as any;
                                            updateInquiryStatus(inq.id, newStatus);
                                            if (newStatus === 'Quoted') {
                                                const itemsToQuote = parseBasketItems(inq.message);
                                                if (itemsToQuote.length > 0) {
                                                    setQuoteItems(itemsToQuote.map(item => ({ name: item.name, price: '' })));
                                                } else {
                                                    setQuoteItems([{ name: inq.interest || inq.product, price: '' }]);
                                                }
                                                setSelectedInquiry(inq);
                                                setIsQuoteFormOpen(true);
                                            }
                                        }}
                                    >
                                        <option value="Pending">Queue</option>
                                        <option value="Replying">Engaged</option>
                                        <option value="Quoted">Quoted</option>
                                        <option value="Closed">Finalized</option>
                                    </select>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); if (confirm('Remove this inquiry?')) deleteInquiry(inq.id) }}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50/50 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {sortedInquiries.length === 0 && (
                <div className="py-40 text-center bg-white rounded-[4rem] shadow-sm border border-white mx-auto mt-10">
                    <MessageSquare size={80} className="mx-auto text-neutral-100 mb-8" />
                    <h3 className="text-3xl font-serif font-medium text-neutral-900 mb-4">No trade queries match</h3>
                    <p className="text-neutral-400 font-medium max-w-sm mx-auto">Try clearing your search filters to find the right partner leads.</p>
                    <button onClick={() => { setSearchQuery(''); setSelectedStatus('all'); }} className="mt-10 text-xs font-bold uppercase tracking-widest text-[#a65d4a] border-b-2 border-[#a65d4a]/20 hover:border-[#a65d4a] transition-all pb-1 font-bold">Clear all filters</button>
                </div>
            )}

            {/* Inquiry Detail Modal */}
            <AnimatePresence>
                {selectedInquiry && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedInquiry(null)}
                            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-5xl bg-white rounded-[4rem] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] border border-white p-16"
                        >
                            <div className="flex justify-between items-start mb-16">
                                <div className="flex items-center gap-10">
                                    <div className="w-32 h-32 rounded-[3rem] bg-neutral-50 text-neutral-900 flex items-center justify-center text-5xl font-serif font-bold border-4 border-white shadow-xl">
                                        {selectedInquiry.partner.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-5xl font-serif font-medium mb-4 text-neutral-900">{selectedInquiry.partner}</h2>
                                        <p className="text-[#a65d4a] font-bold uppercase tracking-[0.3em] text-[11px] mb-2">{selectedInquiry.company}</p>
                                        <div className="flex items-center gap-6 text-neutral-500">
                                            <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 bg-neutral-100 px-5 py-2 rounded-full"><MapPin size={14} className="text-[#a65d4a]" /> {selectedInquiry.country}</span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 bg-neutral-100 px-5 py-2 rounded-full"><Clock size={14} className="text-neutral-400" /> {selectedInquiry.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedInquiry(null)}
                                    className="w-14 h-14 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 hover:bg-neutral-100 transition-all font-bold"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                                <div className="lg:col-span-2 space-y-12">
                                    <div className="space-y-6">
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-900 flex items-center gap-3 ml-6">
                                            Lead Message & Requirements
                                        </h3>
                                        <div className="p-12 bg-neutral-50 rounded-[3rem] border border-neutral-100 leading-relaxed text-2xl text-neutral-800 italic font-serif">
                                            "{selectedInquiry.message}"
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-8">
                                        <div className="p-8 bg-neutral-50 rounded-[2.5rem] border border-neutral-100 flex flex-col gap-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-[#5A5A40]/10 flex items-center justify-center text-[#5A5A40]">
                                                    <Package size={28} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Lead Interest</p>
                                                    <p className="text-xl font-bold">{selectedInquiry.interest}</p>
                                                </div>
                                            </div>

                                            {/* Detail Items display */}
                                            {parseBasketItems(selectedInquiry.message).length > 0 && (
                                                <div className="space-y-3 pt-4 border-t border-neutral-200">
                                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#a65d4a]">Selected Products ({parseBasketItems(selectedInquiry.message).length})</p>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {parseBasketItems(selectedInquiry.message).map((item, idx) => (
                                                            <div key={idx} className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between">
                                                                <span className="text-xs font-bold text-neutral-700">{item.name}</span>
                                                                <span className="px-3 py-1 bg-neutral-100 rounded-lg text-[9px] font-black">{item.volume}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-12">
                                    <div className="space-y-8 p-10 bg-neutral-50 rounded-[3rem] border border-neutral-100 shadow-inner">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">Direct Communication</p>
                                            <a href={`mailto:${selectedInquiry.email}`} className="text-lg font-bold text-neutral-900 hover:text-[#a65d4a] flex items-center gap-3 transition-colors break-all">
                                                <Mail size={18} /> {selectedInquiry.email}
                                            </a>
                                        </div>
                                        <div className="pt-8 border-t border-neutral-200/50">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-3">Lifecycle Status</p>
                                            <select
                                                className="w-full bg-white border-none rounded-2xl px-6 py-5 text-[11px] font-bold uppercase tracking-[0.1em] outline-none shadow-sm focus:ring-2 focus:ring-[#3D3D2D] transition-all cursor-pointer"
                                                value={selectedInquiry.status}
                                                onChange={(e) => {
                                                    updateInquiryStatus(selectedInquiry.id, e.target.value as any);
                                                    setSelectedInquiry({ ...selectedInquiry, status: e.target.value });
                                                }}
                                            >
                                                <option value="Pending">Queue</option>
                                                <option value="Replying">Engaged</option>
                                                <option value="Quoted">Quoted</option>
                                                <option value="Closed">Finalized</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <button
                                            onClick={() => {
                                                const items = parseBasketItems(selectedInquiry.message);
                                                if (items.length > 0) {
                                                    setQuoteItems(items.map(item => ({ name: item.name, price: '' })));
                                                } else {
                                                    setQuoteItems([{ name: selectedInquiry.interest || selectedInquiry.product, price: '' }]);
                                                }
                                                setIsQuoteFormOpen(true);
                                            }}
                                            className="w-full inline-flex items-center justify-center gap-4 bg-white border-2 border-brand-terracotta text-brand-terracotta py-6 rounded-3xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-brand-terracotta hover:text-white transition-all shadow-xl group"
                                        >
                                            <FileDown size={20} className="group-hover:translate-y-1 transition-transform" /> Generate PDF Quote
                                        </button>
                                        <a
                                            href={`mailto:${selectedInquiry.email}?subject=Regarding your inquiry for ${selectedInquiry.interest}`}
                                            className="w-full inline-flex items-center justify-center gap-4 bg-neutral-900 text-white py-6 rounded-3xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl group"
                                        >
                                            <Reply size={20} className="group-hover:-translate-x-1 transition-transform" /> Draft Official Reply
                                        </a>
                                        <p className="text-[10px] text-center text-neutral-400 font-medium italic">Opening default mail client for direct engagement.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Price Customization Sub-Modal */}
            <AnimatePresence>
                {isQuoteFormOpen && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsQuoteFormOpen(false)}
                            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden p-12"
                        >
                            <h3 className="text-3xl font-serif font-bold mb-2">Customize Quotation</h3>
                            <p className="text-sm text-neutral-400 font-medium mb-10">Set specific B2B pricing for the requested items according to demand sizes.</p>

                            <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar mb-10">
                                {quoteItems.map((item, idx) => (
                                    <div key={idx} className="bg-neutral-50 p-6 rounded-3xl border border-neutral-100">
                                        <div className="flex flex-col gap-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Price for: {item.name}</label>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xl font-bold">$</span>
                                                <input
                                                    type="text"
                                                    placeholder="Enter price per kg (e.g. 12.50)"
                                                    value={item.price}
                                                    onChange={(e) => {
                                                        const newItems = [...quoteItems];
                                                        newItems[idx].price = e.target.value;
                                                        setQuoteItems(newItems);
                                                    }}
                                                    className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-4 text-sm font-bold shadow-sm outline-none focus:ring-2 focus:ring-[#a65d4a] transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setIsQuoteFormOpen(false)}
                                    className="flex-1 px-8 py-5 border-2 border-neutral-100 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-neutral-400 hover:bg-neutral-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        generatePDFQuote(selectedInquiry, quoteItems);
                                        setIsQuoteFormOpen(false);
                                    }}
                                    className="flex-[2] px-8 py-5 bg-neutral-900 text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl"
                                >
                                    <FileDown size={18} /> Generate Official Quote
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
