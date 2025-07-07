import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import UPSection from "@/components/common/UniformPaddingSection";
import CustomSwiperNavigation from "@/components/common/CustomSwiperNavigation";
import { cn } from "@/lib/utils";
import AnimatedCard from "./AnimatedCard";

const CardGridSection = ({
    spaceBetween = 20,
    slidesPerView = 1,
    breakpoints = {
        768: {
            slidesPerView: 3,
        }
    },
    title,
    titleClassName,
    description,
    descriptionClassName,
    data,
    className,
    cardClassName,
}) => {

    const animatedOverlayClassName = `
        max-sm:w-[1000px] max-sm:h-[1000px] w-[1500px] h-[1500px] ${breakpoints[768]?.slidesPerView >= 3 ?
            "md:w-[1200px] md:h-[1200px] "
            :
            breakpoints[768]?.slidesPerView === 2 ?
                "md:w-[1600px] md:h-[1600px] "
                :
                breakpoints[768]?.slidesPerView <= 1 ?
                    "md:w-[2500px] md:h-[2500px] "
                    :
                    ""
        } ${breakpoints[1024]?.slidesPerView >= 3 ?
            "lg:w-[1200px] lg:h-[1200px] "
            :
            breakpoints[1024]?.slidesPerView === 2 ?
                "lg:w-[1600px] lg:h-[1600px] "
                :
                breakpoints[1024]?.slidesPerView <= 1 ?
                    "lg:w-[2500px] lg:h-[2500px] "
                    :
                    ""
        } ${breakpoints[1280]?.slidesPerView >= 3 ?
            "xl:w-[1200px] xl:h-[1200px] "
            :
            breakpoints[1280]?.slidesPerView === 2 ?
                "xl:w-[1600px] xl:h-[1600px] "
                :
                breakpoints[1280]?.slidesPerView <= 1 ?
                    "xl:w-[2500px] xl:h-[2500px] "
                    :
                    ""
        }
    `

    return (
        <UPSection className={cn("flex flex-col gap-6", className)}>
            {
                title && typeof title === 'string' ?
                    <h2 className={cn("text-white text-2xl inter-font font-light lg:text-4xl", titleClassName)}>{title}</h2>
                    :
                    typeof title === 'object' && Object.keys(title).length === 1 && Object.keys(title).includes('__html') ?
                        <h2 className={cn("text-white text-2xl inter-font font-light lg:text-4xl", titleClassName)} dangerouslySetInnerHTML={title}></h2>
                        :
                        null
            }
            {description && <p className={cn("pt-3 text-white inter-font font-medium", descriptionClassName)}>{description}</p>}
            <div className="relative">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={spaceBetween}
                    slidesPerView={slidesPerView}
                    breakpoints={breakpoints}
                    // loop={true}
                    navigation={false}
                    className="w-full h-full"
                >
                    {
                        data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col gap-8">
                                    <AnimatedCard
                                        title={item.firstRow.title}
                                        description={item.firstRow.description}
                                        animatedOverlayClassName={animatedOverlayClassName}
                                        className={cardClassName}
                                    />
                                    <AnimatedCard
                                        title={item.secondRow.title}
                                        description={item.secondRow.description}
                                        animatedOverlayClassName={animatedOverlayClassName}
                                        className={cardClassName}
                                    />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                    <CustomSwiperNavigation />
                </Swiper>
            </div>
        </UPSection>
    )
}

export default CardGridSection;