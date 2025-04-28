import { PageHeaderWithBanner } from "@/components/common/PageHeader";

const Yoga = () => {
    return (
        <main>
            <PageHeaderWithBanner title="Yoga">
                <div className="flex flex-col gap-2 text-sm md:text-base lg:text-lg xl:text-xl font-medium">
                    <p className="px-5">""Yoga is the journey of the self, through the self, to the self.",</p>
                    <p className="px-5 md:px-2 text-right">— The Bhagavad Gita</p>
                </div>
            </PageHeaderWithBanner>
            <div className="h-32 bg-gradient-to-b from-[#000000] to-[#00000000]" />
        </main>
    )
}

export default Yoga;