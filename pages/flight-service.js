import Image from "next/image";

import { PageHeaderWithFullBanner } from "@/components/common/PageHeader";
import UPSection from "@/components/common/UniformPaddingSection";
import { SwiperCardsRowSection } from "@/components/common/CardsRowSection";
import CardGridSection from "@/components/common/AnimatedCardsGridSection";
import NewsLetter from "@/components/common/NewsLetter";
import Footer from "@/components/common/Footer";

const cardsRowSectionData1 = {
    title: {
        __html: '<span style="font-weight: 300;">Exclusive</span> VIP Retreat Experience'
    },
    cardList: [
        {
            badgeText: "Services",
            title: 'On-Site & Fly-to-Destination Services',
            description: "Select our retreat venue or invite our facilitators to bring transformative healing directly to your chosen location.",
        },
        {
            badgeText: "Services",
            title: 'Fully Customizable Experience',
            description: "Tailor-made ceremonies and therapies ensure a deeply personal healing journey, addressing your unique spiritual and emotional needs.",
        },
        {
            badgeText: "Services",
            title: 'Comprehensive Logistics Planning',
            description: "From sacred medicine preparation to security, we meticulously manage every detail for a seamless retreat experience.",
        },
        {
            badgeText: "Services",
            title: 'Exclusive Travel & Lodging',
            description: "Enjoy first-class flights, private transportation, and exquisite villas designed for unparalleled relaxation and comfort.",
        },
        {
            badgeText: "Services",
            title: 'Pre-Retreat Consultation',
            description: "Engage in a thorough discussion to align intentions, set goals, and personalize your transformative healing journey.",
        }
    ]
}

const cardsRowSectionData2 = {
    title: {
        __html: '<span style="font-weight: 300;">Personalized Ceremony &</span> Integration Support'
    },
    description: "Our holistic approach ensures a lasting transformation by providing personalized guidance, structured integration support, and ongoing care, helping you deeply process experiences and sustain long-term healing and personal growth.",
    cardList: [
        {
            badgeText: "Retreat",
            title: 'One-on-One Facilitator Support',
            description: "Receive personalized guidance from experienced facilitators, ensuring a safe, supportive, and deeply transformative healing journey.",
        },
        {
            badgeText: "Retreat",
            title: 'Guided Reflection & Post-Ceremony Integration',
            description: "Structured sessions help process insights, emotions, and experiences, fostering clarity, growth, and lasting inner transformation.",
        },
        {
            badgeText: "Retreat",
            title: 'Follow-Up Support',
            description: "Ongoing online consultations provide continuous guidance, ensuring long-term well-being and integration into everyday life.",
        },
        {
            badgeText: "Retreat",
            title: 'Sharing Circle & Cacao Ceremony',
            description: "A sacred closing ritual that fosters connection, self-reflection, and shared healing in a nurturing environment.",
        },
    ]
}

const cardGridSection = {
    title: {
        __html: 'Safety & <strong style="font-weight: 600;">Preparation</strong>'
    },
    description: "Your well-being is our highest priority. We ensure a secure, supportive, and well-prepared environment so you can fully immerse yourself in your healing journey with peace of mind. Our meticulous safety measures include",
    data: [
        {
            firstRow: {
                title: "Comprehensive Medical Screening",
                description: (
                    <>
                        <p>Before your retreat, we conduct a thorough health assessment to determine your suitability for the experience. Our screening process includes:</p>
                        <ul className="list-disc pl-5">
                            <li>Reviewing medical history and any pre-existing conditions.</li>
                            <li>Assessing psychological readiness for plant medicine ceremonies.</li>
                            <li>Providing personalized guidance on physical and mental preparation.</li>
                        </ul>
                    </>
                ),
            },
            secondRow: {
                title: "Guided Detox & Preparation Plan",
                description: "To optimize your experience and help you fully receive the benefits of the ceremonies, we provide personalized detox and wellness recommendations before your arrival.",
            },
        },
        {
            firstRow: {
                title: "On-Site Medical & Emergency Support",
                description: (
                    <>
                        <p>Your safety during the retreat is paramount. We have a trained medical professional and paramedic on-site, ensuring immediate response to any health concerns. Our safety measures include:</p>
                        <ul className="list-disc pl-5">
                            <li>A dedicated wellness professional available 24/7.</li>
                            <li>Emergency response plans in place for any unforeseen situations.</li>
                        </ul>
                    </>
                ),
            },
            secondRow: {
                title: "Personalized Intention Setting",
                description: (
                    <>
                        <p>Setting clear intentions is an essential part of the journey. Before your retreat, you’ll receive one-on-one consultations with an experienced facilitator to:</p>
                        <ul className="list-disc pl-5">
                            <li>Define personal goals and expectations for the retreat.</li>
                            <li>Develop a mindful approach to engaging with sacred plant medicine.</li>
                        </ul>
                    </>
                ),
            },
        },
    ]
}

