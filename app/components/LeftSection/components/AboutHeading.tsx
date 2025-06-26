'use client';
import { useTheme } from '@/app/hooks/zustand';
import { Moon, Sun } from 'lucide-react';
import { useState, useRef } from 'react';

interface AboutHeadingProps {
    text: string;
    tooltip: string;
    onClick?: () => void;
    isActive?: boolean;
    onHover?: (item: string) => void;
}

export default function AboutHeading({
    text,
    tooltip,
    onClick,
    isActive,
    onHover,
}: AboutHeadingProps) {
    const [textHovered, setTextHovered] = useState(false);
    const [iconHovered, setIconHovered] = useState(false);
    const [textPos, setTextPos] = useState({ x: 0, y: 0 });
    const [iconPos, setIconPos] = useState({ x: 0, y: 0 });

    const textRef = useRef<HTMLSpanElement>(null);
    const iconRef = useRef<HTMLButtonElement>(null);

    const { theme, setTheme } = useTheme();

    const handleTextMouseMove = (e: React.MouseEvent) => {
        const rect = textRef.current?.getBoundingClientRect();
        if (rect) {
            setTextPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
    };

    const handleIconMouseMove = (e: React.MouseEvent) => {
        const rect = iconRef.current?.getBoundingClientRect();
        if (rect) {
            setIconPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
    };

    return (
        <div
            className={`relative flex items-center justify-between border border-black/5 shadow-md mb-2 text-[20px] font-semibold rounded-[10px] mt-2 py-1
      ${theme === 'dark' ? 'text-neutral-800' : 'text-black'}
      ${isActive ? 'border-primary border-l-4' : ''}`}
        >
            {/* Text with Tooltip */}
            <span
                ref={textRef}
                onClick={onClick}
                onMouseEnter={() => {
                    setTextHovered(true);
                    onHover?.(text);
                }}
                onMouseLeave={() => setTextHovered(false)}
                onMouseMove={handleTextMouseMove}
                className="relative transition-all w-[85%] duration-300 ease-out transform hover:translate-x-1 hover:opacity-90 bg-neutral-200 rounded-[10px] py-2 px-3 cursor-pointer"
            >
                {text}
                {textHovered && (
                    <div
                        className={`fixed z-[9999] pointer-events-none px-3 py-1 text-sm rounded-md shadow-lg transition-opacity duration-300 whitespace-nowrap
    ${theme === 'dark' ? 'bg-neutral-200 text-black' : 'bg-black text-white'}`}
                        style={{
                            top: textPos.y + 40,
                            left: textPos.x + 20,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        {tooltip}
                    </div>

                )}
            </span>

            {/* Theme Toggle with Custom Tooltip */}
            <button
                ref={iconRef}
                onClick={(e) => {
                    e.stopPropagation();
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                }}
                onMouseEnter={() => setIconHovered(true)}
                onMouseLeave={() => setIconHovered(false)}
                onMouseMove={handleIconMouseMove}
                className="bg-neutral-900 h-full p-3 rounded-xl hover:bg-neutral-800/80 group relative  cursor-pointer"
            >
                {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-amber-300 group-hover:rotate-90 transition-transform" />
                ) : (
                    <Moon className="w-5 h-5 text-neutral-400" />
                )}

                {iconHovered && (
                    <div
                        className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-[999] px-2 py-1 text-sm rounded-md shadow-md whitespace-nowrap
      ${theme === 'dark' ? 'bg-neutral-200 text-black' : 'bg-black text-white'}`}
                    >
                        {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                    </div>
                )}

            </button>
        </div>
    );
}
