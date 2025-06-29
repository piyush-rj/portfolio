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
import ToolTip from "../Tooltip";

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
                                                window.open("https://meet.google.com/", "_blank");
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

            {/* mobile view - top navbar */}
            <div className={`sm:hidden fixed top-0 left-0 right-0 z-50 px-4 py-2 flex items-center justify-between backdrop-blur-md  shadow-md font-sans ${theme == "dark" ? "bg-black/30 border-b border-white/10" : "bg-neutral-200 "}`}>
                {/* Left: Profile Info */}
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
                        <span className={`text-sm font-semibold ${theme == "dark" ? "text-white" : "text-black"}`}>Piyush Raj</span>
                        <span className={`text-xs ${theme == "dark" ? "text-neutral-400" : "text-neutral-800"}`}>Full-Stack Web Developer</span>
                    </div>
                </div>

                {/* Mail + Meet Buttons */}
                <div className="flex gap-3 items-center">
                    <button
                        onClick={() => window.open("mailto:piyushraj26102004@gmail.com", "_blank")}
                        className="p-2 rounded-lg bg-neutral-800/90 hover:bg-black/60 backdrop-blur-md border border-white/20"
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
                        onClick={() => window.open("https://meet.google.com/", "_blank")}
                        className="p-2 rounded-lg bg-neutral-800/90 hover:bg-black/60 backdrop-blur-md border border-white/20"
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


            {/* mobile view - bottom navbar */}
            <div className={`sm:hidden fixed bottom-4 left-4 right-4 z-50 p-3 font-sans rounded-xl backdrop-blur-md  shadow-lg flex items-center justify-around ${theme == "dark" ? "bg-black/30 border border-white/10" : "bg-neutral-200 "}`}>
                <button onClick={() => onHoverSelect("About")}>
                    <span className={`text-xs ${selected === "About" ? "font-bold text-black" : "text-neutral-600"} ${theme == "dark" ? "text-neutral-300" : ""}`}>About</span>
                </button>
                <button onClick={() => onHoverSelect("Projects")}>
                    <span className={`text-xs ${selected === "Projects" ? "font-bold text-black" : "text-neutral-600"} ${theme == "dark" ? "text-neutral-300" : ""}`}>Projects</span>
                </button>
                <button onClick={() => onHoverSelect("Tech Stack")}>
                    <span className={`text-xs ${selected === "Tech Stack" ? "font-bold text-black" : "text-neutral-600"} ${theme == "dark" ? "text-neutral-300" : ""}`}>Tech</span>
                </button>
                <button onClick={() => onHoverSelect("Work Experience")}>
                    <span className={`text-xs ${selected === "Work Experience" ? "font-bold text-black" : "text-neutral-600"} ${theme == "dark" ? "text-neutral-300" : ""}`}>Work</span>
                </button>

                <span className="text-neutral-500">|</span>

                <button
                    ref={iconRef}
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    onMouseEnter={() => setIconHovered(true)}
                    onMouseLeave={() => setIconHovered(false)}
                    className=" rounded-xl  flex items-center justify-center relative "
                >
                    {theme === "dark" ? (
                        <Sun className="w-4 h-4 text-amber-300 transition-transform group-hover:rotate-90" />
                    ) : (
                        <Moon className="w-4 h-4 text-neutral-500" />
                    )}
                    {iconHovered && (
                        <div
                            className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-[999] px-2 text-xs rounded-md shadow-md whitespace-nowrap
                ${theme === "dark" ? " text-black" : " text-white"}`}
                        >
                            {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
                        </div>
                    )}
                </button>
            </div>
        </>
    );
}
