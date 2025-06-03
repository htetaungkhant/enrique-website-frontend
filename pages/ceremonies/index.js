import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { LuCalendarDays } from "react-icons/lu";
import { format } from "date-fns";

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
import CeremonyCard from "@/components/CeremoniesPage/CeremonyCard";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { getCeremonies } from "@/lib/inhouseAPI/ceremony-route";
import { cn } from "@/lib/utils";

const SortingType = Object.freeze({
    DATE_ASCENDING: "date-ascending",
    DATE_DESCENDING: "date-descending",
});


export async function getServerSideProps(context) {
    try {
        const page = parseInt(context.query.page) || 1;
        const { sortByDate } = context.query;

        const ceremonies = await getCeremonies({
            ...context.req,
            body: {
                page,
                limit: 10,
                sortByDate
            }
        });

        if (Array.isArray(ceremonies) && ceremonies.length > 0) {
            ceremonies.forEach((ceremony) => {
                // location: '{"country":"Portugal","address":"Quinta da Penalva, Sintra"}'
                // if location of each ceremony is valid json string, split to "locationCountry" and "locationAddress". If not, just put location into locationCountry
                if (ceremony.location) {
                    try {
                        const location = JSON.parse(ceremony.location);
                        ceremony.locationCountry = location.country || "";
                        ceremony.locationAddress = location.address || "";
                    } catch (error) {
                        ceremony.locationCountry = ceremony.location || "";
                    }
                }
                else {
                    ceremony.locationCountry = "";
                    ceremony.locationAddress = "";
                }

                // startDate: '2025-06-04T17:00:00.000Z', endDate: '2025-06-10T04:05:00.000Z',
                // convert
                // fromDate: '05 Jun 2025', fromTime: '12:00 AM', toDate: '10 Jun 2025', toTime: '11:05 AM'
                if (ceremony.startDate && ceremony.endDate) {
                    try {
                        ceremony.fromDate = format(new Date(ceremony.startDate), "dd MMM yyyy");
                        ceremony.fromTime = format(new Date(ceremony.startDate), "hh:mm a");
                        ceremony.toDate = format(new Date(ceremony.endDate), "dd MMM yyyy");
                        ceremony.toTime = format(new Date(ceremony.endDate), "hh:mm a");
                    } catch (error) {
                        console.error("Error formatting time:", error);
                        ceremony.fromDate = "";
                        ceremony.fromTime = "";
                        ceremony.toDate = "";
                        ceremony.toTime = "";
                    }
                }
                else {
                    ceremony.fromDate = "";
                    ceremony.fromTime = "";
                    ceremony.toDate = "";
                    ceremony.toTime = "";
                }
            });
        }

        return {
            props: {
                ceremonies: ceremonies ?? null,
                currentPage: page,
                sortByDate: sortByDate || null,
            },
        };
    } catch (error) {
        console.error("Error fetching ceremonies:", error);
        return {
            props: {
                ceremonies: null,
                currentPage: 1,
            },
        };
    }
}

const CeremoniesPage = ({ ceremonies, currentPage, sortByDate }) => {
    const [datePopover, setDatePopover] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCeremonies, setFilteredCeremonies] = useState(ceremonies);
    const [sortingType, setSortingType] = useState(() => {
        if (sortByDate === "asc") return SortingType.DATE_ASCENDING;
        if (sortByDate === "desc") return SortingType.DATE_DESCENDING;
        return undefined;
    });
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();

    useEffect(() => {
        setFilteredCeremonies(ceremonies);
    }, [ceremonies]);

    useEffect(() => {
        if (ceremonies?.total) {
            setTotalPages(Math.ceil(ceremonies.total / 10));
        }
    }, [ceremonies]);

    useEffect(() => {
        const { sortByDate } = router.query;
        if (sortByDate === "asc") {
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

    const handleDateSorting = (value) => {
        setSortingType(value);
        setDatePopover(false);

        const query = { ...router.query };

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

        if (!Array.isArray(ceremonies)) return;

        if (!value.trim()) {
            setFilteredCeremonies(ceremonies);
        } else {
            const filtered = ceremonies.filter(ceremony =>
                ceremony.title?.toLowerCase().includes(value)
            );
            setFilteredCeremonies(filtered);
        }
    }

    return (
        <main>
            <PageHeaderWithBanner title="Ceremonies">
                <p className="inter-font text-sm md:text-base lg:text-lg xl:text-xl font-medium">Expand Your Knowledge, Deepen Your Journey</p>
            </PageHeaderWithBanner>
            <UPSection>
                <div className="inter-font">
                    <div className="py-16 flex flex-col gap-5 md:flex-row md:justify-between md:items-center text-white">
                        <h4 className="merriweather-font font-bold text-2xl md:text-3xl xl:text-4xl">Our Latest Events</h4>
                        <div className="flex flex-col items-start md:flex-wrap md:flex-row gap-3 lg:gap-5">
                            <button
                                className={cn(
                                    "px-4 py-1 lg:py-2 text-sm border-[1px] border-[#D7F2D5] rounded-3xl cursor-pointer text-white outline-none",
                                    !sortingType && "text-[#054224] bg-[#D7F2D5]",
                                )}
                                onClick={() => {
                                    setSortingType();
                                    const { page, sortByDate, ...restQuery } = router.query;
                                    router.push({
                                        pathname: router.pathname,
                                        query: { ...restQuery }
                                    });
                                }}
                            >
                                All Events
                            </button>
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
                    {Array.isArray(filteredCeremonies) ? (
                        filteredCeremonies.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-10 xl:gap-20 justify-between">
                                {
                                    filteredCeremonies.map((ceremony, index) => (
                                        <CeremonyCard
                                            key={`${ceremony.id}-${index}`}
                                            image={ceremony.image?.image}
                                            title={ceremony.title}
                                            locations={ceremony.locationCountry}
                                            dates={`From ${ceremony.fromDate} to ${ceremony.toDate}`}
                                            time={`${ceremony.fromTime} - ${ceremony.toTime}`}
                                            learnMoreHref={`/ceremonies/${ceremony.id}`}
                                        />
                                    ))
                                }
                            </div>
                        ) : (
                            <div className="text-center text-white">No ceremonies found matching your search.</div>
                        )
                    ) : (
                        <div className="text-center text-white">No ceremonies available.</div>
                    )}
                    {totalPages > 1 && (
                        <div className="mt-10">
                            <Pagination>
                                <PaginationContent className="text-white">
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                            className={cn(
                                                "border-white hover:bg-[#D7F2D5] hover:text-[#054224] transition-colors",
                                                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                                            )}
                                        />
                                    </PaginationItem>

                                    {[...Array(totalPages)].map((_, i) => {
                                        const page = i + 1;
                                        if (
                                            page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 1 && page <= currentPage + 1)
                                        ) {
                                            return (
                                                <PaginationItem key={page}>
                                                    <PaginationLink
                                                        onClick={() => handlePageChange(page)}
                                                        className={cn(
                                                            "border-white hover:bg-[#D7F2D5] hover:text-[#054224] transition-colors",
                                                            page === currentPage && "bg-[#D7F2D5] text-[#054224]"
                                                        )}
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
                                                    <PaginationEllipsis className="text-white" />
                                                </PaginationItem>
                                            );
                                        }
                                        return null;
                                    })}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                            className={cn(
                                                "border-white hover:bg-[#D7F2D5] hover:text-[#054224] transition-colors",
                                                currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
                                            )}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </div>
            </UPSection>
            <Footer className="mt-10" />
        </main>
    )
}

export default CeremoniesPage;