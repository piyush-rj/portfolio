"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function BookAMeet() {
    const iconRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<SVGSVGElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!iconRef.current || !arrowRef.current || !wrapperRef.current) return;

        const icon = iconRef.current;
        const arrow = arrowRef.current;
        const wrapper = wrapperRef.current;

        const onEnter = () => {
            gsap.fromTo(
                icon,
                { rotation: -4 },
                {
                    rotation: 4,
                    duration: 0.1,
                    repeat: 5,
                    yoyo: true,
                    ease: "power1.inOut",
                }
            );
            gsap.to(arrow, {
                x: 6,
                y: -4,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const onLeave = () => {
            gsap.to(icon, {
                rotation: 0,
                duration: 0.2,
                ease: "power1.inOut",
            });
            gsap.to(arrow, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.inOut",
            });
        };

        wrapper.addEventListener("mouseenter", onEnter);
        wrapper.addEventListener("mouseleave", onLeave);

        return () => {
            wrapper.removeEventListener("mouseenter", onEnter);
            wrapper.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="flex items-center gap-4 px-1 py-3 rounded-xl transition-all shadow-md hover:shadow-xl cursor-pointer group"
            onClick={() => window.open("https://meet.google.com/", "_blank")}
        >
            <div
                ref={iconRef}
                className="w-[40px] h-[40px] flex items-center justify-center"
            >
                <Image
                    src="/icons/GoogleMeet.svg"
                    alt="Google Meet"
                    width={32}
                    height={32}
                    className="object-contain"
                />
            </div>

            <div className="flex items-center gap-2 text-neutral-200 group-hover:text-white text-lg font-normal tracking-wide">
                BOOK A MEET
                <ArrowUpRight
                    ref={arrowRef}
                    className="w-4 h-4 opacity-0 group-hover:opacity-80 transition-opacity"
                />
            </div>
        </div>
    );
}
