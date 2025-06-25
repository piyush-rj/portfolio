"use client"
import { useState } from "react";
import LeftSection from "./LeftSection/LeftSection";
import RightSection from "./RightSection/RightSection";

export default function MainSection() {
    const [selected, setSelected] = useState<string | null>("About");
    const [hovered, setHovered] = useState<string | null>(null);

    const active = hovered ?? selected;

    return (
        <div className="h-[80%] w-[80%] relative flex">
            <LeftSection
                onSelect={(item) => {
                    if (item === "About" || item === "Projects" || item == "Tech Stack") {
                        setSelected(item);
                        setHovered(null);
                    }
                }}
                onHover={(item) => setHovered(item)}
                onLeave={() => setHovered(null)}
            />
            <RightSection selected={active} />
        </div>
    );
}
