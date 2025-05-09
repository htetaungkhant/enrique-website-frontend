import { LuCalendarDays } from "react-icons/lu";

import Footer from "@/components/common/Footer";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import SearchBox from "@/components/common/SearchBox";
import UPSection from "@/components/common/UniformPaddingSection";
import BlogCard from "@/components/BlogsPage/BlogCard";
import NewsLetter from "@/components/common/NewsLetter";

const data = [
    {
        image: "/dummy-data/4.jpg",
        title: "Psychedelic Integration & Emotional Healing",
    },
    {
        image: "/dummy-data/4.jpg",
        title: "Psychedelic Integration & Emotional Healing",
    },
    {
        image: "/dummy-data/4.jpg",
        title: "Psychedelic Integration & Emotional Healing",
    },
    {
        image: "/dummy-data/4.jpg",
        title: "Psychedelic Integration & Emotional Healing",
    },
    {
        image: "/dummy-data/4.jpg",
        title: "Psychedelic Integration & Emotional Healing",
    },
    {
        image: "/dummy-data/4.jpg",
        title: "Psychedelic Integration & Emotional Healing",
    },
    {
        image: "/dummy-data/4.jpg",
        title: "Psychedelic Integration & Emotional Healing",
    },
    {
        image: "/dummy-data/4.jpg",
        title: "Psychedelic Integration & Emotional Healing",
    },
    {
        image: "/dummy-data/4.jpg",
        title: "Psychedelic Integration & Emotional Healing",
    },
    {
        image: "/dummy-data/4.jpg",
        title: "Psychedelic Integration & Emotional Healing",
    },
    {
        image: "/dummy-data/4.jpg",
        title: "Psychedelic Integration & Emotional Healing",
    },
    {
        image: "/dummy-data/4.jpg",
        title: "Psychedelic Integration & Emotional Healing",
    },
]

const BlogsPage = () => {

    return (
        <main>
            <PageHeaderWithBanner title="Blogs">
                <p className="inter-font text-sm md:text-base lg:text-lg xl:text-xl font-medium">Expand Your Knowledge, Deepen Your Journey</p>
            </PageHeaderWithBanner>
            <UPSection>
                <div className="inter-font text-white">
                    <div className="py-16 flex flex-col items-start md:flex-row gap-3 lg:gap-5">
                        <span className="px-4 py-1 lg:py-2 text-sm border-[1px] border-[#D7F2D5] rounded-3xl cursor-pointer text-[#054224] bg-[#D7F2D5]">All Blogs</span>
                        <span className="px-4 py-1 lg:py-2 text-sm border-[1px] border-white rounded-3xl cursor-pointer flex items-center gap-3">
                            Sort by Date
                            <LuCalendarDays size={16} />
                        </span>
                        <SearchBox placeholder="Search by Blog Topic" className="md:w-52 lg:w-72 text-sm" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-10 xl:gap-20 justify-between">
                        {
                            data.map((item, index) => (
                                <BlogCard key={index} image={item.image} title={item.title} learnMoreHref={`/blogs/${item.title}`} />
                            ))
                        }
                    </div>
                </div>
            </UPSection>
            <NewsLetter className="mt-10" />
            <Footer />
        </main>
    )
}

export default BlogsPage