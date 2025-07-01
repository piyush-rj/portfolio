"use client"
import MainSection from "./components/Main";
import { useTheme } from "./hooks/zustand";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`min-h-screen w-screen flex justify-center items-center px-4 md:px-8 lg:px-12 xl:px-16 py-4 md:py-8 ${theme == "dark" ? "bg-black text-white" : "bg-[#f5f5f5] text-black"}`}>
      <MainSection />
    </div>
  );
}