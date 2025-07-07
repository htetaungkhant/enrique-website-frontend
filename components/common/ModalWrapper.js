import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { cn } from '@/lib/utils';

const ModalWrapper = ({
    backdrop = false,
    fixedScreen = true,
    isOpen,
    onClick,
    backdropClassName,
    className,
    children,
}) => {
    useEffect(() => {
        if (isOpen && fixedScreen) {
            // const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            // document.body.style.paddingRight = `${scrollBarWidth}px`;
            document.body.style.overflow = 'hidden';
        } else {
            // document.body.style.paddingRight = '';
            document.body.style.overflow = '';
        }
        return () => {
            // document.body.style.paddingRight = '';
            document.body.style.overflow = '';
        };
    }, [isOpen, fixedScreen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    {
                        backdrop && (
                            <motion.div
                                className={cn("fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]", backdropClassName)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />
                        )
                    }

                    {/* Modal content */}
                    <motion.div
                        className={cn(
                            "inset-0 z-[110] flex items-center justify-center px-0 md:px-6 py-6 md:py-16 overflow-hidden",
                            fixedScreen ? "fixed" : "absolute",
                            className,
                        )}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.1, ease: 'easeInOut' }}
                        onClick={onClick}
                    >
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default ModalWrapper;