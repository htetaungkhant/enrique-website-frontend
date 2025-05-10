import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

import { IconButton } from "./Button";
import HeaderDropdown from "./HeaderDropdown";
import { cn } from "@/lib/utils";

const PageHeader = () => {
    const [hamburgerDisplay, setHamburgerDisplay] = useState(false);

    const handleHamburgerClick = () => {
        setHamburgerDisplay(!hamburgerDisplay);
    };

    return (
        <div className="relative xl:bg-[#301D26B2] xl:rounded-[40px] px-6 py-4 flex items-baseline xl:items-center justify-between gap-2 flex-wrap">
            <div className="z-30">
                <Link href="/">
                    <Image
                        src="/logo/logo-white.png"
                        alt="Logo"
                        width={300}
                        height={100}
                        className="w-30 h-auto"
                    />
                </Link>
            </div>
            <button onClick={handleHamburgerClick} className="z-30 relative xl:hidden text-black bg-white rounded-lg w-8 h-8 cursor-pointer transition">
                <RxCross2 className={`absolute top-0 left-0 w-full h-full p-1 duration-300 ${hamburgerDisplay ? "opacity-100 rotate-90" : "opacity-0"}`} />
                <RxHamburgerMenu className={`absolute top-0 left-0 w-full h-full p-1 duration-300 ${hamburgerDisplay ? "opacity-0" : "opacity-100"}`} />
            </button>
            <nav className="hidden xl:block">
                <ul className="flex justify-center space-x-8 text-sm">
                    <li className="text-white merriweather-medium">
                        <HeaderDropdown title="HEALING">
                            <ul className="p-2 bg-white rounded-lg shadow-lg">
                                <li className="flex rounded-md text-black hover:bg-gray-100">
                                    <Link href="/kambo" className="w-full py-1 px-3">Kambo</Link>
                                </li>
                                <li className="flex rounded-md whitespace-nowrap text-black hover:bg-gray-100">
                                    <Link href="/bufo-alvarius" className="w-full py-1 px-3">Bufo Alvarius</Link>
                                </li>
                                <li className="flex rounded-md text-black hover:bg-gray-100">
                                    <Link href="/ayahuasca" className="w-full py-1 px-3">Ayahuasca</Link>
                                </li>
                                <li className="flex rounded-md text-black hover:bg-gray-100">
                                    <Link href="/breathwork" className="w-full py-1 px-3">Breathwork</Link>
                                </li>
                                <li className="flex rounded-md text-black hover:bg-gray-100">
                                    <Link href="/yoga" className="w-full py-1 px-3">Yoga</Link>
                                </li>
                                <li className="flex rounded-md text-black hover:bg-gray-100">
                                    <Link href="/ayurveda" className="w-full py-1 px-3">Ayurveda</Link>
                                </li>
                            </ul>
                        </HeaderDropdown>
                    </li>
                    <li className="text-white poppins-medium">
                        <Link href="/facilitators">
                            FACILITATORS
                        </Link>
                    </li>
                    <li className="text-white poppins-medium">
                        <Link href="/course-offerings">
                            COURSE OFFERINGS
                        </Link>
                    </li>
                    <li className="text-white poppins-medium">
                        <Link href="/ceremonies">
                            CEREMONIES
                        </Link>
                    </li>
                    <li className="text-white poppins-medium">
                        <Link href="/blogs">
                            BLOGS
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="hidden xl:flex space-x-4">
                <IconButton title="Book Now" href="#" />
                <IconButton title="Login" outline={true} onClick={() => alert("Button Clicked!")} />
            </div>

            {/* mobile navigation */}
            <div className={`z-20 xl:hidden flex flex-col items-center justify-center absolute top-0 left-0 rounded-b-4xl space-y-7 w-full pt-24 py-6 bg-linear-to-b from-[#091230] to-[#1C3896] ${hamburgerDisplay ? "translate-y-0" : "-translate-y-full"} transition-transform duration-300 ease-in-out`}>
                <div className="text-white merriweather-medium">
                    <HeaderDropdown title="HEALING">
                        <ul className="rounded-lg shadow-lg">
                            <li className="flex rounded-md text-center">
                                <Link href="/kambo" className="w-full py-1 px-3">Kambo</Link>
                            </li>
                            <li className="flex rounded-md text-center whitespace-nowrap">
                                <Link href="/bufo-alvarius" className="w-full py-1 px-3">Bufo Alvarius</Link>
                            </li>
                            <li className="flex rounded-md text-center">
                                <Link href="/ayahuasca" className="w-full py-1 px-3">Ayahuasca</Link>
                            </li>
                            <li className="flex rounded-md text-center">
                                <Link href="/breathwork" className="w-full py-1 px-3">Breathwork</Link>
                            </li>
                            <li className="flex rounded-md text-center">
                                <Link href="/yoga" className="w-full py-1 px-3">Yoga</Link>
                            </li>
                            <li className="flex rounded-md text-center">
                                <Link href="/ayurveda" className="w-full py-1 px-3">Ayurveda</Link>
                            </li>
                        </ul>
                    </HeaderDropdown>
                </div>
                <Link href="/facilitators" className="text-white poppins-medium">
                    Facilitators
                </Link>
                <Link href="/course-offerings" className="text-white poppins-medium">
                    Course Offerings
                </Link>
                <Link href="/ceremonies" className="text-white poppins-medium">
                    Ceremonies
                </Link>
                <Link href="/blogs" className="text-white poppins-medium">
                    Blogs
                </Link>
                <div className="flex gap-4 flex-col md:flex-row items-center justify-center">
                    <IconButton title="Book Now" href="#" />
                    <IconButton title="Login" outline={true} onClick={() => alert("Button Clicked!")} />
                </div>
            </div>
        </div>
    );
};

