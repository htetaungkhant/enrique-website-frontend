import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import { CourseForm } from "@/components/Admin/CourseManagementPage/CourseForm";

const CreateNewCourse = () => {
    return (
        <AdminPagesWrapper>
            <div className="p-6">
                <h1 className="text-2xl text-white font-semibold mb-6">Add New Course</h1>
                <CourseForm />
            </div>
        </AdminPagesWrapper>
    )
}

export default CreateNewCourse;