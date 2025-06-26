"use client";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
    return (
        <div
            className="relative flex items-center gap-4 px-1 py-3 rounded-xl transition-all shadow-md hover:shadow-xl cursor-pointer group"
            onClick={() => (window.location.href = "mailto:piyushraj26102004@gmail.com")}
        >
            {/* Icon */}
            <div className="relative w-[40px] h-[40px] flex items-center justify-center overflow-visible">
                <Image
                    src="/icons/Mail.svg"
                    alt="Mail Icon"
                    width={32}
                    height={32}
                    className="object-contain z-10"
                />

                {/* Slide-in label on hover */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out whitespace-nowrap">
                    <span className="text-sm bg-black/80 text-white px-3 py-1 rounded-full">
                        HIRE ME
                    </span>
                </div>

                {/* Tooltip on top */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-xs font-medium px-2 py-1 rounded shadow-md whitespace-nowrap">
                    Mail Me
                </div>
            </div>

            {/* Optional arrow icon */}
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-80 transition-opacity text-white" />
        </div>
    );
}
