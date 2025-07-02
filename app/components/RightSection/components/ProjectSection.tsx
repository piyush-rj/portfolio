"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon, Wifi, WifiOff } from "lucide-react";
import gsap from "gsap";
import { useTheme } from "@/app/hooks/zustand";
import ToolTip from "../../Tooltip";

const projects = [
    {
        name: "ByteWords",
        description: "Crafted dark-themed blogging website for devs.",
        github: "https://github.com/piyush-rj/bytewords",
        website: "https://bytewords-pi.vercel.app/",
        image: "/ByteWords.png",
        tech: ["Next.js", "Tailwind", "GSAP"]
    },
    {
        name: "SolDrop",
        description: "Effortless Solana Drop for devs.",
        github: "https://github.com/piyush-rj/soldrop",
        website: "https://soldrop-ashen.vercel.app/",
        image: "/soldrop.png",
        tech: ["Solana", "Phantom", "Tailwind"]
    },
    {
        name: "NexWallet",
        description: "A smooth wallet skeleton for Web3 users.",
        github: "https://github.com/piyush-rj/nexwallet",
        website: "https://nexwallet-pink.vercel.app/",
        image: "/NexWallet.png",
        tech: ["Next.js", "Web3.js", "Tailwind"]
    },
    {
        name: "PayTM Adv",
        description: "A PayTM-inspired advanced UI experiment.",
        github: "https://github.com/piyush-rj/paytm-adv",
        website: "#",
        image: "/payTM.jpeg",
        tech: ["React", "Framer Motion", "UI/UX"]
    },
    {
        name: "Portfolio",
        description: "The one you are looking at.",
        github: "https://github.com/piyush-rj/portfolio",
        website: "https://portfolio-piyush-one.vercel.app",
        image: "/portfolio.png",
        tech: ["NextJS", "GSAP", "UI/UX"]
    }
];

