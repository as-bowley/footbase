import { create } from 'zustand';
import supabase from '../services/supabaseClient';

const useAuthStore = create((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user) => set({ user, isLoggedIn: !!user }),
    initialize: () => {
        const session = supabase.auth.getSession();
        set({ user: session?.user ?? null, isLoggedIn: !!session?.user });

        supabase.auth.onAuthStateChange((event, session) => {
            set({ user: session?.user ?? null, isLoggedIn: !!session?.user });
        });
    },
    signUp: async (email, password) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            console.error('Sign-up error:', error.message);
            return null;
        }
        set({ user: data.user, isLoggedIn: true });
        return data.user;
    },
    signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error('Sign-in error:', error.message);
            return null;
        }
        set({ user: data.user, isLoggedIn: true });
        return data.user;
    },
    signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Sign-out error:', error.message);
        }
        set({ user: null, isLoggedIn: false });
    },
}));

export default useAuthStore;