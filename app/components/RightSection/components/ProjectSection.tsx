"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
    {
        title: "ByteWords",
        desc: "Minimal markdown blog for devs with rich UX.",
        glow: "from-indigo-800 via-purple-800 to-pink-800",
    },
    {
        title: "PayTM Dash",
        desc: "Merchant dashboard with a slick and secure design.",
        glow: "from-cyan-800 via-blue-800 to-teal-700",
    },
    {
        title: "SolDrop",
        desc: "NFT minting faucet with Solana wallet support.",
        glow: "from-yellow-700 via-red-800 to-pink-800",
    },
    {
        title: "HD-Wallet",
        desc: "Crypto wallet dashboard with token management.",
        glow: "from-lime-700 via-green-800 to-emerald-900",
    },
];

export default function ProjectSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="relative h-full w-full rounded-3xl overflow-hidden px-6 py-10 flex items-center justify-center">

            {/* border */}
            <div className="relative z-10 w-full h-full flex flex-wrap justify-center items-center gap-8 px-6">
                {projects.map((proj, i) => (
                    <motion.div
                        key={i}
                        onMouseEnter={() => setActiveIndex(i)}
                        onMouseLeave={() => setActiveIndex(null)}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                        className={`relative w-[220px] h-[280px] rounded-[2rem] p-[2px] transition-all duration-300
              bg-gradient-to-br ${proj.glow} shadow-xl hover:scale-[1.03]`}
                    >
                        <div className="w-full h-full rounded-[1.8rem] bg-black p-6 flex flex-col justify-between">
                            <h2 className="text-xl font-semibold text-white">{proj.title}</h2>
                            <p className="text-sm text-neutral-400">{proj.desc}</p>

                            {/* Spotlight animation */}
                            <motion.div
                                className="absolute inset-0 z-10 pointer-events-none"
                                animate={{
                                    background:
                                        activeIndex === i
                                            ? "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05), transparent 60%)"
                                            : "transparent",
                                }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* float block */}
            <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 0.1, y: 0 }}
                transition={{ delay: 1, duration: 1.2 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 text-8xl font-black text-white/5 tracking-tight pointer-events-none z-0"
            >
                Projects
            </motion.h1>
        </div>
    );
}