const FlightServicePage = () => {
    return (
        <main>
            <PageHeaderWithFullBanner
                title="Embark on an exclusive journey of luxury and deep healing"
                description="where sacred traditions meet ultimate comfort for a truly transformative experience."
                bannerImg="/image/flight-services-banner.png"
                className="max-md:h-[80vh]"
            />
            <div className="h-48 bg-gradient-to-b from-[#000000] to-[#00000000]" />
            <UPSection className="-mt-44 md:-mt-32 flex flex-col gap-2 inter-font text-white">
                <h2 className="text-3xl xl:text-4xl mb-3">Transformative <strong>Retreat Experiences</strong></h2>
                <p className="font-medium">Aya Master Plant is a sacred plant medicine made from the Psychotria viridis shrub and Banisteriopsis caapi vine. Traditionally used by Amazonian tribes for spiritual and healing ceremonies, it remains a key part of many spiritual practices today.</p>
                <p className="font-medium">This exclusive private retreat is designed for individuals seeking deep healing and transformation through sacred plant medicines and holistic wellness practices. Our highly personalized services ensure a profound and life-changing journey. <br />Our healing retreat includes a variety of traditional and holistic practices:</p>
                <div className="flex max-md:flex-col max-md:gap-5 gap-10">
                    <div className="max-md:order-2 flex-1 text-[#212A63] px-2 py-2 lg:px-3 lg:py-3 xl:px-6 xl:py-8 bg-gradient-to-b from-[#D7F2D5] to-[#5C8959] rounded-xl">
                        <ul className="h-full flex flex-col justify-between font-medium">
                            <li><strong className="text-xl">Kambo Cleansing</strong> – An Amazonian detox ritual for immunity and energy balance</li>
                            <li><strong className="text-xl">Toad Medicine (5 MeO)</strong> – A one-on-one journey with the 'God molecule' for profound spiritual awakening.</li>
                            <li><strong className="text-xl">Aya Master Plant Ceremonies</strong> – Sacred plant medicine sessions for deep emotional healing and higher self-connection.</li>
                            <li><strong className="text-xl">Yoga & Meditation</strong> –Daily guided practices to restore balance and mindfulness.</li>
                            <li><strong className="text-xl">Breathwork Therapy</strong> –  Techniques to release trauma, reduce stress, and elevate consciousness.</li>
                            <li><strong className="text-xl">Holistic Massages</strong> – Therapeutic bodywork for relaxation and energy alignment.</li>
                            <li><strong className="text-xl">Sound Healing & Cacao Ceremonies</strong> – Ancient rituals to deepen self-awareness and emotional connection.</li>
                        </ul>
                    </div>
                    <Image
                        src="/image/12.png"
                        width={532}
                        height={566}
                        alt="12"
                        className="max-md:order-1 w-full md:w-[38%] md:max-w-[380px] md:max-h-[500px] min-h-[350px] md:min-h-[400px] h-auto rounded-xl shadow-lg object-cover"
                    />
                </div>
            </UPSection>
            <SwiperCardsRowSection
                title={cardsRowSectionData1.title}
                cardList={cardsRowSectionData1.cardList}
                breakpoints={{
                    768: {
                        slidesPerView: 3
                    },
                    1024: {
                        slidesPerView: 4
                    },
                    1280: {
                        slidesPerView: 5
                    }
                }}
                cardTitleClassName="lg:text-lg xl:text-2xl"
                cardDescriptionClassName="md:text-xs"
                cardClassName="bg-gradient-to-r from-[#1B7857] to-[#59A331] h-52 md:h-60 lg:h-72 overflow-x-hidden"
            />
            <CardGridSection
                title={cardGridSection.title}
                description={cardGridSection.description}
                data={cardGridSection.data}
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                    }
                }}
                cardClassName="h-100 md:h-[26rem] lg:h-108 xl:h-78"
            />
            <UPSection className="max-md:mt-5 lg:py-8 flex max-md:flex-col max-md:items-center gap-5 md:gap-10 inter-font text-white">
                <Image
                    src="/image/13.jpg"
                    width={466}
                    height={466}
                    alt="13-jpg"
                    className="max-md:w-full max-md:max-w-[350px] w-[33%] min-w-[270px] max-w-[300px] h-auto rounded-tl-lg rounded-tr-2xl rounded-bl-2xl rounded-br-lg"
                />
                <div className="flex-1 flex flex-col gap-5 md:gap-8 max-md:items-center">
                    <h1 className="w-full text-3xl xl:text-4xl">Luxury Accommodations & <strong>Wellness Service</strong></h1>
                    <ul className="font-medium flex flex-col gap-2 justify-between h-full">
                        <li><strong className="underline text-xl">Exclusive Villas or Eco-Resorts</strong> – Luxurious, secluded accommodations offering peace, privacy, and comfort for deep relaxation and healing.</li>
                        <li><strong className="underline text-xl">Gourmet Organic Meals</strong> – Nourishing, chef-crafted meals designed to enhance your well-being and support your healing journey.</li>
                        <li><strong className="underline text-xl">Dedicated Healing Spaces</strong> – Sacred, tranquil areas curated for meditation, spiritual ceremonies, and deep personal reflection.</li>
                        <li><strong className="underline text-xl">Personalized Wellness Therapies</strong> –Customized sessions including yoga, massage, and breathwork to restore balance and inner harmony.</li>
                    </ul>
                </div>
            </UPSection>
            <SwiperCardsRowSection
                title={cardsRowSectionData2.title}
                description={cardsRowSectionData2.description}
                cardList={cardsRowSectionData2.cardList}
                breakpoints={{
                    768: {
                        slidesPerView: 3
                    },
                    1024: {
                        slidesPerView: 4
                    },
                }}
                cardTitleClassName="lg:text-lg xl:text-2xl"
                cardDescriptionClassName="md:text-xs"
                cardClassName="bg-gradient-to-r from-[#1B7857] to-[#59A331] h-56 md:h-60 lg:h-72 overflow-x-hidden"
            />
            <UPSection className="max-md:mt-5 lg:py-8 flex flex-row-reverse max-md:flex-col max-md:items-center gap-5 md:gap-10 inter-font text-white">
                <Image
                    src="/image/14.png"
                    width={466}
                    height={466}
                    alt="13-jpg"
                    className="max-md:w-full max-md:max-w-[350px] w-[33%] min-w-[270px] max-w-[300px] h-auto rounded-tl-lg rounded-tr-2xl rounded-bl-2xl rounded-br-lg"
                />
                <div className="flex-1 flex flex-col gap-5 md:gap-8 max-md:items-center">
                    <h1 className="w-full text-3xl xl:text-4xl">Exclusive <strong>High-End Offerings</strong></h1>
                    <ul className="font-medium flex flex-col gap-2 justify-between h-full">
                        <li><strong className="underline text-xl">Bespoke Excursions</strong> – Immerse in nature, culture, and private beach experiences designed for relaxation and personal growth.</li>
                        <li><strong className="underline text-xl">Advanced Energy Healing & Somatic Therapies</strong> – Experience specialized treatments that promote deep energetic alignment, emotional release, and holistic well-being.</li>
                        <li><strong className="underline text-xl">Personal Wellness Concierge</strong> – A dedicated team ensures personalized attention, catering to your needs for a seamless retreat experience.</li>
                        <li><strong className="underline text-xl">Custom Retreat Schedules</strong> – Tailor your experience with additional healing modalities and exclusive services to enhance transformation.</li>
                    </ul>
                </div>
            </UPSection>
            <UPSection className="flex flex-col gap-2 inter-font text-white">
                <h2 className="text-3xl xl:text-4xl mb-3">How to Book Your <strong>VIP Healing Retreat</strong></h2>
                <p className="font-medium">Due to the exclusivity of our services, all bookings undergo a comprehensive consultation process to ensure a highly personalized retreat experience tailored to each guest’s unique healing and transformational needs.</p>
                <div className="flex max-md:flex-col max-md:gap-5 gap-10">
                    <Image
                        src="/image/15.png"
                        width={532}
                        height={566}
                        alt="12"
                        className="w-full md:w-[38%] md:max-w-[380px] md:max-h-[500px] min-h-[350px] md:min-h-[400px] h-auto rounded-xl shadow-lg object-cover"
                    />
                    <div className="flex-1 text-[#212A63] px-2 py-2 lg:px-3 lg:py-3 xl:px-6 xl:py-6 bg-gradient-to-b from-[#D7F2D5] to-[#5C8959] rounded-xl">
                        <div className="max-md:h-full flex flex-col max-md:gap-6 gap-8 justify-between font-medium">
                            <div className="flex flex-col gap-2">
                                <h4 className="text-xl font-bold">Step 1: Submit an Inquiry</h4>
                                <p>Share your expectations, preferences, and desired retreat location to begin your personalized journey</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-xl font-bold">Step 2: Align the Experience</h4>
                                <p>Customize the retreat to match your unique spiritual, emotional, and healing needs for transformation.</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-xl font-bold">Step 3: Finalize Arrangements</h4>
                                <p>Confirm travel, accommodations, and ceremonies to ensure a seamless and enriching retreat experience.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </UPSection>
            <NewsLetter className="mt-10" />
            <Footer />
        </main>
    )
}

export default FlightServicePage;