import { motion } from "motion/react"

const AnimatedCard = ({ badgeText, title, description, image, animate = true }) => {
    const parentVariants = {
        initial: {
            width: "100%"
        },
        hover: {
            width: "180%"
        },
    }

    const childVariants1 = {
        initial: {
            opacity: 1,
        },
        hover: {
            opacity: 0,
        },
    }

    const childVariants2 = {
        initial: {
            display: "none",
            opacity: 0,
        },
        hover: {
            display: "flex",
            opacity: 1,
        },
    }

    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            variants={animate ? parentVariants : undefined}
            transition={{ duration: 0.5 }}
            className="w-[75vw] 2xs:w-[78vw] xs:w-[83vw] sm:w-[90vw] rounded-xl h-[20rem] bg-cover bg-center bg-no-repeat text-white inter-font relative overflow-hidden"
            style={{ backgroundImage: `url(${image})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-55"></div>

            <div className="relative px-5 py-4 h-full overflow-hidden">
                <span className="border-white border-[1px] px-3 py-1 rounded-4xl text-[8px] font-medium whitespace-nowrap lg:text-[10px] xl:text-[12px]">{badgeText}</span>
                {animate && (
                    <motion.div variants={childVariants1} transition={{ duration: 0.2 }} className="absolute inset-0 pl-5 w-full h-full flex items-center">
                        {title && <h2 className="pb-6 text-xl lg:text-2xl font-bold">{title}</h2>}
                    </motion.div>
                )}
                <motion.div variants={animate ? childVariants2 : undefined} transition={{ duration: 0.5 }} className="mt-5 w-full h-full flex flex-col">
                    {title && <h2 className="pb-2 text-xl lg:text-2xl font-bold">{title}</h2>}
                    {description && <p className="text-xs">{description}</p>}
                </motion.div>
            </div>
        </motion.div>
    )
}

export default AnimatedCard;