import Link from "next/link";
import { useRouter } from "next/router";
import { RiQuestionnaireLine } from "react-icons/ri";
import { TbMessageQuestion } from "react-icons/tb";
import { AiOutlineMessage } from "react-icons/ai";
import { FaRegMessage } from "react-icons/fa6";

import PageHeader from "@/components/common/PageHeader";
import UPSection from "@/components/common/UniformPaddingSection";
import { cn } from "@/lib/utils";
import { useUserAuth } from "@/hooks/userAuth";

const ProfilePagesWrapper = ({
    className,
    children,
}) => {
    const { signOut } = useUserAuth();
    const router = useRouter();

    const handleLogout = (e) => {
        e.preventDefault();
        signOut();
    }

    return (
        <main className={cn("", className)}>
            <PageHeader />
            <UPSection className="text-white inter-font lg:pb-6">
                <div className="pt-32 max-xl:pt-20 pb-4 border-b">
                    <h1 className="text-3xl font-bold">YOUR PROFILE</h1>
                </div>
                <div className="min-h-[75vh] flex max-lg:flex-col">
                    <div className="py-4 lg:pr-8 flex lg:border-r max-lg:border-b lg:flex-col justify-between">
                        <div className="flex flex-col gap-2 min-w-40">
                            <Link href="/profile/personal-details" className="flex items-center font-medium">
                                <div className="w-6 sm:w-9">
                                    {/* <FaRegMessage size={20} /> */}
                                    <svg width="20" height="20" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M14.8031 20.8742C18.7627 20.8742 20.743 20.8742 21.9725 19.6436C23.2021 18.413 23.2031 16.4338 23.2031 12.4742C23.2031 8.51467 23.2031 6.53437 21.9725 5.30482C20.7419 4.07527 18.7627 4.07422 14.8031 4.07422H10.6031C6.64357 4.07422 4.66327 4.07422 3.43372 5.30482C2.20417 6.53542 2.20313 8.51467 2.20313 12.4742C2.20313 16.4338 2.20312 18.4141 3.43372 19.6436C4.11937 20.3303 5.03812 20.6338 6.40312 20.7671"
                                            stroke={router.pathname.includes("personal-details") ? "#EFEFEF" : "#656565"}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M10.6038 9.83164C11.1288 8.79214 11.6538 8.27344 12.7038 8.27344C14.0121 8.27344 14.8038 9.31189 14.8038 10.3503C14.8038 11.3888 14.2788 11.435 12.7038 12.4734V13.5234M12.7038 16.1484V16.6734M14.8038 20.8734C13.506 20.8734 12.0759 21.3984 10.7708 22.0757C8.67287 23.1645 7.62392 23.7095 7.10732 23.3619C6.59072 23.0144 6.68837 21.9392 6.88472 19.7877L6.92882 19.2984"
                                            stroke={router.pathname.includes("personal-details") ? "#EFEFEF" : "#656565"}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                                <span className={router.pathname.includes("personal-details") ? "text-[#EFEFEF]" : "text-[#656565]"}>Personal Details</span>
                            </Link>
                            <Link href="/profile/purchases" className="flex items-center font-medium">
                                <div className="w-6 sm:w-9">
                                    {/* <AiOutlineMessage size={20} /> */}
                                    <svg width="20" height="20" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M23.1608 11.9445C23.2165 12.816 23.2165 13.719 23.1608 14.5905C22.8731 19.0456 19.3745 22.5946 14.9813 22.8855C13.464 22.9854 11.9417 22.9854 10.4243 22.8855C9.88886 22.8489 9.36239 22.7288 8.86404 22.5295C8.32644 22.309 8.05764 22.1977 7.92009 22.2145C7.78359 22.2313 7.58514 22.3773 7.18929 22.6702C6.48999 23.1847 5.60904 23.5564 4.30179 23.5239C3.64134 23.5081 3.31164 23.4997 3.16359 23.2477C3.01554 22.9957 3.19929 22.6471 3.56784 21.9489C4.07919 20.9808 4.40259 19.872 3.91224 18.9847C3.06699 17.7163 2.34984 16.2138 2.24484 14.5915C2.18922 13.7104 2.18922 12.8266 2.24484 11.9455C2.53254 7.49035 6.03114 3.9424 10.4243 3.6505C11.6864 3.5665 11.9479 3.5539 13.2278 3.61165M12.6976 13.551H12.7081M16.8934 13.551H16.9028M8.50284 13.551H8.51229"
                                            stroke={router.pathname.includes("purchases") ? "#EFEFEF" : "#656565"}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M23.2016 6.20039C23.2016 7.17506 22.8144 8.10981 22.1252 8.79901C21.436 9.4882 20.5012 9.87539 19.5266 9.87539C18.5519 9.87539 17.6171 9.4882 16.9279 8.79901C16.2387 8.10981 15.8516 7.17506 15.8516 6.20039C15.8516 5.22572 16.2387 4.29097 16.9279 3.60177C17.6171 2.91258 18.5519 2.52539 19.5266 2.52539C20.5012 2.52539 21.436 2.91258 22.1252 3.60177C22.8144 4.29097 23.2016 5.22572 23.2016 6.20039Z"
                                            stroke={router.pathname.includes("purchases") ? "#EFEFEF" : "#656565"}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>

                                </div>
                                <span className={router.pathname.includes("purchases") ? "text-[#EFEFEF]" : "text-[#656565]"}>My Purchases</span>
                            </Link>
                            <Link href="/profile/help-and-support" className="flex items-center font-medium">
                                <div className="w-6 sm:w-9">
                                    {/* <TbMessageQuestion size={20} /> */}
                                    <svg width="20" height="20" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M14.8031 20.8762C18.7627 20.8762 20.743 20.8762 21.9725 19.6456C23.2021 18.415 23.2031 16.4357 23.2031 12.4762C23.2031 8.51662 23.2031 6.53632 21.9725 5.30677C20.7419 4.07722 18.7627 4.07617 14.8031 4.07617H10.6031C6.64357 4.07617 4.66327 4.07617 3.43372 5.30677C2.20417 6.53737 2.20313 8.51662 2.20313 12.4762C2.20313 16.4357 2.20312 18.416 3.43372 19.6456C4.11937 20.3323 5.03812 20.6357 6.40312 20.7691"
                                            stroke={router.pathname.includes("help-and-support") ? "#EFEFEF" : "#656565"}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M10.6038 9.83359C11.1288 8.79409 11.6538 8.27539 12.7038 8.27539C14.0121 8.27539 14.8038 9.31384 14.8038 10.3523C14.8038 11.3907 14.2788 11.4369 12.7038 12.4754V13.5254M12.7038 16.1504V16.6754M14.8038 20.8754C13.506 20.8754 12.0759 21.4004 10.7708 22.0776C8.67287 23.1665 7.62392 23.7114 7.10732 23.3639C6.59072 23.0163 6.68837 21.9411 6.88472 19.7897L6.92882 19.3004"
                                            stroke={router.pathname.includes("help-and-support") ? "#EFEFEF" : "#656565"}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>

                                </div>
                                <span className={router.pathname.includes("help-and-support") ? "text-[#EFEFEF]" : "text-[#656565]"}>Help & Support</span>
                            </Link>
                            <button onClick={handleLogout} className="mt-3 w-fit px-4 py-1.5 text-sm text-[#89FFC4] border-2 rounded-4xl cursor-pointer">
                                Logout
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 max-md:text-xs max-lg:text-sm max-lg:gap-1">
                            <Link target="_blank" href="/privacy-policy" className="text-[#656565] hover:text-gray-400">PRIVACY POLICY</Link>
                            <Link target="_blank" href="/terms-and-conditions" className="text-[#656565] hover:text-gray-400">TERMS & CONDITION</Link>
                        </div>
                    </div>
                    <div className="h-full flex-1">
                        {children}
                    </div>
                </div>
            </UPSection>
        </main>
    )
}

export default ProfilePagesWrapper;