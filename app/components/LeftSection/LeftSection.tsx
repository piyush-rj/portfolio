"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import About from "./components/About";
import AboutHeading from "./components/AboutHeading";
import Heading from "./components/Heading";
import Tooltip from "../Tooltip";
import { useTheme } from "@/app/hooks/zustand";
import { Moon, Sun } from "lucide-react";

interface LeftSectionProps {
    onHoverSelect: (item: string) => void;
    selected: string;
}

export default function LeftSection({
    onHoverSelect,
    selected,
}: LeftSectionProps) {
    const imageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { theme, setTheme } = useTheme();
    const [iconHovered, setIconHovered] = useState(false);
    const iconRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.set(imageRef.current, {
            position: "fixed",
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            zIndex: 999,
        })
            .to(imageRef.current, {
                duration: 1,
                top: "initial",
                left: "initial",
                xPercent: 0,
                yPercent: 0,
                position: "static",
                ease: "power3.out",
            })
            .from(
                Array.from(containerRef.current?.children || []),
                {
                    opacity: 0,
                    y: 20,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: "power2.out",
                },
                "+=0.2"
            );

        gsap.to(imageRef.current, {
            y: 15,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });
    }, []);

    return (
        <>
            {/* Desktop View */}
            <div
                ref={containerRef}
                className="hidden sm:flex h-full w-[25%] px-5 flex-col space-y-2 justify-center"
            >
                {/* Profile Image */}
                <div className="flex justify-center pl-1">
                    <div className="w-full flex justify-center items-center border-l-2 border-r-2 p-4 border-gray-900">
                        <div
                            ref={imageRef}
                            className="w-[300px] h-[300px] relative rounded shadow-lg hover:shadow-xl transition duration-300"
                        >
                            <Image
                                src="/pfp.png"
                                alt="Profile"
                                width={300}
                                height={300}
                                className="object-cover rounded-md"
                            />
                            <div className="absolute bottom-2 right-2 flex gap-3 z-10">
                                <div className="relative group inline-block">
                                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-neutral-200 text-black text-xs font-semibold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
                                        Mail me
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open("mailto:piyushraj26102004@gmail.com", "_blank");
                                        }}
                                        className="p-1 rounded-[10px] hover:scale-110 bg-neutral-800/50 backdrop-blur-md border border-white/20 text-white shadow-md hover:bg-black/50 transition-transform duration-300"
                                    >
                                        <Image
                                            src="/icons/Mail.svg"
                                            alt="Mail Icon"
                                            width={25}
                                            height={25}
                                            className="h-8 w-8 p-1 rounded-full object-contain cursor-pointer"
                                            unoptimized
                                        />
                                    </button>
                                </div>

                                <div className="relative group inline-block">
                                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-neutral-200 text-black text-xs font-semibold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
                                        BOOK A MEET
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open("https://meet.google.com/", "_blank");
                                        }}
                                        className="p-1 rounded-[10px] bg-neutral-800/50 hover:scale-110 hover:bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-md transition-transform duration-300"
                                    >
                                        <Image
                                            src="/icons/GoogleMeet.svg"
                                            alt="Google Meet"
                                            width={25}
                                            height={25}
                                            className="h-8 w-8 p-1 rounded-full object-contain cursor-pointer"
                                            unoptimized
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Headings */}
                <div onPointerEnter={() => onHoverSelect("About")}>
                    <AboutHeading
                        text="About"
                        tooltip="Yep! That's me :)"
                        isActive={selected === "About"}
                    />
                </div>
                <About />

                <div onPointerEnter={() => onHoverSelect("Projects")}>
                    <Heading
                        text="Projects"
                        tooltip="Click to Stay!"
                        isActive={selected === "Projects"}
                        onHover={(item) => onHoverSelect(item)}
                    />
                </div>

                <div onPointerEnter={() => onHoverSelect("Tech Stack")}>
                    <Heading
                        text="Tech Stack"
                        tooltip="Yeah! I know them all"
                        isActive={selected === "Tech Stack"}
                    />
                </div>

                <div onPointerEnter={() => onHoverSelect("Work Experience")}>
                    <Heading
                        text="Work Experience"
                        tooltip="Look at my contributions"
                        isActive={selected === "Work Experience"}
                    />
                </div>
            </div>

            {/* Mobile View - Top Navbar with Theme Toggle */}
            <div className="sm:hidden fixed top-0 left-0 right-0 z-50 px-4 py-2 flex items-center justify-between backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 relative rounded-full overflow-hidden border border-neutral-700">
                        <Image
                            src="/pfp.png"
                            alt="Profile"
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-sm font-semibold text-white">Piyush Raj</span>
                        <span className="text-xs text-neutral-400">Full-Stack Web Developer</span>
                    </div>
                </div>

                {/* Theme Toggle Button */}
                <button
                    ref={iconRef}
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    onMouseEnter={() => setIconHovered(true)}
                    onMouseLeave={() => setIconHovered(false)}
                    className="h-10 w-10 rounded-xl  flex items-center justify-center relative"
                >
                    {theme === "dark" ? (
                        <Sun className="w-5 h-5 text-amber-300 transition-transform group-hover:rotate-90" />
                    ) : (
                        <Moon className="w-5 h-5 text-neutral-800" />
                    )}
                    {iconHovered && (
                        <div
                            className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-[999] px-2 py-1 text-xs rounded-md shadow-md whitespace-nowrap
                ${theme === "dark" ? " text-black" : " text-white"}`}
                        >
                            {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
                        </div>
                    )}
                </button>
            </div>

            {/* Mobile View - Bottom Navbar */}
            <div className="sm:hidden fixed bottom-4 left-4 right-4 z-50 p-3 rounded-xl backdrop-blur-md bg-black/30 border border-white/10 shadow-lg flex items-center justify-around">
                <button onClick={() => onHoverSelect("About")}>
                    <span className={`text-xs ${selected === "About" ? "font-bold text-white" : "text-neutral-400"}`}>About</span>
                </button>
                <button onClick={() => onHoverSelect("Projects")}>
                    <span className={`text-xs ${selected === "Projects" ? "font-bold text-white" : "text-neutral-400"}`}>Projects</span>
                </button>
                <button onClick={() => onHoverSelect("Tech Stack")}>
                    <span className={`text-xs ${selected === "Tech Stack" ? "font-bold text-white" : "text-neutral-400"}`}>Tech</span>
                </button>
                <button onClick={() => onHoverSelect("Work Experience")}>
                    <span className={`text-xs ${selected === "Work Experience" ? "font-bold text-white" : "text-neutral-400"}`}>Work</span>
                </button>
            </div>
        </>
    );
}
