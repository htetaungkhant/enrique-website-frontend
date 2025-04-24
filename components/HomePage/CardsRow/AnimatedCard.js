import { motion } from "motion/react"

const AnimatedCard = ({ isDragging, badgeText, children, index, onMouseEnter, animate = true }) => {

    const animatedText = index < 10 ? `0${index}` : index;

    const parentVariants = {
        initial: {
            minWidth: "300px",
            height: "350px",
        },
        hover: {
            minWidth: animate ? "600px" : undefined,
        },
    };

    const childVariants = {
        initial: { y: 48, opacity: 0 },
        hover: { y: 8, opacity: 1 },
        transition: { duration: 0.5 },
    };

    return (
        <motion.div
            initial="initial"
            animate="initial"
            whileHover={isDragging ? "initial" : "hover"}
            variants={parentVariants}
            transition={{ duration: 0.4 }}
            className="relative bg-gradient-to-b from-[#D7F2D5] to-[#5C8959] flex flex-col items-start gap-5 rounded-3xl px-4 py-6 lg:px-6 lg:py-8"
            onMouseEnter={onMouseEnter}
        >
            {badgeText && <span className="block border-[#022645] border-[1px] rounded-4xl px-4 py-1 inter-font font-medium text-[#022645]">{badgeText}</span>}
            {children}
            {animatedText && (
                <motion.div variants={animate ? childVariants : undefined} className="absolute bottom-0">
                    <span className="text-[#0B6758] text-9xl font-bold">{animatedText}</span>
                </motion.div>
            )}
        </motion.div>
    );
}

export default AnimatedCard;