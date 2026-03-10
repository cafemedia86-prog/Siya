import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    if (import.meta.env.PROD) {
        console.error('Supabase credentials missing! Check Vercel environment variables.');
    } else {
        console.warn('Supabase credentials missing. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env');
    }
}

// createClient will handle empty strings by returning a proxy-like object that 
// will fail on actual requests rather than crashing the whole app bundle on load.
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);
