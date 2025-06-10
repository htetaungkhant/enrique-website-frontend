import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseCard from "@/components/CourseOfferingsPage/CourseCard";
import { getAllUsers } from '@/lib/inhouseAPI/auth-route';
import { getCoursesByUserId } from '@/lib/inhouseAPI/course-route';
import { getSurveysByUserId } from '@/lib/inhouseAPI/survey-route';

export async function getServerSideProps(context) {
    try {
        const { userId } = context.params;

        // Get user details
        const page = parseInt(context.query.page) || 1;
        const usersResponse = await getAllUsers({
            ...context.req,
            body: {
                page,
                limit: 100,
            }
        });
        const user = usersResponse?.users?.find(user => user.id === userId);

        if (!user) {
            return {
                notFound: true
            };
        }

        // Get user's courses
        const coursesResponse = await getCoursesByUserId({
            ...context.req,
            body: {
                userId,
                page,
                limit: 100,
            }
        });

        // Get user's surveys
        const surveysResponse = await getSurveysByUserId({
            ...context.req,
            body: { userId }
        });

        // const filteredSurveys = surveysResponse?.surveys?.filter(survey => {
        //     const answer = survey.answer;
        //     return answer && (Array.isArray(answer) ? answer.length > 0 : answer.trim() !== "");
        // });

        return {
            props: {
                user,
                courses: coursesResponse?.courses ?? [],
                surveys: surveysResponse?.surveys ?? [],
                // surveys: filteredSurveys ?? [],
            },
        };
    } catch (error) {
        console.error("Error fetching user details:", error);
        return {
            notFound: true
        };
    }
}

const UserInformation = ({ user }) => {
    const fields = [
        { label: 'User Name', value: user.firstName + ' ' + user.lastName },
        { label: 'Date of Birth', value: user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'N/A' },
        { label: 'Age', value: user.age || 'N/A' },
        { label: 'Blood Group', value: user.bloodGroup || 'N/A' },
        { label: 'Gender', value: user.gender || 'N/A' },
        { label: 'Contact Number', value: user.phone || 'N/A' },
        { label: 'Email', value: user.email }
    ];

    return (
        <div className="space-y-6">
            {fields.map((field, index) => (
                <div key={index} className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">{field.label}</label>
                    <div className="p-3 bg-gray-50 rounded-lg">
                        {field.value}
                    </div>
                </div>
            ))}
        </div>
    );
};

const CoursesPurchased = ({ courses }) => {
    if (!Array.isArray(courses)) {
        return (
            <div className="p-6 text-center text-muted-foreground">
                No courses data available
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="p-6 text-center text-muted-foreground">
                <div className="pt-5 lg:pt-10 w-full flex flex-col gap-3 items-center">
                    <Image
                        src="/icon/empty-courses.png"
                        width={225}
                        height={225}
                        alt="empty-course"
                        className="w-56 h-56 max-lg:w-44 max-lg:h-44 object-contain"
                    />
                    <h4 className="text-lg font-semibold">No Purchases Yet</h4>
                    <p className="text-sm text-gray-700">This user hasn't purchased any courses</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-10 justify-between">
                {courses.map((course, index) => (
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
                        disableLink={true}
                        className="shadow-xl hover:shadow-2xl transition-shadow duration-300"
                    />
                ))}
            </div>
        </div>
    );
};

const SurveyAnswers = ({ surveys }) => {
    if (!surveys?.length) {
        return (
            <div className="p-6 text-center text-gray-700">
                No survey responses available
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            {surveys.map((survey) => (
                <div key={survey.id} className="space-y-2">
                    <p className="font-medium">{survey.question}</p>
                    <div className="p-3 bg-gray-50 rounded-lg">
                        {
                            Array.isArray(survey.answer)
                                ? survey.answer.map((answer, index) => (
                                    <div key={index} className="text-sm text-gray-700">
                                        {answer || "N/A"}
                                    </div>
                                ))
                                : <span className="text-sm text-gray-700">
                                    {
                                        survey.questionType === 'rating'
                                            ? survey.answer ? `Rating: ${survey.answer}` : "N/A"
                                            : survey.answer || "N/A"
                                    }
                                </span>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

const UserDetails = ({ user, courses, surveys }) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("user-information");

    return (
        <AdminPagesWrapper>
            <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.back()}
                        className="text-white hover:text-white hover:bg-white/10"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-2xl text-white font-bold">User Details</h1>
                </div>

                <div className="p-2 bg-white rounded-lg overflow-hidden">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="w-full h-12 grid grid-cols-3 bg-gray-100">
                            <TabsTrigger
                                value="user-information"
                                className="h-full"
                            >
                                USER INFORMATION
                            </TabsTrigger>
                            <TabsTrigger
                                value="courses-purchased"
                                className="h-full"
                            >
                                COURSES PURCHASED
                            </TabsTrigger>
                            <TabsTrigger
                                value="survey-answers"
                                className="h-full"
                            >
                                SURVEY ANSWERS
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="user-information" className="p-4">
                            <UserInformation user={user} />
                        </TabsContent>
                        <TabsContent value="courses-purchased">
                            <CoursesPurchased courses={courses} />
                        </TabsContent>
                        <TabsContent value="survey-answers">
                            <SurveyAnswers surveys={surveys} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AdminPagesWrapper>
    );
};

export default UserDetails;