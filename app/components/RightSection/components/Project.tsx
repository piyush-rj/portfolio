import { useTheme } from "@/app/hooks/zustand";

interface ProjectProps {
    title: string;
    brief: string;
    description: string;
    url: string;
}

export default function Project({ title, brief, description, url }: ProjectProps) {

    const {theme} = useTheme();

    return <div className="text-black flex items-center h-full w-full overflow-visible p-16 gap-x-5 font-sans">

        <div className="h-[100%] w-[30%] flex flex-col justify-between items-center py-8">

            <div className="flex flex-col py-20">
                <span className={`font-semibold text-[23px] mb-3 ${theme == "dark" ? "text-neutral-100" : "text-black"}`}> {title} </span>

                {/* <span className={`-mt-1 mb-3 text-[19px] font-sans ${theme == "dark" ? "text-neutral-300" : "text-neutral-600"}`}>{brief}</span> */}

                <span className={`font-sans font-light text-[19px] tracking-wide ${theme == "dark" ? "text-neutral-200" : "text-neutral-800"}`}>
                    {description}
                </span>
            </div>

        </div>

        <div className="h-[80%] w-[70%] p-5 ">
            <div className="h-full w-full bg-neutral-900 border border-neutral-800 rounded-[10px] overflow-hidden">
                <div className="h-[10%] w-full bg-neutral-900 ">

                    <div className="h-full w-full flex justify-start items-center gap-x-1.5 px-4">
                        <span className="h-3 w-3 bg-red-500 rounded-full"></span>

                        <span className="h-3 w-3 bg-purple-500 rounded-full"></span>

                        <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
                    </div>

                </div>

                <div className="h-[82%] w-full">
                    {url ? (
                        <video
                        src={url}
                        className="h-full w-full object-fit"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                    ) : null}
                </div>


                <div className="h-[8%] w-full bg-neutral-900 backdrop-blur-3xl flex justify-center items-center text-neutral-400 ">
                    {brief}
                </div>

            </div>

        </div>
    </div>
}