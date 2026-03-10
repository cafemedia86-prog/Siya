import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    LayoutGrid,
    Image as ImageIcon,
    Save,
    ExternalLink,
    CheckCircle2,
    RefreshCcw
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { Category } from '../../types';

export const AdminCategories = () => {
    const { categories, updateCategory, isLoading } = useAdmin();
    const [editingId, setEditingId] = React.useState<string | null>(null);
    const [localCategory, setLocalCategory] = React.useState<Category | null>(null);
    const [isSaving, setIsSaving] = React.useState(false);

    const handleEdit = (cat: Category) => {
        setEditingId(cat.id);
        setLocalCategory(cat);
    };

    const handleSave = async () => {
        if (!localCategory || !editingId) return;
        setIsSaving(true);
        await updateCategory(editingId, localCategory);
        setIsSaving(false);
        setEditingId(null);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <RefreshCcw className="animate-spin text-neutral-400" size={32} />
            </div>
        );
    }

    return (
        <div className="pb-24">
            <div className="mb-12">
                <h1 className="text-5xl font-serif font-medium text-neutral-900 mb-4 tracking-tight">Collection Curations</h1>
                <p className="text-sm text-neutral-500 font-medium max-w-2xl leading-relaxed">
                    Sculpt your brand's visual narrative by managing category aesthetics and digital doorways.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {categories.map((cat) => (
                    <motion.div
                        key={cat.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group bg-neutral-50 rounded-[2.5rem] border border-neutral-100 overflow-hidden hover:bg-white hover:shadow-2xl hover:shadow-neutral-200/50 transition-all duration-500"
                    >
                        <div className="aspect-[16/10] relative overflow-hidden bg-neutral-200">
                            <img
                                src={editingId === cat.id ? localCategory?.image : cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">SKU Category</span>
                                <h3 className="text-2xl font-serif font-medium text-white">{cat.name}</h3>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            {editingId === cat.id ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-4">Banner Asset (URL)</label>
                                        <div className="relative">
                                            <ImageIcon size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" />
                                            <input
                                                type="text"
                                                value={localCategory?.image || ''}
                                                onChange={e => setLocalCategory(prev => prev ? { ...prev, image: e.target.value } : null)}
                                                className="w-full bg-white border border-neutral-100 rounded-2xl pl-14 pr-6 py-4 text-xs font-bold focus:ring-2 focus:ring-neutral-900 outline-none shadow-inner"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-4">Strategic Description</label>
                                        <textarea
                                            value={localCategory?.description || ''}
                                            onChange={e => setLocalCategory(prev => prev ? { ...prev, description: e.target.value } : null)}
                                            rows={3}
                                            className="w-full bg-white border border-neutral-100 rounded-2xl px-6 py-4 text-xs font-bold focus:ring-2 focus:ring-neutral-900 outline-none shadow-inner resize-none leading-relaxed"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="flex-1 bg-neutral-900 text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50"
                                        >
                                            {isSaving ? <RefreshCcw size={14} className="animate-spin" /> : <Save size={14} />}
                                            Communicate Changes
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="px-6 bg-neutral-100 text-neutral-500 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p className="text-xs text-neutral-500 font-medium leading-relaxed line-clamp-2 italic">
                                        "{cat.description}"
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                                            <LayoutGrid size={14} />
                                            {cat.slug}
                                        </div>
                                        <button
                                            onClick={() => handleEdit(cat)}
                                            className="text-[10px] font-bold uppercase tracking-widest text-neutral-900 hover:text-neutral-400 flex items-center gap-2 transition-colors"
                                        >
                                            Refine Aesthetic <ExternalLink size={14} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
