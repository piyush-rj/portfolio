"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

const projects = [
    {
        name: "ByteWords",
        description: "Crafted storytelling for brands powered by AI.",
        github: "https://github.com/piyush-rj/bytewords",
        website: "https://bytewords-pi.vercel.app/",
        image: "/ByteWords.png",
    },
    {
        name: "SolDrop",
        description: "Effortless Solana NFT claim experience.",
        github: "https://github.com/piyush-rj/soldrop",
        website: "https://soldrop-ashen.vercel.app/",
        image: "/soldrop.png",
    },
    {
        name: "NexWallet",
        description: "A smooth wallet UI for Web3 users.",
        github: "https://github.com/piyush-rj/nexwallet",
        website: "https://nexwallet-pink.vercel.app/",
        image: "/NexWallet.png",
    },
    {
        name: "PayTM Adv",
        description: "A PayTM-inspired advanced UI experiment.",
        github: "https://github.com/piyush-rj/paytm-adv",
        website: "#",
        image: "/images/paytm.png",
    },
];

export default function ProjectSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const githubIconRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const websiteIconRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        githubIconRefs.current.forEach((ref) => {
            if (ref) gsap.set(ref, { opacity: 0, x: -5 });
        });
        websiteIconRefs.current.forEach((ref) => {
            if (ref) gsap.set(ref, { opacity: 0, x: -5 });
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
        <div className="relative px-4 sm:px-12 w-full text-neutral-100 font-[Inter] bg-black 
  h-auto sm:h-full 
  overflow-y-auto sm:overflow-hidden">
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
                        {/* Static image for mobile */}
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
                            <h2 className="text-[18px] sm:text-[25px] font-semibold leading-snug font-sans text-neutral-300 tracking-tight group-hover:opacity-90 transition-opacity duration-300">
                                {project.name}
                            </h2>
                            <p className="text-[14px] sm:text-[17px] text-neutral-400 mt-1 leading-relaxed font-sans">
                                {project.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 text-[14px] sm:text-sm text-neutral-300 font-sans">
                                <Link
                                    href={project.github}
                                    target="_blank"
                                    className="group/link relative overflow-hidden w-fit"
                                    onMouseEnter={() => animateIcon(githubIconRefs.current[index], true)}
                                    onMouseLeave={() => animateIcon(githubIconRefs.current[index], false)}
                                >
                                    <span className="inline-flex items-center gap-1 sm:gap-2 font-caveat relative after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-0 group-hover/link:after:w-full after:-translate-x-1/2 after:bg-white group-hover/link:after:scale-x-100 after:transition-all after:duration-300 hover:text-neutral-400">
                                        GitHub
                                    </span>
                                </Link>

                                <Link
                                    href={project.website}
                                    target="_blank"
                                    className="group/link relative overflow-hidden w-fit"
                                    onMouseEnter={() => animateIcon(websiteIconRefs.current[index], true)}
                                    onMouseLeave={() => animateIcon(websiteIconRefs.current[index], false)}
                                >
                                    <span className="inline-flex items-center gap-1 sm:gap-2 relative after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-0 group-hover/link:after:w-full after:-translate-x-1/2 after:bg-white group-hover/link:after:scale-x-100 after:transition-all after:duration-300 hover:text-neutral-400">
                                        Website
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* Hover Preview for Desktop */}
            {hoveredIndex !== null && (
                <div
                    className="hidden sm:block fixed z-50 pointer-events-none w-72 h-48 rounded-xl overflow-hidden border border-neutral-800 backdrop-blur-md bg-neutral-900/80 shadow-2xl transition-opacity duration-200"
                    style={{
                        left: coords.x,
                        top: coords.y,
                    }}
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
