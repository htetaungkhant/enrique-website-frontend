import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { EllipsisVertical, Search, ArrowUpDown, Info } from "lucide-react";

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
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn, formatPhoneNumber } from "@/lib/utils";
import supportRoute from "@/lib/inhouseAPI/support-route";

const SortingType = Object.freeze({
    DATE_ASCENDING: "asc",
    DATE_DESCENDING: "desc",
});

export async function getServerSideProps(context) {
    try {
        const page = parseInt(context.query.page) || 1;
        const sortByDate = context.query.sortByDate;

        const response = await supportRoute.getSupports({
            ...context.req,
            body: {
                page,
                limit: 10,
                sort: sortByDate
            }
        });

        return {
            props: {
                supports: response?.support ?? [],
                total: response?.total ?? 0,
                currentPage: page,
                sortByDate: sortByDate || null
            },
        };
    } catch (error) {
        console.error("Error fetching supports:", error);
        return {
            props: {
                supports: [],
                total: 0,
                currentPage: 1,
                sortByDate: null
            },
        };
    }
}

const ContactUs = ({ supports = [], total, currentPage, sortByDate }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [openDetailId, setOpenDetailId] = useState(null);

    useEffect(() => {
        if (total) {
            setTotalPages(Math.ceil(total / 10));
        }
    }, [total]);

    const filteredSupportletters = supports.filter(supportletter =>
        supportletter.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supportletter.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <h1 className="text-2xl text-white font-bold">Contact Us Management</h1>
                <div className="flex max-lg:flex-col lg:justify-between lg:items-center gap-2">
                    <div className="max-lg:order-2 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        <Input
                            placeholder="Search mobile or email ..."
                            className="pl-10 max-lg:w-full w-80 bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-md shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-20">ID</TableHead>
                                <TableHead>Mobile</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Message</TableHead>
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
                            {filteredSupportletters.map((supportLetter, index) => (
                                <TableRow key={supportLetter.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{formatPhoneNumber(supportLetter.mobile)}</TableCell>
                                    <TableCell>{supportLetter.email}</TableCell>
                                    <TableCell className="max-w-md">
                                        <div className="truncate" title={supportLetter.message}>
                                            {supportLetter.message}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(supportLetter.createdAt ?? Date.now()), "MMMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Dialog open={openDetailId === supportLetter.id} onOpenChange={open => setOpenDetailId(open ? supportLetter.id : null)}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-blue-500 cursor-pointer"
                                                >
                                                    <Info className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-md p-0 overflow-hidden" closeIconClassName="text-white">
                                                <div className="bg-blue-600 flex items-center gap-3 px-6 py-4">
                                                    <Info className="h-7 w-7 text-white" />
                                                    <div>
                                                        <DialogTitle className="text-white text-lg font-semibold">Support Letter Details</DialogTitle>
                                                        <div className="text-blue-100 text-xs">Submitted on {format(new Date(supportLetter.createdAt ?? Date.now()), "MMMM d, yyyy")}</div>
                                                    </div>
                                                </div>
                                                <div className="px-6 py-5 space-y-4 bg-white">
                                                    <div>
                                                        <div className="text-xs text-gray-500 font-semibold uppercase mb-1">Mobile</div>
                                                        <div className="text-base text-gray-900">{formatPhoneNumber(supportLetter.mobile)}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-gray-500 font-semibold uppercase mb-1">Email</div>
                                                        <div className="text-base text-gray-900">{supportLetter.email}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-gray-500 font-semibold uppercase mb-1">Message</div>
                                                        <div className="bg-gray-100 rounded p-3 text-gray-800 whitespace-pre-line border border-gray-200 text-sm max-h-48 overflow-auto">{supportLetter.message}</div>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
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

export default ContactUs;