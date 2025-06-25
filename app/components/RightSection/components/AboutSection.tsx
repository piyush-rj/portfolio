"use client";
import { useTheme } from "@/app/hooks/zustand";
import { FileText, Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
      className="text-black flex justify-center items-center h-full w-full overflow-visible relative"
    >
      <div className="h-[190px] w-[500px] flex flex-col justify-between p-4">
        <div>
          <div
            className={`text-[50px] font-semibold ${theme === "dark" ? "text-neutral-200" : "text-black"
              }`}
          >
            Piyush Raj
          </div>
          <div
            className={`text-[30px] -mt-3 ${theme === "dark" ? "text-neutral-300" : "text-black"
              }`}
          >
            FullStack WEB Developer
          </div>
        </div>

        <div className="flex gap-x-6">
          <Link
            href="https://www.linkedin.com/in/piyush-raj-07a318260/"
            className="relative group cursor-pointer"
          >
            <Linkedin
              width={35}
              height={35}
              className={`${theme == "dark"
                  ? "text-[#0e76a8] hover:text-[#0e77a8be]"
                  : "text-black hover:text-[#0e77a8be]"
                } transition-colors duration-200`}
            />
            <div className="absolute h-[300px] w-[560px] bottom-full mb-2 left-1 -translate-x-10 hidden group-hover:block z-50">
              <Image
                src="/linkedin.png"
                alt="LinkedIn preview"
                width={120}
                height={80}
                className="rounded-2xl shadow-md h-full w-full"
                unoptimized
              />
            </div>
          </Link>

          <Link
            href="https://x.com/PiyushC2P"
            className="relative group cursor-pointer"
          >
            <Twitter
              width={35}
              height={35}
              className={`${theme == "dark"
                  ? "text-[#1DA1F2] hover:text-[#1da0f2e3]"
                  : "text-black hover:text-[#1da0f2e3]"
                } transition-colors duration-200`}
            />
            <div className="absolute h-[300px] w-[560px] bottom-full mb-2 left-1/2 -translate-x-10 hidden group-hover:block z-50">
              <Image
                src="/twitter.png"
                alt="Twitter preview"
                width={120}
                height={80}
                className="rounded-2xl shadow-md h-full w-full"
                unoptimized
              />
            </div>
          </Link>

          <Link
            href="https://github.com/piyush-rj"
            className="relative group cursor-pointer"
          >
            <Github
              width={35}
              height={35}
              className={`${theme == "dark"
                  ? "text-neutral-400 hover:text-neutral-500"
                  : "text-black hover:text-neutral-700"
                } transition-colors duration-200`}
            />
            <div className="absolute h-[300px] w-[560px] bottom-full mb-2 left-1/2 -translate-x-10 hidden group-hover:block z-50">
              <Image
                src="/github.png"
                alt="GitHub preview"
                width={120}
                height={80}
                className="rounded-2xl shadow-md h-full w-full"
                unoptimized
              />
            </div>
          </Link>

          <a
            href="/piyush_resume.pdf"
            download
            className="relative group cursor-pointer"
          >
            <FileText
              width={35}
              height={35}
              className={`${theme == "dark"
                  ? "text-rose-500 hover:text-rose-700"
                  : "text-black hover:text-rose-500"
                } transition-colors duration-200`}
            />
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
