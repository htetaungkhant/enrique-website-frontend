import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { IconButton } from "@/components/common/Button";
import NewsLetter from "@/components/common/NewsLetter";
import { PageHeaderWithFullBanner } from "@/components/common/PageHeader";
import Footer from "@/components/common/Footer";
import UPSection from "@/components/common/UniformPaddingSection";
import YouTubeBanner from "@/components/common/YouTubeBanner";
import { SwiperCardsRowSection } from "@/components/common/CardsRowSection";
import AnimatedCard from "@/components/common/AnimatedCard";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";

const cardsRowSectionData1 = {
    title: <h2>Potential Risks and <strong>Safety Considerations</strong></h2>,
    cardList: [
        {
            badgeText: "Risks",
            title: <h4>Psychological<br /> <span className="font-light">Distress</span></h4>,
            description: <p className="text-[#A5A2A2]">Ayahuasca can bring up deeply buried emotions, trauma, and fears, leading to anxiety, paranoia, or distressing visions. Integration and guidance are crucial for processing experiences.</p>,
        },
        {
            badgeText: "Risks",
            title: <h4>Physical<br /> <span className="font-light">Reaction</span></h4>,
            description: <p className="text-[#A5A2A2]">Common effects include nausea, vomiting, diarrhea, sweating, and dizziness. These purging symptoms are considered cleansing but can be physically exhausting. Hydration and rest are essential post-ceremony.</p>,
        },
        {
            badgeText: "Risks",
            title: <h4>Medication<br /> <span className="font-light">Interactions</span></h4>,
            description: <p className="text-[#A5A2A2]">Combining Ayahuasca with antidepressants (SSRIs), stimulants, or MAOIs can cause serotonin syndrome, dangerously high blood pressure, or seizures. Consult a healthcare professional before consuming it to avoid complications.</p>,
        },
        {
            badgeText: "Risks",
            title: <h4>Underlying<br /> <span className="font-light">Health conditions</span></h4>,
            description: <p className="text-[#A5A2A2]">Those with heart disease, schizophrenia, or bipolar disorder may face severe risks, including cardiac stress or psychosis. Medical supervision is strongly advised before participating in ceremonies.</p>,
        },
    ],
    footer: <p>Respecting the <Link href="" target="_blank" className="text-[#fef15c]">sacred nature of the brew</Link>, understanding its cultural significance, and choosing a safe, supportive setting with experienced facilitators are essential to minimizing risks and ensuring a meaningful, transformative, and safe Ayahuasca experience.</p>,
}

const cardsRowSectionData2 = {
    title: <h2>Choosing a <strong>Reputable Retreat</strong></h2>,
    description: "Selecting a trustworthy retreat center is crucial for a safe and authentic Ayahuasca experience. Ensure the facility prioritizes participant well-being, follows ethical practices, and provides proper guidance, medical screening, and experienced facilitators for support.",
    cardList: [
        {
            badgeText: "Retreat",
            title: <h4>Health<br /> <span className="font-light">Screening</span></h4>,
            description: <p className="text-[#A5A2A2]">A reputable retreat should assess medical history, mental health, and medication use to prevent adverse reactions. Honest disclosure is essential for participant safety and well-being.</p>,
        },
        {
            badgeText: "Retreat",
            title: <h4>Experienced<br /> <span className="font-light">Facilitators</span></h4>,
            description: <p className="text-[#A5A2A2]">Choose a retreat where shamans or guides have extensive experience, proper training, and a deep understanding of Ayahuasca traditions to ensure a safe, supportive, and guided journey.</p>,
        },
        {
            badgeText: "Retreat",
            title: <h4>Safety<br /> <span className="font-light">Protocols</span></h4>,
            description: <p className="text-[#A5A2A2]">The center must have emergency plans, access to medical professionals, first-aid kits, and clear procedures to handle adverse reactions, ensuring participant security throughout the ceremony.</p>,
        },
        {
            badgeText: "Retreat",
            title: <h4>Client<br /> <span className="font-light">Testimonials</span></h4>,
            description: <p className="text-[#A5A2A2]">Read detailed participant reviews, check independent platforms, and verify testimonials to confirm the retreat's authenticity, ethical practices, safety measures, and overall reliability before making a decision.</p>,
        },
    ],
}

