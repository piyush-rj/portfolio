"use client";
import { useRef, useEffect } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import Image from "next/image";

export default function Contact() {
    const mailRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<SVGSVGElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mailRef.current || !arrowRef.current || !wrapperRef.current) return;

        const mailEl = mailRef.current;
        const arrowEl = arrowRef.current;
        const wrapper = wrapperRef.current;

        const onMouseEnter = () => {
            gsap.fromTo(
                mailEl,
                { rotation: -5 },
                {
                    rotation: 5,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 2,
                    ease: "power1.inOut",
                }
            );
            gsap.to(arrowEl, {
                x: 6,
                y: -4,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const onMouseLeave = () => {
            gsap.to(mailEl, {
                rotation: 0,
                duration: 0.2,
                ease: "power1.inOut",
            });
            gsap.to(arrowEl, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.inOut",
            });
        };

        wrapper.addEventListener("mouseenter", onMouseEnter);
        wrapper.addEventListener("mouseleave", onMouseLeave);

        return () => {
            wrapper.removeEventListener("mouseenter", onMouseEnter);
            wrapper.removeEventListener("mouseleave", onMouseLeave);
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="flex items-center gap-4 px-1 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
            {/* Mail Icon with GSAP */}
            <div
                ref={mailRef}
                className="p-1 rounded-full text-neutral-300 hover:text-white cursor-pointer"
            >
                <Image
                    src="/icons/Mail.svg"
                    alt="Google Meet"
                    width={32}
                    height={32}
                    className="object-contain"
                />
            </div>

            {/* Hire Me text with arrow */}
            <a
                href="mailto:piyushraj26102004@gmail.com"
                className="flex items-center gap-x-2 text-neutral-300 hover:text-white font-normal text-lg tracking-wide transition-colors group"
            >
                HIRE ME
                <ArrowUpRight
                    ref={arrowRef}
                    className="w-5 h-5 opacity-0 transition-transform group-hover:opacity-70"
                />
            </a>
        </div>
    );
}
