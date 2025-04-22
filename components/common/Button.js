import Image from "next/image";
import Link from "next/link";

export const LinkButton = ({ name, href, outline = false }) => {
	return (
		<Link
			href={href}
			className={`group w-fit p-1 flex items-center gap-3 lg:gap-2 inter-medium rounded-[60px] shadow-md cursor-pointer transition 
				${outline ? "bg-transparent text-white border-[1px]" : "bg-white text-black"}
			`}
		>
			<span className="px-2 lg:py-1 text-sm md:text-base xl:text-lg">{name}</span>
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
			<span className="px-2 lg:py-1 text-sm md:text-base xl:text-lg">{name}</span>
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
