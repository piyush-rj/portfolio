import { useTheme } from "@/app/hooks/zustand"

export default function About() {

    const {theme} = useTheme();

    return <div className={`h-auto p-2 font-sans text-[17px]  group ${theme == "dark" ? "text-[#e4e4e4ec]" : "text-black"}`}>
        I'm a <span className="font-semibold group-hover:text-red-300/90 transition-all transform duration-200">FULLSTACK WEB DEVELOPER</span>  exploring the world of Web3. I've got a solid grip on building modern web apps from frontend to backend, and now I'm diving into blockchain tech - learning how smart contracts, decentralized apps, and crypto wallets work.
    </div>
}