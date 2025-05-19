import Image from "next/image";

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

    const handleExploreCourses = (e) => {
        e.preventDefault();
    }

    return (
        <ProfilePagesWrapper>
            <div className="py-5 md:px-5 md:py-10">
                {
                    Array.isArray(DummyData) && DummyData.length > 0 ?
                        (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-10 justify-between">
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
                        )
                        :
                        (
                            <div className="pt-5 lg:pt-10 w-full flex flex-col gap-3 items-center">
                                <Image
                                    src="/icon/empty-courses.png"
                                    width={225}
                                    height={225}
                                    alt="empty-course"
                                    className="w-56 h-56 max-lg:w-44 max-lg:h-44 object-contain"
                                />
                                <h4 className="text-lg font-semibold">No  Purchases Yet</h4>
                                <p className="text-sm text-[#EFEFEF]">Start exploring our courses</p>
                                <button
                                    type="button"
                                    onClick={handleExploreCourses}
                                    className="mt-3 px-4 py-2 rounded-4xl bg-gradient-to-b from-[#D7F2D5] to-[#5C8959] text-black font-bold cursor-pointer"
                                >
                                    Explore Courses
                                </button>
                            </div>
                        )
                }
            </div>
        </ProfilePagesWrapper>
    )
}

export default Purchases;