import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import QuestStart from "@/components/QuestionnairePage/QuestStart";
import Step1 from "@/components/QuestionnairePage/scenes/Step1";
import Step2 from "@/components/QuestionnairePage/scenes/Step2";
import Step3 from "@/components/QuestionnairePage/scenes/Step3";
import Step4 from "@/components/QuestionnairePage/scenes/Step4";
import Step5 from "@/components/QuestionnairePage/scenes/Step5";
import Step6 from "@/components/QuestionnairePage/scenes/Step6";
import Step7 from "@/components/QuestionnairePage/scenes/Step7";
import Step8 from "@/components/QuestionnairePage/scenes/Step8";
import Step9 from "@/components/QuestionnairePage/scenes/Step9";
import Step10 from "@/components/QuestionnairePage/scenes/Step10";
import Step11 from "@/components/QuestionnairePage/scenes/Step11";
import Step12 from "@/components/QuestionnairePage/scenes/Step12";
import Step13 from "@/components/QuestionnairePage/scenes/Step13";
import Step14 from "@/components/QuestionnairePage/scenes/Step14";
import Step15 from "@/components/QuestionnairePage/scenes/Step15";
import Step16 from "@/components/QuestionnairePage/scenes/Step16";
import Step17 from "@/components/QuestionnairePage/scenes/Step17";
import Step18 from "@/components/QuestionnairePage/scenes/Step18";
import Step19 from "@/components/QuestionnairePage/scenes/Step19";
import Step20 from "@/components/QuestionnairePage/scenes/Step20";
import Step21 from "@/components/QuestionnairePage/scenes/Step21";
import Step22 from "@/components/QuestionnairePage/scenes/Step22";
import Step23 from "@/components/QuestionnairePage/scenes/Step23";
import Step24 from "@/components/QuestionnairePage/scenes/Step24";
import Step25 from "@/components/QuestionnairePage/scenes/Step25";
import Step26 from "@/components/QuestionnairePage/scenes/Step26";
import Step27 from "@/components/QuestionnairePage/scenes/Step27";
import Step28 from "@/components/QuestionnairePage/scenes/Step28";
import Step29 from "@/components/QuestionnairePage/scenes/Step29";
import Step30 from "@/components/QuestionnairePage/scenes/Step30";
import Step31 from "@/components/QuestionnairePage/scenes/Step31";
import QuestEnd from "@/components/QuestionnairePage/QuestEnd";
import SwiperSlideContainer from "@/components/QuestionnairePage/SwiperSlideContainer";
import SwiperNavigation from "@/components/QuestionnairePage/SwiperNavigation";

