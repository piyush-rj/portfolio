import Link from "next/link";

interface TextDivProps {
    text: string
    onClick?: () => void;
    onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseLeave: () => void;
    url?: string;
}

export default function TextDiv({ text, onClick, onMouseEnter, onMouseLeave, url }: TextDivProps) {

    const content = (
        <div
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="rounded-[20px] hover:scale-105 mr-20 px-4 py-2 hover:bg-[#c7f5ff62] hover:shadow-xs transition-all transform-3d duration-200">
            {text}
        </div>
    )

    return url ? <Link href={url}>{content}</Link> : content;
}