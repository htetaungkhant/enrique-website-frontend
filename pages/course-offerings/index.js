import { useState } from "react";
import { IoPricetags } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";

import Footer from "@/components/common/Footer";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import SearchBox from "@/components/common/SearchBox";
import UPSection from "@/components/common/UniformPaddingSection";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
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

const SortingType = Object.freeze({
    PRICE_ASCENDING: "price-ascending",
    PRICE_DESCENDING: "price-descending",
    DATE_ASCENDING: "date-ascending",
    DATE_DESCENDING: "date-descending",
});

const CourseOfferingsPage = () => {
    const [pricePopover, setPricePopover] = useState(false);
    const [datePopover, setDatePopover] = useState(false);
    const [sortingType, setSortingType] = useState();

    const handlePriceSorting = (value) => {
        setSortingType(value);
        setPricePopover(false);
    }

    const handleDateSorting = (value) => {
        setSortingType(value);
        setDatePopover(false);
    }

    return (
        <main>
            <PageHeaderWithBanner title="Learn & Grow with Arise">
                <p className="inter-font text-sm md:text-base lg:text-lg xl:text-xl font-medium">Expand Your Knowledge, Deepen Your Journey</p>
            </PageHeaderWithBanner>
            <UPSection className="inter-font">
                <div className="py-16 flex flex-col gap-5 md:flex-row md:justify-between md:items-start md:flex-wrap text-white">
                    <h2 className="whitespace-nowrap merriweather-font font-bold text-2xl md:text-3xl xl:text-4xl">Our Latest Courses</h2>
                    <div className="flex flex-col items-start md:flex-wrap md:flex-row gap-3 lg:gap-5">
                        <button
                            className={cn(
                                "px-4 py-1 lg:py-2 text-sm border-[1px] border-[#D7F2D5] rounded-3xl cursor-pointer text-white outline-none",
                                !sortingType && "text-[#054224] bg-[#D7F2D5]",
                            )}
                            onClick={() => setSortingType()}
                        >
                            All Course
                        </button>

                        <Popover open={pricePopover} onOpenChange={setPricePopover}>
                            <PopoverTrigger asChild>
                                <span
                                    className={cn(
                                        "px-4 py-1 lg:py-2 text-sm border-[1px] border-white rounded-3xl cursor-pointer flex items-center gap-3",
                                        (sortingType === SortingType.PRICE_ASCENDING || sortingType === SortingType.PRICE_DESCENDING) && "text-[#054224] bg-[#D7F2D5]",
                                    )}
                                >
                                    Sort by Price
                                    <IoPricetags size={16} />
                                </span>
                            </PopoverTrigger>
                            <PopoverContent
                                disablePortal
                                className="p-0 w-36 lg:w-40 xl:w-44 overflow-hidden"
                                align="start"
                            >
                                <ul className="merriweather-font">
                                    <li>
                                        <button
                                            type="button"
                                            className={cn(
                                                "w-full px-4 py-2 text-left hover:bg-gray-100 transition outline-none",
                                                (sortingType === SortingType.PRICE_ASCENDING) && "bg-gray-100 font-semibold"
                                            )}
                                            onClick={() => handlePriceSorting(SortingType.PRICE_ASCENDING)}
                                        >
                                            Ascending
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            className={cn(
                                                "w-full px-4 py-2 text-left hover:bg-gray-100 transition outline-none",
                                                (sortingType === SortingType.PRICE_DESCENDING) && "bg-gray-100 font-semibold"
                                            )}
                                            onClick={() => handlePriceSorting(SortingType.PRICE_DESCENDING)}
                                        >
                                            Descending
                                        </button>
                                    </li>
                                </ul>
                            </PopoverContent>
                        </Popover>

                        <Popover open={datePopover} onOpenChange={setDatePopover}>
                            <PopoverTrigger asChild>
                                <span
                                    className={cn(
                                        "px-4 py-1 lg:py-2 text-sm border-[1px] border-white rounded-3xl cursor-pointer flex items-center gap-3",
                                        (sortingType === SortingType.DATE_ASCENDING || sortingType === SortingType.DATE_DESCENDING) && "text-[#054224] bg-[#D7F2D5]",
                                    )}
                                >
                                    Sort by Date
                                    <LuCalendarDays size={16} />
                                </span>
                            </PopoverTrigger>
                            <PopoverContent
                                disablePortal
                                className="p-0 w-36 lg:w-40 xl:w-44 overflow-hidden"
                                align="start"
                            >
                                <ul className="merriweather-font">
                                    <li>
                                        <button
                                            type="button"
                                            className={cn(
                                                "w-full px-4 py-2 text-left hover:bg-gray-100 transition outline-none",
                                                (sortingType === SortingType.DATE_ASCENDING) && "bg-gray-100 font-semibold"
                                            )}
                                            onClick={() => handleDateSorting(SortingType.DATE_ASCENDING)}
                                        >
                                            Ascending
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            className={cn(
                                                "w-full px-4 py-2 text-left hover:bg-gray-100 transition outline-none",
                                                (sortingType === SortingType.DATE_DESCENDING) && "bg-gray-100 font-semibold"
                                            )}
                                            onClick={() => handleDateSorting(SortingType.DATE_DESCENDING)}
                                        >
                                            Descending
                                        </button>
                                    </li>
                                </ul>
                            </PopoverContent>
                        </Popover>
                        <SearchBox placeholder="Search by Course Name" className="md:w-52 lg:w-72 text-sm" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-10 justify-between">
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
                            />
                        ))
                    }
                </div>
            </UPSection>
            <Footer className="mt-10" />
        </main>
    )
}

export default CourseOfferingsPage;