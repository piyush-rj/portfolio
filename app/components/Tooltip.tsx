"use client";
import { ReactNode, useState, useRef } from "react";

interface TooltipProps {
    text: string;
    children: ReactNode;
    offsetX?: number;
    offsetY?: number;
    className?: string;
}

export default function Tooltip({
    text,
    children,
    offsetX = 10,
    offsetY = 30,
    className = "",
}: TooltipProps) {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);

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

            {visible && (
                <div
                    ref={tooltipRef}
                    className={`fixed z-[9999] pointer-events-none whitespace-nowrap bg-neutral-200 text-black text-xs font-semibold px-2 py-1 rounded shadow-md transition-opacity duration-200 ${className}`}
                    style={{
                        left: coords.x,
                        top: coords.y,
                    }}
                >
                    {text}
                </div>
            )}
        </div>
    );
}
