import { useState } from "react";
import { HiBadgeCheck } from "react-icons/hi";

import Footer from "@/components/common/Footer";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import UPSection from "@/components/common/UniformPaddingSection";
import FacilitatorsCard from "@/components/FacilitatorsPage/FacilitatorsCard";
import Modal from "@/components/common/Modal";
import { SwiperCardsRowSection } from "@/components/common/CardsRowSection";

const dummyData = [
    {
        image: "/dummy-data/1.png",
        name: "Enrique Navarro Rodríguez",
        role: "Holistic Therapist",
        about: "Enrique Navarro Rodríguez has developed a structured healing methodology that blends ancient wisdom with modern therapeutic techniques. His approach focuses on resetting the body and mind through sacred medicines and complementary healing practices. With 14 years of experience and having worked with over 14, 000 individuals, Enrique has refined his techniques to create the most efficient and personalized healing methods available today. Through his personal journey and hands- on experience, he has crafted a unique and highly effective approach that has enabled countless people to release trauma and heal profoundly.",
        cardList: [
            {
                badgeText: "Expertise",
                title: { __html: '<span style="color: #212A63">Kambo <span style="font-weight: 400;">Cleansing</span></span>' },
                description: 'A detoxifying Amazonian frog medicine that purges toxins, strengthens the immune system, and prepares individuals for deeper healing experiences. Kambo serves as a powerful physical and energetic cleanse, laying the groundwork for transformation.',
            },
            {
                badgeText: "Expertise",
                title: { __html: '<span style="color: #212A63">Bufo Alvarius <span style="font-weight: 400;">Experience</span></span>' },
                description: "A profound 20- minute journey of ego dissolution and unity facilitated by the 5- MeO- DMT compound. This medicine promotes deep emotional release, self- discovery, and clarity, often described as a rebirth into a higher state of consciousness.",
            },
            {
                badgeText: "Expertise",
                title: { __html: '<span style="color: #212A63">Ayahuasca <span style="font-weight: 400;">Reintegration</span></span>' },
                description: "Utilized after Bufo Alvarius, Ayahuasca helps individuals gradually process their profound experiences. This sacred plant medicine nurtures introspection, emotional healing, and a deeper connection to one' s true self.",
            },
        ],
        workImpact: {
            'Yoga & Meditation:': 'Daily mindfulness and movement practices help participants stay grounded, regulate emotions, and cultivate inner balance before and after ceremonies.',
            'Ayurvedic Diet:': 'A carefully curated diet optimizes digestion, enhances energetic flow, and supports mental and physical preparation for sacred medicines.',
            'Craniosacral Therapy:': 'A gentle hands-on technique integrated into retreats to relieve tension, regulate the nervous system, and enhance overall healing and integration.',
            'Multi-Layered Healing Approach:': 'A combination of holistic practices allows participants to reconnect with their true essence, achieving lasting balance and transformation.',
            'Proven Impact:': 'Enrique’s refined techniques and expertise have helped thousands experience deep healing, renewal, and personal growth.',
        }
    },
    {
        image: "/dummy-data/2.png",
        name: "Vivek Padalia",
        role: "Holistic Therapist",
        about: "Enrique Navarro Rodríguez has developed a structured healing methodology that blends ancient wisdom with modern therapeutic techniques. His approach focuses on resetting the body and mind through sacred medicines and complementary healing practices. With 14 years of experience and having worked with over 14, 000 individuals, Enrique has refined his techniques to create the most efficient and personalized healing methods available today. Through his personal journey and hands- on experience, he has crafted a unique and highly effective approach that has enabled countless people to release trauma and heal profoundly.",
        cardList: [
            {
                badgeText: "Expertise",
                title: { __html: '<span style="color: #212A63">Kambo <span style="font-weight: 400;">Cleansing</span></span>' },
                description: 'A detoxifying Amazonian frog medicine that purges toxins, strengthens the immune system, and prepares individuals for deeper healing experiences. Kambo serves as a powerful physical and energetic cleanse, laying the groundwork for transformation.',
            },
            {
                badgeText: "Expertise",
                title: { __html: '<span style="color: #212A63">Bufo Alvarius <span style="font-weight: 400;">Experience</span></span>' },
                description: "A profound 20- minute journey of ego dissolution and unity facilitated by the 5- MeO- DMT compound. This medicine promotes deep emotional release, self- discovery, and clarity, often described as a rebirth into a higher state of consciousness.",
            },
            {
                badgeText: "Expertise",
                title: { __html: '<span style="color: #212A63">Ayahuasca <span style="font-weight: 400;">Reintegration</span></span>' },
                description: "Utilized after Bufo Alvarius, Ayahuasca helps individuals gradually process their profound experiences. This sacred plant medicine nurtures introspection, emotional healing, and a deeper connection to one' s true self.",
            },
        ],
        workImpact: [
            'Guided professionals & leaders across industries and geographies to enhance performance and overcome barriers.',
            'Led transformational programs focused on self-awareness, leadership excellence, and emotional intelligence',
            'Advocate for social causes—actively contributing to environmental sustainability and mental well-being',
            'Founder of Mahadhaam, a platform dedicated to spiritual growth, self-transformation, and holistic wellness'
        ]
    },
    {
        image: "/dummy-data/3.jpg",
        name: "Shabnam Ananda",
        role: "Holistic Therapist",
        about: "Enrique Navarro Rodríguez has developed a structured healing methodology that blends ancient wisdom with modern therapeutic techniques. His approach focuses on resetting the body and mind through sacred medicines and complementary healing practices. With 14 years of experience and having worked with over 14, 000 individuals, Enrique has refined his techniques to create the most efficient and personalized healing methods available today. Through his personal journey and hands- on experience, he has crafted a unique and highly effective approach that has enabled countless people to release trauma and heal profoundly.",
        cardList: [
            {
                badgeText: "Expertise",
                title: { __html: '<span style="color: #212A63">Kambo <span style="font-weight: 400;">Cleansing</span></span>' },
                description: 'A detoxifying Amazonian frog medicine that purges toxins, strengthens the immune system, and prepares individuals for deeper healing experiences. Kambo serves as a powerful physical and energetic cleanse, laying the groundwork for transformation.',
            },
            {
                badgeText: "Expertise",
                title: { __html: '<span style="color: #212A63">Bufo Alvarius <span style="font-weight: 400;">Experience</span></span>' },
                description: "A profound 20- minute journey of ego dissolution and unity facilitated by the 5- MeO- DMT compound. This medicine promotes deep emotional release, self- discovery, and clarity, often described as a rebirth into a higher state of consciousness.",
            },
            {
                badgeText: "Expertise",
                title: { __html: '<span style="color: #212A63">Ayahuasca <span style="font-weight: 400;">Reintegration</span></span>' },
                description: "Utilized after Bufo Alvarius, Ayahuasca helps individuals gradually process their profound experiences. This sacred plant medicine nurtures introspection, emotional healing, and a deeper connection to one' s true self.",
            },
        ],
        workImpact: [
            'Guided professionals & leaders across industries and geographies to enhance performance and overcome barriers.',
            'Led transformational programs focused on self-awareness, leadership excellence, and emotional intelligence',
            'Advocate for social causes—actively contributing to environmental sustainability and mental well-being',
            'Founder of Mahadhaam, a platform dedicated to spiritual growth, self-transformation, and holistic wellness'
        ]
    },
]

