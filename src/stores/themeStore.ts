import { create } from "zustand";

type Theme = "dark" | "light" | "system";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const storageKey = "vite-ui-theme";

const getInitialTheme = (): Theme => {
  const storedTheme = localStorage.getItem(storageKey) as Theme;
  if (storedTheme) return storedTheme;

  return "system";
};

const useThemeStore = create<ThemeStore>((set) => {
  const updateDOM = (theme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  };

  return {
    theme: getInitialTheme(),
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      updateDOM(theme);
      set({ theme });
    },
    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === "dark" ? "light" : "dark";
        localStorage.setItem(storageKey, newTheme);
        updateDOM(newTheme);
        return { theme: newTheme };
      }),
  };
});

useThemeStore.getState().setTheme(getInitialTheme());

export default useThemeStore;
