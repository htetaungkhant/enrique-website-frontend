import { LuCalendarDays } from "react-icons/lu";

import Footer from "@/components/common/Footer";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import SearchBox from "@/components/common/SearchBox";
import UPSection from "@/components/common/UniformPaddingSection";
import CeremonyCard from "@/components/CeremoniesPage/CeremonyCard";

const data = [
    {
        image: "/dummy-data/5.jpg",
        title: "Bufo Alvarius",
        locations: "Portugal",
        dates: "From 25 OCT 2025 to 29 OCT 2025 ",
        time: "4.00 pm - 8.00 pm"
    },
    {
        image: "/dummy-data/5.jpg",
        title: "Bufo Alvarius",
        locations: "Portugal",
        dates: "From 25 OCT 2025 to 29 OCT 2025 ",
        time: "4.00 pm - 8.00 pm"
    },
    {
        image: "/dummy-data/5.jpg",
        title: "Bufo Alvarius",
        locations: "Portugal",
        dates: "From 25 OCT 2025 to 29 OCT 2025 ",
        time: "4.00 pm - 8.00 pm"
    },
    {
        image: "/dummy-data/5.jpg",
        title: "Bufo Alvarius",
        locations: "Portugal",
        dates: "From 25 OCT 2025 to 29 OCT 2025 ",
        time: "4.00 pm - 8.00 pm"
    },
    {
        image: "/dummy-data/5.jpg",
        title: "Bufo Alvarius",
        locations: "Portugal",
        dates: "From 25 OCT 2025 to 29 OCT 2025 ",
        time: "4.00 pm - 8.00 pm"
    },
    {
        image: "/dummy-data/5.jpg",
        title: "Bufo Alvarius",
        locations: "Portugal",
        dates: "From 25 OCT 2025 to 29 OCT 2025 ",
        time: "4.00 pm - 8.00 pm"
    },
]

const CeremoniesPage = () => {

    return (
        <main>
            <PageHeaderWithBanner title="Ceremonies">
                <p className="inter-font text-sm md:text-base lg:text-lg xl:text-xl font-medium">Expand Your Knowledge, Deepen Your Journey</p>
            </PageHeaderWithBanner>
            <UPSection>
                <div className="inter-font text-white">
                    <div className="py-16 flex flex-col gap-5 md:flex-row md:justify-between md:items-center">
                        <h4 className="merriweather-font font-bold text-2xl md:text-3xl xl:text-4xl">Our Latest Events</h4>
                        <div className="flex flex-col items-start md:flex-wrap md:flex-row gap-3 lg:gap-5">
                            <span className="px-4 py-1 lg:py-2 text-sm border-[1px] border-[#D7F2D5] rounded-3xl cursor-pointer text-[#054224] bg-[#D7F2D5]">All Events</span>
                            <span className="px-4 py-1 lg:py-2 text-sm border-[1px] border-white rounded-3xl cursor-pointer flex items-center gap-3">
                                Sort by Date
                                <LuCalendarDays size={16} />
                            </span>
                            <SearchBox placeholder="Search by Course Name" className="md:w-52 lg:w-72 text-sm" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 xl:gap-20 justify-between">
                        {
                            data.map((item, index) => (
                                <CeremonyCard key={index} image={item.image} title={item.title} locations={item.locations} dates={item.dates} time={item.time} learnMoreHref={`/ceremonies/${item.title}`} />
                            ))
                        }
                    </div>
                </div>
            </UPSection>
            <Footer className="mt-10" />
        </main>
    )
}

export default CeremoniesPage;