const FacilitatorsPage = () => {
    const [selectedFacilitators, setSelectedFacilitators] = useState();
    const [isOpenModal, setIsOpenModal] = useState(false);

    const onClickFacilitatorsCard = (facilitators) => {
        setSelectedFacilitators(facilitators);
        setIsOpenModal(true);
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    const onModalClose = () => {
        setIsOpenModal(false);
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    return (
        <main className="relative">
            <PageHeaderWithBanner title="Facilitators" />
            <div className="pt-10" style={{ minHeight: 'calc(100vh - 640px)' }}>
                <UPSection className="relative grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-10">
                    {
                        dummyData.map((item, index) => (
                            <FacilitatorsCard key={index} onReadMoreBtnClick={() => onClickFacilitatorsCard(item)} image={item.image} name={item.name} className="w-full h-auto" />
                        ))
                    }
                </UPSection>
            </div>
            <Footer className="mt-10" />
            <Modal isOpen={isOpenModal} onClose={onModalClose} containerClassName="w-[95%]">
                {
                    selectedFacilitators && (
                        <div className="flex flex-col inter-font">
                            <h2 className="text-center merriweather-font font-bold underline text-4xl">{selectedFacilitators.name}</h2>
                            <p className="my-6 text-center font-semibold text-lg md:text-xl">{selectedFacilitators.role}</p>
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col gap-5">
                                    <h4 className="text-2xl md:text-3xl">About <strong>{selectedFacilitators.name}</strong></h4>
                                    <p className="text-xs md:text-sm font-medium">{selectedFacilitators.about}</p>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <h4 className="text-2xl md:text-3xl">Area of <strong>Expertise</strong></h4>
                                    <SwiperCardsRowSection
                                        breakpoints={{
                                            768: {
                                                slidesPerView: 3,
                                            },
                                        }}
                                        cardList={selectedFacilitators.cardList}
                                        twBadgeBorderColor="border-[#212A63]"
                                        twBadgeTextColor="text-[#212A63]"
                                        cardClassName="text-[#394885] h-64 md:h-[28rem] lg:h-[24rem] xl:h-[18rem] overflow-x-hidden"
                                        className="p-0 lg:p-0"
                                    />
                                </div>
                                <div className="flex flex-col gap-5">
                                    <h4 className="text-2xl md:text-3xl font-bold">Work & Impact</h4>
                                    <ul className="flex flex-col gap-2 md:gap-3">
                                        {
                                            Array.isArray(selectedFacilitators.workImpact) ?
                                                selectedFacilitators.workImpact.map((item, index) => (
                                                    <li key={index} className="flex gap-3 md:gap-5">
                                                        <HiBadgeCheck size={26} color="#2EAC25" className="min-w-6" />
                                                        {item}
                                                    </li>
                                                ))
                                                :
                                                typeof selectedFacilitators.workImpact === 'object' ?
                                                    Object.entries(selectedFacilitators.workImpact).map(([key, value]) => (
                                                        <li key={key} className="flex gap-3 md:gap-5">
                                                            <HiBadgeCheck size={26} color="#2EAC25" className="min-w-6" />
                                                            <div>
                                                                <span className="font-bold mr-1">{key}</span>
                                                                <span>{value}</span>
                                                            </div>
                                                        </li>
                                                    ))
                                                    :
                                                    null
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Modal>
        </main>
    )

    // return (
    //     <main className="bg-center bg-cover bg-no-repeat" style={{ backgroundImage: 'url(/image/banner.png)' }}>
    //         <div className="h-[100vh] overflow-y-auto">
    //             <div className="z-100 xl:p-12 relative">
    //                 {/* Overlay */}
    //                 <div className="absolute inset-0 bg-black opacity-55"></div>
    //                 <PageHeader />
    //             </div>
    //             <div className="h-[200vh] relative">
    //                 {/* Overlay */}
    //                 <div className="absolute inset-0 bg-black opacity-55"></div>
    //             </div>
    //             <Footer />
    //         </div>
    //     </main>
    // )
}

export default FacilitatorsPage;