import { CreateBlogForm } from "@/components/Admin/BlogManagementPage/CreateBlogForm";
import AdminPagesWrapper from "@/components/Admin/PageWrapper";

const CreateNewBlog = () => {
    return (
        <AdminPagesWrapper>
            <div className="p-6">
                <h1 className="text-2xl text-white font-bold mb-6">Create New Blog</h1>
                <CreateBlogForm />
            </div>
        </AdminPagesWrapper>
    )
}

export default CreateNewBlog;