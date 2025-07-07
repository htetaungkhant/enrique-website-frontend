import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import { CreateCourseForm } from "@/components/Admin/CourseManagementPage/CreateCourseForm";

const CreateNewCourse = () => {
    return (
        <AdminPagesWrapper>
            <div className="p-6">
                <h1 className="text-2xl text-white font-semibold mb-6">Add New Course</h1>
                <CreateCourseForm />
            </div>
        </AdminPagesWrapper>
    )
}

export default CreateNewCourse;