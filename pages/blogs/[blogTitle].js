import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/common/Footer";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import UPSection from "@/components/common/UniformPaddingSection";
import BlogCard from "@/components/BlogsPage/BlogCard";
import blogRoute from "@/lib/inhouseAPI/blog-route";

export async function getServerSideProps(context) {
  try {
    const cookieBlogTitle = await getCookie("blogTitle", {
      req: context.req,
      res: context.res,
    });
    if (cookieBlogTitle) {
      setCookie("blogTitle", "", {
        req: context.req,
        res: context.res,
        maxAge: -1,
      });
    }

    const blogTitle =
      cookieBlogTitle || context.req.url?.replace("/blogs/", "");

    // Fetch blogs in batches to get around the 100 limit
    const fetchAllBlogs = async () => {
      const allBlogs = [];
      let page = 1;
      const limit = 100;
      let hasMore = true;

      while (hasMore && allBlogs.length < 1000) {
        const response = await blogRoute.getBlogs({
          ...context.req,
          body: {
            page,
            limit,
          },
        });

        if (response?.blogs && Array.isArray(response.blogs)) {
          allBlogs.push(...response.blogs);

          // Check if we got fewer blogs than the limit (indicates last page)
          if (response.blogs.length < limit) {
            hasMore = false;
          } else {
            page++;
          }
        } else {
          hasMore = false;
        }
      }

      return allBlogs;
    };

    const blogs = await fetchAllBlogs();

    if (Array.isArray(blogs) && blogs.length > 0) {
      const relatedBlogs = blogs?.sort(() => 0.5 - Math.random()).slice(0, 3);

      const blog = blogs.find(
        (c) =>
          c.title?.replaceAll(/\s+/g, "-").toLowerCase() ===
          blogTitle.toLowerCase()
      );
      if (!blog) {
        return {
          notFound: true,
        };
      }

      const blogDetails = await blogRoute.getBlogDetails({
        ...context.req,
        body: { id: blog.id },
      });
      if (!blogDetails) {
        console.error(`Blog details for id ${blog.id} not found`);
        return {
          notFound: true,
        };
      }

      return {
        props: {
          blog: blogDetails,
          relatedBlogs,
        },
      };
    }

    return {
      notFound: true,
    };
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return {
      notFound: true,
    };
  }
}

const BlogDetails = ({ blog, relatedBlogs = [] }) => {
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
                  __html: blog.content?.replace(
                    /(<p[^>]*>)\s*(<\/p>)/g,
                    "$1<br>$2"
                  ),
                }}
              />
            </div>
          </Card>

          {Array.isArray(relatedBlogs) && relatedBlogs.length > 0 && (
            <section className="mt-20">
              <h2 className="text-xl font-bold text-white mb-4">
                Related Blogs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-10 xl:gap-20 justify-between">
                {relatedBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    fromRelated={true}
                    image={blog.image?.image || "/dummy-data/4.jpg"}
                    title={blog.title}
                    className="text-white h-40 lg:h-56"
                    titleClassName="text-xl md:text-2xl xl:text-3xl line-clamp-3"
                    learnMoreHref={`/blogs/${blog.title}`
                      .replaceAll(/\s+/g, "-")
                      .toLowerCase()}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </UPSection>
      <Footer className="mt-10" />
    </main>
  );
};

export default BlogDetails;
