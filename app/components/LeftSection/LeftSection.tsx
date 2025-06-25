"use client"
import { useState } from "react";
import About from "./components/About";
import Heading from "./components/Heading";
import TextDiv from "./components/TextDiv";
import AboutHeading from "./components/AboutHeading";

interface LeftSectionProps {
    onSelect: (item: string) => void;
}

export default function LeftSection({ onSelect }: LeftSectionProps) {
    const [hoveredItem, setHoveredItem] = useState<string | null>("About");

    const handleMouseEnter = (item: string) => {
        setHoveredItem(item);
        onSelect(item);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
        onSelect("About");
    };

    return (
        <div className="h-full w-[25%] p-4">

            <AboutHeading
                text="About"
                tooltip="Yep! That's me"
                onMouseEnter={() => handleMouseEnter("About")}
                onMouseLeave={handleMouseLeave}
            />
            <About />

            <Heading
                text="Projects"
                tooltip="Click below"
                onMouseEnter={() => handleMouseEnter("Projects")}
                onMouseLeave={handleMouseLeave}
            />

            <TextDiv text="ByteWords" url="https://bytewords-pi.vercel.app" onMouseEnter={(e) => handleMouseEnter("ByteWords")} onMouseLeave={handleMouseLeave} />
            <TextDiv text="PayTM" url="https://github.com/piyush-rj/paytm-adv" onMouseEnter={() => handleMouseEnter("PayTM")} onMouseLeave={handleMouseLeave} />
            <TextDiv text="SolDrop" url="http://soldrop-ashen.vercel.app/" onMouseEnter={() => handleMouseEnter("SolDrop")} onMouseLeave={handleMouseLeave} />
            <TextDiv text="HD-Wallet" url="https://nexwallet-pink.vercel.app/" onMouseEnter={() => handleMouseEnter("HD-Wallet")} onMouseLeave={handleMouseLeave} />

            <div className="flex flex-col pt-3 space-y-3">
                <Heading text="Tech Stack" tooltip="Yeah! I know them all" onMouseEnter={() => handleMouseEnter("Tech Stack")} onMouseLeave={handleMouseLeave} />
                <Heading text="Work Experience" tooltip="Look at my contributions" onMouseEnter={() => handleMouseEnter("Work Experience")} onMouseLeave={handleMouseLeave} />
                <Heading text="Education" tooltip="Engineer just like you" onMouseEnter={() => handleMouseEnter("Education")} onMouseLeave={handleMouseLeave} />
            </div>
        </div>
    );
}
