"use client";
import { useRef } from "react";
import gsap from "gsap";
import Tooltip from "../../Tooltip";
import { useTheme } from "@/app/hooks/zustand";

interface Logos {
  name: string;
  url: string | React.ReactNode;
}

const logos: Logos[] = [
  { name: "typescript", url: "https://img.icons8.com/?size=100&id=nCj4PvnCO0tZ&format=png" },
  { name: "javascript", url: "https://img.icons8.com/?size=100&id=RwtOBojoLS2N&format=png" },
  { name: "java", url: "https://img.icons8.com/?size=100&id=FBycNmdwUQz1&format=png" },
  { name: "figma", url: "https://img.icons8.com/?size=100&id=snB4bDeuO6gJ&format=png" },
  { name: "nodeJS", url: "https://img.icons8.com/?size=100&id=54087&format=png" },
  { name: "expressJS", url: "https://img.icons8.com/?size=100&id=SDVmtZ6VBGXt&format=png" },
  { name: "reactJS", url: "https://img.icons8.com/?size=100&id=NfbyHexzVEDk&format=png" },
  { name: "nextJS", url: "https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png" },
  { name: "prisma ORM", url: "https://img.icons8.com/?size=100&id=aqb9SdV9P8oC&format=png" },
  { name: "mongoDB", url: "https://img.icons8.com/?size=100&id=bosfpvRzNOG8&format=png" },
  { name: "postgreSQL", url: "https://img.icons8.com/?size=100&id=38561&format=png" },
  { name: "docker", url: "https://img.icons8.com/?size=100&id=cdYUlRaag9G9&format=png" },
  { name: "git", url: "https://img.icons8.com/?size=100&id=20906&format=png" },
  { name: "github", url: "https://img.icons8.com/?size=100&id=62856&format=png" },
  { name: "postman", url: "https://img.icons8.com/?size=100&id=EPbEfEa7o8CB&format=png" },
  { name: "Turborepo", url: "/icons/Turborepo.svg" },
  { name: "TailwindCSS", url: "/icons/Tailwindcss.svg" },
  { name: "WebSocker", url: "/icons/Websocket.svg" },
  { name: "HTML", url: "/icons/Html.png" },
  { name: "CSS", url: "/icons/css.png" }
];

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  const handleAnimation = (el: HTMLDivElement | null) => {
    if (!el) return;
    const logos = el.querySelectorAll(".logo");

    gsap.fromTo(
      logos,
      {
        opacity: 0,
        y: 20,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.07,
        duration: 0.4,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start px-4 sm:px-6 py-12 sm:py-16 font-sans">
      <h2 className={`text-xl sm:text-3xl font-bold mb-6 sm:mb-10 uppercase tracking-wider text-center ${theme == "dark" ? "text-neutral-200" : "text-black"}`}>
        Tech Stack
      </h2>

      <div
        className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6 md:gap-8 place-items-center max-w-[1100px]"
        ref={(el) => {
          containerRef.current = el;
          handleAnimation(el);
        }}
      >

        {logos.map((tech, i) => (
          <Tooltip key={tech.name + i} text={tech.name}>
            <div className={`logo opacity-0 w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] rounded-xl p-2 flex items-center justify-center
               shadow-inner hover:shadow-xl transition-all hover:scale-110 ${theme == "dark" ? "bg-neutral-900 border border-neutral-900" : "bg-neutral-200 border border-neutral-500"}`}>
              {typeof tech.url === "string" ? (
                <img
                  src={tech.url}
                  alt={tech.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-sm">
                  {tech.url}
                </div>
              )}
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}