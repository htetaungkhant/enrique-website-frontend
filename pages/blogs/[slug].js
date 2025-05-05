import { useRouter } from "next/router";

import Footer from "@/components/common/Footer";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import UPSection from "@/components/common/UniformPaddingSection";

const BlogDetails = () => {
    const router = useRouter();

    return (
        <main>
            <PageHeaderWithBanner title="Blogs">
                <p className="inter-font text-sm md:text-base lg:text-lg xl:text-xl font-medium">Expand Your Knowledge, Deepen Your Journey</p>
            </PageHeaderWithBanner>
            <UPSection className="h-[60vh] text-white">
                <h2 className="font-black text-4xl">{router.query.slug}</h2>
            </UPSection>
            <Footer className="mt-10" />
        </main>
    )
}

export default BlogDetails;