import {create} from 'zustand';
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../firebase-config";

const useAuthStore = create((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user) => set({ user, isLoggedIn: !!user }),
    logout: async () => {
        await firebaseSignOut(auth);
        set({ user: null, isLoggedIn: false });
    },
    initialize: () => {
        onAuthStateChanged(auth, (currentUser) => {
            set({ user: currentUser, isLoggedIn: !!currentUser });
        });
    },
}));

export default useAuthStore;