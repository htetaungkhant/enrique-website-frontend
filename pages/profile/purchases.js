import { useRouter } from "next/router";
import Image from "next/image";

import ProfilePagesWrapper from "@/components/common/auth/ProfilePagesWrapper";
import CourseCard from "@/components/CourseOfferingsPage/CourseCard";
import { getCoursesByUser } from "@/lib/inhouseAPI/course-route";

export async function getServerSideProps(context) {
    try {
        const courses = await getCoursesByUser({ ...context.req });

        return {
            props: {
                courses: courses ?? [],
            },
        };
    } catch (error) {
        console.error("Error fetching courses:", error);
        return {
            props: {
                courses: [],
            },
        };
    }
}

const Purchases = ({ courses }) => {
    const router = useRouter();

    const handleExploreCourses = (e) => {
        e.preventDefault();
        router.push('/course-offerings');
    }

    return (
        <ProfilePagesWrapper>
            <div className="py-5 md:px-5 md:py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-10 justify-between">
                    {!Array.isArray(courses) && (
                        <div className="col-span-full text-center text-muted-foreground">
                            No courses data available
                        </div>
                    )}

                    {Array.isArray(courses) && courses.length === 0 && (
                        <div className="col-span-full text-center text-muted-foreground">
                            <div className="pt-5 lg:pt-10 w-full flex flex-col gap-3 items-center">
                                <Image
                                    src="/icon/empty-courses.png"
                                    width={225}
                                    height={225}
                                    alt="empty-course"
                                    className="w-56 h-56 max-lg:w-44 max-lg:h-44 object-contain"
                                />
                                <h4 className="text-lg font-semibold">No  Purchases Yet</h4>
                                <p className="text-sm text-[#EFEFEF]">Start exploring our courses</p>
                                <button
                                    type="button"
                                    onClick={handleExploreCourses}
                                    className="mt-3 px-4 py-2 rounded-4xl bg-gradient-to-b from-[#D7F2D5] to-[#5C8959] text-black font-bold cursor-pointer"
                                >
                                    Explore Courses
                                </button>
                            </div>
                        </div>
                    )}

                    {Array.isArray(courses) && courses.map((course, index) => (
                        <CourseCard
                            key={`${course.id}-${index}`}
                            id={course.id}
                            image={course.image?.image}
                            title={course.title}
                            description={course.sessionOverview}
                            instructor={course.createdBy?.name}
                            instructorImage={course.createdBy?.image?.image}
                            dates={course.createdAt}
                            price={course.price}
                            purchase={true}
                        />
                    )
                    )}
                </div>
            </div>
        </ProfilePagesWrapper>
    )
}

export default Purchases;