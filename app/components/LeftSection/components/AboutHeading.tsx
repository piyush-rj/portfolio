'use client';
import { useTheme } from '@/app/hooks/zustand';
import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef } from 'react';
import Tooltip from '../../Tooltip';

interface HeadingProps {
    text: string;
    tooltip: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave: () => void;
}

export default function AboutHeading({
    text,
    tooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,
}: HeadingProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState<boolean>(false);
    const textRef = useRef<HTMLSpanElement>(null);
    const { theme, setTheme } = useTheme();

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = textRef.current?.getBoundingClientRect();
        if (rect) {
            setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
    };

    return (
        <div
            className={`relative flex items-center justify-between border border-black/5 shadow-md mb-2 text-[20px] font-semibold rounded-[10px] mt-2 py-2
            ${theme === 'dark' ? 'text-neutral-800' : 'bg-transparent text-black'}`}
        >
            {/* Left Text with Hover Tooltip */}
            <span
                ref={textRef}
                onClick={onClick}
                onMouseEnter={() => {
                    setHovered(true);
                    onMouseEnter?.();
                }}
                onMouseLeave={() => {
                    setHovered(false);
                    onMouseLeave?.();
                }}
                onMouseMove={handleMouseMove}
                className="relative transition-all w-[85%] duration-300 ease-out transform hover:translate-x-1 hover:opacity-90 bg-neutral-200 rounded-[10px] py-2 px-3 cursor-pointer"
            >
                {text}
                {hovered && (
                    <div
                        className={`absolute z-50 pointer-events-none px-3 py-1 text-sm rounded-md backdrop-blur-md shadow-lg transition-opacity duration-300 whitespace-nowrap
                        ${theme === 'dark' ? 'bg-neutral-200 text-black' : 'bg-black text-white'}`}
                        style={{
                            top: position.y + 40,
                            left: position.x + 20,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        {tooltip}
                    </div>
                )}
            </span>

            {/* Theme Toggle */}
            <Tooltip text={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setTheme(theme === 'dark' ? 'light' : 'dark');
                    }}
                    className="bg-neutral-900 h-full p-3 rounded-xl hover:bg-neutral-800/80 group"
                >
                    {theme === 'dark' ? (
                        <Sun className="w-5 h-5 text-amber-300 group-hover:rotate-90 transition-transform" />
                    ) : (
                        <Moon className="w-5 h-5 text-neutral-400" />
                    )}
                </button>
            </Tooltip>
        </div>
    );
}
