import { create } from "zustand";

type ThemeStore = {
  isDarkMode: boolean;
};

const useThemeStore = create<ThemeStore>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));

export default useThemeStore;
