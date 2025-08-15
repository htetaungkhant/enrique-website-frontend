import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/common/Footer";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import UPSection from "@/components/common/UniformPaddingSection";
import blogRoute from "@/lib/inhouseAPI/blog-route";

export async function getServerSideProps(context) {
  try {
    const { blogTitle } = context.params;
    const blog = await blogRoute.getBlogDetailsByTitle({
      ...context.req,
      body: { title: blogTitle },
    });

    if (!blog) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        blog,
      },
    };
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return {
      notFound: true,
    };
  }
}

const BlogDetails = ({ blog }) => {
  const router = useRouter();

  if (!blog) return null;

  const handleBack = () => {
    router.push("/blogs");
  };

  return (
    <main>
      <PageHeaderWithBanner title="Blogs">
        <p className="inter-font text-sm md:text-base lg:text-lg xl:text-xl font-medium">
          Expand Your Knowledge, Deepen Your Journey
        </p>
      </PageHeaderWithBanner>
      <UPSection>
        <div className="space-y-6">
          <Button
            variant="outline"
            className="cursor-pointer flex items-center gap-2 bg-[#D7F2D5] hover:bg-[#c5e4c3] text-[#054224]"
            onClick={handleBack}
          >
            <ArrowLeft size={20} />
            Back to Blogs
          </Button>

          <Card className="bg-transparent border-none py-0">
            <div className="p-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
                {blog.title}
              </h1>

              <div
                className="prose prose-lg max-w-none prose-invert text-white whitespace-pre-wrap break-words [&_p]:text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white [&_ul]:text-white [&_ol]:text-white [&_*]:whitespace-pre-wrap [&_*]:break-words [&_p]:mb-4 [&_p:empty]:h-4"
                dangerouslySetInnerHTML={{
                  __html: blog.content.replace(
                    /(<p[^>]*>)\s*(<\/p>)/g,
                    "$1<br>$2"
                  ),
                }}
              />
            </div>
          </Card>
        </div>
      </UPSection>
      <Footer className="mt-10" />
    </main>
  );
};

export default BlogDetails;
