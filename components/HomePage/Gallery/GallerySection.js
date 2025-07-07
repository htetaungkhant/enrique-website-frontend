import { useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import AnimatedCard from "./AnimatedCard";
import UPSection from "@/components/common/UniformPaddingSection";

const data = [
    {
        firstRow: {
            badge: "Preparation Steps",
            title: "Sound Healing and Ecstatic Dance",
            description: "Immerse yourself in an experience where sound vibrations from instruments like Tibetan singing bowls and gongs set the stage for free-form dance. Allow your body to release stress and connect with deeper emotional layers through spontaneous movement.",
            image: "/image/EcstaticDance.png",
        },
        secondRow: {
            badge: "Preparation Steps",
            title: "Journaling",
            description: "Keep a journal to capture your thoughts before, during, and after your experience. This practice not only clarifies your intentions but also serves as a powerful tool for processing emotions and tracking your personal growth.",
            image: "/image/Journaling.png",
        },
    },
    {
        firstRow: {
            badge: "Preparation Steps",
            title: "Cleansing Medicine",
            description: "Engage with traditional medicines such as Kambo, Rapé, or participate in a Temazcal ceremony. These practices are designed to purify and realign your energy, preparing your body and mind for transformative experiences.",
            image: "/image/CleansingMedicine.png",
        },
        secondRow: {
            badge: "Preparation Steps",
            title: "Setting Intentions",
            description: "Reflect on your personal goals and aspirations for the retreat. Clearly defined intentions act as a compass, guiding your journey and deepening the impact of your transformational experience.",
            image: "/image/SettingIntentions.png",
        },
    },
    {
        firstRow: {
            badge: "Preparation Steps",
            title: "Breathwork",
            description: "Practice intentional breathing techniques to release tension and restore balance. Breathwork helps you connect with your inner self, enhances mindfulness, and supports emotional regulation during your retreat.",
            image: "/image/Breathwork.png",
        },
        secondRow: {
            badge: "Preparation Steps",
            title: "Meditation or Prayer",
            description: "ntegrate meditation or prayer into your daily routine as a way to center yourself. This practice fosters a sense of inner peace, allowing you to fully embrace the retreat experience with an open heart and mind.",
            image: "/image/Prayer.png",
        },
    },
    {
        firstRow: {
            badge: "Preparation Steps",
            title: "Special Diets or Fasting",
            description: "Follow dietary guidelines or engage in a fasting period before your retreat. This intentional preparation cleanses your body, promoting clarity and increasing your sensitivity to the healing process.",
            image: "/image/Fasting.png",
        },
        secondRow: {
            badge: "Preparation Steps",
            title: "Yoga, Qigong, and Other Somatic Practices",
            description: "Incorporate practices like yoga or Qigong to improve physical alignment and energy flow. These mindful movements help ground you, enhancing both physical and emotional resilience during your retreat.",
            image: "/image/OtherSomaticPractices.jpeg",
        },
    }
]

const GallerySection = () => {
    const scrollContainerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);

        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleLeftArrowClick = () => {
        if (scrollContainerRef.current) {
            const cardWidth = scrollContainerRef.current.querySelector(':first-child').offsetWidth;
            const gap = 32;
            const scrollAmount = cardWidth + gap;
            scrollContainerRef.current.scrollTo({
                left: scrollContainerRef.current.scrollLeft - scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    const handleRightArrowClick = () => {
        if (scrollContainerRef.current) {
            const cardWidth = scrollContainerRef.current.querySelector(':first-child').offsetWidth;
            const gap = 32;
            const scrollAmount = cardWidth + gap;
            scrollContainerRef.current.scrollTo({
                left: scrollContainerRef.current.scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    return (
        <UPSection className="flex flex-col gap-6">
            <h2 className="text-white text-2xl inter-font font-light lg:text-4xl">Preparation Steps For <strong className="font-semibold">Your  Retreat</strong></h2>
            <div className="hidden md:flex gap-8">
                {
                    data.map((item, index) => (
                        <AnimatedCard
                            key={index}
                            badgeText={item.firstRow.badge}
                            title={item.firstRow.title}
                            description={item.firstRow.description}
                            image={item.firstRow.image}
                        />
                    ))
                }
            </div>
            <div className="hidden md:flex gap-8 mt-2">
                {
                    data.map((item, index) => (
                        <AnimatedCard
                            key={index}
                            badgeText={item.secondRow.badge}
                            title={item.secondRow.title}
                            description={item.secondRow.description}
                            image={item.secondRow.image}
                        />
                    ))
                }
            </div>
            <div
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="flex md:hidden gap-8 overflow-x-scroll cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {
                    data.map((item, index) => (
                        <div className="w-full flex flex-col gap-9" key={index}>
                            <AnimatedCard
                                animate={false}
                                badgeText={item.firstRow.badge}
                                title={item.firstRow.title}
                                description={item.firstRow.description}
                                image={item.firstRow.image}
                            />
                            <AnimatedCard
                                animate={false}
                                badgeText={item.secondRow.badge}
                                title={item.secondRow.title}
                                description={item.secondRow.description}
                                image={item.secondRow.image}
                            />
                        </div>
                    ))
                }
            </div>
            <div className="relative flex justify-center md:hidden">
                <button onClick={handleLeftArrowClick} className="px-4 py-2 bg-white cursor-pointer rounded-l-2xl">
                    <FaArrowLeft className="text-[#545454]" />
                </button>
                <button onClick={handleRightArrowClick} className="px-4 py-2 bg-white cursor-pointer rounded-r-2xl">
                    <FaArrowRight className="text-[#545454]" />
                </button>
            </div>
        </UPSection>
    )
}

export default GallerySection;