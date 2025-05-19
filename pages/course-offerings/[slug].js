import Image from "next/image";
import { useRouter } from "next/router";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { IoCalendarClear } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

import Footer from "@/components/common/Footer";
import UPSection from "@/components/common/UniformPaddingSection";
import PageHeader from "@/components/common/PageHeader";
import YouTubeBanner from "@/components/common/YouTubeBanner";

const CourseDetails = () => {
    const router = useRouter();

    return (
        <main className="relative min-h-screen flex flex-col justify-between">
            <PageHeader />
            <UPSection className="inter-font text-white pt-28 xl:pt-48">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[65%_30%] justify-between">
                    <div className="flex flex-col gap-10">
                        <h2 className="font-black text-5xl">{router.query.slug}</h2>
                        <div>
                            <div className="pt-3 flex flex-wrap gap-6 lg:gap-10">
                                <div className="flex items-center gap-3 font-medium">
                                    <Image src="/dummy-data/6.png" width={100} height={100} alt="avator" className="w-12 h-12 lg:w-16 lg:h-16 rounded-full" />
                                    <span className="text-lg">Dr. Emily Carter</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold text-lg">Session Overview</h3>
                            <p>This recorded session provides essential insights into the fundamentals of sacred plant medicines, ensuring a safe and meaningful experience.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold text-lg">The Foundations of Plant Medicine</h3>
                            <ul className="list-disc pl-3">
                                <li>History and cultural significance of plant medicine</li>
                                <li>Understanding different types of sacred plants (Ayahuasca, Bufo, Psilocybin, etc.)</li>
                                <li>The science behind plant medicine and its effects on the brain</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className="p-4 rounded-xl bg-white text-[#032F1F] flex flex-col gap-3">
                            <div className="font-bold flex justify-between">
                                <span>Ceremony Fee</span>
                                <span>$299.00</span>
                            </div>
                            <button className="p-3 inter-font font-bold text-sm text-white rounded-4xl bg-[#212A63] cursor-pointer">
                                Purchase  Now
                            </button>
                        </div>
                    </div>
                    <YouTubeBanner />
                </div>
            </UPSection>
            <Footer className="mt-10" />
        </main>
    )
}

export default CourseDetails;