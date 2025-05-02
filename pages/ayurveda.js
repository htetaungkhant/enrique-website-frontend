import { SwiperSlide, } from "swiper/react";

import Card from "@/components/common/Card";
import { SwiperCardsRowSection, SwiperWrapper } from "@/components/common/CardsRowSection";
import Explanation from "@/components/common/Explanation";
import Footer from "@/components/common/Footer";
import { UniformInfoSection } from "@/components/common/InfoSection";
import ListCard from "@/components/common/ListCard";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import UPSection from "@/components/common/UniformPaddingSection";

const listCardData = {
    title: "The Benefits of Ayurveda",
    list: [
        '<strong>Personalized Healthcare –</strong> Recognizes your unique body type and needs.',
        '<strong>Digestive Health –</strong> Ayurveda places gut health at the core of well-being.',
        '<strong>Natural Detoxification –</strong> Eliminates toxins (Ama) through herbs and diet.',
        '<strong>Emotional Well-being –</strong> Balances the mind and promotes mental clarity.',
        '<strong>Immune Support –</strong> Strengthens the body\'s natural defence mechanisms.',
        '<strong>Longevity & Vitality –</strong> Focuses on slow aging, energy renewal, and cellular health.',
    ],
    image: "/image/BenefitsOfAyurveda.png"
}

const cardsRowSectionData = {
    title: 'What Happens During an Ayurvedic Healing Session?',
    cardList: [
        {
            badgeText: "Healing",
            title: 'Pulse Diagnosis (Nadi Pariksha)',
            description: "Analyzing subtle pulse variations to assess energy imbalances, organ functions, emotional health, and detect early signs of potential diseases.",
        },
        {
            badgeText: "Healing",
            title: 'Dosha Analysis',
            description: "Determining individual body constitution to design personalized diet, lifestyle, and wellness practices for restoring balance and long-term health improvement.",
        },
        {
            badgeText: "Healing",
            title: 'Dietary Adjustments',
            description: "Customizing food choices to optimize digestion, strengthen immunity, improve metabolism, enhance energy levels, and maintain a balanced, disease-free body.",
        },
        {
            badgeText: "Healing",
            title: 'Herbal Prescriptions',
            description: "Utilizing potent plant-based formulations to support healing, boost immunity, improve mental clarity, restore balance, and promote holistic well-being naturally.",
        },
        {
            badgeText: "Healing",
            title: 'Therapies (Panchakarma)',
            description: "Utilizing potent plant-based formulations to support healing, boost immunity, improve mental clarity, restore balance, and promote holistic well-being naturally.",
        }
    ]
}

