import { useRouter } from "next/router";
import { ArrowLeft, Pencil } from "lucide-react";
import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import { Button } from "@/components/ui/button";
import { getBlogDetails } from "@/lib/inhouseAPI/blog-route";
import { Card } from "@/components/ui/card";

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

const BlogPreview = ({ blog }) => {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/admin/blog-management/blogs/${blog.id}/edit`);
    };

    const handleBack = () => {
        router.push('/admin/blog-management/blogs');
    };

    if (!blog) return null;

    return (
        <AdminPagesWrapper>
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        className="cursor-pointer flex items-center gap-2 bg-white hover:bg-gray-100"
                        onClick={handleBack}
                    >
                        <ArrowLeft size={20} />
                        Back to Blogs
                    </Button>
                    <Button
                        variant="outline"
                        className="cursor-pointer flex items-center gap-2 bg-white hover:bg-gray-100"
                        onClick={handleEdit}
                    >
                        <Pencil size={20} />
                        Edit Blog
                    </Button>
                </div>

                <Card className="bg-transparent border-none py-0">
                    <div className="p-4"> { /* max-w-4xl */}
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
                            {blog.title}
                        </h1>

                        <div
                            className="prose prose-lg max-w-none prose-invert text-white whitespace-pre-wrap break-words [&_p]:text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white [&_ul]:text-white [&_ol]:text-white [&_*]:whitespace-pre-wrap [&_*]:break-words [&_p]:mb-4 [&_p:empty]:h-4" // dark:prose-invert prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300
                            dangerouslySetInnerHTML={{ __html: blog.content.replace(/(<p[^>]*>)\s*(<\/p>)/g, '$1<br>$2') }}
                        />
                    </div>
                </Card>
            </div>
        </AdminPagesWrapper>
    );
}

export default BlogPreview;