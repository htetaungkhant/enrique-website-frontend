import { motion, AnimatePresence } from 'motion/react';
import { IoMdClose } from "react-icons/io";

import { cn } from '@/lib/utils';

const Modal = ({ isOpen, onClose, children, backdropClassName, containerClassName, className }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className={cn("fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]", backdropClassName)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal content */}
                    <motion.div
                        className={cn("fixed inset-0 z-[110] flex items-center justify-center px-0 md:px-6 py-6 md:py-16 overflow-hidden", className)}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.1, ease: 'easeInOut' }}
                    >
                        <div
                            className={cn("px-3 md:px-6 py-9 max-h-[96vh] md:max-h-[90vh] xl:max-h-[80vh] flex flex-col relative text-white bg-gradient-to-b from-[#171F3F] to-[#020105] border-2 border-white rounded-2xl shadow-xl", containerClassName)}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <IoMdClose size={28} onClick={onClose} className="absolute top-3 right-3 hover:text-gray-400 cursor-pointer transition" />

                            <div className="min-h-28 min-w-28 flex-1 overflow-y-auto mt-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal;
