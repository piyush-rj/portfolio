"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Code, Zap } from "lucide-react";
import { Caveat_Brush } from "next/font/google";
import Image from "next/image";

const caveat = Caveat_Brush({
    subsets: ["latin"],
    weight: ["400"],
});

interface PremiumProfileCardProps {
    className?: string;
    onHireClick?: () => void;
}

export const PremiumProfileCard = ({ className = "", onHireClick }: PremiumProfileCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [theme, setTheme] = useState("light"); // Mock theme state

    return (
        <div className={`relative w-full max-w-[320px] mx-auto font-sans ${className}`}>
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900 rounded-3xl backdrop-blur-3xl opacity-10" />

            {/* Main card */}
            <motion.div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative bg-black/20 backdrop-blur-[12px] border border-white/10 rounded-3xl p-8 overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]"
                style={{
                    boxShadow: isHovered
                        ? '0 32px 64px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                        : '0 16px 32px -8px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                }}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >

                {/* Floating orb decoration */}
                <motion.div
                    className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-neutral-600/60 to-neutral-700/60 rounded-full blur-2xl"
                    animate={{
                        scale: isHovered ? 1.2 : 1,
                        opacity: isHovered ? 0.8 : 0.4,
                    }}
                    transition={{ duration: 0.4 }}
                />

                {/* Profile section */}
                <div className="relative z-10 flex flex-col items-center space-y-4">
                    {/* Profile Image with modern border */}
                    <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <div className="relative w-26 h-26 rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-700 to-neutral-800 p-0.5">
                            <div className="w-full h-full rounded-2xl overflow-hidden">

                                <Image
                                    width={20}
                                    height={20}
                                    src="/finalPFP.jpg"
                                    alt="Piyush Raj"
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />
                            </div>
                        </div>

                    </motion.div>

                    {/* Name and Title */}
                    <div className="text-center">
                        <motion.h3
                            className={`text-2xl text-neutral-300 tracking-wide ${caveat.className}`}
                            whileHover={{ scale: 1.02 }}
                        >
                            PIYUSH RAJ
                        </motion.h3>

                    </div>

                    {/* Description */}
                    <p className="text-sm text-neutral-400 leading-relaxed tracking-wide font-normal text-center max-w-[260px]">
                        I'm a <span className={`text-teal-500 font-medium`}>FULLSTACK WEB DEVELOPER</span>  exploring the world of Web3. I've got a solid grip on building modern web apps from frontend to backend, and now I'm diving into blockchain tech - learning how smart contracts, decentralized apps, and crypto wallets work.
                    </p>

                    {/* Action buttons */}
                    <div className="flex space-x-3 w-full">
                        <motion.button
                            onClick={onHireClick}
                            className="flex-1 group relative bg-neutral-200  text-black py-1 px-3 rounded-2xl font-semibold text-sm transition-all duration-200 hover:bg-slate-100"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="flex items-center justify-center space-x-2">
                                <span className={`text-[18px] ${caveat.className} tracking-wide`}>HIRE ME</span>
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                        </motion.button>

                        <motion.button
                            className={`p-3 flex justify-center items-center gap-x-1 bg-black text-neutral-300 rounded-2xl transition-all duration-200`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <MapPin className="w-5 h-5" />
                            Pune
                        </motion.button>
                    </div>
                </div>

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                        backgroundSize: '24px 24px'
                    }} />
                </div>
            </motion.div>
        </div>
    );
};