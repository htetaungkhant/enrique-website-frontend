import { Swiper, SwiperSlide, } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import Card from "./Card";
import UPSection from "@/components/common/UniformPaddingSection";
import CustomSwiperNavigation from "./CustomSwiperNavigation";
import { cn } from "@/lib/utils";

export const SwiperWrapper = ({
    spaceBetween,
    slidesPerView,
    breakpoints,
    className,
    swiperClassName,
    navigationClassName,
    children
}) => {
    return (
        <div className={cn("relative", className)}>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={spaceBetween || 20}
                slidesPerView={slidesPerView || 1}
                breakpoints={breakpoints || {
                    768: {
                        slidesPerView: 2,
                    },
                }}
                navigation={false}
                className={cn("w-full h-full", swiperClassName)}
            >
                {children}
                <CustomSwiperNavigation className={navigationClassName} />
            </Swiper>
        </div>
    )
}

export const SwiperCardsRowSection = ({
    cardAnimate = false,
    spaceBetween,
    slidesPerView,
    breakpoints,
    title,
    description,
    footer,
    cardList,
    twBadgeBorderColor = "border-white",
    twBadgeTextColor = "text-white",
    twBadgeBgColor,
    twCardClassName, // bg-gradient-to-r from-[#1B7857] to-[#59A331]
    className
}) => {
    return (
        <UPSection className={cn("text-white inter-font flex flex-col gap-6", className)}>
            {title && <h2 className="text-2xl font-medium lg:text-4xl">{title}</h2>}
            {description && (
                typeof description === 'string' ?
                    <p>{description}</p>
                    :
                    <div>{description}</div>
            )}
            {
                cardList && (
                    <SwiperWrapper spaceBetween={spaceBetween} slidesPerView={slidesPerView} breakpoints={breakpoints}>
                        {
                            cardList.map((item, index) => (
                                <SwiperSlide key={index} className={cardAnimate ? "my-1" : ""}>
                                    <Card
                                        animate={cardAnimate}
                                        badgeText={item.badgeText}
                                        twBadgeBorderColor={twBadgeBorderColor}
                                        twBadgeTextColor={twBadgeTextColor}
                                        twBadgeBgColor={twBadgeBgColor}
                                        className={twCardClassName}
                                    >
                                        <div className="flex flex-col gap-4">
                                            {
                                                item.title && typeof item.title === 'string' ?
                                                    <h2 className="font-semibold text-xl lg:text-2xl">{item.title}</h2>
                                                    :
                                                    typeof item.title === 'object' && Object.keys(item.title).length === 1 && Object.keys(item.title).includes('__html') ?
                                                        <h2 className="font-semibold text-xl lg:text-2xl" dangerouslySetInnerHTML={item.title}></h2>
                                                        : null
                                            }
                                            {item.description && (
                                                Array.isArray(item.description) ? (
                                                    <div className="text-xs md:text-sm font-medium flex flex-col gap-3">
                                                        {
                                                            item.description.map((innerItem, innerIndex) => (
                                                                typeof innerItem === 'string' ?
                                                                    <p key={innerIndex}>{innerItem}</p>
                                                                    :
                                                                    <div key={innerIndex}>{innerItem}</div>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                                    : (
                                                        typeof item.description === 'string' ?
                                                            <p className="text-xs md:text-sm font-medium">{item.description}</p>
                                                            :
                                                            <div className="text-xs md:text-sm font-medium">{item.description}</div>
                                                    )
                                            )}
                                        </div>
                                    </Card>
                                </SwiperSlide>
                            ))
                        }
                    </SwiperWrapper>
                )
            }
            {footer && (
                typeof footer === 'string' ?
                    <p>{footer}</p>
                    :
                    <div>{footer}</div>
            )}
        </UPSection>
    )
}

const CardsRowSection = ({ cardAnimate = false, title, description, cardList, twCardColor }) => {
    return (
        <UPSection className="flex flex-col gap-6">
            {title && <h2 className="text-white text-2xl inter-font font-medium lg:text-4xl" dangerouslySetInnerHTML={{ __html: title }}></h2>}
            {description && <p className="text-white">{description}</p>}
            {
                cardList && (
                    <div className="flex flex-wrap justify-between gap-4 ">
                        {
                            cardList.map((item, index) => (
                                <Card animate={cardAnimate} className={`flex-1 ${twCardColor || ""}`} badgeText={item.badgeText} key={index}>
                                    <div className="flex flex-col gap-4 inter-font text-[#022645]">
                                        {item.title && <h2 dangerouslySetInnerHTML={{ __html: item.title }} className="font-semibold text-xl lg:text-2xl"></h2>}
                                        {item.description && <p className="text-xs md:text-sm font-medium">{item.description}</p>}
                                    </div>
                                </Card>
                            ))
                        }
                    </div>
                )
            }
        </UPSection>
    );
}

export default CardsRowSection;