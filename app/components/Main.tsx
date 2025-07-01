"use client";
import { useState } from "react";
import LeftSection from "./LeftSection/LeftSection";
import RightSection from "./RightSection/RightSection";

export default function MainSection() {
    const [selected, setSelected] = useState<string>("About");
    
    return (
        <div className="min-h-[85vh] w-full max-w-8xl sm:min-h-[80vh] sm:p-4 md:p-8 lg:p-12 xl:p-16 sm:w-full relative flex justify-center">
            <LeftSection onHoverSelect={(item) => setSelected(item)} selected={selected} />
            <RightSection selected={selected} />
        </div>
    );
}