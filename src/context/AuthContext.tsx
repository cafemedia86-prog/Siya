import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        // Check active sessions and sets relevant state
        supabase.auth.getSession()
            .then(({ data: { session }, error }) => {
                if (!isMounted) return;
                if (error) {
                    console.error('Supabase Auth error:', error);
                }
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            })
            .catch(err => {
                if (!isMounted) return;
                console.error('Failed to get Supabase session:', err);
                setLoading(false); // Stop loading even on error to allow app to show fallback/login
            });

        // Listen for changes on auth state (sign in, sign out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!isMounted) return;
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6">
                <div className="flex flex-col items-center gap-6 text-center">
                    <div className="w-16 h-16 border-4 border-neutral-100 border-t-neutral-900 rounded-full animate-spin" />
                    <div className="space-y-2">
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-900">Synchronizing Session</h2>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Global Trade Desk Secured</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, session, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
