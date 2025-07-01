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
            className="w-full sm:w-[65%] md:w-[68%] lg:w-[72%] xl:w-[75%] min-h-full flex z-10 px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 pb-20 sm:pb-20 ml-0 sm:ml-2 overflow-y-auto relative"
        >
            {selected === "About" && (
                <div className="w-full min-h-full flex flex-col">
                    <AboutSection onHover={handleAboutHover} onLeave={handleAboutLeave} />
                </div>
            )}

            {selected === "Projects" && (
                <div className="w-full min-h-full flex flex-col">
                    <ProjectSection />
                </div>
            )}

            {selected === "Tech Stack" && (
                <div className="w-full min-h-full flex flex-col">
                    <TechStack />
                </div>
            )}

            {selected === "Work Experience" && (
                <div className="w-full min-h-full flex flex-col p-3 md:p-5 mb-20">
                    <WorkExperience
                        title="Wallpaper Heaven"
                        role="Full-Stack Developer"
                        timeline="May – June 2025"
                        image="/wallpaperHeavenLogo.png"
                        imageURL="https://wallpaperheaven.live"
                        description={[
                            "Designed and deployed a clean, responsive website for a premium wall design studio.",
                            "Used Next.js and Tailwind CSS for a modern frontend experience.",
                            "Built a custom admin panel for managing offers and collections.",
                            "Integrated dynamic content using TypeScript and Prisma ORM.",
                            "Optimized for SEO and deployed on AWS EC2.",
                        ]}
                        techstack={["Next.js", "Tailwind", "TypeScript", "Prisma", "AWS"]}
                    />
                </div>
            )}
        </div>
    );
}
