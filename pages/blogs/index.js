import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LuCalendarDays } from "react-icons/lu";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Footer from "@/components/common/Footer";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import SearchBox from "@/components/common/SearchBox";
import UPSection from "@/components/common/UniformPaddingSection";
import BlogCard from "@/components/BlogsPage/BlogCard";
import NewsLetter from "@/components/common/NewsLetter";
import { cn } from "@/lib/utils";
import { getBlogs } from "@/lib/inhouseAPI/blog-route";

const SortingType = Object.freeze({
  DATE_ASCENDING: "date-ascending",
  DATE_DESCENDING: "date-descending",
});

export async function getServerSideProps(context) {
  try {
    const page = parseInt(context.query.page) || 1;
    const sortByDate = context.query.sortByDate;

    const response = await getBlogs({
      ...context.req,
      body: {
        page,
        limit: 10,
        sortByDate,
      },
    });

    return {
      props: {
        blogs: response?.blogs ?? [],
        total: response?.total ?? 0,
        currentPage: page,
        sortByDate: sortByDate || null,
      },
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {
      props: {
        blogs: [],
        total: 0,
        currentPage: 1,
        sortByDate: null,
      },
    };
  }
}

const BlogsPage = ({ blogs = [], total, currentPage, sortByDate }) => {
  const [datePopover, setDatePopover] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [sortingType, setSortingType] = useState(() => {
    if (sortByDate === "asc") return SortingType.DATE_ASCENDING;
    if (sortByDate === "desc") return SortingType.DATE_DESCENDING;
    return undefined;
  });
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  useEffect(() => {
    if (total) {
      setTotalPages(Math.ceil(total / 10));
    }
  }, [total]);

  useEffect(() => {
    const { sortByDate } = router.query;
    if (sortByDate === "asc") {
      setSortingType(SortingType.DATE_ASCENDING);
    } else if (sortByDate === "desc") {
      setSortingType(SortingType.DATE_DESCENDING);
    } else {
      setSortingType(undefined);
    }
  }, [router.query]);

  const handlePageChange = (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  const handleDateSorting = (value) => {
    setSortingType(value);
    setDatePopover(false);

    const query = { ...router.query };

    if (value === SortingType.DATE_ASCENDING) {
      query.sortByDate = "asc";
    } else if (value === SortingType.DATE_DESCENDING) {
      query.sortByDate = "desc";
    }

    router.push({
      pathname: router.pathname,
      query: { ...query, page: 1 },
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    if (!Array.isArray(blogs)) return;

    if (!value.trim()) {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter((blog) =>
        blog.title?.toLowerCase().includes(value)
      );
      setFilteredBlogs(filtered);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <PageHeaderWithBanner title="Blogs">
        <p className="inter-font text-sm md:text-base lg:text-lg xl:text-xl font-medium">
          Expand Your Knowledge, Deepen Your Journey
        </p>
      </PageHeaderWithBanner>
      <UPSection className="flex-1">
        <div className="inter-font text-white">
          <div className="py-16 flex flex-col items-start md:flex-row gap-3 lg:gap-5">
            <button
              className={cn(
                "px-4 py-1 lg:py-2 text-sm border-[1px] border-[#D7F2D5] rounded-3xl cursor-pointer text-white outline-none",
                !sortingType && "text-[#054224] bg-[#D7F2D5]"
              )}
              onClick={() => {
                setSortingType();
                const { page, sortByDate, ...restQuery } = router.query;
                router.push({
                  pathname: router.pathname,
                  query: { ...restQuery },
                });
              }}
            >
              All Blogs
            </button>

            <Popover open={datePopover} onOpenChange={setDatePopover}>
              <PopoverTrigger asChild>
                <span
                  className={cn(
                    "px-4 py-1 lg:py-2 text-sm border-[1px] border-white rounded-3xl cursor-pointer flex items-center gap-3",
                    (sortingType === SortingType.DATE_ASCENDING ||
                      sortingType === SortingType.DATE_DESCENDING) &&
                      "text-[#054224] bg-[#D7F2D5]"
                  )}
                >
                  Sort by Date
                  <LuCalendarDays size={16} />
                </span>
              </PopoverTrigger>
              <PopoverContent
                disablePortal
                className="p-0 w-36 lg:w-40 xl:w-44 overflow-hidden"
                align="start"
              >
                <ul className="merriweather-font">
                  <li>
                    <button
                      type="button"
                      className={cn(
                        "w-full px-4 py-2 text-left hover:bg-gray-100 transition outline-none",
                        sortingType === SortingType.DATE_ASCENDING &&
                          "bg-gray-100 font-semibold"
                      )}
                      onClick={() =>
                        handleDateSorting(SortingType.DATE_ASCENDING)
                      }
                    >
                      Ascending
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={cn(
                        "w-full px-4 py-2 text-left hover:bg-gray-100 transition outline-none",
                        sortingType === SortingType.DATE_DESCENDING &&
                          "bg-gray-100 font-semibold"
                      )}
                      onClick={() =>
                        handleDateSorting(SortingType.DATE_DESCENDING)
                      }
                    >
                      Descending
                    </button>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
            <SearchBox
              placeholder="Search by Blog Topic"
              className="md:w-52 lg:w-72 text-sm"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          {!Array.isArray(filteredBlogs) && (
            <div className="text-center text-white">
              No blogs data available
            </div>
          )}

          {Array.isArray(filteredBlogs) && filteredBlogs.length === 0 && (
            <div className="text-center text-white">
              {searchQuery
                ? "No blogs found matching your search."
                : "No blogs found"}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-10 xl:gap-20 justify-between">
            {Array.isArray(filteredBlogs) &&
              filteredBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  image={blog.image?.image || "/dummy-data/4.jpg"}
                  title={blog.title}
                  learnMoreHref={`/blogs/${blog.id}`}
                />
              ))}
          </div>

          {!searchQuery && totalPages > 1 && (
            <div className="mt-10">
              <Pagination>
                <PaginationContent className="text-white">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        currentPage > 1 && handlePageChange(currentPage - 1)
                      }
                      className={cn(
                        "border-white hover:bg-[#D7F2D5] hover:text-[#054224] transition-colors",
                        currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                      )}
                    />
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            className={cn(
                              "border-white hover:bg-[#D7F2D5] hover:text-[#054224] transition-colors",
                              page === currentPage &&
                                "bg-[#D7F2D5] text-[#054224]"
                            )}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis className="text-white" />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        currentPage < totalPages &&
                        handlePageChange(currentPage + 1)
                      }
                      className={cn(
                        "border-white hover:bg-[#D7F2D5] hover:text-[#054224] transition-colors",
                        currentPage >= totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </UPSection>
      <NewsLetter className="mt-10" />
      <Footer />
    </main>
  );
};

export default BlogsPage;