export default function ProjectSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const githubIconRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const websiteIconRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const tagRefs = useRef<(HTMLDivElement | null)[]>([]);
    const iconContainers = useRef<(HTMLDivElement | null)[]>([]);
    const { theme } = useTheme();
    const [showTags, setShowTags] = useState<boolean[]>(new Array(projects.length).fill(false));

    useEffect(() => {
        // Animate icon containers
        iconContainers.current.forEach((iconSet, i) => {
            if (iconSet) {
                gsap.fromTo(
                    iconSet,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3, delay: 0.1 + i * 0.1 }
                );

                gsap.fromTo(
                    iconSet.children,
                    { opacity: 0, y: 10 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        stagger: 0.15,
                        delay: 0.2 + i * 0.1
                    }
                );
            }
        });

        // Animate tag containers
        tagRefs.current.forEach((el, i) => {
            if (el) {
                gsap.fromTo(
                    el,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3, delay: 0.4 + i * 0.1 }
                );

                gsap.fromTo(
                    el.children,
                    { opacity: 0, y: 10 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        stagger: 0.1,
                        delay: 0.5 + i * 0.1,
                        ease: "power2.out"
                    }
                );
            }
        });
    }, []);

    const animateIcon = (ref: HTMLSpanElement | null, show: boolean) => {
        if (!ref) return;
        gsap.to(ref, {
            opacity: show ? 1 : 0,
            x: show ? 0 : -5,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const toggleTags = (index: number) => {
        setShowTags(prev => prev.map((show, i) => i === index ? !show : show));

        // Animate the tag container when toggling
        const tagContainer = tagRefs.current[index];
        if (tagContainer) {
            const isShowing = !showTags[index];
            if (isShowing) {
                gsap.fromTo(
                    tagContainer,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3 }
                );
                gsap.fromTo(
                    tagContainer.children,
                    { opacity: 0, y: 10 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        stagger: 0.1,
                        ease: "power2.out"
                    }
                );
            } else {
                gsap.to(tagContainer, { opacity: 0, duration: 0.2 });
            }
        }
    };

    return (
        <div className={`relative px-4 sm:px-12 w-full font-sans overflow-x-hidden overflow-y-auto scrollbar-hide ${theme === "dark" ? "bg-black text-neutral-100" : "bg-transparent text-black"}`}>
            <div className="flex flex-col max-w-5xl mx-auto">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="group relative transition-all duration-300 border-b border-neutral-800 py-6 sm:py-10"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onMouseMove={(e) =>
                            setCoords({
                                x: e.clientX + 200,
                                y: e.clientY + window.scrollY - 150
                            })
                        }
                    >
                        <div className="sm:hidden mb-4 w-full aspect-video rounded-xl overflow-hidden border border-neutral-800">
                            <Image
                                src={project.image}
                                alt={project.name}
                                width={500}
                                height={300}
                                className="w-full h-full object-cover object-top"
                            />
                        </div>

                        <div className="transition-transform h-full w-full duration-300 group-hover:translate-x-1">
                            <h2 className={`text-[18px] sm:text-[25px] font-semibold leading-snug tracking-tight group-hover:opacity-90 transition-opacity duration-300 ${theme === "dark" ? "text-neutral-300" : "text-black"}`}>
                                {project.name}
                            </h2>
                            <p className={`text-[14px] sm:text-[17px] mt-1 leading-relaxed ${theme === "dark" ? "text-neutral-400" : "text-neutral-800"}`}>
                                {project.description}
                            </p>

                            <div
                                className="flex flex-row gap-4 mt-4 text-sm opacity-0"
                                ref={(el) => { (iconContainers.current[index] = el) }}
                            >
                                <ToolTip text="Github">
                                    <Link
                                        href={project.github}
                                        target="_blank"
                                        className="relative"
                                        onMouseEnter={() => animateIcon(githubIconRefs.current[index], true)}
                                        onMouseLeave={() => animateIcon(githubIconRefs.current[index], false)}
                                    >
                                        <span className="inline-flex items-center gap-2">
                                            <GithubIcon />
                                            <span ref={(el) => { (githubIconRefs.current[index] = el) }} />
                                        </span>
                                    </Link>
                                </ToolTip>

                                <ToolTip text={project.name === "PayTM Adv" ? "Not Live" : "Live"}>
                                    <Link
                                        href={project.website}
                                        target="_blank"
                                        className="relative"
                                        onMouseEnter={() => animateIcon(websiteIconRefs.current[index], true)}
                                        onMouseLeave={() => animateIcon(websiteIconRefs.current[index], false)}
                                    >
                                        <span className="inline-flex items-center gap-2">
                                            {project.name === "PayTM Adv" ? <WifiOff /> : <Wifi />}
                                            <span ref={(el) => { (websiteIconRefs.current[index] = el) }} />
                                        </span>
                                    </Link>
                                </ToolTip>

                                <button
                                    className={`sm:hidden font-sans px-4 py-1 rounded-full shadow-inner text-xs font-semibold ${theme == "dark" ? "bg-neutral-200/20 text-neutral-300" : "bg-black text-white"}`}
                                    onClick={() => toggleTags(index)}
                                >
                                    {showTags[index] ? "Hide Stack" : "View Stack"}
                                </button>
                            </div>

                            {(showTags[index] || (typeof window !== "undefined" && window.innerWidth >= 640)) && (
                                <div
                                    ref={(el) => { (tagRefs.current[index] = el) }}
                                    className="mt-3 flex flex-wrap gap-2"
                                    style={{ opacity: showTags[index] || (typeof window !== "undefined" && window.innerWidth >= 640) ? 1 : 0 }}
                                >
                                    {project.tech.map((tech, i) => (
                                        <div
                                            key={i}
                                            className="bg-white text-black text-xs px-2 py-1 rounded-md shadow-[inset_0px_0px_8px_rgba(0,0,0,0.2)] border border-black/20"
                                        >
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {hoveredIndex !== null && (
                <div
                    className="hidden sm:block fixed z-50 pointer-events-none w-72 h-48 rounded-xl overflow-hidden border border-neutral-800 backdrop-blur-md bg-neutral-900/80 shadow-2xl"
                    style={{ left: coords.x, top: coords.y }}
                >
                    <Image
                        src={projects[hoveredIndex].image}
                        alt={projects[hoveredIndex].name}
                        width={288}
                        height={192}
                        className="w-full h-full object-cover object-top"
                    />
                </div>
            )}
            <div className="w-full h-full flex justify-center items-center px-8 py-2 mb-10 md:hidden"></div>
        </div>
    );
}