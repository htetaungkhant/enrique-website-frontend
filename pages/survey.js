import Image from "next/image";

import IconButton from "@/components/common/Button";
import Footer from "@/components/common/Footer";
import NewsLetter from "@/components/common/NewsLetter";
import { PageHeaderWithFullBanner } from "@/components/common/PageHeader";
import UPSection from "@/components/common/UniformPaddingSection";

const SurveyPage = () => {
    return (
        <main>
            <PageHeaderWithFullBanner
                title="Ensuring Safety & Excellence in Plant Medicine Retreats"
                description="Survey Results"
                bannerImg="/image/survey-banner.png"
                className="max-md:bg-left max-md:h-[80vh]"
                wrapperClassName="md:h-1/2 md:bg-radial md:from-[#2562A7] md:via-[#2562A700] md:via-[70%] md:to-transparent"
            >
                <div className="md:mt-10">
                    <IconButton title="Start your Journey" iconAnimate={false} />
                </div>
            </PageHeaderWithFullBanner>
            <div className="h-48 bg-gradient-to-b from-[#000000] to-[#00000000]" />
            <UPSection className="-mt-44 md:-mt-32 flex flex-col gap-2 inter-font text-white">
                <h2 className="text-3xl xl:text-4xl mb-3">Your Safety is our <strong>Priority</strong></h2>
                <p className="font-medium">At Arise, we are committed to delivering safe, high-quality plant medicine retreats that promote healing and transformation. Your well-being is at the core of everything we do. Understanding the key factors that contribute to a meaningful, secure retreat experience allows us to continually enhance our offerings.</p>
                <p className="font-medium">Our recent survey provided valuable insights into what matters most to participants—safety, preparation, facilitator expertise, and integration support. Here’s how we’re shaping a world-class retreat experience based on these findings.</p>
            </UPSection>
            <UPSection className="max-md:mt-5 lg:py-8 flex flex-row-reverse items-start flex-wrap gap-5 md:gap-10 inter-font text-white">
                <Image
                    src="/image/survey-chart-1.png"
                    width={452}
                    height={452}
                    alt="survey-chart-1"
                    className="max-md:hidden w-[33%] min-w-[270px] max-w-[300px] h-auto"
                />
                <div className="flex-1 flex flex-col gap-5 md:gap-8 max-md:items-center">
                    <h1 className="w-full text-3xl xl:text-4xl">Safety & <strong>Medical Screening</strong></h1>
                    <Image
                        src="/image/survey-chart-1.png"
                        width={452}
                        height={452}
                        alt="survey-chart-1"
                        className="md:hidden w-full h-auto max-w-[350px]"
                    />
                    <p className="font-medium">At Arise, we prioritize your safety and well-being from start to finish. A thorough medical screening process is a key factor in ensuring a transformative and secure journey.</p>
                    <ul className="list-disc pl-3 font-medium">
                        <h3 className="-ml-3 underline font-bold text-lg">Survey Insights: Thorough Screening Matters:</h3>
                        <li>98% of attendees at top-tier retreats reported feeling that safety and medical screenings were thorough.</li>
                        <li>In contrast, only 80% of participants at other retreats felt the same level of confidence.</li>
                    </ul>
                </div>
            </UPSection>
            <UPSection className="max-md:mt-5 lg:py-8 flex items-start flex-wrap gap-5 md:gap-10 inter-font text-white">
                <Image
                    src="/image/survey-chart-2.png"
                    width={452}
                    height={452}
                    alt="survey-chart-2"
                    className="max-md:hidden w-[33%] min-w-[270px] max-w-[300px] h-auto"
                />
                <div className="flex-1 flex flex-col gap-5 max-md:items-center">
                    <h1 className="w-full text-3xl xl:text-4xl">Quality of the <strong>Retreat Experience</strong></h1>
                    <Image
                        src="/image/survey-chart-2.png"
                        width={452}
                        height={452}
                        alt="survey-chart-2"
                        className="md:hidden w-full h-auto max-w-[350px]"
                    />
                    <p className="font-medium">The quality of a retreat significantly influences the depth of your transformation. At Arise, we are committed to delivering exceptional experiences that leave a lasting impact.</p>
                    <ul className="list-disc pl-3 font-medium">
                        <h3 className="-ml-3 underline font-bold text-lg">Survey Insights: Higher Standards Lead to Better Experiences:</h3>
                        <li>4.76 – Average rating for top-tier retreats</li>
                        <li>4.08 – Average rating for other retreats</li>
                    </ul>
                    <p className="font-medium">Your healing journey deserves the highest quality experience—and that’s exactly what we provide at Arise.</p>
                </div>
            </UPSection>
            <UPSection className="max-md:mt-5 lg:py-8 flex flex-row-reverse items-start flex-wrap gap-5 md:gap-10 inter-font text-white">
                <Image
                    src="/image/survey-chart-3.png"
                    width={452}
                    height={452}
                    alt="survey-chart-3"
                    className="max-md:hidden w-[33%] min-w-[270px] max-w-[300px] h-auto"
                />
                <div className="flex-1 flex flex-col gap-5 max-md:items-center">
                    <h1 className="w-full text-3xl xl:text-4xl"> Preparation for a <strong>Transformative Journey</strong></h1>
                    <Image
                        src="/image/survey-chart-3.png"
                        width={452}
                        height={452}
                        alt="survey-chart-3"
                        className="md:hidden w-full h-auto max-w-[350px]"
                    />
                    <p className="font-medium">Proper preparation is essential for a meaningful and impactful retreat experience. This section highlights the importance of pre-retreat preparation in enhancing personal transformation.</p>
                    <ul className="list-disc pl-3 font-medium">
                        <h3 className="-ml-3 underline font-bold text-lg">Survey Insights: Better Preparation, Deeper Transformation:</h3>
                        <li>89% of Arise  participants found the retreat preparation meaningful.</li>
                        <li>Only 58% of other retreat participants felt the same.</li>
                    </ul>
                    <p className="font-medium">Thorough preparation significantly improves the overall retreat experience, ensuring guests are mentally, physically, and emotionally ready for their journey.</p>
                </div>
            </UPSection>
            <UPSection className="max-md:mt-5 lg:py-8 flex items-start flex-wrap gap-5 md:gap-10 inter-font text-white">
                <Image
                    src="/image/survey-chart-4.png"
                    width={452}
                    height={452}
                    alt="survey-chart-4"
                    className="max-md:hidden w-[33%] min-w-[270px] max-w-[300px] h-auto"
                />
                <div className="flex-1 flex flex-col gap-5 md:gap-8 max-md:items-center">
                    <h1 className="w-full text-3xl xl:text-4xl">Transformational <strong>Outcomes</strong></h1>
                    <Image
                        src="/image/survey-chart-4.png"
                        width={452}
                        height={452}
                        alt="survey-chart-4"
                        className="md:hidden w-full h-auto max-w-[350px]"
                    />
                    <p className="font-medium">This section highlights the effectiveness of the retreat experience by showcasing the percentage of participants who achieved their desired results. The data compares Arise retreats with other retreats, emphasizing the impact of structured guidance and support.</p>
                    <ul className="list-disc pl-3 font-medium">
                        <h3 className="-ml-3 underline font-bold text-lg">Survey Insights: Effective Outcomes:</h3>
                        <li>87% of Arise  participants reported achieving their expected results.</li>
                        <li>69% of participants from other retreats reached their desired outcomes.</li>
                    </ul>
                </div>
            </UPSection>
            <NewsLetter className="mt-10" />
            <Footer />
        </main>
    )
}

export default SurveyPage;