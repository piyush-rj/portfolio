"use client";
import { useTheme } from "@/app/hooks/zustand";
import { FileText, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Tooltip from "../../Tooltip";

interface AboutSectionProps {
  onHover: () => void;
  onLeave: () => void;
  onClick?: () => void;
}

export default function AboutSection({ onHover, onLeave, onClick }: AboutSectionProps) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated) return;

    const tl = gsap.timeline({
      onComplete: () => setHasAnimated(true)
    });

    gsap.set([nameRef.current, titleRef.current], {
      opacity: 0,
      y: 50,
      scale: 0.8
    });

    gsap.set(iconsRef.current?.children || [], {
      opacity: 0,
      scale: 0,
      rotation: -180,
      transformOrigin: "center center"
    });

    tl.to(nameRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power3.out"
    })

      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8")

      .to(iconsRef.current?.children || [], {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: {
          amount: 0.6,
          from: "start"
        }
      }, "-=0.4");

    tl.call(() => {
      if (iconsRef.current?.children) {
        Array.from(iconsRef.current.children).forEach((icon, index) => {
          gsap.to(icon, {
            y: -5,
            duration: 2 + index * 0.2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.3
          });
        });
      }
    });

  }, [hasAnimated]);

  const handleIconHover = (e: React.MouseEvent<HTMLElement>) => {
    if (!hasAnimated) return;

    gsap.to(e.currentTarget, {
      scale: 1.15,
      rotation: 2,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleIconLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (!hasAnimated) return;

    gsap.to(e.currentTarget, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="text-black flex justify-center items-center h-full w-full overflow-visible relative font-sans"
    >
      <div className="h-auto w-full max-w-[500px] flex flex-col justify-between p-4 space-y-6 sm:space-y-0 sm:h-[190px] sm:w-[500px]">
        <div>
          <div
            ref={nameRef}
            className={`opacity-0 text-[32px] sm:text-[50px] font-semibold ${theme === "dark" ? "text-neutral-200" : "text-black"
              }`}
          >
            Piyush Raj
          </div>
          <div
            ref={titleRef}
            className={`opacity-0 text-[20px] sm:text-[30px] -mt-2 sm:-mt-3 ${theme === "dark" ? "text-neutral-300" : "text-black"
              }`}
          >
            FullStack WEB Developer
          </div>
        </div>

        <div
          ref={iconsRef}
          className="flex flex-row sm:flex-row gap-y-6 gap-x-6 sm:gap-y-0 sm:gap-x-6"
        >
          {[
            {
              href: "https://www.linkedin.com/in/piyush-raj-07a318260/",
              icon: (
                <Linkedin
                  width={35}
                  height={35}
                  className={`${theme == "dark"
                    ? "text-[#0e76a8] hover:text-[#0e77a8be]"
                    : "text-black hover:text-[#0e77a8be]"
                    } transition-colors duration-200`}
                />
              ),
              tooltip: "LinkedIn",
              preview: "/linkedin.png"
            },
            {
              href: "https://x.com/PiyushC2P",
              icon: (
                <Twitter
                  width={35}
                  height={35}
                  className={`${theme == "dark"
                    ? "text-[#1DA1F2] hover:text-[#1da0f2e3]"
                    : "text-black hover:text-[#1da0f2e3]"
                    } transition-colors duration-200`}
                />
              ),
              tooltip: "Twitter",
              preview: "/twitter.png"
            },
            {
              href: "https://github.com/piyush-rj",
              icon: (
                <Github
                  width={35}
                  height={35}
                  className={`${theme == "dark"
                    ? "text-neutral-400 hover:text-neutral-500"
                    : "text-black hover:text-neutral-700"
                    } transition-colors duration-200`}
                />
              ),
              tooltip: "GitHub",
              preview: "/github.png"
            }
          ].map(({ href, icon, tooltip, preview }, idx) => (
            <Link
              key={idx}
              href={href}
              className="relative group cursor-pointer icon-container opacity-0"
              onMouseEnter={handleIconHover}
              onMouseLeave={handleIconLeave}
            >
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
            className="relative group cursor-pointer icon-container opacity-0"
            onMouseEnter={handleIconHover}
            onMouseLeave={handleIconLeave}
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