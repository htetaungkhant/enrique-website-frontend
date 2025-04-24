import { useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import AnimatedCard from "./AnimatedCard";

const FirstCRSection = () => {
    const scrollContainerRef = useRef(null);
    const mobileScrollContainerRef = useRef(null);
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

    const handleLastCardHover = () => {
        if (scrollContainerRef.current) {
            setTimeout(() => {
                scrollContainerRef.current.scrollTo({
                    left: scrollContainerRef.current.scrollWidth,
                    behavior: 'smooth'
                });
            }, 400);
        }
    };

    const handleLeftArrowClick = () => {
        if (mobileScrollContainerRef.current) {
            const cardWidth = mobileScrollContainerRef.current.querySelector(':first-child').offsetWidth;
            const gap = 16;
            const scrollAmount = cardWidth + gap;
            mobileScrollContainerRef.current.scrollTo({
                left: mobileScrollContainerRef.current.scrollLeft - scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    const handleRightArrowClick = () => {
        if (mobileScrollContainerRef.current) {
            const cardWidth = mobileScrollContainerRef.current.querySelector(':first-child').offsetWidth;
            const gap = 16;
            const scrollAmount = cardWidth + gap;
            mobileScrollContainerRef.current.scrollTo({
                left: mobileScrollContainerRef.current.scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    return (
        <section className="p-8 flex flex-col gap-6 lg:p-12">
            <h2 className="text-white text-2xl inter-font font-light lg:text-4xl">The Advantages of a <strong className="font-semibold">Bufo Ceremony</strong></h2>
            <div
                ref={scrollContainerRef}
                className="hidden lg:flex gap-4 overflow-x-scroll overflow-y-hidden lg:gap-8 cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <AnimatedCard isDragging={isDragging} badgeText="Benefits" index={1}>
                    <div className="flex flex-col gap-4 inter-font text-[#022645]">
                        <h2 className="font-normal text-xl md:text-2xl lg:text-4xl"><strong className="font-bold">Greater Life</strong> <br />Satisfaction</h2>
                        <p className="text-xs md:text-sm font-medium">Users often report increased life satisfaction and lasting happiness, leading to improved well-being, better relationships, and a positive mindset.</p>
                    </div>
                </AnimatedCard>
                <AnimatedCard isDragging={isDragging} badgeText="Benefits" index={2}>
                    <div className="flex flex-col gap-4 inter-font text-[#022645]">
                        <h2 className="font-normal text-xl md:text-2xl lg:text-4xl"><strong className="font-bold">Brief Yet</strong> <br />Powerful</h2>
                        <p className="text-xs md:text-sm font-medium">The short yet intense duration of a Bufo Ceremony makes it more accessible, manageable, and easier to integrate into life.</p>
                    </div>
                </AnimatedCard>
                <AnimatedCard isDragging={isDragging} badgeText="Benefits" index={3}>
                    <div className="flex flex-col gap-4 inter-font text-[#022645]">
                        <h2 className="font-normal text-xl md:text-2xl lg:text-4xl"><strong className="font-bold">Spiritual</strong> <br />Growth</h2>
                        <p className="text-xs md:text-sm font-medium">Participants experience spiritual connectedness, emotional growth, self-awareness, inner peace, and stronger relationships.</p>
                    </div>
                </AnimatedCard>
                <AnimatedCard isDragging={isDragging} badgeText="Benefits" index={4} onMouseEnter={handleLastCardHover}>
                    <div className="flex flex-col gap-4 inter-font text-[#022645]">
                        <h2 className="font-normal text-xl md:text-2xl lg:text-4xl"><strong className="font-bold">Enhanced</strong> <br />Creativity</h2>
                        <p className="text-xs md:text-sm font-medium">Many individuals notice improved problem-solving skills and greater creative inspiration in both personal and professional settings.</p>
                    </div>
                </AnimatedCard>
            </div>
            <div className="lg:hidden">
                <div 
                    ref={mobileScrollContainerRef}
                    className="flex gap-4 overflow-x-scroll overflow-y-hidden lg:gap-8 cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <AnimatedCard isDragging={isDragging} badgeText="Benefits" index={1} animate={false}>
                        <div className="flex flex-col gap-4 inter-font text-[#022645]">
                            <h2 className="font-normal text-xl md:text-2xl lg:text-4xl"><strong className="font-bold">Greater Life</strong> <br />Satisfaction</h2>
                            <p className="text-xs md:text-sm font-medium">Users often report increased life satisfaction and lasting happiness, leading to improved well-being, better relationships, and a positive mindset.</p>
                        </div>
                    </AnimatedCard>
                    <AnimatedCard isDragging={isDragging} badgeText="Benefits" index={2} animate={false}>
                        <div className="flex flex-col gap-4 inter-font text-[#022645]">
                            <h2 className="font-normal text-xl md:text-2xl lg:text-4xl"><strong className="font-bold">Brief Yet</strong> <br />Powerful</h2>
                            <p className="text-xs md:text-sm font-medium">The short yet intense duration of a Bufo Ceremony makes it more accessible, manageable, and easier to integrate into life.</p>
                        </div>
                    </AnimatedCard>
                    <AnimatedCard isDragging={isDragging} badgeText="Benefits" index={3} animate={false}>
                        <div className="flex flex-col gap-4 inter-font text-[#022645]">
                            <h2 className="font-normal text-xl md:text-2xl lg:text-4xl"><strong className="font-bold">Spiritual</strong> <br />Growth</h2>
                            <p className="text-xs md:text-sm font-medium">Participants experience spiritual connectedness, emotional growth, self-awareness, inner peace, and stronger relationships.</p>
                        </div>
                    </AnimatedCard>
                    <AnimatedCard isDragging={isDragging} badgeText="Benefits" index={4} animate={false}>
                        <div className="flex flex-col gap-4 inter-font text-[#022645]">
                            <h2 className="font-normal text-xl md:text-2xl lg:text-4xl"><strong className="font-bold">Enhanced</strong> <br />Creativity</h2>
                            <p className="text-xs md:text-sm font-medium">Many individuals notice improved problem-solving skills and greater creative inspiration in both personal and professional settings.</p>
                        </div>
                    </AnimatedCard>
                </div>
                <div className="relative flex justify-center mt-6">
                    <button onClick={handleLeftArrowClick} className="px-4 py-2 bg-white cursor-pointer rounded-l-2xl">
                        <FaArrowLeft className="text-[#545454]" />
                    </button>
                    <button onClick={handleRightArrowClick} className="px-4 py-2 bg-white cursor-pointer rounded-r-2xl">
                        <FaArrowRight className="text-[#545454]" />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default FirstCRSection;