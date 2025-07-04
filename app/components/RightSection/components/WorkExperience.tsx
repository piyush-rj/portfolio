"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/app/hooks/zustand";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface WorkExperienceProps {
    title: string;
    role: string;
    timeline: string;
    description: string[];
    techstack: string[];
    image: string;
    imageURL: string;
}

export default function WorkExperience({
    title,
    role,
    timeline,
    description,
    techstack,
    image,
    imageURL,
}: WorkExperienceProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);
    const mobileTechRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [techPanel, setTechPanel] = useState<boolean>(false);

    // Initial render animation
    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Set initial state immediately to prevent blinks
            gsap.set(containerRef.current, {
                opacity: 0,
                scale: 0.8,
                rotateX: -15,
                transformPerspective: 1000
            });

            // Cool entrance animation
            const tl = gsap.timeline();
            tl.to(containerRef.current, {
                opacity: 1,
                scale: 1,
                rotateX: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
            })
                .from(containerRef.current!.querySelector('[data-animate="card"]'), {
                    y: 50,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power3.out",
                }, "-=0.4")
                .from(containerRef.current!.querySelectorAll('[data-animate="element"]'), {
                    y: 30,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out",
                }, "-=0.3");
        }, containerRef);

        return () => ctx.revert();
    }, []);

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

    useEffect(() => {
        if (techPanel && techRef.current) {
            const ctx = gsap.context(() => {
                gsap.from(techRef.current!.children, {
                    opacity: 0,
                    y: 20,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "power2.out",
                });
            }, techRef);
            return () => ctx.revert();
        }
    }, [techPanel]);

    useEffect(() => {
        if (techPanel && mobileTechRef.current) {
            const tl = gsap.timeline();
            tl.fromTo(
                mobileTechRef.current,
                { height: 0, opacity: 0, y: -10 },
                { height: "auto", opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
            );
            tl.fromTo(
                mobileTechRef.current.children,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 },
                "<+0.1"
            );
        }
    }, [techPanel]);

    return (
        <div
            ref={containerRef}
            className="w-full flex flex-col justify-center px-2 sm:px-6 md:px-12 py-10 font-sans overflow-x-hidden overflow-y-auto [::-webkit-scrollbar]:hidden [scrollbar-width:none]"
            style={{ opacity: 0 }}
        >
            <div
                onMouseEnter={() => setTechPanel(true)}
                onMouseLeave={() => setTechPanel(false)}
                className="relative w-full max-w-3xl"
                data-animate="card"
            >
                <div
                    ref={cardRef}
                    className={`w-full rounded-xl shadow-md p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6 transition-all duration-300 ease-in-out relative z-10 ${techPanel ? "pb-20" : ""
                        } ${isDark
                            ? "bg-neutral-900 border border-neutral-700"
                            : "bg-neutral-200 border border-neutral-400"
                        }`}
                >
                    {/* Left Section: stacked vertical layout */}
                    <div className="w-full sm:w-36 flex flex-col gap-2" data-animate="element">
                        {/* Image */}
                        <div className="relative w-full p-8 h-28 flex justify-center items-center rounded-md overflow-hidden bg-[#50130e] flex-shrink-0 border border-neutral-200 dark:border-neutral-800 group cursor-pointer">
                            <Image
                                src={image}
                                alt={`${title} Logo`}
                                className="object-cover"
                                unoptimized
                                height={200}
                                width={200}
                            />
                        </div>

                        {/* Timeline */}
                        <p className={`text-xs sm:text-sm text-center ${isDark ? "text-neutral-400" : "text-black"}`}>
                            {timeline}
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col items-center gap-2 w-full">
                            {/* LIVE */}
                            <div
                                onClick={() => window.open(imageURL, "_blank")}
                                className={`flex px-4 items-center gap-x-1 p-1 justify-around rounded-full group cursor-pointer transition-colors duration-300 ${theme == "dark"
                                    ? "bg-neutral-200 hover:bg-neutral-300 text-black border border-neutral-800"
                                    : "bg-neutral-100 border border-neutral-400/50 hover:bg-white"
                                    }`}
                            >
                                <ExternalLink height={15} width={15} />
                                <span className="tracking-wide font-sans text-sm">LIVE</span>
                            </div>

                            {/* Tech Stack Button for Mobile */}
                            <button
                                onClick={() => setTechPanel((prev) => !prev)}
                                className={`sm:hidden flex px-4 py-1 rounded-full text-sm font-medium border ${theme == "dark"
                                    ? "bg-neutral-200 text-black border-neutral-800"
                                    : "bg-neutral-900 text-white border-neutral-400"
                                    }`}
                            >
                                Tech Stack
                            </button>

                            {/* Mobile Tech Stack Panel */}
                            <div className="sm:hidden w-full overflow-hidden">
                                {techPanel && (
                                    <div
                                        ref={mobileTechRef}
                                        className={`mt-3 backdrop-blur-md font-sans p-4 py-6 rounded-xl shadow-xs flex gap-3 flex-wrap justify-center ${theme == "dark" ? "bg-black/60 text-neutral-200" : "bg-white/60 text-black"
                                            }`}
                                    >
                                        {techstack.map((tech, i) => (
                                            <div
                                                key={i}
                                                className={`px-4 py-1 text-sm rounded-full ${isDark ? "bg-neutral-200 text-black" : "bg-white text-black shadow-md"
                                                    }`}
                                            >
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right section */}
                    <div className="flex-1 space-y-4" data-animate="element">
                        <div>
                            <h2 className={`text-xl font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>{title}</h2>
                            <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-800"}`}>{role}</p>
                        </div>
                        <ul className="space-y-2 text-sm leading-[1.6] font-sans">
                            {description.map((item, i) => (
                                <li key={i} className={`flex items-start gap-2 ${isDark ? "text-neutral-400" : ""}`}>
                                    <span
                                        className={`h-1.5 w-1.5 mt-[7px] rounded-full ${isDark ? "bg-neutral-400" : "bg-black"
                                            }`}
                                    ></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Desktop Hover Tech Stack Panel */}
                        <div className="hidden sm:block">
                            {techPanel && (
                                <div
                                    ref={techRef}
                                    className={`mt-6 backdrop-blur-md font-sans p-4 py-6 rounded-xl shadow-xs flex gap-3 flex-wrap justify-center ${isDark ? "bg-black/60 text-neutral-200" : "bg-white/60 text-black"
                                        }`}
                                >
                                    {techstack.map((tech, i) => (
                                        <div
                                            key={i}
                                            className={`px-3 py-1 text-[12px] rounded-full ${isDark ? "bg-neutral-200 text-black" : "bg-white text-black shadow-md"
                                                }`}
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
            <div className="w-full h-full flex justify-center items-center px-8 py-2 mb-10 md:hidden"></div>

        </div>
    );
}