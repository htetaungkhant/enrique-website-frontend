import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import CourseCard from "@/components/Admin/CourseManagementPage/CourseCard";
import AddNewCard from "@/components/Admin/AddNewCard";
import { getAllCourses } from "@/lib/inhouseAPI/course-route";
import { cn } from "@/lib/utils";

export async function getServerSideProps(context) {
    try {
        const page = parseInt(context.query.page) || 1;
        const response = await getAllCourses({ ...context.req, body: { page, limit: 10 } });

        return {
            props: {
                courses: response?.courses ?? [],
                total: response?.total ?? 0,
                currentPage: page,
            },
        };
    } catch (error) {
        console.error("Error fetching courses:", error);
        return {
            props: {
                courses: [],
                total: 0,
                currentPage: 1,
            },
        };
    }
}

const Courses = ({ courses, total, currentPage }) => {
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

    const handleEditCourse = (courseId) => {
        router.push(`/admin/course-management/courses/${courseId}/edit`);
    };

    return (
        <AdminPagesWrapper>
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {!Array.isArray(courses) && (
                        <div className="col-span-full text-center text-muted-foreground">
                            No courses data available
                        </div>
                    )}

                    {Array.isArray(courses) && courses.length === 0 && (
                        <div className="col-span-full text-center text-muted-foreground">
                            No courses found
                        </div>
                    )}

                    {Array.isArray(courses) && courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            id={course.id}
                            image={course.image.image}
                            title={course.title}
                            sessionOverview={course.sessionOverview}
                            createdBy={{
                                name: course.createdBy.name,
                                image: course.createdBy.image.image
                            }}
                            createdAt={course.createdAt}
                            price={course.price}
                            onEdit={handleEditCourse}
                        />
                    )
                    )}

                    <AddNewCard
                        label="Add New Course"
                        href="/admin/course-management/create-new-course"
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

export default Courses;