const SafetyPage = () => {
    const { resetAll } = useQuestionnaire();

    // Reset questionnaire state when the page loads
    useEffect(() => {
        resetAll();
    }, [resetAll]);

    return (
        <main>
            <PageHeaderWithFullBanner
                title={["How to have a Safe", "Ayahuasca Experience"]}
                bannerImg="/image/safety-banner.png"
                className="max-md:h-[80vh]"
                wrapperClassName="md:h-1/2 md:bg-radial md:from-[#2562A7] md:via-[#2562A700] md:via-[70%] md:to-transparent"
            >
                <div className="md:mt-10">
                    <IconButton href="/safety#newsletter" title="Start your Journey" iconAnimate={false} />
                </div>
            </PageHeaderWithFullBanner>
            <div className="h-48 bg-gradient-to-b from-[#000000] to-[#00000000]" />
            <UPSection className="-mt-44 md:-mt-32 flex flex-col gap-2 inter-font text-white">
                <div className="max-md:order-2 flex flex-col gap-2">
                    <h2 className="text-3xl xl:text-4xl mb-3">What is <strong>Ayahuasca?</strong></h2>
                    <p className="font-medium">Ayahuasca is a sacred plant medicine made from the Psychotria viridis shrub and Banisteriopsis caapi vine. Traditionally used by Amazonian tribes for spiritual and healing ceremonies, it remains a key part of many spiritual practices today.</p>
                    <p className="font-medium">During preparation, the plants are carefully boiled and reduced into a powerful brew, which is then consumed under the guidance of an experienced healer (curandero) in a ceremonial setting. The drink is known for its deep introspective and transformative effects. <br />Ayahuasca is also referred to as "yagé" or "the medicine" in various traditions.</p>
                </div>
                <div className="max-md:order-1 max-md:mb-5 mt-5 flex justify-center md:px-10">
                    <YouTubeBanner className="md:h-100 lg:h-120 md:max-w-full w-full" />
                </div>
            </UPSection>
            <UPSection className="flex flex-col gap-2 inter-font text-white">
                <h2 className="text-3xl xl:text-4xl mb-3">Understanding <strong>Ayahuasca</strong></h2>
                <p className="font-medium">Ayahuasca is a sacred plant medicine originating from the Amazon, made from the Psychotria viridis shrub and Banisteriopsis caapi vine. Traditionally used in spiritual ceremonies, it has gained popularity for personal growth, healing, and transformation.</p>
                <p className="font-medium">While Ayahuasca can offer profound insights, it is essential to approach it with awareness and preparation to ensure a safe experience.</p>
            </UPSection>
            <SwiperCardsRowSection
                cardAnimate
                title={cardsRowSectionData1.title}
                footer={cardsRowSectionData1.footer}
                cardList={cardsRowSectionData1.cardList}
                breakpoints={{
                    768: {
                        slidesPerView: 2
                    },
                    1280: {
                        slidesPerView: 4
                    }
                }}
                cardClassName="bg-gradient-to-b from-[#7B0808] to-[#360303] h-68 md:h-72 xl:h-85 overflow-x-hidden"
            />
            <SwiperCardsRowSection
                cardAnimate
                title={cardsRowSectionData2.title}
                description={cardsRowSectionData2.description}
                cardList={cardsRowSectionData2.cardList}
                breakpoints={{
                    768: {
                        slidesPerView: 2
                    },
                    1280: {
                        slidesPerView: 4
                    }
                }}
                cardClassName="bg-gradient-to-b from-[#36870B] to-[#153902] h-68 md:h-72 xl:h-85 overflow-x-hidden"
            />
            <UPSection className="max-lg:mt-5 lg:py-8 flex flex-row-reverse max-lg:flex-col max-lg:items-center gap-5 lg:gap-10 inter-font text-white">
                <Image
                    src="/image/Bufo.png"
                    width={466}
                    height={466}
                    alt="13-jpg"
                    className="max-lg:w-full max-lg:max-w-[350px] w-[33%] min-w-[270px] max-w-[380px] xl:max-h-[400px] object-cover h-auto rounded-tl-[5rem] rounded-tr-xl rounded-bl-xl rounded-br-[5rem] shadow-2xl"
                />
                <div className="flex-1 flex flex-col gap-5 lg:gap-8 max-lg:items-center">
                    <h1 className="w-full text-3xl xl:text-4xl">Staying Safe During the <strong>Ceremony</strong></h1>
                    <ul className="font-medium flex flex-col gap-2 justify-between h-full">
                        <p>During the ceremony, follow these safety measures</p>
                        <li><strong className="underline text-xl">Trust the process</strong> – Surrender to the experience, even if emotions feel overwhelming. Trust that healing unfolds naturally through visions, insights, and deep introspection, leading to personal growth and transformation.</li>
                        <li><strong className="underline text-xl">Listen to the facilitator</strong> – Follow guidance carefully to ensure a safe, supportive, and meaningful experience.</li>
                        <li><strong className="underline text-xl">Stay hydrated</strong> – Drink water in moderation to prevent dehydration. However, avoid excessive consumption before or during the ceremony, as it may disrupt the process or lead to discomfort.</li>
                        <li><strong className="underline text-xl">Respect the group and space</strong> – Maintain silence, be mindful, and honor the ceremony’s sacred environment.</li>
                        <li><strong className="underline text-xl">Seek support when needed</strong> – If overwhelmed, communicate with the facilitator or support staff.</li>
                    </ul>
                </div>
            </UPSection>
            <UPSection className="flex flex-col gap-5 inter-font text-white">
                <h2 className="text-3xl xl:text-4xl">Choosing the Right <strong>Ayahuasca Retreat</strong></h2>
                <div className="flex flex-col gap-3">
                    <p className="font-medium">Selecting the right Ayahuasca retreat is just as important as deciding to take part in the experience itself. Not all retreats or ceremonies are the same, so evaluating your options carefully ensures a safe and meaningful journey. Here are key factors to consider:</p>
                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-10 xl:gap-15">
                        <AnimatedCard
                            title="Legality"
                            className="max-[33rem]:h-86 md:h-96 xl:h-80"
                            description="Ayahuasca is illegal in some countries, including the U.S., where most retreats operate underground. While some may be reputable, attending an illegal ceremony poses risks. Opting for a legal retreat ensures a safer, more authentic experience."
                        />
                        <AnimatedCard
                            title="Location"
                            className="max-[33rem]:h-86 md:h-96 xl:h-80"
                            description="Choose a destination that resonates with your spirit and aligns with your values—somewhere that offers a safe, supportive, and legally-compliant environment for deep inner work. Look for places known for their natural beauty, cultural richness, and well-established retreat communities that honor tradition and promote personal transformation."
                        />
                    </div>
                </div>
            </UPSection>
            <UPSection className="flex flex-col gap-5 inter-font text-white">
                <div className="flex justify-center rounded-2xl overflow-hidden">
                    <Image
                        src="/image/16.jpg"
                        width={1392}
                        height={622}
                        alt="16-jpg"
                        className="object-cover w-full min-w-180 h-auto max-md:max-h-120 max-h-150"
                    />
                </div>
                <h2 className="text-3xl xl:text-4xl">Embracing a <strong>Safe & Transformative Journey</strong></h2>
                <p className="font-medium">A safe and well-prepared Ayahuasca experience has the potential to foster deep personal growth, emotional healing, and spiritual transformation. To fully benefit from this journey, it is essential to choose a reputable retreat center with experienced facilitators, proper health screenings, and established safety protocols. Adequate preparation, including dietary restrictions, mental readiness, and understanding the cultural significance of the brew, can enhance the experience and reduce risks. Equally important is the integration process, where reflecting on insights, seeking support, and applying lessons to daily life help solidify long-term positive changes. By prioritizing these factors, you can approach this sacred journey with confidence, awareness, and deep respect.</p>
            </UPSection>
            <NewsLetter id="newsletter" className="mt-10" />
            <Footer />
        </main>
    )
}

export default SafetyPage;