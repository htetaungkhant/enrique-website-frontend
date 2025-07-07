import { SwiperSlide, } from "swiper/react";

import Card from "@/components/common/Card";
import { SwiperCardsRowSection, SwiperWrapper } from "@/components/common/CardsRowSection";
import Explanation from "@/components/common/Explanation";
import Footer from "@/components/common/Footer";
import { UniformInfoSection } from "@/components/common/InfoSection";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import UPSection from "@/components/common/UniformPaddingSection";

const cardsRowSectionData1 = {
    title: 'The Benefits of Yoga',
    cardList: [
        {
            badgeText: "Benefits",
            title: 'Physical Health',
            description: "Increases flexibility, strength, and balance, improving overall body function.",
        },
        {
            badgeText: "Benefits",
            title: 'Mental Clarity',
            description: "Reduces stress, anxiety, and mental fog, enhancing concentration, , focus, clarity, cognitive function, and overall well-being.",
        },
        {
            badgeText: "Benefits",
            title: 'Emotional Stability',
            description: "Enhances patience, resilience, self-awareness, mindfulness, stress management, adaptability, emotional control, and inner peace.",
        },
        {
            badgeText: "Benefits",
            title: 'Spiritual Awakening',
            description: "Expands consciousness, deepens intuition, fosters mindfulness, strengthens faith, and enhances gratitude.",
        },
        {
            badgeText: "Benefits",
            title: 'Longevity & Vitality',
            description: "Boosts immunity, increases stamina, improves digestion, balances hormones, and enhances circulation.",
        }
    ]
}

const cardsRowSectionData3 = {
    title: 'Preparation for Your Yoga Journey',
    cardList: [
        {
            badgeText: "Preparation",
            title: 'Breathwork',
            description: "Engage in slow, deep breathing exercises to calm the mind, center focus, regulate emotions, and enhance energy flow.",
        },
        {
            badgeText: "Preparation",
            title: 'Diet & Hydration',
            description: "Consume nutrient-rich, light meals and stay hydrated to improve digestion, sustain energy levels, and support physical endurance.",
        },
        {
            badgeText: "Preparation",
            title: 'Setting Intentions',
            description: "Reflect deeply on personal growth, mindfulness, gratitude, and goals to create a meaningful, focused, and transformative yoga practice.",
        },
        {
            badgeText: "Preparation",
            title: 'Journaling',
            description: "Write about emotions, progress, and reflections before and after practice to develop self-awareness, clarity, and deeper personal insights.",
        },
        {
            badgeText: "Preparation",
            title: 'Meditation',
            description: "Sit quietly, focus on breath, cultivate inner peace, and align thoughts, emotions, and intentions for a centered practice.",
        }
    ]
}

const cardsRowSectionData4 = {
    title: 'The Importance of Integration',
    cardList: [
        {
            badgeText: "Integration",
            title: 'Daily Practice',
            description: "Dedicate 10-15 minutes daily to yoga for improved flexibility, strength, focus, emotional balance, relaxation, and overall well-being.",
        },
        {
            badgeText: "Integration",
            title: 'Mindfulness Off the Mat',
            description: "Apply yoga principles to daily interactions, thoughts, decisions, work, relationships, and challenges for greater awareness, patience, and harmony.",
        },
        {
            badgeText: "Integration",
            title: 'Self Reflection',
            description: "Maintain a journal to track emotions, progress, insights, struggles, breakthroughs, and personal growth, deepening your connection to your practice.",
        },
        {
            badgeText: "Integration",
            title: 'Community Support',
            description: "Engage in yoga classes, online groups, or discussions to share experiences, seek motivation, gain knowledge, and cultivate meaningful connections.",
        }
    ]
}

