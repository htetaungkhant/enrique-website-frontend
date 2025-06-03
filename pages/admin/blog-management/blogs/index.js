import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import BlogCard from "@/components/Admin/BlogManagementPage/BlogCard";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { getBlogs } from "@/lib/inhouseAPI/blog-route";
import { cn } from "@/lib/utils";

export async function getServerSideProps(context) {
    try {
        const page = parseInt(context.query.page) || 1;
        const response = await getBlogs({
            ...context.req,
            body: {
                page,
                limit: 10
            }
        });

        return {
            props: {
                blogs: response?.blogs ?? [],
                total: response?.total ?? 0,
                currentPage: page,
            },
        };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return {
            props: {
                blogs: [],
                total: 0,
                currentPage: 1,
            },
        };
    }
}

const Blogs = ({ blogs, total, currentPage }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);

    useEffect(() => {
        if (total) {
            setTotalPages(Math.ceil(total / 10));
        }
    }, [total]);

    // Reset filtered blogs when original blogs data changes
    useEffect(() => {
        setFilteredBlogs(blogs);
        setSearchQuery(""); // Reset search when page changes
    }, [blogs]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchQuery(value);

        if (!Array.isArray(blogs)) return;

        if (!value.trim()) {
            setFilteredBlogs(blogs);
        } else {
            const filtered = blogs.filter(blog =>
                blog.title?.toLowerCase().includes(value)
            );
            setFilteredBlogs(filtered);
        }
    };

    const handleCreateNew = () => {
        router.push('/admin/blog-management/create-new-blog');
    };

    const handleEdit = (blogId) => {
        router.push(`/admin/blog-management/blogs/${blogId}/edit`);
    };

    const handlePageChange = (page) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page },
        });
    };

    return (
        <AdminPagesWrapper>
            <div className="p-6 space-y-6 min-h-screen">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl text-white font-bold">Blogs Management</h1>
                    <Button onClick={handleCreateNew} variant="outline" className="cursor-pointer flex items-center gap-2 bg-white hover:bg-gray-100">
                        <Plus size={20} />
                        Create New Blog
                    </Button>
                </div>

                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    <Input
                        placeholder="Search blogs..."
                        className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>

                {!Array.isArray(filteredBlogs) && (
                    <div className="text-center text-white">
                        No blogs data available
                    </div>
                )}

                {Array.isArray(filteredBlogs) && filteredBlogs.length === 0 && (
                    <div className="text-center text-white">
                        {searchQuery ? "No blogs found matching your search." : "No blogs found"}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(filteredBlogs) && filteredBlogs.map((blog, index) => (
                        <BlogCard
                            key={`${blog.id}-${index}`}
                            {...blog}
                            onEdit={handleEdit}
                        />
                    ))}
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

export default Blogs;