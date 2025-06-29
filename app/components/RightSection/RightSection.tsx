"use client";
import clsx from "clsx";
import AboutSection from "./components/AboutSection";
import TechStack from "./components/TechStack";
import WorkExperience from "./components/WorkExperience";
import ProjectSection from "./components/ProjectSection";
import { useRef } from "react";
import gsap from "gsap"

interface RightSectionProps {
    selected: string | null;
}

export default function RightSection({ selected }: RightSectionProps) {
    const imageRef = useRef<HTMLDivElement>(null);

    const handleAboutHover = () => {
        gsap.to(imageRef.current, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            pointerEvents: "auto",
        });
    };

    const handleAboutLeave = () => {
        gsap.to(imageRef.current, {
            opacity: 0,
            scale: 0.8,
            y: -20,
            duration: 0.4,
            ease: "power3.inOut",
            pointerEvents: "none",
        });
    };

    return (

    <div
        className={clsx(
            "w-full sm:w-[75%] h-full flex z-[99] px-4 sm:px-8 pb-28 sm:pb-20 ml-0 sm:ml-2 overflow-y-auto relative",
            // {
            //     "animated-vertical-border": typeof window !== "undefined" && window.innerWidth >= 640,
            // }
        )}
    >

        {selected === "About" && (
            <div className="w-full h-full">
                <AboutSection onHover={handleAboutHover} onLeave={handleAboutLeave} />
            </div>
        )}

        {selected === "Projects" && (
            <div className="w-full h-full">
                <ProjectSection />
            </div>
        )}

        {selected === "Tech Stack" && (
            <div className="w-full h-full">
                <TechStack />
            </div>
        )}

        {selected === "Work Experience" && (
            <div className="w-full h-full">
                <WorkExperience />
            </div>
        )}

        {/* {selected === "Education" && (
        <div className="w-full h-full">
          <Education />
        </div>
      )} */}
    </div>
    );
}
