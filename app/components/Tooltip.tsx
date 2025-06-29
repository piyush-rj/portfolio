"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Roboto } from "next/font/google";
import { useTheme } from "../hooks/zustand";

const roboto = Roboto({ subsets: ["latin"] });

interface ToolTipProps {
    text: string;
    children: ReactNode;
    offsetX?: number;
    offsetY?: number;
    className?: string;
}

export default function ToolTip({text, children, offsetX = 17, offsetY = 30, className = ""}: ToolTipProps) {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const {theme} = useTheme();


    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        setCoords({
            x: e.clientX + offsetX,
            y: e.clientY + offsetY,
        });
    };


    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onMouseMove={handleMouseMove}
        >
            {children}
            {mounted && visible &&
                createPortal(
                    <div
                        ref={tooltipRef}
                        className={`fixed z-[9999] pointer-events-none whitespace-nowrap font-bold text-sm px-3 py-1 rounded-md shadow-md transition-opacity duration-200 ${theme == "dark" ? "bg-white text-black" : "bg-black text-white"} ${roboto.className} ${className}`}
                        style={{ left: coords.x, top: coords.y }}
                    >
                        {text}
                    </div>,
                    document.body
                )
            }
        </div>
    );
}