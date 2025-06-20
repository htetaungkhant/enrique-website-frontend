import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { format } from "date-fns";

import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import CeremonyCard from "@/components/Admin/CeremonyManagementPage/CeremonyCard";
import AddNewCard from "@/components/Admin/AddNewCard";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { getAllCeremonies } from "@/lib/inhouseAPI/ceremony-route";
import { cn } from "@/lib/utils";

export async function getServerSideProps(context) {
    console.log("deployment finished");
    try {
        const page = parseInt(context.query.page) || 1;
        const response = await getAllCeremonies({ ...context.req, body: { page, limit: 10 } });

        const ceremonies = response?.ceremonies ?? [];

        if (ceremonies.length > 0) {
            ceremonies.forEach(ceremony => {
                if (ceremony.location) {
                    try {
                        const location = JSON.parse(ceremony.location);
                        ceremony.locationCountry = location.country || "";
                        ceremony.locationAddress = location.address || "";
                    } catch (error) {
                        console.error("Error parsing location JSON:", error);
                        ceremony.locationCountry = "";
                        ceremony.locationAddress = "";
                    }
                } else {
                    ceremony.locationCountry = "";
                    ceremony.locationAddress = "";
                }

                // if (ceremony.startDate && ceremony.endDate) {
                //     try {
                //         ceremony.startTime = format(new Date(ceremony.startDate), "h:mm a");
                //         ceremony.endTime = format(new Date(ceremony.endDate), "h:mm a");
                //     } catch (error) {
                //         console.error("Error formatting time:", error);
                //         ceremony.startTime = "";
                //         ceremony.endTime = "";
                //     }
                // } else {
                //     ceremony.startTime = "";
                //     ceremony.endTime = "";
                // }
            });
        }

        return {
            props: {
                ceremonies,
                total: response?.total ?? 0,
                currentPage: page,
            },
        };
    } catch (error) {
        console.error("Error fetching ceremonies:", error);
        return {
            props: {
                ceremonies: [],
                total: 0,
                currentPage: 1,
            },
        };
    }
}

const Ceremonies = ({ ceremonies, total, currentPage }) => {
    const router = useRouter();
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (total) {
            setTotalPages(Math.ceil(total / 10));
        }
    }, [total]);

    const handlePageChange = (page) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page },
        });
    };

    const handleEditCeremony = (ceremonyId) => {
        router.push(`/admin/ceremony-management/ceremonies/${ceremonyId}/edit`);
    };

    return (
        <AdminPagesWrapper>
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {!Array.isArray(ceremonies) && (
                        <div className="col-span-full text-center text-muted-foreground">
                            No ceremonies data available
                        </div>
                    )}

                    {Array.isArray(ceremonies) && ceremonies.length === 0 && (
                        <div className="col-span-full text-center text-muted-foreground">
                            No ceremonies found
                        </div>
                    )}

                    {Array.isArray(ceremonies) && ceremonies.map((ceremony) => (
                        <CeremonyCard
                            key={ceremony.id}
                            id={ceremony.id}
                            image={ceremony.image?.image}
                            title={ceremony.title}
                            locationCountry={ceremony.locationCountry}
                            locationAddress={ceremony.locationAddress}
                            startDate={ceremony.startDate}
                            endDate={ceremony.endDate}
                            // startTime={ceremony.startTime}
                            // endTime={ceremony.endTime}
                            onEdit={handleEditCeremony}
                        />
                    ))}

                    <AddNewCard
                        label="Add New Ceremony"
                        href="/admin/ceremony-management/create-new-ceremony"
                    />
                </div>

                {totalPages > 1 && (
                    <Pagination>
                        <PaginationContent className="text-white">
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                    className={cn(
                                        "border-white hover:bg-white hover:text-black transition-colors",
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
                                                // isActive={page === currentPage}
                                                className={cn(
                                                    "border-white hover:bg-white hover:text-black transition-colors",
                                                    page === currentPage && "bg-white text-black"
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
                                        "border-white hover:bg-white hover:text-black transition-colors",
                                        currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
                                    )}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </AdminPagesWrapper>
    );
}

export default Ceremonies;