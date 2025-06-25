import { create } from "zustand";

interface ThemeProvider {
    theme: "light" | "dark";
    setTheme: (theme: "light" | "dark") => void;
}

export const useTheme = create<ThemeProvider>((set) => ({
    theme: "dark",
    setTheme: (theme) => set({
        theme
    })
}));