const YogaPage = () => {
    return (
        <main>
            <PageHeaderWithBanner title="Yoga">
                <div className="flex flex-col gap-2 text-sm md:text-base lg:text-lg xl:text-xl font-medium">
                    <p className="px-5">"Yoga is the journey of the self, through the self, to the self.",</p>
                    <p className="px-5 md:px-2 text-right">— The Bhagavad Gita</p>
                </div>
            </PageHeaderWithBanner>
            <div className="h-32 bg-gradient-to-b from-[#000000] to-[#00000000]" />
            <UniformInfoSection image="/image/ayahuasca-cut.png" reverse={true} className="-mt-24">
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">The Rising Demand for Yoga</h2>
                <div className="text-white inter-font flex flex-col gap-6">
                    <p>In today’s fast-paced world, stress, anxiety, and mental fatigue have become the norm. People across the globe are searching for ways to reconnect with themselves, and yoga has emerged as one of the most powerful tools for self-care, wellness, and transformation.</p>
                    <p>According to global wellness trends, yoga has experienced an exponential rise in popularity over the past two decades. From corporate wellness programs to therapy-based yoga classes, people from all walks of life are embracing its profound benefits.</p>
                    <p>Medical experts, mental health professionals, and fitness enthusiasts alike are recognizing the impact of yoga not only on physical health but also on emotional resilience, mental clarity, and spiritual awareness.<br />Having a structured approach and learning from skilled teachers is key to unlocking the full potential of yoga—whether for health, stress relief, or personal growth.</p>
                </div>
            </UniformInfoSection>
            <UniformInfoSection image="/image/OtherSomaticPractices.png">
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">What is Yoga?</h2>
                <div className="text-white inter-font flex flex-col gap-6">
                    <p>Yoga is an ancient practice, originating in India over 5,000 years ago as part of the Vedic tradition. It is much more than a physical exercise; it is a holistic system of well-being that unites the body, mind, and spirit. <br />At its core, yoga is a way of life, encompassing physical postures (asanas), breath control (pranayama), meditation (dhyana), mindfulness, and ethical principles.</p>
                    <ul className="pl-3 list-disc">
                        <p className="-ml-3">Different styles of yoga cater to different needs:</p>
                        <li><strong>Hatha Yoga –</strong> Focuses on foundational postures and breathing techniques.</li>
                        <li><strong>Vinyasa Yoga –</strong> A dynamic flow of movements synchronized with breath.</li>
                        <li><strong>Ashtanga Yoga –</strong> A structured, rigorous practice for strength and endurance.</li>
                        <li><strong>Kundalini Yoga –</strong> Awakens energy through breath, sound, and movement.</li>
                        <li><strong>Yin Yoga –</strong> Slow-paced, deep stretching for relaxation and flexibility.</li>
                        <li><strong>Bhakti Yoga –</strong> A devotional path based on love and surrender.</li>
                        <li><strong>Jnana Yoga –</strong> The pursuit of wisdom and self-inquiry.</li>
                        <li><strong>Raja Yoga –</strong> Meditation and mental discipline for spiritual enlightenment.</li>
                    </ul>
                    <p>Regardless of the path chosen, yoga provides a gateway to inner peace, self-awareness, and transformation.</p>
                </div>
            </UniformInfoSection>
            <Explanation title="What If Inner Peace Was Always Within You?">
                <div className="flex flex-col gap-4 text-sm font-medium">
                    <p>What if everything you seek—happiness, fulfillment, clarity—was already inside you?</p>
                    <p>What if the stress, doubt, and restlessness were only illusions created by the mind?</p>
                    <p>Imagine discovering that peace is not something to be found but something to be uncovered. <br />This is what yoga reveals—a return to your true nature of balance, joy, and serenity.</p>
                </div>
            </Explanation>
            <SwiperCardsRowSection
                cardAnimate
                title={cardsRowSectionData1.title}
                cardList={cardsRowSectionData1.cardList}
                breakpoints={{
                    768: {
                        slidesPerView: 3
                    },
                    1280: {
                        slidesPerView: 5
                    }
                }}
                cardClassName="bg-gradient-to-r from-[#1B7857] to-[#59A331] h-52 md:h-60 lg:h-72 overflow-x-hidden"
            />
            <UniformInfoSection image="/image/OtherSomaticPractices.png" reverse={true}>
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">Science Backs the Power of Yoga</h2>
                <div className="flex flex-col gap-6">
                    <p className="text-white inter-font">Scientific research is validating the ancient wisdom of yoga. Institutions like Harvard Medical School, Johns Hopkins University, and the National Institutes of Health have conducted studies proving yoga’s effectiveness in reducing stress, improving heart health, and enhancing brain function. <br />Yoga has been shown to:</p>
                    <ul className="pl-3 list-disc text-white inter-font">
                        <li>Lower cortisol levels (stress hormone).</li>
                        <li>Improve blood circulation and cardiovascular health.</li>
                        <li>Enhance mental focus and memory retention.</li>
                        <li>Support immune system function.</li>
                        <li>Aid in pain management (especially for arthritis, migraines, and back pain).</li>
                    </ul>
                </div>
            </UniformInfoSection>
            <UPSection>
                <SwiperWrapper className="text-white inter-font">
                    <SwiperSlide>
                        <Card className="h-[36rem] xl:h-[26rem] overflow-x-hidden bg-gradient-to-r from-[#1B7857] to-[#59A331]">
                            <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl">Potential Drawbacks of Yoga</h2>
                            <p>While yoga has countless benefits, it’s important to approach it mindfully:<br />
                                ❌ <strong>Risk of Injury</strong> – Without proper guidance, certain poses can lead to strain or injury.<br />
                                ❌ <strong>Superficial Approach</strong> – Many focus only on physical fitness, neglecting yoga’s deeper benefits.<br />
                                ❌ <strong>Cultural Appropriation</strong> – Yoga’s spiritual depth is often lost in commercialization.<br />
                                ❌ <strong>Emotional Release</strong> – Deep practices can bring up past trauma, requiring proper integration.<br />
                                A well-guided practice ensures a safe and enriching experience.
                            </p>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className="h-[36rem] xl:h-[26rem] overflow-x-hidden bg-gradient-to-r from-[#1B7857] to-[#59A331]">
                            <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl">Understanding the Yoga Practice</h2>
                            <p>Yoga unites body, mind, and spirit through movement, breathwork, meditation, and mindfulness.</p>
                            <ul className="list-disc pl-3">
                                <li><strong>Asanas (Postures)</strong>: Improve flexibility, build strength, enhance balance, support posture, increase mobility, prevent injuries.</li>
                                <li><strong>Pranayama (Breathwork)</strong>: Regulates energy, calms mind, improves focus, enhances vitality, reduces stress, balances emotions.</li>
                                <li><strong>Meditation</strong>: Cultivates awareness, deepens concentration, promotes peace, reduces anxiety, enhances clarity, fosters mindfulness.</li>
                                <li><strong>Philosophy</strong>: Teaches wisdom, guides ethics, promotes mindfulness, encourages compassion, inspires growth, nurtures balance.</li>
                            </ul>
                            <p>These principles promote balance, vitality, and longevity.</p>
                        </Card>
                    </SwiperSlide>
                </SwiperWrapper>
            </UPSection>
            <SwiperCardsRowSection
                cardAnimate
                title={cardsRowSectionData3.title}
                cardList={cardsRowSectionData3.cardList}
                breakpoints={{
                    768: {
                        slidesPerView: 3
                    },
                    1280: {
                        slidesPerView: 5
                    }
                }}
                twBadgeBorderColor="border-[#212A63]"
                twBadgeTextColor="text-[#212A63]"
                cardClassName="text-[#212A63] h-56 md:h-64 lg:h-80 overflow-x-hidden"
            />
            <Explanation title="What Happens During Yoga?">
                <div className="flex flex-col gap-4 text-sm font-medium">
                    <p>As you flow through postures and breathwork, you become more aware of your body, breath, and emotions.</p>
                    <p>With time, yoga cultivates a sense of mindfulness, balance, and inner peace.</p>
                    <p>Through regular practice, you experience clarity, harmony, and deeper self-connection.</p>
                </div>
            </Explanation>
            <SwiperCardsRowSection
                cardAnimate
                title={cardsRowSectionData4.title}
                cardList={cardsRowSectionData4.cardList}
                breakpoints={{
                    768: {
                        slidesPerView: 2
                    },
                    1280: {
                        slidesPerView: 4
                    }
                }}
                twBadgeBorderColor="border-[#212A63]"
                twBadgeTextColor="text-[#212A63]"
                cardClassName="text-[#212A63] h-48 md:h-60 lg:h-72 overflow-x-hidden"
            />
            <UniformInfoSection image="/image/OtherSomaticPractices.png">
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">Embracing the Yoga Path</h2>
                <p className="text-white inter-font">Yoga is not just an exercise—it is a profound journey toward self-discovery, inner peace, and holistic well-being. Through the integration of movement, breath, and awareness, yoga harmonizes the body, mind, and spirit, fostering a deeper connection to oneself and the world. It cultivates mindfulness, resilience, and emotional balance, helping individuals navigate life with greater clarity and purpose. Regular practice enhances flexibility, strength, and vitality while also promoting mental focus and stress relief. By embracing yoga as a way of life, you awaken your true essence, unlock inner potential, and experience a life filled with purpose, joy, and fulfillment.</p>
            </UniformInfoSection>
            <Footer className="mt-10" />
        </main>
    )
}

export default YogaPage;