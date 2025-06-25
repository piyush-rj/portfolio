"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/app/hooks/zustand";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
    const card1Ref = useRef<HTMLDivElement | null>(null);
    const card2Ref = useRef<HTMLDivElement | null>(null);
    const {theme} = useTheme();

    useEffect(() => {
        const cards = [card1Ref.current, card2Ref.current];

        cards.forEach((card, index) => {
            if (!card) return;
            gsap.fromTo(
                card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center px-4 md:px-10 py-16 gap-10 font-sans ">
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${theme == "dark" ? "text-neutral-200" : "text-neutral-800"}`}>
                Education
            </h2>

            {/* Card 1 */}
            <div
                ref={card1Ref}
                className="w-full max-w-3xl bg-gradient-to-br from-[#1a2727] to-[#201420]  backdrop-blur-md border border-neutral-800 rounded-2xl shadow-lg p-4 md:p-8 transition-shadow hover:shadow-xl"
            >
                <Image
                    src="/new-logo.png"
                    alt="DYP logo"
                    width={70}
                    height={70}
                    className="rounded-xl shadow-sm"
                    unoptimized
                />
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-neutral-200">
                        Dr. D Y Patil Institute of Technology
                    </h3>
                    <p className="text-sm text-neutral-400">Pimpri, Pune</p>
                    <p className="text-sm text-neutral-400 mt-1">
                        B.E. in Mechanical Engineering (2022 – 2026)
                    </p>
                </div>
            </div>

            {/* Card 2 */}
            <div
                ref={card2Ref}
                className="w-full max-w-3xl bg-gradient-to-br from-[#1a2727] to-[#201420]  backdrop-blur-md border border-neutral-800 rounded-2xl shadow-lg p-4 md:p-8 transition-shadow hover:shadow-xl"
            >
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-neutral-200">
                        St. Thomas High School (CBSE)
                    </h3>
                    <p className="text-sm text-neutral-400">Dhanbad, Jharkhand</p>
                    <p className="text-sm text-neutral-400 mt-1">
                        Completed 12th in 2022 with 74%
                    </p>
                </div>
            </div>
        </div>
    );
}
