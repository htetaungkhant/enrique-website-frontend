import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Button, { LinkButton } from "./Button";
import HeaderDropdown from "./HeaderDropdown";

const PageHeader = () => {
    const [hamburgerDisplay, setHamburgerDisplay] = useState(false);

    const handleHamburgerClick = () => {
        setHamburgerDisplay(!hamburgerDisplay);
    };

  return (
    <div className="relative xl:bg-[#301D26B2] xl:rounded-[40px] px-8 py-6 flex items-baseline xl:items-center justify-between gap-2 flex-wrap">
        <div className="z-10">
            <Link href="/">
                <Image
                    src="/logo/logo-white.png"
                    alt="Logo"
                    width={300}
                    height={100}
                    className="w-auto h-13"
                />
            </Link>
        </div>
        <button onClick={handleHamburgerClick} className="z-10 relative xl:hidden text-black bg-white rounded-lg w-8 h-8 cursor-pointer transition">
            <RxCross2 className={`absolute top-0 left-0 w-full h-full p-1 duration-300 ${hamburgerDisplay ? "opacity-100 rotate-90" : "opacity-0"}`} />
            <RxHamburgerMenu className={`absolute top-0 left-0 w-full h-full p-1 duration-300 ${hamburgerDisplay ? "opacity-0" : "opacity-100"}`} />
        </button>
        <nav className="hidden xl:block">
            <ul className="flex justify-center space-x-8">
                <li className="text-white merriweather-medium">
                    <HeaderDropdown title="HEALING">
                        <ul className="p-2 bg-white rounded-lg shadow-lg">
                            <li className="py-1 px-3 rounded-md text-black hover:bg-gray-100">
                                <Link href="#">Kambo</Link>
                            </li>
                            <li className="py-1 px-3 rounded-md whitespace-nowrap text-black hover:bg-gray-100">
                                <Link href="#">Bufo Alvarius</Link>
                            </li>
                            <li className="py-1 px-3 rounded-md text-black hover:bg-gray-100">
                                <Link href="#">Ayahuasca</Link>
                            </li>
                            <li className="py-1 px-3 rounded-md text-black hover:bg-gray-100">
                                <Link href="#">Breathwork</Link>
                            </li>
                            <li className="py-1 px-3 rounded-md text-black hover:bg-gray-100">
                                <Link href="#">Yoga</Link>
                            </li>
                            <li className="py-1 px-3 rounded-md text-black hover:bg-gray-100">
                                <Link href="#">Ayurveda</Link>
                            </li>
                        </ul>
                    </HeaderDropdown>
                </li>
                <li className="text-white poppins-medium">
                    <Link href="#">
                        FACILITATORS
                    </Link>
                </li>
                <li className="text-white poppins-medium">
                    <Link href="#">
                        COURSE OFFERINGS
                    </Link>
                </li>
                <li className="text-white poppins-medium">
                    <Link href="#">
                        CEREMONIES
                    </Link>
                </li>
                <li className="text-white poppins-medium">
                    <Link href="#">
                        BLOGS
                    </Link>
                </li>
            </ul>
        </nav>

        <div className="hidden xl:flex space-x-4">
            <LinkButton name="Book Now" href="#" />
            <Button name="Login" outline={true} onClick={() => alert("Button Clicked!")} />
        </div>

        {/* mobile navigation */}
        <div className={`xl:hidden flex flex-col items-center justify-center absolute top-0 left-0 rounded-b-4xl space-y-7 w-full pt-24 py-6 bg-linear-to-b from-[#091230] to-[#1C3896] ${hamburgerDisplay ? "translate-y-0" : "-translate-y-full"} transition-transform duration-300 ease-in-out`}>
            <div className="text-white merriweather-medium">
                <HeaderDropdown title="HEALING">
                    <ul className="rounded-lg shadow-lg">
                        <li className="py-1 px-3 rounded-md text-center">
                            <Link href="#">Kambo</Link>
                        </li>
                        <li className="py-1 px-3 rounded-md text-center whitespace-nowrap">
                            <Link href="#">Bufo Alvarius</Link>
                        </li>
                        <li className="py-1 px-3 rounded-md text-center">
                            <Link href="#">Ayahuasca</Link>
                        </li>
                        <li className="py-1 px-3 rounded-md text-center">
                            <Link href="#">Breathwork</Link>
                        </li>
                        <li className="py-1 px-3 rounded-md text-center">
                            <Link href="#">Yoga</Link>
                        </li>
                        <li className="py-1 px-3 rounded-md text-center">
                            <Link href="#">Ayurveda</Link>
                        </li>
                    </ul>
                </HeaderDropdown>
            </div>
            <Link href="#" className="text-white poppins-medium">
                Facilitators
            </Link>
            <Link href="#" className="text-white poppins-medium">
                Course Offerings
            </Link>
            <Link href="#" className="text-white poppins-medium">
                Ceremonies
            </Link>
            <Link href="#" className="text-white poppins-medium">
                Blogs
            </Link>
            <div className="flex gap-4 flex-col md:flex-row items-center justify-center">
                <LinkButton name="Book Now" href="#" />
                <Button name="Login" outline={true} onClick={() => alert("Button Clicked!")} />
            </div>
        </div>
    </div>
  );
};

export default PageHeader;