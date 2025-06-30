"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import About from "./components/About";
import Heading from "./components/Heading";
import Tooltip from "../Tooltip";
import { useTheme } from "@/app/hooks/zustand";
import { Moon, Sun, X } from "lucide-react";
import ToolTip from "../Tooltip";
import { PremiumProfileCard } from "../ui/ProfileCard";

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
    const topNavRef = useRef<HTMLDivElement>(null);
    const bottomNavRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const { theme, setTheme } = useTheme();
    const [iconHovered, setIconHovered] = useState(false);
    const [showProfileCard, setShowProfileCard] = useState(false);
    const iconRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Desktop animations
        if (imageRef.current) {
            tl.from(imageRef.current, {
                opacity: 0,
                y: -50,
                scale: 0.95,
                duration: 0.8,
                ease: "power3.out",
            });

            // Floating animation
            gsap.to(imageRef.current, {
                y: 15,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });
        }

        // Mobile navbar animations
        if (topNavRef.current) {
            // Set initial state to prevent flash
            gsap.set(topNavRef.current, {
                y: -100,
                opacity: 0
            });

            // Animate in
            gsap.to(topNavRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                delay: 0.2
            });
        }

        if (bottomNavRef.current) {
            // Set initial state to prevent flash
            gsap.set(bottomNavRef.current, {
                y: 100,
                opacity: 0,
                scale: 0.9
            });

            // Animate in
            gsap.to(bottomNavRef.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                delay: 0.4
            });
        }
    }, []);

    // Modal animation effects
    useEffect(() => {
        if (showProfileCard && modalRef.current) {
            // Animate modal in
            gsap.fromTo(modalRef.current,
                {
                    opacity: 0,
                    scale: 0.8,
                    y: 50
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "back.out(1.7)"
                }
            );
        }
    }, [showProfileCard]);

    const handleCloseModal = () => {
        if (modalRef.current) {
            gsap.to(modalRef.current, {
                opacity: 0,
                scale: 0.8,
                y: 50,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => setShowProfileCard(false)
            });
        } else {
            setShowProfileCard(false);
        }
    };

    const handleProfileImageClick = () => {
        setShowProfileCard(true);
    };

    const handleHireClick = () => {
        window.open("mailto:piyushraj26102004@gmail.com", "_blank")
        handleCloseModal();
    };

    return (
        <>
            {/* Desktop View */}
            <div
                ref={containerRef}
                className="hidden sm:flex h-full w-[25%] px-5 flex-col space-y-2 justify-center animated-vertical-border"
            >
                {/* Profile Image */}
                <div className="flex justify-center p-1">
                    <div className="w-full flex justify-center items-center">
                        <div
                            ref={imageRef}
                            className="w-[300px] h-[300px] relative rounded shadow-lg hover:shadow-xl transition duration-300"
                        >
                            <Image
                                src="/pfp.jpg"
                                alt="Profile"
                                width={300}
                                height={300}
                                className="object-cover rounded-md"
                            />

                            <div className="absolute bottom-2 right-2 flex gap-3 z-10">
                                <div className="relative group inline-block">
                                    <Tooltip text="MAIL" offsetX={-5} offsetY={-50}>
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
                                    </Tooltip>
                                </div>

                                <div className="relative group inline-block">
                                    <Tooltip text="BOOK A MEET" offsetX={-10} offsetY={-50}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.open("https://meet.google.com/new", "_blank");
                                            }}
                                            className="p-1 rounded-[10px] bg-neutral-800/50 hover:scale-110 hover:bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-md transition-transform duration-300"
                                        >
                                            <Image
                                                src="/icons/GoogleMeet.svg"
                                                alt="Google Meet"
                                                width={25}
                                                height={25}
                                                className="h-8 w-8 p-1 object-contain cursor-pointer"
                                                unoptimized
                                            />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Headings */}
                <div className="flex items-center w-full space-x-2">
                    <div
                        className="flex-1"
                        onPointerEnter={() => onHoverSelect("About")}
                    >
                        <Heading
                            text="About"
                            tooltip="Yep! That's me :)"
                            isActive={selected === "About"}
                        />
                    </div>

                    <ToolTip text={theme == "dark" ? "Switch to Light" : "Switch to Dark"}>
                        <button
                            ref={iconRef}
                            onClick={(e) => {
                                e.stopPropagation();
                                setTheme(theme === 'dark' ? 'light' : 'dark');
                            }}
                            onMouseEnter={() => setIconHovered(true)}
                            onMouseLeave={() => setIconHovered(false)}
                            className="bg-neutral-900 p-3 rounded-xl hover:bg-neutral-800/80 group relative cursor-pointer"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-amber-300 group-hover:rotate-90 transition-transform" />
                            ) : (
                                <Moon className="w-5 h-5 text-neutral-400" />
                            )}
                        </button>
                    </ToolTip>
                </div>

                <About />

                <div onPointerEnter={() => onHoverSelect("Projects")}>
                    <Heading
                        text="Projects"
                        tooltip="My builds"
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

            {/* Mobile view - top navbar */}
            <div
                ref={topNavRef}
                className={`sm:hidden fixed top-0 left-0 right-0 z-50 px-4 py-2 flex items-center justify-between backdrop-blur-md shadow-md font-sans ${theme == "dark" ? "bg-black/30 border-b border-white/10" : "bg-neutral-200"}`}
            >
                {/* Left: Profile Info */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleProfileImageClick}
                        className="w-10 h-10 relative rounded-full overflow-hidden border border-neutral-700 hover:scale-105 transition-transform duration-200 cursor-pointer"
                    >
                        <Image
                            src="/pfp.jpg"
                            alt="Profile"
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                        />

                    </button>
                    <div className="flex flex-col justify-center">
                        <span className={`text-sm font-semibold ${theme == "dark" ? "text-white" : "text-black"}`}>Piyush Raj</span>
                        <span className={`text-xs ${theme == "dark" ? "text-neutral-400" : "text-neutral-800"}`}>Full-Stack Web Developer</span>
                    </div>
                </div>

                {/* Mail + Meet Buttons */}
                <div className="flex gap-3 items-center">
                    <button
                        onClick={() => window.open("mailto:piyushraj26102004@gmail.com", "_blank")}
                        className={`p-2 rounded-lg backdrop-blur-md shadow-xs transition-all duration-200 hover:scale-105 ${theme == "dark" ? "bg-neutral-800/90 hover:bg-black/60 border border-white/20" : "bg-neutral-300 border border-neutral-300/50 hover:bg-neutral-400"}`}
                    >
                        <Image
                            src="/icons/Mail.svg"
                            alt="Mail Icon"
                            width={20}
                            height={20}
                            className="h-4 w-4 object-contain rounded-full"
                            unoptimized
                        />
                    </button>

                    <button
                        onClick={() => window.open("https://meet.google.com/new", "_blank")}
                        className={`p-2 rounded-lg backdrop-blur-md shadow-xs transition-all duration-200 hover:scale-105 ${theme == "dark" ? "bg-neutral-800/90 hover:bg-black/60 border border-white/20" : "bg-neutral-300 border border-neutral-300/50 hover:bg-neutral-400"}`}
                    >
                        <Image
                            src="/icons/GoogleMeet.svg"
                            alt="Google Meet"
                            width={20}
                            height={20}
                            className="h-4 w-4 object-contain"
                            unoptimized
                        />
                    </button>
                </div>
            </div>

            {/* Mobile view - bottom navbar */}
            <div
                ref={bottomNavRef}
                className={`sm:hidden fixed bottom-4 left-4 right-4 z-50 p-3 font-sans rounded-xl backdrop-blur-md shadow-lg flex items-center justify-around ${theme == "dark" ? "bg-black/30 border border-white/10" : "bg-neutral-200"}`}
            >
                <button
                    onClick={() => onHoverSelect("About")}
                    className="transition-all duration-200 hover:scale-110"
                >
                    <span className={`text-xs transition-all duration-200 ${selected === "About" ? "font-bold" : "text-neutral-600"} ${theme == "dark" ? (selected === "About" ? "text-white" : "text-neutral-300") : (selected === "About" ? "text-black" : "text-neutral-600")}`}>
                        About
                    </span>
                </button>

                <button
                    onClick={() => onHoverSelect("Projects")}
                    className="transition-all duration-200 hover:scale-110"
                >
                    <span className={`text-xs transition-all duration-200 ${selected === "Projects" ? "font-bold" : "text-neutral-600"} ${theme == "dark" ? (selected === "Projects" ? "text-white" : "text-neutral-300") : (selected === "Projects" ? "text-black" : "text-neutral-600")}`}>
                        Projects
                    </span>
                </button>

                <button
                    onClick={() => onHoverSelect("Tech Stack")}
                    className="transition-all duration-200 hover:scale-110"
                >
                    <span className={`text-xs transition-all duration-200 ${selected === "Tech Stack" ? "font-bold" : "text-neutral-600"} ${theme == "dark" ? (selected === "Tech Stack" ? "text-white" : "text-neutral-300") : (selected === "Tech Stack" ? "text-black" : "text-neutral-600")}`}>
                        Tech
                    </span>
                </button>

                <button
                    onClick={() => onHoverSelect("Work Experience")}
                    className="transition-all duration-200 hover:scale-110"
                >
                    <span className={`text-xs transition-all duration-200 ${selected === "Work Experience" ? "font-bold" : "text-neutral-600"} ${theme == "dark" ? (selected === "Work Experience" ? "text-white" : "text-neutral-300") : (selected === "Work Experience" ? "text-black" : "text-neutral-600")}`}>
                        Work
                    </span>
                </button>

                <span className="text-neutral-500">|</span>

                <button
                    ref={iconRef}
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="rounded-xl flex items-center justify-center relative transition-all duration-200 hover:scale-110"
                >
                    {theme === "dark" ? (
                        <Sun className="w-4 h-4 text-amber-300 transition-transform group-hover:rotate-90" />
                    ) : (
                        <Moon className="w-4 h-4 text-neutral-500" />
                    )}
                </button>
            </div>

            {/* Profile Card Modal */}
            {showProfileCard && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={handleCloseModal}
                    />

                    {/* Modal Content */}
                    <div ref={modalRef} className="relative z-10 w-full max-w-sm">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute -top-12 right-2 z-20 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Profile Card */}
                        <PremiumProfileCard
                            onHireClick={handleHireClick}
                            className="transform-gpu"
                        />
                    </div>
                </div>
            )}
        </>
    );
}