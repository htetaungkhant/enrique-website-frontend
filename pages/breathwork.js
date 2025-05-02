import { SwiperSlide, } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { SwiperCardsRowSection, SwiperWrapper } from "@/components/common/CardsRowSection";
import Footer from "@/components/common/Footer";
import { UniformInfoSection } from "@/components/common/InfoSection";
import ListCard from "@/components/common/ListCard";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import UPSection from "@/components/common/UniformPaddingSection";
import Card from "@/components/common/Card";

const cardsRowSectionData1 = {
    title: 'Preparation for Your Yoga Journey',
    description: 'Shamanic breathwork integrates various breathing techniques, promoting healing, self-discovery, emotional release, spiritual growth, mental clarity, and deep relaxation for overall well-being.',
    cardList: [
        {
            badgeText: "Integration",
            title: 'Holotropic Breathwork',
            description: "Developed by Stanislav Grof, this involves deep, rapid breathing to access unconscious material for healing.",
        },
        {
            badgeText: "Integration",
            title: 'Rebirthing Breathwork',
            description: "A technique designed to release birth trauma, repressed emotions, deep fears, and subconscious blockages.",
        },
        {
            badgeText: "Integration",
            title: 'Box Breathing',
            description: "A slow, controlled technique that reduces anxiety, improves focus, enhances clarity, calms the mind, and promotes emotional stability.",
        },
        {
            badgeText: "Integration",
            title: 'Coherent Breathing',
            description: "A rhythmic practice that promotes heart-brain coherence and relaxation.",
        },
        {
            badgeText: "Integration",
            title: 'Alternate Nostril Breathing',
            description: "A yogic method to balance the nervous system, calm the mind, enhance focus, reduce stress, and promote overall well-being.",
        }
    ],
    footer: 'These practices enhance mental clarity, emotional stability, and spiritual connection.'
}

const cardsRowSectionData2 = {
    title: 'Case Studies: The Transformational Power of Breathwork',
    description: 'Case studies highlight the profound impact of breathwork on emotional healing, stress reduction, and self-awareness. Individuals report overcoming trauma, gaining clarity, and experiencing deep transformation. These real-life stories showcase breathwork’s ability to foster resilience, inner peace, and personal growth.',
    cardList: [
        {
            title: 'Overcoming Fear Through Breathwork',
            description: ["Theo, a man struggling with severe social anxiety, turned to breathwork to uncover and release deep-seated trauma. Through guided sessions, he gradually let go of emotional blockages, allowing him to feel more at ease in social situations.", "This process also gave him the confidence to participate in a Bufo ceremony, an experience that further deepened his healing. Theo’s journey exemplifies how breathwork can unlock emotional freedom and self-acceptance."],
        },
        {
            title: 'My Holotropic Breathwork Journey',
            description: ["Integrating breathwork into my daily routine has transformed my spiritual practice, from Yoga Nidra and Tantric meditation to lucid dreaming.", "At first, I used simple circular breathing techniques to release stress. As I delved deeper, I explored Holotropic Breathwork, inspired by Stanislav Grof’s research on altered states of consciousness. Grof developed this method after LSD research was restricted, proving that profound healing could be achieved through breath alone.", "Holotropic Breathwork has opened new dimensions of my mind, facilitating emotional release and heightened self-awareness."],
        },
    ]
}

const listCardData = {
    title: "Emotional Blockages Encountered During Breathwork",
    description: "During breathwork, individuals often confront deep-seated emotions, including:",
    list: [
        '<strong>Trust Issues –</strong> Stemming from past betrayals, affecting relationships.',
        '<strong>Fear & Anxiety –</strong> Rooted in trauma or uncertainty about the future.',
        '<strong>Guilt & Shame –</strong> Often tied to past mistakes or societal expectations.',
        '<strong>Sadness & Grief –</strong> Unprocessed emotions from loss or disappointment.',
        '<strong>Anger & Resentment –</strong> Suppressed emotions that need release.',
        '<strong>Low Self-Esteem –</strong> Feelings of inadequacy or not being “enough.”',
        '<strong>Abandonment & Rejection –</strong> Fears linked to past experiences.',
        '<strong>Control Issues –</strong> A need to micromanage due to deep insecurities.'
    ],
    footer: "Breathwork allows these emotions to rise and be released, leading to profound healing.",
    image: "/icon/emotional-blockages.png"
}

