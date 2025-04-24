import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import AnimatedCard from "./AnimatedCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const data = [
    {
        firstRow: {
            title: "Preparation",
            description: "Participants undergo physical, mental, and emotional preparation through fasting, meditation, or cleansing rituals. This enhances receptivity, ensuring a transformative experience with greater clarity, focus, and readiness for the journey",
        },
        secondRow: {
            title: "Breathwork",
            description: "Deep, rhythmic breathing enhances awareness, allowing participants to surrender to the experience. Conscious breath control regulates emotions, deepens psychedelic effects, and promotes relaxation, clarity, and connection to inner wisdom.",
        },
    },
    {
        firstRow: {
            title: "Setting",
            description: "A quiet, peaceful space—such as nature or a sacred room—sets the tone. A calming atmosphere fosters introspection, relaxation, and a safe environment for deep spiritual and emotional exploration.",
        },
        secondRow: {
            title: "Dosage",
            description: "Administered in precise amounts, the venom is inhaled through smoking or vaporization. Controlled dosing ensures a safe, effective experience, balancing intensity while allowing participants to navigate insights with clarity.",
        },
    },
    {
        firstRow: {
            title: "Guidance",
            description: "A trained facilitator ensures safety, offers support, and navigates challenges during the ceremony. Their experience helps participants stay grounded, process emotions, and maximize the potential benefits of the journey.",
        },
        secondRow: {
            title: "Integration",
            description: "After the ceremony, reflection and self-exploration help internalize insights. Practices like journaling, meditation, or counseling assist in applying newfound wisdom to daily life for long-term growth.",
        },
    }
]

const CustomNavigation = () => {
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

const FirstCGSection = () => {

    return (
        <section className="fristCgSection p-8 flex flex-col gap-6 lg:p-12">
            <h2 className="text-white text-2xl inter-font font-light lg:text-4xl">Key Elements of a <strong className="font-semibold">Bufo Ceremony</strong></h2>
            <div className="relative">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                        }
                    }}
                    // loop={true}
                    navigation={false}
                    className="w-full h-full"
                >
                    {
                        data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col gap-8">
                                    <AnimatedCard title={item.firstRow.title} description={item.firstRow.description} />
                                    <AnimatedCard title={item.secondRow.title} description={item.secondRow.description} />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                    <CustomNavigation />
                </Swiper>
            </div>
        </section>
    )
}

export default FirstCGSection;