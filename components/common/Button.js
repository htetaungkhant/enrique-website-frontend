import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";

import { cn } from "@/lib/utils";

export const SubmitBtn = ({ title = "Submit", className, ...props }) => {
	return (
		<button className={cn("max-md:rounded-lg poppins-font font-semibold text-sm text-white bg-black px-4 py-2 rounded-4xl cursor-pointer hover:shadow-lg", className)} {...props}>
			{title}
		</button>
	)
}

export const ReadMoreBtn = ({ title, className, onClick, href, ...props }) => {
	const classes = cn("py-2 px-2 md:px-4 bg-white rounded-4xl flex justify-between items-center cursor-pointer hover:shadow-sm", className);

	const content = (
		<>
			<span className="text-sm font-medium">{title || 'READ MORE'}</span>
			<FaArrowRight size={20} />
		</>
	)

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
	)
}

export const IconButton = ({
	title,
	onClick,
	href,
	outline = false,
	className,
	textClassName,
	iconClassName,
	iconAnimate = true,
	reverseIconPosition = false,
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
		"group h-fit flex items-center justify-between inter-medium shadow-md cursor-pointer transition",
		reverseIconPosition && "flex-row-reverse",
		outline ? "bg-transparent text-white border-[1px]" : "bg-white text-black",
		s.button,
		className
	);

	const content = (
		<>
			<span className={cn("flex-1 text-center", s.text, textClassName)}>{title}</span>
			<MdArrowOutward
				size={s.iconSize}
				className={cn(
					`p-2 rounded-full w-auto transition duration-300`,
					reverseIconPosition ?
						iconAnimate ? "-rotate-90 group-hover:-rotate-135" : "-rotate-135"
						: iconAnimate ? "group-hover:rotate-45" : "rotate-45",
					outline ? "text-black bg-white" : "text-white bg-black",
					s.icon,
					iconClassName
				)}
			/>
		</>
	);

	if (href && props.download) {
		return (
			<a href={href} className={classes} {...props}>
				{content}
			</a>
		);
	}

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