const cardsRowSectionData3 = {
    cardList: [
        {
            image: "/icon/breathwork-icon.png",
            title: 'Why is Breathwork so Powerful?',
        },
        {
            image: "/icon/breathwork-icon.png",
            title: 'What to Expect in a Breathwork Class?',
        },
        {
            image: "/icon/breathwork-icon.png",
            title: 'Shamanic Breathwork & Psychedelics',
        },
    ]
}

const Breathwork = () => {
    return (
        <main>
            <PageHeaderWithBanner title="Shamanic Breathwork" />
            <div className="h-32 bg-gradient-to-b from-[#000000] to-[#00000000]" />
            <UniformInfoSection image="/image/ayahuasca-cut.png" reverse={true} className="-mt-24">
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">Discover Shamanic Breathwork</h2>
                <div className="text-white inter-font flex flex-col gap-6">
                    <p>Breathwork is more than just a relaxation technique—it is a powerful tool that helps you fully engage with healing experiences such as Bufo ceremonies. It allows for deep emotional release, self-discovery, and transformation. <br />Shamanic breathwork serves as a bridge between your conscious and subconscious mind, supporting you before, during, and after spiritual ceremonies.</p>
                    <ul className="pl-3 list-disc">
                        <li><strong>Before the ceremony</strong>: Breathwork helps prepare your mind and body, aligning your focus and intentions.</li>
                        <li><strong>During the ceremony</strong>: It enhances openness to the medicine, allowing for deeper healing and insights.</li>
                        <li><strong>After the ceremony</strong>: It supports integration, helping you process and retain the lessons learned.</li>
                    </ul>
                    <p>A session with an experienced breathwork facilitator can lead to profound emotional release and lasting personal transformation.</p>
                </div>
            </UniformInfoSection>
            <UniformInfoSection image="/image/OtherSomaticPractices.png">
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">What is Shamanic Breathwork?</h2>
                <div className="text-white inter-font flex flex-col gap-6">
                    <p>Shamanic breathwork is a deep healing practice that blends ancient wisdom with modern therapeutic techniques. Led by a trained facilitator, each session is an immersive journey where individuals release old patterns, heal trauma, and reconnect with their true essence.</p>
                    <p>By consciously working with your breath, you can release emotional blockages, activate healing energies, and access a higher state of awareness.</p>
                    <p>During a session, participants are guided to let go of negative energies and surrender to the natural rhythm of their breath, opening the door to powerful healing.</p>
                </div>
            </UniformInfoSection>
            <UniformInfoSection image="/image/OtherSomaticPractices.png" reverse={true}>
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">The Roots of Shamanic Breathwork</h2>
                <div className="text-white inter-font flex flex-col gap-6">
                    <p className="text-sm"><Link href="https://www.webmd.com/balance/what-is-breathwork" target="_blank" className="text-[#fef15c]">Shamanic Breathwork</Link> has been practiced for thousands of years in various spiritual traditions:</p>
                    <ul className="pl-3 list-disc ">
                        <li><strong>India</strong>: Yogic Pranayama teaches breath control for purification and spiritual balance.</li>
                        <li><strong>China</strong>: Taoist practices like Qigong and Tai Chi integrate breath to promote vitality.</li>
                        <li><strong>Indigenous Cultures</strong>: South American, African, and Australian shamanic traditions use breathwork for healing and altered states of consciousness.</li>
                    </ul>
                    <p>In modern times, breathwork techniques like Holotropic Breathwork and Rebirthing Breathwork have emerged, inspired by both ancient traditions and contemporary psychology. These techniques facilitate deep healing and personal growth by accessing non-ordinary states of consciousness.</p>
                </div>
            </UniformInfoSection>
            <SwiperCardsRowSection
                cardAnimate
                title={cardsRowSectionData1.title}
                description={cardsRowSectionData1.description}
                footer={cardsRowSectionData1.footer}
                cardList={cardsRowSectionData1.cardList}
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
                twCardClassName="text-[#212A63] h-60 md:h-72 lg:h-80 overflow-x-hidden"
            />
            <SwiperCardsRowSection
                title={cardsRowSectionData2.title}
                description={cardsRowSectionData2.description}
                cardList={cardsRowSectionData2.cardList}
                twCardClassName="text-[#394885] h-80 md:h-[28rem] xl:h-80 overflow-x-hidden"
            />
            <UniformInfoSection image="/image/OtherSomaticPractices.png" reverse={true}>
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">A Rebirth Experience: Shamanic Breathwork in Nature</h2>
                <div className="text-white inter-font flex flex-col gap-6">
                    <p>During my first Rebirthing Breathwork retreat in Northern California, I experienced a profound emotional breakthrough.</p>
                    <p>Under a canopy of towering redwoods, I was guided by Mari, a compassionate healer. Through deep breathing, I accessed unresolved traumas and safely released them, feeling lighter and more connected than ever before.</p>
                    <p>This experience reinforced the immense power of breathwork in facilitating inner healing.</p>
                    <p>Note: Rebirthing Breathwork can surface deep emotional wounds. It is not recommended for individuals with epilepsy or severe trauma without professional guidance.</p>
                </div>
            </UniformInfoSection>
            <UPSection>
                <ListCard title={listCardData.title} description={listCardData.description} list={listCardData.list} footer={listCardData.footer} image={listCardData.image} />
            </UPSection>
            <UPSection className="text-white inter-font flex flex-col gap-6">
                <SwiperWrapper
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {
                        cardsRowSectionData3.cardList.map((item, index) => (
                            <SwiperSlide key={index} className="my-1">
                                <Card animate className="bg-radial-[at_50%_90%] from-[#35A92C] from-10%  to-[#76FBCB] to-90% h-56 md:h-72 overflow-x-hidden">
                                    <div className="h-full flex flex-col gap-4 justify-between">
                                        {item.image && (
                                            <motion.div variants={{ initial: { rotate: 0 }, hover: { rotate: 45, transition: { duration: 0.3 } } }} className="w-fit">
                                                <Image src={item.image} className="w-28 h-28 lg:w-32 lg:h-32 object-contain" width={120} height={120} alt="icon" />
                                            </motion.div>
                                        )}
                                        {item.title && <h2 className="font-semibold text-xl lg:text-2xl xl:text-3xl">{item.title}</h2>}
                                    </div>
                                </Card>
                            </SwiperSlide>
                        ))
                    }
                </SwiperWrapper>
            </UPSection>
            <UniformInfoSection image="/image/OtherSomaticPractices.png">
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">The Future of Shamanic Breathwork</h2>
                <div className="text-white inter-font flex flex-col gap-6">
                    <p>Breathwork is becoming an essential tool in wellness retreats, therapy, and personal growth. From improving lung function to fostering emotional resilience, its benefits are vast. <br />By integrating breathwork into daily life, individuals can:</p>
                    <ul className="pl-3 list-disc ">
                        <li>Reduce stress and anxiety.</li>
                        <li>Unlock deep-seated emotional traumas.</li>
                        <li>Enhance self-awareness and spiritual connection.</li>
                    </ul>
                    <p>Whether you are looking to enhance meditation, heal past wounds, or unlock personal transformation, shamanic breathwork is a gateway to self-discovery and renewal.</p>
                </div>
            </UniformInfoSection>
            <Footer className="mt-10" />
        </main >
    )
}

export default Breathwork;