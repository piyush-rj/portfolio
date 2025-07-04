'use client';
import { useTheme } from '@/app/hooks/zustand';
import { useState, useRef } from 'react';

interface HeadingProps {
    text: string;
    tooltip: string;
    onClick?: () => void;
    isActive?: boolean;
    onHover?: (item: string) => void;
}

export default function Heading({ text, tooltip, onClick, isActive, onHover }: HeadingProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState<boolean>(false);
    const divRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = divRef.current?.getBoundingClientRect();
        if (rect) {
            setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
    };

    return (
        <div
            ref={divRef}
            onClick={onClick}
            onMouseEnter={(e) => {
                setHovered(true);
                onHover?.(text);
            }}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={handleMouseMove}
            className={`group relative flex justify-between font-sans items-center border border-black/5 shadow-md mb-2 px-4 py-2 text-[20px] font-semibold rounded-[10px] mt-2 transition-all duration-300
            ${theme === "dark" ? "bg-neutral-200 text-neutral-800" : "bg-transparent text-black"}
            ${isActive ? "border-primary border-l-4" : ""}`}
        >
            {hovered && (
                <div
                    className={`absolute z-[99999] pointer-events-none px-3 py-1 text-sm rounded-md shadow-lg transition-opacity duration-300 whitespace-nowrap 
                    ${theme === "dark" ? "bg-neutral-200 text-black" : "bg-black text-white"}`}
                    style={{
                        top: position.y - 35,
                        left: position.x + 20,
                        transform: 'translate(-50%, -50%)',
                        opacity: hovered ? 1 : 0,
                    }}
                >
                    {tooltip}
                </div>
            )}

            <span className="transition-all duration-300 ease-out transform group-hover:translate-x-1 group-hover:opacity-90">
                {text}
            </span>
        </div>
    );
}