const QuestionnairePage = () => {
    const containerRef = useRef(null);
    const { start, setStart, step1, end, setEnd, activeIndex, setActiveIndex } = useQuestionnaire();
    const [localStart, setLocalStart] = useState(false);

    const onGobackToFirst = () => {
        setLocalStart(false);
        setStart(false);
    }

    const onSubmit = () => {
        setEnd(true);
        if (containerRef.current) {
            containerRef.current.classList.remove("overflow-hidden");
        }
    }

    useEffect(() => {
        if (containerRef.current && !end) {
            containerRef.current.classList.add("overflow-hidden");
        }
    }, []);

    return (
        <main className="bg-black overflow-x-hidden">
            <div ref={containerRef} className="h-screen w-screen flex flex-col bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url(/image/banner.png)" }}> {/* overflow-x-hidden overflow-y-auto */}
                <div className="w-full h-full absolute flex justify-center items-center overflow-hidden">
                    <div className="-mt-[8%] xl:h-[40%] xl:w-[30%] xl:min-h-120 xl:min-w-120 min-h-100 min-w-100 h-100 w-100 bg-radial from-[#000000] via-[#00000000] via-[70%] to-transparent"></div>
                    <div className="xl:h-[50%] xl:w-[40%] xl:min-h-150 xl:min-w-150 md:min-h-120 md:min-w-120 md:h-120 md:w-120 min-h-100 min-w-100 h-100 w-100 bg-radial from-[#000000] via-[#00000000] via-[70%] to-transparent"></div>
                    <div className="mt-[6%] xl:h-[40%] xl:w-[30%] xl:min-h-120 xl:min-w-120 min-h-100 min-w-100 h-100 w-100 bg-radial from-[#000000] via-[#00000000] to-transparent"></div>
                </div>
                <div className="relative flex justify-center items-center">
                    <div className="p-12 md:p-16 lg:p-20 bg-radial from-[#000000] via-[#00000000] via-[80%] to-transparent">
                        <div className="xl:w-48 xl:h-48 md:w-36 md:h-36 w-32 h-32 flex justify-center items-center">
                            <Image
                                src="/logo/vertical-logo.png"
                                width={132}
                                height={172}
                                alt="logo"
                                className="h-full w-auto"
                            />
                        </div>
                    </div>
                </div>
                <AnimatePresence mode="wait">
                    {/* {!start && !end && ()}
                    {start && !end && ()}
                    {start && end && ()} */}
                    {
                        !localStart && !start && !step1 ? (
                            <motion.div
                                key="quest-start"
                                initial={{
                                    opacity: 0,
                                    scale: 0.9,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    // transition: {
                                    //     duration: 0.2,
                                    //     delay: 0.2,
                                    // },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: {
                                        duration: 0.2
                                    },
                                }}
                                transition={{
                                    duration: 0.2,
                                    delay: 0.2,
                                    ease: "easeInOut"
                                }}
                                className="relative px-6 py-6 lg:py-20 lg:px-12 w-full flex-1 flex flex-col justify-center"
                            >
                                <QuestStart onStart={() => setLocalStart(true)} />
                            </motion.div>
                        )
                            : !end ? (
                                <motion.div
                                    key="swiper"
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        // transition: {
                                        //     duration: 0.2,
                                        //     delay: 0.2,
                                        // },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: {
                                            duration: 0.2
                                        },
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        delay: 0.2,
                                        ease: "easeInOut"
                                    }}
                                    className="relative px-6 py-0 lg:px-12 w-full flex-1 flex flex-col justify-center"
                                >
                                    <Swiper
                                        modules={[Navigation, Pagination]}
                                        spaceBetween={0}
                                        initialSlide={activeIndex}
                                        slidesPerView={1}
                                        allowTouchMove={false}
                                        navigation={false}
                                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                        className="w-full"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: '100px 0',
                                            marginTop: '-100px',
                                        }}
                                        wrapperClass="items-center"
                                    >
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step1 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step2 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step3 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step4 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step5 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step6 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step7 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step8 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step9 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step10 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step11 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step12 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step13 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step14 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step15 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step16 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step17 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step18 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step19 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step20 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step21 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step22 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step23 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step24 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step25 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step26 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step27 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step28 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step29 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step30 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <SwiperSlideContainer activeIndex={activeIndex}>
                                                <Step31 />
                                            </SwiperSlideContainer>
                                        </SwiperSlide>
                                        <SwiperNavigation
                                            activeIndex={activeIndex}
                                            onGobackToFirst={onGobackToFirst}
                                            onSubmit={onSubmit}
                                        />
                                    </Swiper>
                                </motion.div>
                            )
                                : (
                                    <motion.div
                                        key="quest-end"
                                        initial={{
                                            opacity: 0,
                                            scale: 0.9,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            // transition: {
                                            //     duration: 0.2,
                                            //     delay: 0.2,
                                            // },
                                        }}
                                        exit={{
                                            opacity: 0,
                                            transition: {
                                                duration: 0.2
                                            },
                                        }}
                                        transition={{
                                            duration: 0.2,
                                            delay: 0.2,
                                            ease: "easeInOut"
                                        }}
                                        className="relative px-6 py-6 lg:py-20 lg:px-12 w-full flex-1 flex flex-col justify-center"
                                    >
                                        <QuestEnd />
                                    </motion.div>
                                )
                    }
                </AnimatePresence>
            </div>
        </main>
    )
}

export default QuestionnairePage;