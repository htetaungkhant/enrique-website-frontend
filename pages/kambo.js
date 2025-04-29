import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { UniformInfoSection } from "@/components/common/InfoSection";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import UPSection from "@/components/common/UniformPaddingSection";
import ListCard from "@/components/common/ListCard";
import Footer from "@/components/common/Footer";
import Card from "@/components/common/Card";
import CustomSwiperNavigation from "@/components/common/CustomSwiperNavigation";

const listCardData = {
    title: "11 Essential Things to Know About a Kambo Ceremony",
    list: [
        '<strong>Kambo</strong>  originates from indigenous Amazonian traditions and carries deep cultural significance.',
        'The ceremony can be <strong>physically and emotionally</strong> intense.',
        '<strong>Fasting</strong> is required beforehand to prepare the body.',
        '<strong>Hydration</strong> is crucial but must follow the practitioner’s guidelines.',
        '<strong>Setting</strong> personal intentions enhances the experience.',
        'Choosing an experienced, <strong>ethical practitioner</strong> is essential.',
        '<strong>Kambo</strong> is believed to have various health benefits, though scientific research is ongoing.',
        'The effects are rapid and intense, requiring <strong>mental and physical preparation.</strong>',
        'Post - ceremony <strong>rest and recuperation</strong > are necessary for integration.',
        'The ceremony can be deeply <strong>emotional and spiritually</strong> transformative.',
        '<strong>Purging</strong> is a natural and expected part of the process.',
    ],
}

const cardsGridSectionData = {
    title: 'The Simple Steps for a South American Detox',
    description: 'A Kambo ceremony follows a structured process that varies slightly depending on the practitioner but generally includes the following steps:',
    grid: [
        {
            firstRow: {
                badgeText: "Steps",
                title: 'Preparation & Intention Setting',
                description: "Participants are encouraged to eat clean, avoid processed foods, rest well before the ceremony, and reflect on their intentions. It is also essential to check for contraindications and choose a reputable practitioner.",
            },
            secondRow: {
                badgeText: "Steps",
                title: 'Applying Kambo',
                description: "The frog secretion is applied to the open ‘gates,’ allowing it to enter the lymphatic system and bloodstream.",
            },
        },
        {
            firstRow: {
                badgeText: "Steps",
                title: 'Intermittent Fasting',
                description: "A fasting period of 8 to 10 hours ensures the stomach is empty, aiding the process.",
            },
            secondRow: {
                badgeText: "Steps",
                title: 'Experiencing the Effects',
                description: "Participants may experience nausea, vomiting, increased heart rate, facial flushing, and purging as part of the detoxification.",
            },
        },
        {
            firstRow: {
                badgeText: "Steps",
                title: 'Hydration',
                description: "Just before the ceremony, participants drink 1.5 to 2 liters of water to support detoxification.",
            },
            secondRow: {
                badgeText: "Steps",
                title: 'Rehydration & Recovery',
                description: "After the peak effects subside, participants drink water or tea to flush out toxins and regain balance.",
            },
        },
        {
            firstRow: {
                badgeText: "Steps",
                title: 'Creating ‘Gates’ on the Skin',
                description: "Small burns are made on the skin to open ‘gates,’ typically on the shoulder for men and on the leg or ankle for women.",
            },
            secondRow: {
                badgeText: "Steps",
                title: 'Closing the Ceremony',
                description: "A period of rest and reflection allows participants to integrate the experience.",
            },
        },
    ],
    footer: 'Due to its intense effects, Kambo should only be taken under the guidance of an experienced practitioner, and participants are encouraged to consult a healthcare professional beforehand.'
}

