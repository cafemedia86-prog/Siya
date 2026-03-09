// src/components/ThemeToggle.tsx
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';

/**
 * A simple dark‑mode toggle that works with Tailwind's `class` strategy.
 * It stores the user's preference in `localStorage` and respects the
 * system colour‑scheme on first load.
 */
export const ThemeToggle = () => {
    const [isDark, setIsDark] = useState<boolean>(false);

    // Initialise from localStorage / system preference
    useEffect(() => {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark') {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else if (stored === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        } else {
            // No explicit preference – follow OS
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDark(prefersDark);
            if (prefersDark) document.documentElement.classList.add('dark');
        }
    }, []);

    const toggle = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        if (newDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={cn(
                'p-2 rounded-full transition-colors',
                isDark ? 'bg-brand-cream text-brand-ink' : 'bg-brand-ink text-white'
            )}
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
};
