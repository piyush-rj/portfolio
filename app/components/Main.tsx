"use client";
import { useState } from "react";
import LeftSection from "./LeftSection/LeftSection";
import RightSection from "./RightSection/RightSection";

export default function MainSection() {
    const [selected, setSelected] = useState<string>("About");

    return (
        <div className="h-full w-full sm:h-[82%] sm:w-[80%] relative flex justify-center">
            <LeftSection onHoverSelect={(item) => setSelected(item)} selected={selected} />
            <RightSection selected={selected} />
        </div>
    );
}
