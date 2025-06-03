import Image from "next/image";

import Footer from "@/components/common/Footer";
import UPSection from "@/components/common/UniformPaddingSection";
import PageHeader from "@/components/common/PageHeader";
import YouTubeBanner from "@/components/common/YouTubeBanner";
import { getCourseDetails } from "@/lib/inhouseAPI/course-route";
import { useUserAuth } from "@/hooks/userAuth";

export async function getServerSideProps(context) {
    try {
        const { courseId } = context.params;
        const course = await getCourseDetails({ ...context.req, body: { id: courseId } });

        if (!course) {
            return {
                notFound: true
            };
        }

        return {
            props: {
                course
            }
        };
    } catch (error) {
        console.error("Error fetching course details:", error);
        return {
            notFound: true
        };
    }
}

const CourseDetails = ({ course }) => {
    const { session } = useUserAuth();

    return (
        <main className="relative min-h-screen flex flex-col justify-between">
            <PageHeader />
            <UPSection className="inter-font text-white pt-28 xl:pt-48">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[65%_30%] justify-between">
                    <div className="flex flex-col gap-10">
                        <h2 className="font-black text-5xl">{course.title}</h2>
                        <div>
                            <div className="pt-3 flex flex-wrap gap-6 lg:gap-10">
                                <div className="flex items-center gap-3 font-medium">
                                    <Image src={course.createdBy?.image?.image} width={100} height={100} alt="avator" className="w-12 h-12 lg:w-16 lg:h-16 rounded-full" />
                                    <span className="text-lg">{course.createdBy?.name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold text-lg">Session Overview</h3>
                            <p>{course.sessionOverview}</p>
                        </div>
                        {
                            Array.isArray(course.extraDetails) && course.extraDetails?.length > 0 && (
                                course.extraDetails?.map((extra, index) => (
                                    <div key={`${extra.title}-${index}`} className="flex flex-col gap-2">
                                        <h3 className="font-bold text-lg">{extra.title}</h3>
                                        {
                                            Array.isArray(extra.points) && extra.points?.length > 0 && (
                                                <ul className="list-disc pl-3">
                                                    {
                                                        extra.points?.map((point, index) => (
                                                            <li key={`${point}-${index}`}>{point}</li>
                                                        ))
                                                    }
                                                </ul>
                                            )
                                        }
                                    </div>
                                ))
                            )
                        }
                        {
                            !session || session?.validationFailed ?
                                <YouTubeBanner />
                                : Array.isArray(course.classes) && course.classes?.length > 0 ? (
                                    course.classes?.map((video, index) => (
                                        <div key={`${video.id}-${index}`} className="flex flex-col gap-2">
                                            <h3 className="font-bold text-lg">{video.title}</h3>
                                            {
                                                Array.isArray(video.points) && video.points?.length > 0 && (
                                                    <ul className="list-disc pl-3">
                                                        {
                                                            video.points?.map((point, index) => (
                                                                <li key={`${point}-${index}`}>{point}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                            {
                                                video.videoUrl?.video && <YouTubeBanner href={video.videoUrl?.video} />
                                            }
                                        </div>
                                    ))
                                ) :
                                    <p>Class videos are coming soon...</p>
                        }
                    </div>
                    <div>
                        <div className="p-4 rounded-xl bg-white text-[#032F1F] flex flex-col gap-3">
                            <div className="font-bold flex justify-between">
                                <span>Ceremony Fee</span>
                                <span>€{parseFloat(course.price)?.toFixed(2)}</span>
                            </div>
                            <button className="p-3 inter-font font-bold text-sm text-white rounded-4xl bg-[#212A63] cursor-pointer">
                                Purchase  Now
                            </button>
                        </div>
                    </div>
                </div>
            </UPSection>
            <Footer className="mt-10" />
        </main>
    )
}

export default CourseDetails;