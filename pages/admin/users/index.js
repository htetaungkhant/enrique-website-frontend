import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink
} from "@/components/ui/pagination";
import { getAllUsers } from '@/lib/inhouseAPI/auth-route';
import { cn } from '@/lib/utils';

export async function getServerSideProps(context) {
    try {
        const page = parseInt(context.query.page) || 1;
        const response = await getAllUsers({ ...context.req, body: { page, limit: 10 } });

        return {
            props: {
                users: response?.users ?? [],
                total: response?.total ?? 0,
                currentPage: page,
            },
        };
    } catch (error) {
        console.error("Error fetching users:", error);
        return {
            props: {
                users: [],
                total: 0,
                currentPage: 1,
            },
        };
    }
}

const UsersList = ({ users, total, currentPage }) => {
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

    const handleViewDetails = (userId) => {
        router.push(`/admin/users/${userId}`);
    };

    return (
        <AdminPagesWrapper>
            <div className="p-6 flex flex-col gap-4">
                <h1 className="text-2xl text-white font-bold">Users Management</h1>

                <div className="bg-white rounded-md shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-20">No.</TableHead>
                                <TableHead>User Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={user.id}>
                                    <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                                    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone || 'N/A'}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleViewDetails(user.id)}
                                            className="h-8 w-8 cursor-pointer text-blue-700 hover:text-blue-700 hover:bg-blue-100"
                                        >
                                            <Info className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {totalPages > 1 && (
                    <Pagination>
                        <PaginationContent className="text-white">
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                    className={cn(
                                        "border-white hover:bg-white hover:text-black transition-colors",
                                        currentPage <= 1 ? "pointer-events-none opacity-50" : "",
                                        "cursor-pointer"
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
                                                    "border-white hover:bg-white hover:text-black transition-colors cursor-pointer",
                                                    page === currentPage ? "bg-white text-black" : ""
                                                )}
                                            >
                                                {page}
                                            </PaginationLink>
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
                                        currentPage >= totalPages ? "pointer-events-none opacity-50" : "",
                                        "cursor-pointer"
                                    )}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </AdminPagesWrapper>
    );
};

export default UsersList;