export const PageHeaderWithBanner = ({
    title,
    className,
    containerClassName,
    bannerImg = "/image/banner.png",
    overlay = false,
    overlayClassName,
    gradientOverlay = true,
    children
}) => {
    return (
        <section className={cn("flex flex-col min-h-56 pb-2 xl:p-12 xl:pb-4 xl:min-h-80 bg-cover bg-center bg-no-repeat text-white relative", className)} style={{ backgroundImage: `url(${bannerImg})` }}>

            {/* Overlay */}
            {overlay && <div className={cn("absolute inset-0 bg-black opacity-55", overlayClassName)}></div>}

            {/* Gradient overlay */}
            {gradientOverlay && <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>}

            <PageHeader />
            <div className={cn("merriweather-font flex-1 flex flex-col justify-center items-center gap-2 md:gap-4 relative", containerClassName)}>
                {title && <h2 className="font-bold text-3xl xl:text-5xl">{title}</h2>}
                {children}
            </div>
        </section>
    )
}

export const PageHeaderWithFullBanner = ({
    title,
    titleClassName,
    description,
    descriptionClassName,
    bannerImg,
    children,
    className,
    containerClassName,
    wrapperClassName
}) => {
    return (
        <PageHeaderWithBanner
            overlay
            gradientOverlay={false}
            className={cn("h-screen", className)}
            bannerImg={bannerImg}
            overlayClassName="opacity-20"
        >
            <div className={cn("h-full flex flex-col justify-center items-center", containerClassName)}>
                <div className={cn("p-3 w-full md:w-4/5 flex flex-col items-center justify-center gap-5", wrapperClassName)}>
                    {title && <h2 className={cn("text-5xl text-center font-bold", titleClassName)}>{title}</h2>}
                    {description && <p className={cn("poppins-font text-center text-xl", descriptionClassName)}>{description}</p>}
                    {children}
                </div>
            </div>
        </PageHeaderWithBanner>
    )
}

export default PageHeader;