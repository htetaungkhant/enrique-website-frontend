import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";

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
import { getCeremonies } from "@/lib/inhouseAPI/ceremony-route";

export async function getServerSideProps(context) {
    try {
        const page = parseInt(context.query.page) || 1;
        const ceremonies = await getCeremonies({ ...context.req, body: { page, limit: 10 } });

        if (Array.isArray(ceremonies) && ceremonies.length > 0) {
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

                if (ceremony.startDate && ceremony.endDate) {
                    try {
                        ceremony.startTime = format(new Date(ceremony.startDate), "h:mm a");
                        ceremony.endTime = format(new Date(ceremony.endDate), "h:mm a");
                    } catch (error) {
                        console.error("Error formatting time:", error);
                        ceremony.startTime = "";
                        ceremony.endTime = "";
                    }
                } else {
                    ceremony.startTime = "";
                    ceremony.endTime = "";
                }
            });
        }

        return {
            props: {
                ceremonies: ceremonies ?? null,
                currentPage: page,
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

const Ceremonies = ({ ceremonies, currentPage }) => {
    const router = useRouter();
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (ceremonies?.total) {
            setTotalPages(Math.ceil(ceremonies.total / 10));
        }
    }, [ceremonies]);

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
                    {!ceremonies && (
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
                            image={"https://s3.eu-west-1.amazonaws.com/arise-api/ceremony/01972d17-2c8f-7001-8cff-a990d3a04ad1_original.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2HUZ2C4HNRMJMJ6V%2F20250602%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250602T045818Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=0c59ff914ab3dc164f9ea623bd0eb2954c1526b028c2b0025ec93cb4d9a3911e" || ceremony.image?.image}
                            title={ceremony.title}
                            locationCountry={ceremony.locationCountry}
                            locationAddress={ceremony.locationAddress}
                            startDate={ceremony.startDate}
                            endDate={ceremony.endDate}
                            startTime={ceremony.startTime}
                            endTime={ceremony.endTime}
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
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
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
                )}
            </div>
        </AdminPagesWrapper>
    );
}

export default Ceremonies;