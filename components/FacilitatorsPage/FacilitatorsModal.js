import { IoMdClose } from "react-icons/io";

import { cn } from '@/lib/utils';
import ModalWrapper from '../common/ModalWrapper';

const FacilitatorsModal = ({
    isOpen,
    onClose,
    onClickOutside,
    backdropClassName,
    wrapperClassName,
    backdrop,
    fixedScreen,
    className,
    children,
}) => {
    return (
        <ModalWrapper
            isOpen={isOpen}
            onClick={onClickOutside}
            backdropClassName={backdropClassName}
            backdrop={backdrop}
            fixedScreen={fixedScreen}
            className={wrapperClassName}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={
                    cn(
                        "px-3 md:px-6 py-9 w-[95%] max-h-[96vh] md:max-h-[90vh] xl:max-h-[80vh] flex flex-col relative text-white bg-gradient-to-b from-[#171F3F] to-[#020105] border-2 border-white rounded-2xl shadow-xl",
                        className
                    )}
            >
                {/* Close Button */}
                <IoMdClose size={28} onClick={onClose} className="absolute top-3 right-3 hover:text-gray-400 cursor-pointer transition" />

                <div className="min-h-28 min-w-28 flex-1 mt-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {children}
                </div>
            </div>
        </ModalWrapper>
    );
};

export default FacilitatorsModal;