const KamboPage = () => {
    return (
        <main>
            <PageHeaderWithBanner title="Kambo" />
            <div className="h-32 bg-gradient-to-b from-[#000000] to-[#00000000]" />
            <UniformInfoSection image="/image/ayahuasca-cut.png" reverse={true} className="-mt-24">
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">The Power of Kambo: A Fire Energy for Body and Mind</h2>
                <div className="flex flex-col gap-6">
                    <p className="text-white inter-font">A Kambo ceremony is a revered healing ritual known for its profound cleansing properties. Derived from the secretion of the Amazonian giant monkey frog (Phyllomedusa bicolor), Kambo is an ancient medicine that has been used for centuries by indigenous tribes. Whether experienced in a dedicated Kambo retreat or as part of a broader healing journey with Ayahuasca and Bufo, Kambo enhances spiritual openness and deepens the transformative process.</p>
                    <p className="text-white inter-font">Whether taken in the serenity of a Kambo retreat or integrated into a broader healing journey with <Link href="" target="_blank" className="text-[#fef15c]">Ayahuasca</Link> and <Link href="" target="_blank" className="text-[#fef15c]">Bufo</Link> , Kambo can significantly enhance your openness to spiritual experiences. Discover how this ancient practice can enrich your path to wellness or just give you a deeper trip.</p>
                </div>
            </UniformInfoSection>
            <UPSection className="text-white inter-font flex flex-col gap-6">
                {cardsGridSectionData.title && <h2 className="text-2xl font-medium lg:text-4xl">{cardsGridSectionData.title}</h2>}
                {cardsGridSectionData.description && <p>{cardsGridSectionData.description}</p>}
                <div className="relative">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            }
                        }}
                        navigation={false}
                        className="w-full h-full"
                    >
                        {
                            cardsGridSectionData.grid.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="inter-font flex flex-col gap-8">
                                        <Card
                                            badgeText={item.firstRow.badgeText}
                                            twBadgeBorderColor="border-white"
                                            twBadgeTextColor="text-white"
                                            className="bg-gradient-to-r from-[#1B7857] to-[#59A331] h-60 md:h-80 overflow-x-hidden"
                                        >
                                            <div className="flex flex-col gap-4">
                                                {item.firstRow.title && <h2 className="font-semibold text-xl lg:text-2xl">{item.firstRow.title}</h2>}
                                                {item.firstRow.description && <p className="text-xs md:text-sm font-medium">{item.firstRow.description}</p>}
                                            </div>
                                        </Card>
                                        <Card
                                            badgeText={item.firstRow.badgeText}
                                            twBadgeBorderColor="border-white"
                                            twBadgeTextColor="text-white"
                                            className="bg-gradient-to-r from-[#1B7857] to-[#59A331] h-60 md:h-80 overflow-x-hidden"
                                        >
                                            <div className="flex flex-col gap-4">
                                                {item.secondRow.title && <h2 className="font-semibold text-xl lg:text-2xl">{item.secondRow.title}</h2>}
                                                {item.secondRow.description && <p className="text-xs md:text-sm font-medium">{item.secondRow.description}</p>}
                                            </div>
                                        </Card>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                        <CustomSwiperNavigation />
                    </Swiper>
                </div>
                {cardsGridSectionData.footer && <p>{cardsGridSectionData.footer}</p>}
            </UPSection>
            <UPSection>
                <ListCard title={listCardData.title} list={listCardData.list} />
            </UPSection>
            <UniformInfoSection image="/image/OtherSomaticPractices.png" reverse={true}>
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">Why Kambo is a Key Part of a Retreat</h2>
                <div className="flex flex-col gap-6">
                    <p className="text-white inter-font">
                        A Kambo ceremony holds significant importance, both spiritually and for health. It serves, as a bridge between ancient healing traditions and modern wellness practices.<br />
                        Spiritually, it is considered a profound cleansing ritual that purifies the mind. It is known to clear the path for deeper self-awareness and spiritual enlightenment.<br />
                        Health-wise, Kambo’s bioactive peptides are believed to stimulate the immune system, detoxify the liver and intestines, and enhance mental clarity and physical stamina. Participants often report a sense of renewed energy and emotional balance, which underscores Kambo’s role in promoting holistic well-being.<br />
                        This blend of spiritual and physical rejuvenation makes Kambo ceremonies a revered practice among various cultures, particularly within Amazonian tribes and increasingly in Western holistic health circles.<br />
                    </p>
                </div>
            </UniformInfoSection>
            <UniformInfoSection image="/image/OtherSomaticPractices.png">
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">The Rising Interest in Kambo</h2>
                <p className="text-white inter-font">In recent years, Kambo has gained popularity in Western cultures as an alternative medicine, attracting individuals seeking solutions beyond conventional treatments. It is increasingly explored for its potential to address chronic pain, depression, addiction, and autoimmune conditions. While scientific studies remain limited, anecdotal evidence suggests that Kambo may reset the immune system and promote overall well-being.</p>
            </UniformInfoSection>
            <UniformInfoSection image="/image/OtherSomaticPractices.png" reverse={true}>
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">The Cultural Significance of Kambo</h2>
                <p className="text-white inter-font"><Link href="https://amazonexplorer.com/culture-of-indigenous-matses-people-the-frog-medicine-kambo/" target="_blank" className="text-[#fef15c]">Kambo</Link> has been a sacred medicine among Amazonian tribes for generations. Traditionally, indigenous hunters used it to increase stamina, mental clarity, and physical strength by clearing ‘panema,’ or negative energy. More than just a detoxification ritual, Kambo symbolizes a deep connection between the tribe and the natural world, reflecting a holistic approach to health and spirituality.</p>
            </UniformInfoSection>
            <UPSection className="text-white inter-font flex flex-col gap-6">
                <div className="relative">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            768: {
                                slidesPerView: 3,
                            },
                        }}
                        navigation={false}
                        className="w-full h-full"
                    >
                        <SwiperSlide>
                            <Card className="bg-radial-[at_50%_90%] from-[#35A92C] from-10%  to-[#76FBCB] to-90% h-48 md:h-60 lg:h-72 overflow-x-hidden">
                                <div className="h-full flex flex-col gap-4 justify-between">
                                    <Image src="/icon/kambo-icon-1.png" className="w-20 h-20 lg:w-28 lg:h-28 object-contain" width={120} height={120} alt="icon" />
                                    <h2 className="font-semibold text-xl lg:text-2xl">Kambo’s Integration into Modern Healing</h2>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card className="bg-radial-[at_50%_90%] from-[#35A92C] from-10%  to-[#76FBCB] to-90% h-48 md:h-60 lg:h-72 overflow-x-hidden">
                                <div className="h-full flex flex-col gap-4 justify-between">
                                    <Image src="/icon/kambo-icon-1.png" className="w-20 h-20 lg:w-28 lg:h-28 object-contain" width={120} height={120} alt="icon" />
                                    <h2 className="font-semibold text-xl lg:text-2xl">Scientific Insights: The Benefits of Kambo</h2>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card className="bg-radial-[at_50%_90%] from-[#35A92C] from-10%  to-[#76FBCB] to-90% h-48 md:h-60 lg:h-72 overflow-x-hidden">
                                <div className="h-full flex flex-col gap-4 justify-between">
                                    <Image src="/icon/kambo-icon-1.png" className="w-20 h-20 lg:w-28 lg:h-28 object-contain" width={120} height={120} alt="icon" />
                                    <h2 className="font-semibold text-xl lg:text-2xl">The Non-Psychedelic Nature of Kambo</h2>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <CustomSwiperNavigation />
                    </Swiper>
                </div>
            </UPSection>
            <UPSection className="text-white inter-font flex flex-col gap-6">
                <h2 className="text-2xl font-medium lg:text-4xl">Understanding the Effects of a Kambo Ritual</h2>
                <p>Once applied, Kambo induces a rapid reaction, including increased heart rate, nausea, facial swelling, and a strong urge to purge. These effects are considered a release of toxins and emotional blockages, typically lasting 30 to 40 minutes. Practitioners closely monitor participants to ensure safety, making proper guidance crucial for a successful ceremony.</p>
                <div className="relative">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                        }}
                        navigation={false}
                        className="w-full h-full"
                    >
                        <SwiperSlide>
                            <Card className="text-[#394885] h-72 overflow-x-hidden" >
                                <div className="flex flex-col gap-4">
                                    <h2 className="font-semibold text-xl lg:text-2xl">Controversies and Health Risks</h2>
                                    <p className="text-xs md:text-sm font-medium">Despite its reported benefits, Kambo remains controversial due to the lack of extensive clinical research. Some skeptics argue that the placebo effect and ceremonial setting influence perceived benefits. Additionally, Kambo is not suitable for everyone—those with heart conditions, blood pressure issues, or certain medical conditions should avoid it. Given the risks, working with a trained practitioner is essential for safety.</p>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card className="text-[#394885] h-72 overflow-x-hidden">
                                <div className="flex flex-col gap-4">
                                    <h2 className="font-semibold text-xl lg:text-2xl">Enhancing a Bufo Ceremony with Kambo</h2>
                                    <p className="text-xs md:text-sm font-medium">Kambo serves as an excellent preparatory cleanse before engaging in other entheogenic experiences, such as Ayahuasca or Bufo. By detoxifying the body and clearing emotional blockages, Kambo helps individuals enter these profound spiritual experiences with greater clarity and openness. This preparation enhances the depth and effectiveness of the journey, allowing for a more meaningful and transformative experience.</p>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <CustomSwiperNavigation />
                    </Swiper>
                </div>
            </UPSection>
            <UPSection className="text-white inter-font flex flex-col gap-6 pt-3 lg:pt-6">
                <div className="relative">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            768: {
                                slidesPerView: 3,
                            },
                        }}
                        navigation={false}
                        className="w-full h-full"
                    >
                        <SwiperSlide>
                            <Card className="bg-gradient-to-r from-[#1B7857] to-[#59A331] h-48 overflow-x-hidden">
                                <div className="flex justify-center items-center h-full">
                                    <h2 className="font-semibold text-xl lg:text-2xl">Physical and Emotional Purification with Kambo</h2>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card className="bg-gradient-to-r from-[#1B7857] to-[#59A331] h-48 overflow-x-hidden">
                                <div className="flex justify-center items-center h-full">
                                    <h2 className="font-semibold text-xl lg:text-2xl">The Importance of Professional Guidance</h2>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card className="bg-gradient-to-r from-[#1B7857] to-[#59A331] h-48 overflow-x-hidden">
                                <div className="flex justify-center items-center h-full">
                                    <h2 className="font-semibold text-xl lg:text-2xl">Kambo’s Legal and Regulatory Status</h2>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <CustomSwiperNavigation />
                    </Swiper>
                </div>
            </UPSection>
            <UniformInfoSection image="/image/OtherSomaticPractices.png">
                <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">Experiencing Kambo with Arise Retreats</h2>
                <p className="text-white inter-font">Rooted in Amazonian tradition, Kambo has been used for centuries as a sacred healing tool. While it offers numerous benefits, it is not a casual practice and requires preparation and professional supervision. At Arise Retreats, we provide a safe and supportive environment for experiencing Kambo under the guidance of experienced practitioners. Our ceremonies emphasize respect for the tradition, participant safety, and the full potential of Kambo as a transformative healing experience.</p>
            </UniformInfoSection>
            <Footer className="mt-10" />
        </main>
    )
}

export default KamboPage;