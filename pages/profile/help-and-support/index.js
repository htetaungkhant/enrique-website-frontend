import Link from "next/link";

import ProfilePagesWrapper from "@/components/common/auth/ProfilePagesWrapper";

const HelpAndSupportPage = () => {
    return (
        <ProfilePagesWrapper>
            <div className="lg:ml-[8%] py-10 md:px-5 xl:max-w-180 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <h5 className="text-lg font-bold">Need Help</h5>
                    <span className="text-[#8A8A8A] text-sm">Related to any of the Below Query</span>
                </div>
                <div className="flex flex-wrap gap-4 xl:gap-5">
                    <Link href={`/profile/help-and-support/${encodeURIComponent("Account Basics")}`} className="min-w-72 md:min-w-[45%] p-5 flex-1 flex justify-center items-center bg-white text-[#2A6C4B] font-medium rounded-2xl">
                        Account Basics
                    </Link>
                    <Link href={`/profile/help-and-support/${encodeURIComponent("Enquiries & Payments")}`} className="min-w-72 md:min-w-[45%] p-5 flex-1 flex justify-center items-center bg-white text-[#2A6C4B] font-medium rounded-2xl">
                        Enquiries & Payments
                    </Link>
                    <Link href={`/profile/help-and-support/${encodeURIComponent("Course & Enrolments")}`} className="min-w-72 md:min-w-[45%] p-5 flex-1 flex justify-center items-center bg-white text-[#2A6C4B] font-medium rounded-2xl">
                        Course & Enrolments
                    </Link>
                    <Link href={`/profile/help-and-support/${encodeURIComponent("Facilities")}`} className="min-w-72 md:min-w-[45%] p-5 flex-1 flex justify-center items-center bg-white text-[#2A6C4B] font-medium rounded-2xl">
                        Facilities
                    </Link>
                    <Link href={`/profile/help-and-support/${encodeURIComponent("Doubts")}`} className="min-w-72 md:min-w-[45%] p-5 flex-1 flex justify-center items-center bg-white text-[#2A6C4B] font-medium rounded-2xl">
                        Doubts
                    </Link>
                    <Link href={`/profile/help-and-support/${encodeURIComponent("Ceremony")}`} className="min-w-72 md:min-w-[45%] p-5 flex-1 flex justify-center items-center bg-white text-[#2A6C4B] font-medium rounded-2xl">
                        Ceremony
                    </Link>
                    <Link href={`/profile/help-and-support/${encodeURIComponent("Preparation")}`} className="min-w-72 md:min-w-[45%] p-5 flex-1 flex justify-center items-center bg-white text-[#2A6C4B] font-medium rounded-2xl">
                        Preparation
                    </Link>
                    <Link href={`/profile/help-and-support/${encodeURIComponent("Yoga")}`} className="min-w-72 md:min-w-[45%] p-5 flex-1 flex justify-center items-center bg-white text-[#2A6C4B] font-medium rounded-2xl">
                        Yoga
                    </Link>
                    <Link href={`/profile/help-and-support/refunds`} className="min-w-72 md:min-w-[45%] p-5 flex-1 flex justify-center items-center bg-white text-[#2A6C4B] font-medium rounded-2xl">
                        Refunds
                    </Link>
                    <Link href={`/profile/help-and-support/${encodeURIComponent("Batch / Course Change")}`} className="min-w-72 md:min-w-[45%] p-5 flex-1 flex justify-center items-center bg-white text-[#2A6C4B] font-medium rounded-2xl">
                        Batch / Course Change
                    </Link>
                    <div className="w-full flex items-center">
                        <span className="border border-white flex-1" />
                        <span className="px-4 py-6 lg:py-8">or</span>
                        <span className="border border-white flex-1" />
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center text-[#8A8A8A]">
                    <p>For any additional queries</p>
                    <a href="tel:+918505040000" className="font-semibold hover:underline hover:text-gray-400">Call: +91-85050 40000</a>
                </div>
            </div>
        </ProfilePagesWrapper>
    )
}

export default HelpAndSupportPage;