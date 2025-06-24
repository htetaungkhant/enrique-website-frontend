import Link from "next/link";
import { BsYoutube } from "react-icons/bs";

import { cn } from "@/lib/utils";

const YouTubeBanner = ({
    href,
    noLink = false,
    className,
}) => {

    const content = (
        <>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-55"></div>

            <div className="relative flex justify-center items-center">
                <BsYoutube className="text-8xl md:text-9xl text-red-500 z-10" />
                <span className="absolute bg-white w-1/2 h-1/2" />
            </div>
        </>
    )

    if (noLink) {
        return (
            <div className={cn("min-w-72 max-w-250 h-80 md:h-120 lg:h-150 flex justify-center items-center border-1 border-white rounded-2xl bg-cover bg-center bg-no-repeat relative overflow-hidden", className)} style={{ backgroundImage: 'url(/image/Bufo.png)' }}>
                {content}
            </div>
        )
    }

    return (
        <Link href={href || "https://www.youtube.com/@Arise-Retreats"} target="_blank" className={cn("min-w-72 max-w-250 h-80 md:h-120 lg:h-150 flex justify-center items-center border-1 border-white rounded-2xl bg-cover bg-center bg-no-repeat relative overflow-hidden", className)} style={{ backgroundImage: 'url(/image/Bufo.png)' }}>
            {content}
        </Link>
    )
}

export default YouTubeBanner;