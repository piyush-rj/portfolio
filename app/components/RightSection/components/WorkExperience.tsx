"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/app/hooks/zustand";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function WorkExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [techPanel, setTechPanel] = useState<boolean>(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(cardRef.current, {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 85%",
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full flex justify-center px-2 sm:px-6 md:px-12 py-10"
        >
            <div
                onMouseEnter={() => setTechPanel(true)}
                onMouseLeave={() => setTechPanel(false)}
                className="relative w-full max-w-3xl"
            >
                <div
                    ref={cardRef}
                    className={`w-full border border-neutral-700 rounded-xl shadow-md p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6 transition-all duration-300 ease-in-out bg-white dark:bg-neutral-900 relative z-10 ${techPanel ? "pb-20" : ""
                        }`}
                >
                    {/* Left section */}
                    <div className="w-full sm:w-36 flex flex-col md:flex-col sm:flex-col-reverse gap-2">
                        <div className="relative w-full p-8 h-28 flex justify-center items-center rounded-md overflow-hidden bg-[#50130e] flex-shrink-0 border border-neutral-200 dark:border-neutral-800 group cursor-pointer">
                            <Image
                                src="/wallpaperHeavenLogo.png"
                                alt="Wallpaper Heaven Logo"
                                className="object-cover"
                                unoptimized
                                height={200}
                                width={200}
                            />
                        </div>
                        <p className="text-xs sm:text-sm text-center text-neutral-600 dark:text-neutral-400">
                            May – June 2025
                        </p>
                        <div className="flex justify-center items-center">
                            <div className="flex w-22 px-4 items-center gap-x-1 p-1 justify-around bg-neutral-200 hover:bg-neutral-300 text-black border border-neutral-800 rounded-full group cursor-pointer transition-colors duration-300">
                                <ExternalLink height={15} width={15} />
                                <span className="tracking-wide font-sans text-sm">LIVE</span>
                            </div>
                        </div>
                    </div>

                    {/* Right section */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <h2 className={`text-xl font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>
                                Wallpaper Heaven
                            </h2>
                            <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                                Full-Stack Developer
                            </p>
                        </div>
                        <ul className="space-y-2 text-sm leading-[1.6] font-sans">
                            {[
                                "Designed and deployed a clean, responsive website for a premium wall design studio.",
                                "Used Next.js and Tailwind CSS for a modern frontend experience.",
                                "Built a custom admin panel for managing offers and collections.",
                                "Integrated dynamic content using TypeScript and Prisma ORM.",
                                "Optimized for SEO and deployed on AWS EC2.",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300"
                                >
                                    <span className="h-1.5 w-1.5 bg-neutral-400 mt-[7px] rounded-full"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Tech Stack Panel */}
                        {techPanel && (
                            <div className="mt-6 backdrop-blur-md font-sans bg-black/60 text-neutral-200 p-4 py-6 rounded-xl shadow-lg flex gap-3 flex-wrap justify-center">
                                {["Next.js", "Tailwind", "TypeScript", "Prisma", "AWS"].map((tech, i) => (
                                    <div
                                        key={i}
                                        className="px-4 py-1 text-sm rounded-full bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white"
                                    >
                                        {tech}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
