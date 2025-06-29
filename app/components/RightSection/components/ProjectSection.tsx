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
        description: "Crafted storytelling for brands powered by AI.",
        github: "https://github.com/piyush-rj/bytewords",
        website: "https://bytewords-pi.vercel.app/",
        image: "/ByteWords.png",
        tech: ["Next.js", "Tailwind", "GSAP"]
    },
    {
        name: "SolDrop",
        description: "Effortless Solana NFT claim experience.",
        github: "https://github.com/piyush-rj/soldrop",
        website: "https://soldrop-ashen.vercel.app/",
        image: "/soldrop.png",
        tech: ["Solana", "Phantom", "Tailwind"]
    },
    {
        name: "NexWallet",
        description: "A smooth wallet UI for Web3 users.",
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
        image: "/images/paytm.png",
        tech: ["React", "Framer Motion", "UI/UX"]
    }
];

export default function ProjectSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const githubIconRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const websiteIconRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const tagRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [showTags, setShowTags] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        githubIconRefs.current.forEach((ref) => {
            if (ref) gsap.set(ref, { opacity: 0, x: -5 });
        });
        websiteIconRefs.current.forEach((ref) => {
            if (ref) gsap.set(ref, { opacity: 0, x: -5 });
        });
        tagRefs.current.forEach((ref) => {
            if (ref)
                gsap.fromTo(ref, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
        });
    }, []);

    const animateIcon = (ref: HTMLSpanElement | null, show: boolean) => {
        if (!ref) return;
        gsap.to(ref, {
            opacity: show ? 1 : 0,
            x: show ? 0 : -5,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    return (
        <div className={`relative px-4 sm:px-12 w-full font-sans overflow-y-auto overflow-x-hidden [::-webkit-scrollbar]:hidden [scrollbar-width:none] ${theme === "dark" ? "bg-black text-neutral-100" : "bg-transparent text-black"}`}>
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
                                y: e.clientY + window.scrollY - 150,
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

                            <div className="flex flex-row gap-4 mt-4 text-sm">
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
                                        </span>
                                    </Link>
                                </ToolTip>

                                <button
                                    className={`sm:hidden  font-sans px-4 py-1 rounded-full shadow-inner text-xs font-semibold ${theme == "dark" ? "bg-neutral-200/20 text-neutral-300" : "bg-black text-white"}`}
                                    onClick={() => setShowTags((prev) => !prev)}
                                >
                                    {showTags ? "Hide Stack" : "View Stack"}
                                </button>
                            </div>

                            {(showTags || typeof window !== 'undefined' && window.innerWidth >= 640) && (
                                <div
                                    ref={(el) => {(tagRefs.current[index] = el)}}
                                    className="mt-3 flex flex-wrap gap-2"
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
        </div>
    );
}
