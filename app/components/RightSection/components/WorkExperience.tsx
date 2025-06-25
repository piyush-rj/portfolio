"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/app/hooks/zustand";

gsap.registerPlugin(ScrollTrigger);

export default function WorkExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const {theme} = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 80%",
        },
      });

      gsap.from(rightRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-black flex flex-col md:flex-row justify-center items-start md:items-center h-full w-full overflow-visible p-8 md:p-16 gap-8 font-sans"
    >
      {/* Left: Company Info */}
      <div ref={leftRef} className="min-w-[250px]">
        <h2 className={`text-[25px] font-semibold ${theme == "dark" ? "text-neutral-200" : "text-neutral-900"}`}>Wallpaper Heaven</h2>
        <p className={`text-[16px] mt-1 ${theme == "dark" ? "text-neutral-300" : "text-neutral-500"}`}>Full-Stack Web Developer</p>
        <p className={`text-[15px] ${theme == "dark" ? "text-neutral-400" : "text-neutral-400"}`}>Interior Design Company</p>
        <p className={`text-[15px] text-neutral-400 mt-1`}>May 2025 – June 2025</p>
      </div>

      {/* Right: Responsibilities */}
      <div ref={rightRef} className="flex-1 space-y-3">
        <p className={`text-[18px] ${theme == "dark" ? "text-neutral-100" : "text-neutral-700"}`}>
          Designed, developed, and deployed the official website of Wallpaper Heaven — a premium interior design studio focused on curated wall aesthetics.
        </p>
        <ul className={`list-disc pl-5 text-[16px] space-y-1 ${theme == "dark" ? "text-neutral-300" : "text-neutral-600"}`}>
          <li>Built the frontend using
            <span className="font-medium">Next.js</span> and styled it with <span className="font-medium">Tailwind CSS</span>.
          </li>
          <li>Developed and integrated custom admin panel for managing offers and collections.
          </li>
          <li>Implemented dynamic content features using <span className="font-medium">TypeScript</span> and <span className="font-medium">Prisma ORM</span>.
          </li>
          <li>Handled full-stack deployment on <span className="font-medium">Vercel</span> with CDN optimization via <span className="font-medium">Cloudflare</span>.
          </li>
          <li>Focused on responsive design, SEO, and fast load times for better reach.</li>
        </ul>
      </div>
    </div>
  );
}
