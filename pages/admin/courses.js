import { useRouter } from "next/router";

import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import CourseCard from "@/components/Admin/CourseManagementPage/CourseCard";
import AddNewCard from "@/components/Admin/AddNewCard";
import { getAllCourses } from "@/lib/inhouseAPI/course-route";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

// dummy data for cards list
// const dummyData = [
//     {
//         "id": "01971b30-80a3-7000-b89a-23bf35d749f0",
//         "price": 120,
//         "image": {
//             "id": "01971b30-903f-7000-a54e-1e7f1a9c81b1",
//             "image": "https://s3.eu-west-1.amazonaws.com/arise-api/course/01971b30-903f-7000-a54e-1e7f1a9c81b1_original.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2HUZ2C4HNRMJMJ6V%2F20250529%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250529T111854Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=0843999aec5355be816a86bba2282b26347926154f8243b3c277a8710fced77e",
//             "thumbnail": "https://s3.eu-west-1.amazonaws.com/arise-api/course/01971b30-903f-7000-a54e-1e7f1a9c81b1_thumbnail.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2HUZ2C4HNRMJMJ6V%2F20250529%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250529T111854Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=65ae24d0240ca311d2a22373a8bae5a4407ef09e887c9f0b16a7c94c4fa76c8a"
//         },
//         "title": "test title",
//         "createdBy": {
//             "name": "test created by",
//             "image": {
//                 "id": "01971b30-80a4-7000-9ebf-31794956e70f",
//                 "image": "https://s3.eu-west-1.amazonaws.com/arise-api/course/01971b30-80a4-7000-9ebf-31794956e70f_original.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2HUZ2C4HNRMJMJ6V%2F20250529%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250529T111854Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ada1ade585b25378a51c805e2b95646865beb5703878e5b27601fc8d757eda3b",
//                 "thumbnail": "https://s3.eu-west-1.amazonaws.com/arise-api/course/01971b30-80a4-7000-9ebf-31794956e70f_thumbnail.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2HUZ2C4HNRMJMJ6V%2F20250529%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250529T111854Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5fcdaf826e184145bfa45f17fabe591ec9de5379ff08320c593439e6d2bb8d5a"
//             }
//         },
//         "sessionOverview": "test sessionOverview",
//         "extraDetails": [
//             {
//                 "title": "Course Title",
//                 "points": [
//                     "Point 1",
//                     "Point 2"
//                 ]
//             },
//             {
//                 "title": "Course Title",
//                 "points": [
//                     "Point 1",
//                     "Point 2"
//                 ]
//             }
//         ],
//         "courseVideos": [
//             {
//                 "video": "course/01961a28-c543-7000-a589-acc0e40b411e.MP4",
//                 "title": "Introduction to the Course",
//                 "points": [
//                     "Welcome to the course",
//                     "Overview of the course structure",
//                     "What you will learn"
//                 ]
//             }, {
//                 "video": "course/01961a28-c543-7000-a589-acc0e40b411e.MP4",
//                 "title": "Understanding the Basics",
//                 "points": [
//                     "Introduction to the basics",
//                     "Key concepts explained",
//                     "Practical examples"
//                 ]
//             }
//         ],
//         "createdAt": "2025-05-29T08:37:37.649Z",
//         "updatedAt": "2025-05-29T08:37:37.649Z"
//     }
// ]

export async function getServerSideProps(context) {
    try {
        const page = parseInt(context.query.page) || 1;
        const courses = await getAllCourses({ ...context.req, body: { page, limit: 10 } });

        return {
            props: {
                courses: courses ?? null,
                currentPage: page,
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

const Courses = ({ courses, currentPage }) => {
    const router = useRouter();
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (courses?.total) {
            setTotalPages(Math.ceil(courses.total / 10));
        }
    }, [courses]);

    const handlePageChange = (page) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page },
        });
    };

    const handleEditCourse = (courseId) => {
        router.push(`/admin/courses/${courseId}/edit`);
    };

    const handleDeleteCourse = async (courseId) => {
        // Implement delete functionality
        if (window.confirm("Are you sure you want to delete this course?")) {
            // Call delete API
            // Refresh the page after deletion
            router.reload();
        }
    };

    return (
        <AdminPagesWrapper>
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {!courses && (
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
                            onDelete={handleDeleteCourse}
                        />
                    )
                    )}

                    <AddNewCard
                        label="Add New Course"
                        href="/admin/create-new-course"
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
                )}
            </div>
        </AdminPagesWrapper>
    );
}

export default Courses;