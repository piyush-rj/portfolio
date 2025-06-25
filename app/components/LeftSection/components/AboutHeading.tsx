'use client';
import { useTheme } from '@/app/hooks/zustand';
import { Moon, Sun } from 'lucide-react';
import { useState, useRef } from 'react';

interface HeadingProps {
    text: string;
    tooltip: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave: () => void;
}

export default function AboutHeading({ text, tooltip, onClick, onMouseEnter, onMouseLeave }: HeadingProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState<boolean>(false);
    const divRef = useRef<HTMLDivElement>(null);
    const { theme, setTheme } = useTheme();

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = divRef.current?.getBoundingClientRect();
        if (rect) {
            setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
    };

    return (
        <div
            onClick={onClick}
            ref={divRef}
            onMouseEnter={(e) => {
                setHovered(true);
                onMouseEnter?.();
            }}
            onMouseLeave={(e) => {
                setHovered(false);
                onMouseLeave?.();
            }}
            onMouseMove={handleMouseMove}
            className={`group relative flex items-center justify-start border border-black/5 shadow-md mb-2 text-[20px] font-semibold rounded-[10px] mt-2 
    ${theme == "dark" ? " text-neutral-800" : "bg-transparent text-black"}`}
        >
            {hovered && (
                <div
                    className={`absolute z-50 pointer-events-none px-3 py-1 text-sm rounded-md backdrop-blur-md shadow-lg transition-opacity duration-300 whitespace-nowrap ${theme == "dark" ? "bg-neutral-200 text-black" : "bg-black text-white"}`}
                    style={{
                        top: position.y + 35,
                        left: position.x + 20,
                        transform: 'translate(-50%, -50%)',
                        opacity: hovered ? 1 : 0,
                    }}
                >
                    {tooltip}
                </div>
            )}

            <div className="flex items-center justify-between w-full">
                <span className="transition-all w-[80%] duration-300 ease-out transform group-hover:translate-x-1 group-hover:opacity-90 bg-neutral-100/90 rounded-[10px] py-2 px-3">
                    {text}
                </span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setTheme(theme === 'dark' ? 'light' : 'dark');
                    }}
                    className="p-1 rounded-[10px] bg-neutral-900 text-white px-3 py-3"
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-300 hover:rotate-90 flex" /> : <Moon className="w-5 h-5 text-neutral-400" />}
                </button>
            </div>
        </div>

    );
}
