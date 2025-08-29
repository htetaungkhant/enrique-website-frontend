import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { RiTelegram2Fill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import Link from "next/link";

import { cn } from "@/lib/utils";

const Footer = ({ className }) => {
  return (
    <section
      className={cn(
        "bg-[url(/image/footer-bg.jpeg)] bg-no-repeat bg-cover bg-center border-t-[1px] border-white relative",
        className
      )}
    >
      <div className="px-4 py-12 md:p-8 lg:p-12 bg-[#143C58D6] flex flex-col justify-center items-center gap-4 inter-font">
        <Image
          src="/logo/logo-white.png"
          width={260}
          height={80}
          className="object-contain w-52 h-14 lg:w-64 lg:h-20"
          alt="logo"
        />
        <div className="text-[#143C58D6] flex gap-5 items-center">
          <Link href="https://www.facebook.com/AriseRetreat7/" target="_blank">
            <FaFacebookF className="bg-[#FDE3FE] rounded-sm w-6 h-6 lg:w-8 lg:h-8 p-1 pb-0" />
          </Link>
          <Link
            href="https://www.instagram.com/arise_retreats5meodmt/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBEwNVA2QmlkWVg1bWJ6a0llcwEeKkXPCwJ8vsDPvHpD2y4zOL04mswftdNgrEjqUR9x74f0Y-sUZEmMT6CvOwE_aem_bfgIpWkZL8ByTs-N8aQH7g"
            target="_blank"
          >
            <FaInstagram className="bg-[#FDE3FE] rounded-sm w-6 h-6 lg:w-8 lg:h-8 p-1" />
          </Link>
          {/* <Link href="#" target="_blank">
                <RiTelegram2Fill className="bg-[#FDE3FE] rounded-sm w-6 h-6 lg:w-8 lg:h-8 p-1" />
            </Link> */}
          <Link href="https://www.youtube.com/@Arise-Retreats" target="_blank">
            <FaYoutube className="bg-[#FDE3FE] rounded-sm w-6 h-6 lg:w-8 lg:h-8 p-1" />
          </Link>
          <Link href="https://tiktok.com/@ariseretreats" target="_blank">
            <FaTiktok className="bg-[#FDE3FE] rounded-sm w-6 h-6 lg:w-8 lg:h-8 p-1" />
          </Link>
          {/* <Link href="#" target="_blank">
                <FaLinkedinIn className="bg-[#FDE3FE] rounded-sm w-6 h-6 lg:w-8 lg:h-8 p-1" />
            </Link> */}
        </div>
        <p className="text-white text-center font-medium text-xs md:text-sm border-b-[1px] pb-2">
          Copyright © 2025 Arise. All rights reserved. Arise® and the Arise logo
          design are registered trademarks of Arise Inc. All other trademarks
          and logos are the property of their respective owners.
        </p>
        <span className="text-white text-xs md:text-sm flex p-2">
          <Link
            href="/privacy-policy"
            className="px-2 border-r-[1px] hover:underline"
          >
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="px-2 hover:underline">
            Website Terms of Use{" "}
          </Link>
        </span>
      </div>
    </section>
  );
};

export default Footer;
