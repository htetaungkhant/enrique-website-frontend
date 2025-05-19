import ProfilePagesWrapper from "@/components/common/ProfilePagesWrapper";
import CourseCard from "@/components/CourseOfferingsPage/CourseCard";

const DummyData = [
    {
        image: "/dummy-data/7.png",
        title: "Plant Medicine",
        description: "Mastering Plant Medicine for Healing & Transformation",
        instructor: "Dr. Emily Carter",
        dates: "24/03/2025",
        price: 299,
    },
    {
        image: "/dummy-data/7.png",
        title: "Plant Medicine",
        description: "Mastering Plant Medicine for Healing & Transformation",
        instructor: "Dr. Emily Carter",
        dates: "24/03/2025",
        price: 299,
    },
    {
        image: "/dummy-data/7.png",
        title: "Plant Medicine",
        description: "Mastering Plant Medicine for Healing & Transformation",
        instructor: "Dr. Emily Carter",
        dates: "24/03/2025",
        price: 299,
    },
    {
        image: "/dummy-data/7.png",
        title: "Plant Medicine",
        description: "Mastering Plant Medicine for Healing & Transformation",
        instructor: "Dr. Emily Carter",
        dates: "24/03/2025",
        price: 299,
    },
    {
        image: "/dummy-data/7.png",
        title: "Plant Medicine",
        description: "Mastering Plant Medicine for Healing & Transformation",
        instructor: "Dr. Emily Carter",
        dates: "24/03/2025",
        price: 299,
    },
    {
        image: "/dummy-data/7.png",
        title: "Plant Medicine",
        description: "Mastering Plant Medicine for Healing & Transformation",
        instructor: "Dr. Emily Carter",
        dates: "24/03/2025",
        price: 299,
    },
    {
        image: "/dummy-data/7.png",
        title: "Plant Medicine",
        description: "Mastering Plant Medicine for Healing & Transformation",
        instructor: "Dr. Emily Carter",
        dates: "24/03/2025",
        price: 299,
    },
    {
        image: "/dummy-data/7.png",
        title: "Plant Medicine",
        description: "Mastering Plant Medicine for Healing & Transformation",
        instructor: "Dr. Emily Carter",
        dates: "24/03/2025",
        price: 299,
    },
];

const Purchases = () => {
    return (
        <ProfilePagesWrapper>
            <div className="py-5 md:px-5 md:py-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-10 justify-between">
                {
                    DummyData.map((item, index) => (
                        <CourseCard
                            key={index}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                            instructor={item.instructor}
                            dates={item.dates}
                            price={item.price}
                            purchase={true}
                        />
                    ))
                }
            </div>
        </ProfilePagesWrapper>
    )
}

export default Purchases;