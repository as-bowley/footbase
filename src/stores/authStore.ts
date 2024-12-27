import { create } from "zustand";
import supabase from "@/services/supabaseClient";
import { User } from "@supabase/supabase-js";

type AuthStore = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  initialize: () => void;
  signUp: (email: string, password: string) => Promise<User | null>;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: true,

  setUser: (user) => set({ user, isLoggedIn: !!user, isLoading: false }),

  initialize: async () => {
    const { data: sessionData, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Session restoration error: ", error.message);
    }

    set({
      user: sessionData.session?.user ?? null,
      isLoggedIn: !!sessionData.session?.user,
      isLoading: false,
    });

    supabase.auth.onAuthStateChange((event, session) => {
      set({ user: session?.user ?? null, isLoggedIn: !!session?.user });
    });
  },

  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Sign-up error:", error.message);
      return null;
    }
    const user = data.user as User;
    set({ user, isLoggedIn: true });
    return user;
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Sign-in error:", error.message);
      return null;
    }
    const user = data.user as User; // Type assertion
    set({ user, isLoggedIn: true });
    return user;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign-out error:", error.message);
    }
    set({ user: null, isLoggedIn: false });
  },
}));

export default useAuthStore;
