"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";


const projects = [
    {
        name: "ByteWords",
        description: "Crafted storytelling for brands powered by AI.",
        github: "https://github.com/piyush-rj/bytewords",
        website: "https://bytewords-pi.vercel.app/",
        image: "/images/bytewords.png",
    },
    {
        name: "SolDrop",
        description: "Effortless Solana NFT claim experience.",
        github: "https://github.com/piyush-rj/soldrop",
        website: "https://soldrop-ashen.vercel.app/",
        image: "/images/soldrop.png",
    },
    {
        name: "NexWallet",
        description: "A smooth wallet UI for Web3 users.",
        github: "https://github.com/piyush-rj/nexwallet",
        website: "https://nexwallet-pink.vercel.app/",
        image: "/images/nexwallet.png",
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

    return (
        <div className="relative px-12 w-full h-full text-neutral-100 font-[Inter] bg-black overflow-visible">

            <div className="flex flex-col max-w-5xl mx-auto">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="group relative transition-all duration-300 border-b border-neutral-800 py-10"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onMouseMove={(e) =>
                            setCoords({
                                x: e.clientX + 20,
                                y: e.clientY + window.scrollY - 20,
                            })
                        }
                    >
                        <div className="transition-transform h-full w-full duration-300 group-hover:translate-x-1">
                            <h2 className="text-[25px] font-semibold leading-tight font-sans text-neutral-300 tracking-tight group-hover:opacity-90 transition-opacity duration-300">
                                {project.name}
                            </h2>

                            <p className="text-[17px] text-neutral-400 mt-1 max-w-xl leading-relaxed font-sans">
                                {project.description}
                            </p>

                            <div className="flex gap-6 mt-3 text-sm text-neutral-300 font-sans">

                                <Link
                                    href={project.github}
                                    target="_blank"
                                    className="group/link relative overflow-hidden"
                                >
                                    <span className="font-caveat inline-block relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-white after:scale-x-0 after:origin-left group-hover/link:after:scale-x-100 after:transition-transform after:duration-300">
                                        GitHub
                                    </span>
                                </Link>

                                <Link
                                    href={project.website}
                                    target="_blank"
                                    className="group/link relative overflow-hidden"
                                >
                                    <span className="inline-block relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-white after:scale-x-0 after:origin-left group-hover/link:after:scale-x-100 after:transition-transform after:duration-300">
                                        Website
                                    </span>
                                </Link>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {hoveredIndex !== null && (
                <div
                    className="fixed z-50 pointer-events-none w-72 h-48 rounded-xl overflow-hidden border border-neutral-800 backdrop-blur-md bg-neutral-900/80 shadow-2xl transition-opacity duration-200"
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
