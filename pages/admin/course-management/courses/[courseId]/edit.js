import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import { EditCourseForm } from "@/components/Admin/CourseManagementPage/EditCourseForm";
import { getCourseDetails } from "@/lib/inhouseAPI/course-route";

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

const CourseEdit = ({ course }) => {
    if (!course) {
        return null;
    }

    return (
        <AdminPagesWrapper>
            <div className="p-6">
                <h1 className="text-2xl text-white font-semibold mb-6">Edit Course</h1>
                <EditCourseForm initialData={course} />
            </div>
        </AdminPagesWrapper>
    );
}

export default CourseEdit;