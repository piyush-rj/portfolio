"use client"
import { useState } from "react";
import LeftSection from "./LeftSection/LeftSection";
import RightSection from "./RightSection/RightSection";

export default function MainSection() {

    const [selected, setSelected] = useState<string | null>("About");

    return <div className="h-[80%] w-[80%] relative flex">

        {/* left section */}
        <LeftSection onSelect={setSelected}/>

        {/* right section */}
        <RightSection selected={selected}/>
    </div>
}