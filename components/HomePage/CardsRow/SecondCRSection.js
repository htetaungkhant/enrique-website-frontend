import { useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import AnimatedCard from "./AnimatedCard";
import UPSection from "@/components/common/UniformPaddingSection";

const SecondCRSection = () => {
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
        <UPSection className="flex flex-col gap-6">
            <h2 className="text-white text-2xl inter-font font-light lg:text-4xl">Potential Challenges of a <strong className="font-semibold">Bufo Ceremony</strong></h2>
            <div
                ref={scrollContainerRef}
                className="hidden lg:flex gap-4 overflow-x-scroll overflow-y-hidden lg:gap-8 cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <AnimatedCard isDragging={isDragging} badgeText="Drawbacks" index={1}>
                    <div className="flex flex-col gap-4 inter-font text-[#022645]">
                        <h2 className="font-normal text-xl md:text-2xl lg:text-4xl"><strong className="font-bold">Ethical</strong> <br />Concerns</h2>
                        <p className="text-xs md:text-sm font-medium">Rising demand for Bufo alvarius venom is impacting the toad’s population and habitat. Individuals must choose between ethically sourced venom or a lab-synthesized alternative.</p>
                    </div>
                </AnimatedCard>
                <AnimatedCard isDragging={isDragging} badgeText="Drawbacks" index={2}>
                    <div className="flex flex-col gap-4 inter-font text-[#022645]">
                        <h2 className="font-normal text-xl md:text-2xl lg:text-4xl"><strong className="font-bold">Physical</strong> <br />Reactions</h2>
                        <p className="text-xs md:text-sm font-medium">Some participants may experience nausea, increased heart rate, or elevated blood pressure. A thorough health screening is essential to minimize these risks and ensure safety.</p>
                    </div>
                </AnimatedCard>
                <AnimatedCard isDragging={isDragging} badgeText="Drawbacks" index={3}>
                    <div className="flex flex-col gap-4 inter-font text-[#022645]">
                        <h2 className="font-normal text-xl md:text-2xl lg:text-4xl"><strong className="font-bold">Integration</strong> <br />Challenges</h2>
                        <p className="text-xs md:text-sm font-medium">The intensity of the experience can make post-ceremony adjustment difficult, sometimes leading to feelings of disconnection. Proper integration support can help process these profound effects.</p>
                    </div>
                </AnimatedCard>
                <AnimatedCard isDragging={isDragging} badgeText="Drawbacks" index={4} onMouseEnter={handleLastCardHover}>
                    <div className="flex flex-col gap-4 inter-font text-[#022645]">
                        <h2 className="font-normal text-xl md:text-2xl lg:text-4xl"><strong className="font-bold">Mental</strong> <br />Health Risks</h2>
                        <p className="text-xs md:text-sm font-medium">As with other psychedelics like psilocybin or LSD, 5-MeO-DMT may pose risks for individuals with pre-existing psychological conditions. A health screening is crucial to assess suitability.</p>
                    </div>
                </AnimatedCard>
            </div>
            <div className="lg:hidden">
                <div
                    ref={mobileScrollContainerRef}
                    className="flex gap-4 overflow-x-scroll overflow-y-hidden lg:gap-8 cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <AnimatedCard isDragging={isDragging} badgeText="Drawbacks" index={1} animate={false}>
                        <div className="flex flex-col gap-4 inter-font text-[#022645]">
                            <h2 className="font-normal text-xl md:text-2xl lg:text-4xl"><strong className="font-bold">Ethical</strong> <br />Concerns</h2>
                            <p className="text-xs md:text-sm font-medium">Rising demand for Bufo alvarius venom is impacting the toad’s population and habitat. Individuals must choose between ethically sourced venom or a lab-synthesized alternative.</p>
                        </div>
                    </AnimatedCard>
                    <AnimatedCard isDragging={isDragging} badgeText="Drawbacks" index={2} animate={false}>
                        <div className="flex flex-col gap-4 inter-font text-[#022645]">
                            <h2 className="font-normal text-xl md:text-2xl lg:text-4xl"><strong className="font-bold">Physical</strong> <br />Reactions</h2>
                            <p className="text-xs md:text-sm font-medium">Some participants may experience nausea, increased heart rate, or elevated blood pressure. A thorough health screening is essential to minimize these risks and ensure safety.</p>
                        </div>
                    </AnimatedCard>
                    <AnimatedCard isDragging={isDragging} badgeText="Drawbacks" index={3} animate={false}>
                        <div className="flex flex-col gap-4 inter-font text-[#022645]">
                            <h2 className="font-normal text-xl md:text-2xl lg:text-4xl"><strong className="font-bold">Integration</strong> <br />Challenges</h2>
                            <p className="text-xs md:text-sm font-medium">The intensity of the experience can make post-ceremony adjustment difficult, sometimes leading to feelings of disconnection. Proper integration support can help process these profound effects.</p>
                        </div>
                    </AnimatedCard>
                    <AnimatedCard isDragging={isDragging} badgeText="Drawbacks" index={4} animate={false}>
                        <div className="flex flex-col gap-4 inter-font text-[#022645]">
                            <h2 className="font-normal text-xl md:text-2xl lg:text-4xl"><strong className="font-bold">Mental</strong> <br />Health Risks</h2>
                            <p className="text-xs md:text-sm font-medium">As with other psychedelics like psilocybin or LSD, 5-MeO-DMT may pose risks for individuals with pre-existing psychological conditions. A health screening is crucial to assess suitability.</p>
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
        </UPSection>
    );
}

export default SecondCRSection;