import { EditBlogForm } from "@/components/Admin/BlogManagementPage/EditBlogForm";
import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import { getBlogDetails } from "@/lib/inhouseAPI/blog-route";

export async function getServerSideProps(context) {
    try {
        const { blogId } = context.params;
        const blog = await getBlogDetails({ ...context.req, body: { id: blogId } });

        if (!blog) {
            return {
                notFound: true
            };
        }

        return {
            props: {
                blog
            }
        };
    } catch (error) {
        console.error("Error fetching blog details:", error);
        return {
            notFound: true
        };
    }
}

const BlogEdit = ({ blog }) => {
    if (!blog) return null;

    return (
        <AdminPagesWrapper>
            <div className="p-6">
                <h1 className="text-2xl text-white font-bold mb-6">Edit Blog</h1>
                <EditBlogForm initialData={blog} />
            </div>
        </AdminPagesWrapper>
    )
}

export default BlogEdit;