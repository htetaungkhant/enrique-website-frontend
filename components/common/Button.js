import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import { cn } from "@/lib/utils";

export const ReadMoreBtn = ({ title, className, onClick }) => {
	return (
		<button onClick={onClick} className={cn("py-2 px-2 md:px-4 bg-white rounded-4xl flex justify-between items-center cursor-pointer", className)}>
			<span className="text-sm font-medium">{title || 'READ MORE'}</span>
			<FaArrowRight size={20} />
		</button>
	)
}

export const LinkButton = ({ name, href, outline = false }) => {
	return (
		<Link
			href={href}
			className={`group w-fit p-1 flex items-center gap-3 lg:gap-2 inter-medium rounded-[60px] shadow-md cursor-pointer transition 
				${outline ? "bg-transparent text-white border-[1px]" : "bg-white text-black"}
			`}
		>
			<span className="px-2 lg:py-1 text-sm md:text-base ">{name}</span>
			{
				outline ? (
					<Image src="/icon/export-white.svg" className="w-auto h-7 lg:h-9 transition duration-300 group-hover:rotate-45" width={46} height={46} alt="icon" />
				) : (
					<Image src="/icon/export-black.svg" className="w-auto h-7 lg:h-9 transition duration-300 group-hover:rotate-45" width={46} height={46} alt="icon" />
				)
			}
		</Link>
	);
}

const Button = ({ name, onClick, outline = false }) => {
	return (
		<button
			onClick={onClick} // Ensures correct event handling
			className={`group w-fit p-1 flex items-center gap-3 lg:gap-2 inter-medium rounded-[60px] shadow-md cursor-pointer transition 
				${outline ? "bg-transparent text-white border-[1px]" : "bg-white text-black"}
			`}
		>
			<span className="px-2 lg:py-1 text-sm md:text-base ">{name}</span>
			{
				outline ? (
					<Image src="/icon/export-white.svg" className="w-auto h-7 lg:h-9 transition duration-300 group-hover:rotate-45" width={46} height={46} alt="icon" />
				) : (
					<Image src="/icon/export-black.svg" className="w-auto h-7 lg:h-9 transition duration-300 group-hover:rotate-45" width={46} height={46} alt="icon" />
				)
			}
		</button>
	);
};

export default Button;
