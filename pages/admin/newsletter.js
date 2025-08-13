import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { Trash2, Search, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";

import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn, formatPhoneNumber } from "@/lib/utils";
import { getNewsLetters } from "@/lib/inhouseAPI/newsletter-route";

const SortingType = Object.freeze({
    DATE_ASCENDING: "asc",
    DATE_DESCENDING: "desc",
});

export async function getServerSideProps(context) {
    try {
        const page = parseInt(context.query.page) || 1;
        const sortByDate = context.query.sortByDate;

        const response = await getNewsLetters({
            ...context.req,
            body: {
                page,
                limit: 10,
                sortByDate
            }
        });

        return {
            props: {
                newsletters: response?.newsletters ?? [],
                total: response?.total ?? 0,
                currentPage: page,
                sortByDate: sortByDate || null
            },
        };
    } catch (error) {
        console.error("Error fetching newsletters:", error);
        return {
            props: {
                newsletters: [],
                total: 0,
                currentPage: 1,
                sortByDate: null
            },
        };
    }
}

const Newsletter = ({ newsletters = [], total, currentPage, sortByDate }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (total) {
            setTotalPages(Math.ceil(total / 10));
        }
    }, [total]);

    const filteredNewsletters = newsletters.filter(newsletter =>
        newsletter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        newsletter.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id) => {
        try {
            setIsSubmitting(true);
            const response = await fetch("/api/admin/newsletter", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                // router.refresh();
                router.replace(router.asPath);
                toast.success("Newsletter deleted successfully");
            } else {
                toast.error("Failed to delete newsletter");
            }
        } catch (error) {
            console.error("Error deleting newsletter:", error);
            toast.error("Failed to delete newsletter");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePageChange = (page) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page },
        });
    };

    const handleSortChange = () => {
        const newSortType = sortByDate === SortingType.DATE_ASCENDING
            ? SortingType.DATE_DESCENDING
            : SortingType.DATE_ASCENDING;

        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                sortByDate: newSortType
            }
        });
    };

    return (
        <AdminPagesWrapper>
            <div className="p-6 flex flex-col gap-4">
                <h1 className="text-2xl text-white font-bold">Newsletter Management</h1>
                <div className="flex max-lg:flex-col lg:justify-between lg:items-center gap-2">
                    <div className="max-lg:order-2 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        <Input
                            placeholder="Search newsletters..."
                            className="pl-10 max-lg:w-full w-80 bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-md shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-20">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Mobile</TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        onClick={handleSortChange}
                                        className="hover:bg-transparent p-0 h-auto font-medium cursor-pointer"
                                    >
                                        <span>Date</span>
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredNewsletters.map((newsletter, index) => (
                                <TableRow key={newsletter.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{newsletter.name}</TableCell>
                                    <TableCell>{newsletter.email}</TableCell>
                                    <TableCell>{newsletter.phoneNumber ? formatPhoneNumber(newsletter.phoneNumber) : "N/A"}</TableCell>
                                    <TableCell>
                                        {format(new Date(newsletter.createdAt), "MMMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 cursor-pointer"
                                                    disabled={isSubmitting}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        <strong className="text-red-600">This action cannot be undone.</strong> This will permanently delete the newsletter.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel
                                                        className="cursor-pointer"
                                                    >
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        className="cursor-pointer bg-red-500 hover:bg-red-600"
                                                        onClick={() => handleDelete(newsletter.id)}
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? "Deleting..." : "Delete"}
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {!searchQuery && totalPages > 1 && (
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

export default Newsletter;