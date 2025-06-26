"use client";
import { ReactNode } from "react";

interface TooltipProps {
    text: string;
    children: ReactNode;
    position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({ text, children, position = "top" }: TooltipProps) {
    const positionClasses = {
        top: "bottom-full mb-3 left-1/2 -translate-x-1/2",
        bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
        left: "right-full mr-2 top-1/2 -translate-y-1/2",
        right: "left-full ml-2 top-1/2 -translate-y-1/2",
    };

    const arrowPosition = {
        top: "bottom-0 left-1/2 -translate-x-1/2 border-t-neutral-200",
        bottom: "top-0 left-1/2 -translate-x-1/2 border-b-neutral-200",
        left: "right-0 top-1/2 -translate-y-1/2 border-l-neutral-200",
        right: "left-0 top-1/2 -translate-y-1/2 border-r-neutral-200",
    };

    const arrowBorder = {
        top: "border-l-6 border-r-6 border-t-6 border-transparent border-t-neutral-200",
        bottom: "border-l-6 border-r-6 border-b-6 border-transparent border-b-neutral-200",
        left: "border-t-6 border-b-6 border-l-6 border-transparent border-l-neutral-200",
        right: "border-t-6 border-b-6 border-r-6 border-transparent border-r-neutral-200",
    };

    return (
        <div className="relative group w-fit inline-block">
            {children}
            <div
                className={`absolute ${positionClasses[position]} z-50 whitespace-nowrap 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 
        bg-neutral-200 font-semibold text-black text-xs px-2 py-1 rounded shadow-md`}
            >
                {text}
                {/* Arrow */}
                <div
                    className={`absolute ${arrowPosition[position]} w-0 h-0 
          ${arrowBorder[position]} pointer-events-none`}
                />
            </div>
        </div>
    );
}
