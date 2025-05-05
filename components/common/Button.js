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

export const IconButton = ({
	name,
	onClick,
	href,
	outline = false,
	className,
	textClassName,
	iconClassName,
	size = "md", // "sm", "md", "lg"
	...props
}) => {
	const sizeStyles = {
		sm: {
			button: "p-1 gap-1 rounded-3xl",
			text: "p-1 text-xs md:text-sm",
			icon: "h-6 lg:h-8",
			iconSize: 28,
		},
		md: {
			button: "p-1 gap-3 lg:gap-2 rounded-[60px]",
			text: "px-2 lg:py-1 text-sm md:text-base",
			icon: "h-7 lg:h-9",
			iconSize: 46,
		},
		lg: {
			button: "p-2 gap-4 rounded-[80px]",
			text: "px-2 lg:py-2 text-base md:text-lg",
			icon: "h-8 lg:h-10",
			iconSize: 60,
		},
	};

	const s = sizeStyles[size] || sizeStyles.md;

	const classes = cn(
		`group h-fit flex items-center inter-medium shadow-md cursor-pointer transition 
        ${outline ? "bg-transparent text-white border-[1px]" : "bg-white text-black"}`,
		s.button,
		className
	);

	const content = (
		<>
			<span className={cn("", s.text, textClassName)}>{name}</span>
			{outline ? (
				<Image
					src="/icon/export-white.svg"
					className={cn("w-auto h-7 lg:h-9 transition duration-300 group-hover:rotate-45", s.icon, iconClassName)}
					width={s.iconSize}
					height={s.iconSize}
					alt="icon"
				/>
			) : (
				<Image
					src="/icon/export-black.svg"
					className={cn("w-auto h-7 lg:h-9 transition duration-300 group-hover:rotate-45", s.icon, iconClassName)}
					width={s.iconSize}
					height={s.iconSize}
					alt="icon"
				/>
			)}
		</>
	);

	if (href) {
		return (
			<Link href={href} className={classes} {...props}>
				{content}
			</Link>
		);
	}

	return (
		<button onClick={onClick} className={classes} {...props}>
			{content}
		</button>
	);
};

export default IconButton;
