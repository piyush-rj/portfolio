"use client"
import MainSection from "./components/Main";
import { useTheme } from "./hooks/zustand";

export default function Home() {

  const {theme, setTheme} = useTheme();

  return (
    <div className={`h-screen w-screen flex justify-center items-center ${theme == "dark" ? "bg-black text-white" : "bg-[#f5f5f5] text-black"}`}>
      <MainSection/>
    </div>
  );
}