const Ayurveda = () => {
    return (
        <main>
            <PageHeaderWithBanner title="Ayurveda">
                <p className="text-sm md:text-base lg:text-lg xl:text-xl font-medium">"When diet is wrong, medicine is of no use,<br />
                    When diet is correct, medicine is not needed."</p>
            </PageHeaderWithBanner>
            <div className="h-32 bg-gradient-to-b from-[#000000] to-[#00000000]" />
            <UniformInfoSection image="/image/ayahuasca-cut.png" reverse={true} className="-mt-24">
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">The Rising Demand for Ayurveda</h2>
                <div className="flex flex-col gap-6">
                    <p className="text-white inter-font">As modern lifestyles become increasingly fast-paced, stress, poor diet, and environmental toxins are contributing to chronic diseases and imbalances. People are turning to Ayurveda—the ancient Indian system of natural healing—as a way to restore balance and harmony.</p>
                    <p className="text-white inter-font">According to global wellness reports, Ayurveda has gained immense popularity in recent years, with a surge in Ayurvedic wellness retreats, herbal supplements, and holistic health practices. From Silicon Valley entrepreneurs to Hollywood celebrities, Ayurveda is being embraced worldwide for its deep healing potential.</p>
                    <p className="text-white inter-font">Medical science is now beginning to recognize the effectiveness of Ayurvedic principles, integrating them into modern healthcare to support digestive health, mental well-being, immunity, and longevity.<br />Having qualified practitioners and a deep understanding of Ayurvedic wisdom ensures safe and effective healing.</p>
                </div>
            </UniformInfoSection>
            <UniformInfoSection image="/image/OtherSomaticPractices.png">
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">What is Ayurveda?</h2>
                <div className="text-white inter-font flex flex-col gap-6">
                    <p>Ayurveda, which means "<strong>The Science of Life</strong>", is a 5,000-year-old holistic healing system from India. Unlike Western medicine, which focuses on treating symptoms, Ayurveda emphasizes preventative care and restoring balance within the body, mind, and spirit.<br />Ayurveda is based on the principle that each individual is unique, and health is achieved when there is balance between the three doshas (bio-energies):</p>
                    <ul className="pl-3 list-disc">
                        <li><strong>Vata (Air & Space)</strong> – Governs movement, creativity, and nervous system functions.</li>
                        <li><strong>Pitta (Fire & Water)</strong> – Controls metabolism, digestion, and transformation.</li>
                        <li><strong>Kapha (Earth & Water)</strong> – Maintains stability, immunity, and nourishment.</li>
                    </ul>
                    <p>Understanding your unique dosha constitution helps determine the right diet, lifestyle, and treatments for optimal health.</p>
                </div>
            </UniformInfoSection>
            <Explanation title="What If True Wellness Was Already Within You?">
                <div className="flex flex-col gap-4 text-sm font-medium">
                    <p>What if health wasn’t something you had to chase, but something that already existed within you—waiting to be balanced and nourished?</p>
                    <p>What if disease was simply a message from your body, guiding you back to harmony?</p>
                    <p>This is what Ayurveda teaches—your body is your greatest healer when given the right environment to thrive.</p>
                </div>
            </Explanation>
            <UPSection>
                <ListCard title={listCardData.title} list={listCardData.list} image={listCardData.image} />
            </UPSection>
            <UniformInfoSection image="/image/OtherSomaticPractices.png" reverse={true}>
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">Science Backs the Power of Ayurveda</h2>
                <div className="flex flex-col gap-6">
                    <p className="text-white inter-font">Modern science is validating what Ayurveda has known for centuries. Prestigious institutions like Harvard Medical School, Stanford, and AIIMS (India) have conducted research on Ayurvedic herbs, showing their benefits in managing inflammation, immunity, stress, and chronic diseases. <br />Some key findings include:</p>
                    <ul className="pl-3 list-disc text-white inter-font">
                        <li><strong>Turmeric (Curcumin)</strong> – Reduces stress hormones (cortisol) and supports adrenal health.</li>
                        <li><strong>Ashwagandha</strong> – Controls metabolism, digestion, and transformation.</li>
                        <li><strong>Triphala</strong> – Aids digestion, detoxification, and gut health.</li>
                        <li><strong>Brahmi</strong> – Enhances memory, cognition, and mental clarity.</li>
                        <li><strong>Neem</strong> – A natural antibacterial and antiviral powerhouse.</li>
                    </ul>
                    <p className="text-white inter-font">As research continues, <strong>Ayurveda is being integrated into mainstream healthcare, offering a natural, preventive, and sustainable approach to wellness.</strong></p>
                </div>
            </UniformInfoSection>
            <Explanation title="Understanding Ayahuasca">
                <div className="flex flex-col gap-4 text-sm font-medium">
                    <p>Ayahuasca is a sacred Amazonian brew crafted from the Banisteriopsis caapi vine and Psychotria viridis leaves. Known for its potent psychoactive effects, it plays a central role in spiritual exploration and healing. The combination of harmala alkaloids and DMT produces profound, transformative experiences, often used in ceremonial settings for deep introspection and personal growth.</p>
                </div>
            </Explanation>
            <UPSection>
                <SwiperWrapper className="text-white inter-font">
                    <SwiperSlide>
                        <Card className="h-[35rem] xl:h-96 overflow-x-hidden bg-gradient-to-r from-[#1B7857] to-[#59A331]">
                            <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl">Potential Drawbacks of Ayurveda</h2>
                            <p>Although Ayurveda is a profound healing system, awareness of certain aspects is crucial:<br />
                                ❌ <strong>Misuse of Herbs</strong> – Without guidance, incorrect dosages can be ineffective or harmful.<br />
                                ❌ <strong>Slow Healing Process</strong> – Ayurveda works holistically, which means results take consistent effort.<br />
                                ❌ <strong>Lack of Standardization</strong> – Some Ayurvedic products in the market lack quality control.<br />
                                ❌ <strong>Detox Reactions</strong> – Some people experience mild cleansing symptoms (e.g., fatigue, skin breakouts) as the body eliminates toxins. When practiced under qualified Ayurvedic guidance, these concerns are minimal.
                            </p>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className="h-[35rem] xl:h-96 overflow-x-hidden bg-gradient-to-r from-[#1B7857] to-[#59A331]">
                            <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl">Understanding the Ayurvedic Lifestyle</h2>
                            <p>Ayurveda isn’t just about taking herbal medicines; it’s a way of life that includes:</p>
                            <ul className="list-disc pl-3">
                                <li><strong>Diet (Ahara)</strong>: Eating according to your dosha and seasonal needs.</li>
                                <li><strong>Daily Routine (Dinacharya)</strong>: Establishing consistent self-care habits.</li>
                                <li><strong>Digestion (Agni)</strong>: Maintaining a strong metabolic fire for optimal health.</li>
                                <li><strong>Detoxification (Panchakarma)</strong>: Cleansing the body of accumulated toxins.</li>
                                <li><strong>Yoga & Meditation</strong>: Integrating movement and mindfulness.</li>
                            </ul>
                            <p>These principles promote balance, vitality, and longevity.</p>
                        </Card>
                    </SwiperSlide>
                </SwiperWrapper>
            </UPSection>
            <SwiperCardsRowSection
                cardAnimate
                title={cardsRowSectionData.title}
                cardList={cardsRowSectionData.cardList}
                breakpoints={{
                    768: {
                        slidesPerView: 3
                    },
                    1280: {
                        slidesPerView: 5
                    }
                }}
                twBadgeBorderColor="border-[#022645]"
                twBadgeTextColor="text-[#022645]"
                twCardClassName="text-[#022645] h-56 md:h-64 lg:h-80 overflow-x-hidden"
            />
            <Explanation title="Spiritual Awakening in Ayurveda">
                <div className="flex flex-col gap-4 text-sm font-medium">
                    <p>Ayurveda isn’t just about physical health—it also nurtures the soul’s journey.</p>
                    <p>Practices like meditation, mantra chanting, and Ayurvedic rituals help in deepening spiritual awareness, making you feel more grounded, centered, and connected to the universe.</p>
                    <p>Many people report enhanced intuition, clarity of purpose, and a deep sense of peace after embracing Ayurveda.</p>
                </div>
            </Explanation>
            <UniformInfoSection image="/image/OtherSomaticPractices.png">
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">Embracing the Ayurvedic Path</h2>
                <p className="text-white inter-font">Ayurveda is more than just a medical system—it is a sacred science that teaches us how to live in harmony with nature. Rooted in ancient wisdom, Ayurveda emphasizes balance in mind, body, and spirit through personalized lifestyle practices, natural remedies, and mindful living. By integrating Ayurvedic principles, herbal wisdom, and daily self-care rituals, you can unlock your body’s natural ability to heal, rejuvenate, and thrive. It offers a holistic approach to wellness, addressing the root causes of imbalance rather than just symptoms. Through proper diet, meditation, and detoxification, Ayurveda promotes long-term vitality, emotional well-being, and inner peace.</p>
            </UniformInfoSection>
            <Footer className="mt-10" />
        </main>
    )
}

export default Ayurveda;