"use client";
import Image from "next/image";
import About from "./components/About";
import AboutHeading from "./components/AboutHeading";
import Heading from "./components/Heading";
import TextDiv from "./components/TextDiv";
import BookAMeet from "./components/BookAMeet";
import Contact from "./components/Contact";

interface LeftSectionProps {
    onSelect: (item: string) => void;
    onHover: (item: string) => void;
    onLeave: () => void;
}

export default function LeftSection({ onSelect, onHover, onLeave, }: LeftSectionProps) {
    return (
        <div className="h-full w-[22%] px-5 py- flex flex-col space-y-6 border-r border-neutral-800 shadow-xl backdrop-blur-lg">
            {/* Profile Image */}
            <div className="flex justify-center">
                <div className="w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-neutral-700 shadow-lg hover:shadow-xl transition duration-300">
                    <Image
                        src="/pfp.jpg"
                        alt="Profile"
                        width={80}
                        height={80}
                        className="object-cover"
                    />
                </div>
            </div>

            {/* About Section */}
            <AboutHeading
                text="About"
                tooltip="Click to stay!"
                onClick={() => onSelect("About")}
                onMouseEnter={() => onHover("About")}
                onMouseLeave={onLeave}
            />
            <About />

            {/* Projects */}
            <Heading
                text="Projects"
                tooltip="Click to Stay!"
                onClick={() => onSelect("Projects")}
                onMouseEnter={() => onHover("Projects")}
                onMouseLeave={onLeave}
            />

            {/* Others */}
            <div className="flex flex-col space-y-3">
                <Heading
                    text="Tech Stack"
                    tooltip="Yeah! I know them all"
                    onClick={() => onSelect("Tech Stack")}
                    onMouseEnter={() => onHover("Tech Stack")}
                    onMouseLeave={onLeave}
                />
                <Heading
                    text="Work Experience"
                    tooltip="Look at my contributions"
                    onMouseEnter={() => onHover("Work Experience")}
                    onMouseLeave={onLeave}
                />
                {/* <Heading
                    text="Education"
                    tooltip="Engineer just like you"
                    onMouseEnter={() => onHover("Education")}
                    onMouseLeave={onLeave}
                /> */}

            </div>
            <div className="h-full w-full">
                <BookAMeet />
            </div>

            <div className="h-full w-full -mt-4">
                <Contact/>
            </div>
        </div>
    );
}
