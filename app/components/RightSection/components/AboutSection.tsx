"use client";
import { useTheme } from "@/app/hooks/zustand";
import { FileText, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Tooltip from "../../Tooltip";

interface AboutSectionProps {
  onHover: () => void;
  onLeave: () => void;
  onClick?: () => void;
}

export default function AboutSection({ onHover, onLeave, onClick }: AboutSectionProps) {
  const { theme } = useTheme();

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="text-black flex justify-center items-center h-full w-full overflow-visible relative font-sans"
    >
      <div className="h-auto w-full max-w-[500px] flex flex-col justify-between p-4 space-y-6 sm:space-y-0 sm:h-[190px] sm:w-[500px]">
        <div>
          <div
            className={`text-[32px] sm:text-[50px] font-semibold ${theme === "dark" ? "text-neutral-200" : "text-black"
              }`}
          >
            Piyush Raj
          </div>
          <div
            className={`text-[20px] sm:text-[30px] -mt-2 sm:-mt-3 ${theme === "dark" ? "text-neutral-300" : "text-black"
              }`}
          >
            FullStack WEB Developer
          </div>
        </div>

        <div className="flex flex-row sm:flex-row gap-y-6 gap-x-3 sm:gap-y-0 sm:gap-x-6">
          {[
            {
              href: "https://www.linkedin.com/in/piyush-raj-07a318260/",
              icon: <Linkedin width={35} height={35} className={`${theme == "dark" ? "text-[#0e76a8] hover:text-[#0e77a8be]" : "text-black hover:text-[#0e77a8be]"} transition-colors duration-200`} />,
              tooltip: "LinkedIn",
              preview: "/linkedin.png"
            },
            {
              href: "https://x.com/PiyushC2P",
              icon: <Twitter width={35} height={35} className={`${theme == "dark" ? "text-[#1DA1F2] hover:text-[#1da0f2e3]" : "text-black hover:text-[#1da0f2e3]"} transition-colors duration-200`} />,
              tooltip: "Twitter",
              preview: "/twitter.png"
            },
            {
              href: "https://github.com/piyush-rj",
              icon: <Github width={35} height={35} className={`${theme == "dark" ? "text-neutral-400 hover:text-neutral-500" : "text-black hover:text-neutral-700"} transition-colors duration-200`} />,
              tooltip: "GitHub",
              preview: "/github.png"
            },
          ].map(({ href, icon, tooltip, preview }, idx) => (
            <Link key={idx} href={href} className="relative group cursor-pointer">
              <Tooltip text={tooltip}>
                {icon}
              </Tooltip>
              <div className="absolute h-[300px] w-[560px] bottom-full mb-2 left-1/2 -translate-x-10 hidden group-hover:block z-50">
                <Image
                  src={preview}
                  alt={`${tooltip} preview`}
                  width={120}
                  height={80}
                  className="rounded-2xl shadow-md h-full w-full"
                  unoptimized
                />
              </div>
            </Link>
          ))}

          <a
            href="/piyush_resume.pdf"
            download
            className="relative group cursor-pointer"
          >
            <Tooltip text="Resume">
              <FileText
                width={35}
                height={35}
                className={`${theme == "dark"
                  ? "text-rose-500 hover:text-rose-700"
                  : "text-black hover:text-rose-500"
                  } transition-colors duration-200`}
              />
            </Tooltip>
            <div className="absolute h-[350px] w-[260px] bottom-full mb-2 left-1/2 -translate-x-10 hidden group-hover:block z-50">
              <Image
                src="/resume.png"
                alt="Resume preview"
                width={60}
                height={180}
                className="rounded-2xl shadow-md h-full w-full"
                unoptimized
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
