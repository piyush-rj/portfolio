"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import About from "./components/About";
import AboutHeading from "./components/AboutHeading";
import Heading from "./components/Heading";
import TextDiv from "./components/TextDiv";
import BookAMeet from "./components/BookAMeet";
import Contact from "./components/Contact";
import Tooltip from "../Tooltip";

interface LeftSectionProps {
    onSelect: (item: string) => void;
    onHover: (item: string) => void;
    onLeave: () => void;
}

export default function LeftSection({
    onSelect,
    onHover,
    onLeave,
}: LeftSectionProps) {
    const imageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Move image from center to original place
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

    }, []);

    return (
        <div
            ref={containerRef}
            className="h-full w-[25%] px-5 flex flex-col space-y-2 justify-center"
        >
            {/* Profile Image */}
            <div className="flex justify-center pl-1">
                <div className="w-full flex justify-center items-center border-l-2 border-r-2 p-4 border-gray-900">
                    <div
                        ref={imageRef}
                        className="w-[300px] h-[300px] relative rounded shadow-lg hover:shadow-xl transition duration-300"
                    >
                        <Image
                            src="/hero.jpg"
                            alt="Profile"
                            width={300}
                            height={300}
                            className="object-cover"
                        />

                        {/* Bottom-right Buttons */}
                        <div className="absolute bottom-2 right-2 flex gap-3 z-10">
                            {/* Mail Button */}
                            <Tooltip text="Mail Me">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open("mailto:piyushraj26102004@gmail.com", "_blank");
                                    }}
                                    className="p-1 rounded-[10px] bg-neutral-800/50 backdrop-blur-md border border-white/20 text-white shadow-md hover:bg-neutral-700/50 transition"
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

                            <Tooltip text="BOOK A MEET">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open("https://meet.google.com/", "_blank");
                                    }}
                                    className="p-1 rounded-[10px] bg-neutral-800/50 backdrop-blur-md border border-white/20 text-white shadow-md hover:bg-neutral-700/50 transition"
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
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <AboutHeading
                text="About"
                tooltip="Yep! That's me :)"
                onClick={() => onSelect("About")}
                onMouseEnter={() => onHover("About")}
                onMouseLeave={onLeave}
            />
            <About />

            {/* Projects */}
            <Heading
                text="Projects"
                tooltip="Click to Stay!"
                onClick={() => onSelect("Projects")}
                onMouseEnter={() => onHover("Projects")}
                onMouseLeave={onLeave}
            />

            {/* Others */}
            <div className="flex flex-col space-y-3">
                <Heading
                    text="Tech Stack"
                    tooltip="Yeah! I know them all"
                    onClick={() => onSelect("Tech Stack")}
                    onMouseEnter={() => onHover("Tech Stack")}
                    onMouseLeave={onLeave}
                />
                <Heading
                    text="Work Experience"
                    tooltip="Look at my contributions"
                    onMouseEnter={() => onHover("Work Experience")}
                    onMouseLeave={onLeave}
                />
            </div>
        </div>
    );
}
