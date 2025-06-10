import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import QuestStart from "@/components/QuestionnairePage/QuestStart";
import QuestEnd from "@/components/QuestionnairePage/QuestEnd";
import SwiperSlideContainer from "@/components/QuestionnairePage/SwiperSlideContainer";
import SwiperNavigation from "@/components/QuestionnairePage/SwiperNavigation";
import { getSurveys } from "@/lib/inhouseAPI/survey-route";
import Step from "@/components/QuestionnairePage/Step";


export async function getServerSideProps(context) {
    try {
        const response = await getSurveys(context.req);
        response.sort((a, b) => a.id - b.id);

        return {
            props: {
                surveyQuestions: response ?? [],
            },
        };
    } catch (error) {
        console.error("Error fetching surveys:", error);
        return {
            props: {
                surveyQuestions: [],
            },
        };
    }
}

const QuestionnairePage = ({ surveyQuestions }) => {
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
                                    className="relative px-6 py-0 lg:px-12 w-full flex-1 flex flex-col"
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
                                            // padding: '100px 0',
                                            // marginTop: '-100px',
                                        }}
                                        wrapperClass="items-center"
                                    >
                                        {
                                            surveyQuestions.map((survey, idx) => (
                                                <SwiperSlide key={`${survey.id}-${idx + 1}`}>
                                                    <SwiperSlideContainer>
                                                        <Step idx={idx + 1} survey={survey} />
                                                    </SwiperSlideContainer>
                                                </SwiperSlide>
                                            ))
                                        }
                                        <SwiperNavigation
                                            activeIndex={activeIndex}
                                            surveys={surveyQuestions}
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