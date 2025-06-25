"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

import AboutSection from "./components/AboutSection";
import Education from "./components/Education";
import Project from "./components/Project";
import TechStack from "./components/TechStack";
import WorkExperience from "./components/WorkExperience";

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

    useEffect(() => {
        gsap.set(imageRef.current, {
            opacity: 0,
            scale: 0.8,
            y: -20,
            pointerEvents: "none",
        });
    }, []);

    return (
        <div className="h-full w-[75%] p-8 pb-20 ml-2 animated-vertical-border relative">
            {/* Floating profile picture */}
            <div
                ref={imageRef}
                className="fixed top-[400px] left-2/3 -translate-x-1/2 rounded-full overflow-hidden shadow-xl border-4 border-white z-[9999] w-[150px] h-[150px]"
            >
                <Image
                    src="/pfp.jpg"
                    alt="Pop-up Profile"
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>

            {selected === "About" && (
                <div className="h-full w-full">
                    <AboutSection onHover={handleAboutHover} onLeave={handleAboutLeave} />
                </div>
            )}

            {selected === "ByteWords" && (
                <div className="h-full w-full">
                    <Project
                        title="ByteWords"
                        brief="A Blogging website"
                        description="This is a clean and minimal dev blog where you can read or post technical articles. It’s got a dark mode vibe and a really smooth UI. Perfect for developers who want to share their thoughts or tutorials without distractions."
                        url="/bytewords.mp4"
                    />
                </div>
            )}

            {selected === "PayTM" && (
                <div className="h-full w-full">
                    <Project
                        title="PayTM"
                        brief="Online UPI Web-app"
                        description="This is a custom-built version of Paytm’s business dashboard. It’s meant for merchants to track payments, see reports, and manage stuff. It’s a good example of a dashboard UI with a focus on functionality and design."
                        url="/payTM.mp4"
                    />
                </div>
            )}

            {selected === "SolDrop" && (
                <div className="h-full w-full">
                    <Project
                        title="SolDrop"
                        brief="Faucet for Solana"
                        description="Soldrop is a landing page for an NFT drop on the Solana blockchain. It looks stylish and probably lets users connect their wallets to mint NFTs. Think of it as a launchpad site to build hype for an NFT collection."
                        url="/soldrop.mp4"
                    />
                </div>
            )}

            {selected === "HD-Wallet" && (
                <div className="h-full w-full">
                    <Project
                        title="HD-Wallet"
                        brief="Under the hood mechanism of HD-wallets"
                        description="This one’s a concept for a crypto wallet dashboard. It shows your token balances, recent transactions, and gives a nice overview of your crypto stuff. It’s mostly a frontend demo, but it looks modern and responsive."
                        url="/nexwallet.mp4"
                    />
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

            {selected === "Education" && (
                <div className="w-full h-full">
                    <Education />
                </div>
            )}
        </div>
    );
}
