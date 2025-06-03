import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IoPricetags } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import Footer from "@/components/common/Footer";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import SearchBox from "@/components/common/SearchBox";
import UPSection from "@/components/common/UniformPaddingSection";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import CourseCard from "@/components/CourseOfferingsPage/CourseCard";
import { getAllCourses } from "@/lib/inhouseAPI/course-route";

const SortingType = Object.freeze({
    PRICE_ASCENDING: "price-ascending",
    PRICE_DESCENDING: "price-descending",
    DATE_ASCENDING: "date-ascending",
    DATE_DESCENDING: "date-descending",
});


export async function getServerSideProps(context) {
    try {
        const page = parseInt(context.query.page) || 1;
        const { sortByPrice, sortByDate } = context.query;

        const courses = await getAllCourses({
            ...context.req,
            body: {
                page,
                limit: 10,
                sortByPrice,
                sortByDate
            }
        });

        return {
            props: {
                courses: courses ?? null,
                currentPage: page,
                sortByPrice: sortByPrice || null,
                sortByDate: sortByDate || null,
            },
        };
    } catch (error) {
        console.error("Error fetching courses:", error);
        return {
            props: {
                courses: null,
                currentPage: 1,
            },
        };
    }
}

const CourseOfferingsPage = ({ courses, currentPage, sortByPrice, sortByDate }) => {
    const [pricePopover, setPricePopover] = useState(false);
    const [datePopover, setDatePopover] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCourses, setFilteredCourses] = useState(courses);
    const [sortingType, setSortingType] = useState(() => {
        if (sortByPrice === "asc") return SortingType.PRICE_ASCENDING;
        if (sortByPrice === "desc") return SortingType.PRICE_DESCENDING;
        if (sortByDate === "asc") return SortingType.DATE_ASCENDING;
        if (sortByDate === "desc") return SortingType.DATE_DESCENDING;
        return undefined;
    });
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();

    useEffect(() => {
        setFilteredCourses(courses);
    }, [courses]);

    useEffect(() => {
        if (courses?.total) {
            setTotalPages(Math.ceil(courses.total / 10));
        }
    }, [courses]);

    useEffect(() => {
        const { sortByPrice, sortByDate } = router.query;
        if (sortByPrice === "asc") {
            setSortingType(SortingType.PRICE_ASCENDING);
        } else if (sortByPrice === "desc") {
            setSortingType(SortingType.PRICE_DESCENDING);
        } else if (sortByDate === "asc") {
            setSortingType(SortingType.DATE_ASCENDING);
        } else if (sortByDate === "desc") {
            setSortingType(SortingType.DATE_DESCENDING);
        } else {
            setSortingType(undefined);
        }
    }, [router.query]);

    const handlePageChange = (page) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page },
        });
    };

    const handlePriceSorting = (value) => {
        setSortingType(value);
        setPricePopover(false);

        const query = { ...router.query };
        delete query.sortByDate;

        if (value === SortingType.PRICE_ASCENDING) {
            query.sortByPrice = "asc";
        } else if (value === SortingType.PRICE_DESCENDING) {
            query.sortByPrice = "desc";
        }

        router.push({
            pathname: router.pathname,
            query: { ...query, page: 1 }
        });
    }

    const handleDateSorting = (value) => {
        setSortingType(value);
        setDatePopover(false);

        const query = { ...router.query };
        delete query.sortByPrice;

        if (value === SortingType.DATE_ASCENDING) {
            query.sortByDate = "asc";
        } else if (value === SortingType.DATE_DESCENDING) {
            query.sortByDate = "desc";
        }

        router.push({
            pathname: router.pathname,
            query: { ...query, page: 1 }
        });
    }

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchQuery(value);

        if (!Array.isArray(courses)) return;

        if (!value.trim()) {
            setFilteredCourses(courses);
        } else {
            const filtered = courses.filter(course =>
                course.title?.toLowerCase().includes(value)
            );
            setFilteredCourses(filtered);
        }
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
                            onClick={() => {
                                setSortingType();
                                const { page, sortByPrice, sortByDate, ...restQuery } = router.query;
                                router.push({
                                    pathname: router.pathname,
                                    query: { ...restQuery }
                                });
                            }}
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
                        <SearchBox
                            placeholder="Search by Course Name"
                            className="md:w-52 lg:w-72 text-sm"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                {Array.isArray(filteredCourses) ? (
                    filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-10 justify-between">
                            {filteredCourses.map((item, index) => (
                                <CourseCard
                                    key={`${item.id}-${index}`}
                                    id={item.id}
                                    image={item.image?.image}
                                    title={item.title}
                                    description={item.sessionOverview}
                                    instructor={item.createdBy?.name}
                                    instructorImage={item.createdBy?.image?.image}
                                    dates={item.createdAt}
                                    price={item.price}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-white">No courses found matching your search.</div>
                    )
                ) : (
                    <div className="text-center text-white">No courses available.</div>
                )}

                {totalPages > 1 && (
                    <div className="mt-10">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>

                                {[...Array(totalPages)].map((_, i) => {
                                    const page = i + 1;
                                    // Show first page, current page, last page, and pages around current page
                                    if (
                                        page === 1 ||
                                        page === totalPages ||
                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                    ) {
                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    onClick={() => handlePageChange(page)}
                                                    isActive={page === currentPage}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    } else if (
                                        page === currentPage - 2 ||
                                        page === currentPage + 2
                                    ) {
                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        );
                                    }
                                    return null;
                                })}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </UPSection>
            <Footer className="mt-10" />
        </main>
    )
}

export default CourseOfferingsPage;