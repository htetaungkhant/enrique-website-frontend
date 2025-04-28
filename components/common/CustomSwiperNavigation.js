import { useSwiper } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const CustomSwiperNavigation = () => {
    const swiper = useSwiper();

    return (
        <div className="relative flex justify-center mt-6 md:hidden">
            <button onClick={() => swiper.slidePrev()} className="px-4 py-2 bg-white rounded-l-2xl cursor-pointer">
                <FaArrowLeft className="text-[#545454]" />
            </button>
            <button onClick={() => swiper.slideNext()} className="px-4 py-2 bg-white rounded-r-2xl cursor-pointer">
                <FaArrowRight className="text-[#545454]" />
            </button>
        </div>
    );
};

export default CustomSwiperNavigation;