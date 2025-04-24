import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { RiTelegram2Fill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
    return (
        <section className="bg-[url(/image/footer-bg.jpeg)] bg-no-repeat bg-cover bg-center relative">
            <div className="px-4 py-12 md:p-8 lg:p-16 bg-[#143C58D6] flex flex-col justify-center items-center gap-4 inter-font">
                <Image 
                    src="/logo/logo-white.png" 
                    width={260} 
                    height={80} 
                    className="object-contain w-64 h-20"
                    alt="logo" 
                />
                <div className="text-[#143C58D6] flex gap-5 items-center">
                    <Link href="#" target="_blank">
                        <FaFacebookF className="bg-[#FDE3FE] rounded-sm w-8 h-8 p-1 pb-0" />
                    </Link>
                    <Link href="#" target="_blank">
                        <FaInstagram className="bg-[#FDE3FE] rounded-sm w-8 h-8 p-1" />
                    </Link>
                    <Link href="#" target="_blank">
                        <RiTelegram2Fill className="bg-[#FDE3FE] rounded-sm text-[#143C58D6] w-8 h-8 p-1" />
                    </Link>
                    <Link href="#" target="_blank">
                        <FaYoutube className="bg-[#FDE3FE] rounded-sm w-8 h-8 p-1" />
                    </Link>
                    <Link href="#" target="_blank">
                        <FaLinkedinIn className="bg-[#FDE3FE] rounded-sm w-8 h-8 p-1" />
                    </Link>
                </div>
                <p className="text-white text-center font-medium text-xs md:text-sm border-b-[1px] pb-2">Copyright © 2024 Arise. All rights reserved. Arise® and the Arise logo design are registered trademarks of Arise Inc. All other trademarks and logos are the property of their respective owners.</p>
                <span className="text-white text-xs md:text-sm flex p-2">
                    <Link href="#" className="px-2 border-r-[1px]">Privacy Policy</Link>
                    <Link href="#" className="px-2">Website Terms of Use </Link>
                </span>
            </div>
        </section>
    )
}

export default Footer;