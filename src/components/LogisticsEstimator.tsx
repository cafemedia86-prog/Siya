import React from 'react';
import { motion } from 'motion/react';
import { Truck, Info, PackageCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export const LogisticsEstimator = () => {
    const { t, i18n } = useTranslation();
    const { totalWeight } = useCart();
    const isRTL = i18n.language === 'ar';

    // 20ft container capacity for spices/tea is roughly 18,000kg
    const CONTAINER_20FT = 18000;
    const fillPercentage = Math.min((totalWeight / CONTAINER_20FT) * 100, 100);

    const getStatusColor = () => {
        if (fillPercentage < 30) return 'text-amber-500';
        if (fillPercentage < 80) return 'text-brand-olive';
        return 'text-emerald-500';
    };

    const getProgressColor = () => {
        if (fillPercentage < 30) return 'bg-amber-500';
        if (fillPercentage < 80) return 'bg-brand-olive';
        return 'bg-emerald-500';
    };

    if (totalWeight === 0) return null;

    return (
        <div className="bg-brand-olive/5 rounded-3xl p-6 border border-brand-olive/10 space-y-4">
            <div className={cn("flex items-center justify-between", isRTL && "flex-row-reverse")}>
                <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-olive shadow-sm">
                        <Truck size={20} />
                    </div>
                    <div className={isRTL ? "text-right" : "text-left"}>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">{t('logistics.efficiency')}</h4>
                        <p className="text-sm font-bold text-brand-ink">
                            {totalWeight.toLocaleString()} <span className="text-[10px] font-medium text-brand-ink/40">{t('logistics.total_kg')}</span>
                        </p>
                    </div>
                </div>
                <div className={cn("text-right", isRTL && "text-left")}>
                    <span className={cn("text-xs font-black", getStatusColor())}>{Math.round(fillPercentage)}% {t('logistics.full')}</span>
                </div>
            </div>

            <div className="space-y-2">
                <div className="h-3 bg-white rounded-full overflow-hidden border border-brand-olive/5 shadow-inner p-0.5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${fillPercentage}%` }}
                        className={cn("h-full rounded-full shadow-sm", getProgressColor())}
                    />
                </div>
                <div className={cn("flex justify-between items-center text-[8px] font-bold uppercase tracking-widest text-brand-ink/30 px-1", isRTL && "flex-row-reverse")}>
                    <span>{t('logistics.lcl')}</span>
                    <span>{t('logistics.fcl')}</span>
                </div>
            </div>

            <div className={cn("flex gap-3 p-3 bg-white/50 rounded-2xl border border-white/80", isRTL && "flex-row-reverse")}>
                <Info size={14} className="text-brand-olive shrink-0 mt-0.5" />
                <p className={cn("text-[10px] leading-relaxed text-brand-ink/60", isRTL && "text-right")}>
                    {fillPercentage < 100 ? (
                        t('logistics.optimize_msg', {
                            percent: Math.round(fillPercentage),
                            remaining: (CONTAINER_20FT - totalWeight).toLocaleString()
                        })
                    ) : (
                        t('logistics.congrats_msg')
                    )}
                </p>
            </div>

            {fillPercentage >= 80 && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex items-center gap-2 text-emerald-600 bg-emerald-50 p-2 rounded-xl border border-emerald-100", isRTL && "flex-row-reverse")}
                >
                    <PackageCheck size={14} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">{t('logistics.optimized_reached')}</span>
                </motion.div>
            )}
        </div>
    );
};
