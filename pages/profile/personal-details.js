import { getServerSession } from "next-auth";
import { FaRegUserCircle } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";

import ProfilePagesWrapper from "@/components/common/auth/ProfilePagesWrapper";
import { authOptions } from "@/pages/api/auth/[...nextauth]";


export async function getServerSideProps(context) {
    // get the current URL
    const { req, res, query } = context;
    const url = req.url;

    // get next-auth server session
    const session = await getServerSession(req, res, authOptions);

    // get the comeFrom from the context query
    const { comeFrom, ...restQuery } = query;

    if (session.validationFailed) {
        // sign out the user and redirect to comeFrom or home page
        // return {
        //     redirect: {
        //         destination: `/api/auth/signout?callbackUrl=${encodeURIComponent(comeFrom || "/")}`,
        //         permanent: false,
        //     },
        // };

        // return {
        //     redirect: {
        //         destination: comeFrom || "/",
        //         permanent: false,
        //     },
        // };

        return {
            redirect: {
                destination: `/user-auth-pages/access-denied-auto-logout?callbackUrl=${encodeURIComponent(comeFrom || "/")}`,
                permanent: false,
            },
        };
    }
    else if (comeFrom) {
        // remove comeFrom from the URL and redirect

        // option 1
        // const baseUrl = req.headers.origin || `http://${req.headers.host}`;
        // const urlObj = new URL(url, baseUrl);
        // urlObj.searchParams.delete("comeFrom");
        // const newUrl = urlObj.pathname + urlObj.search;

        // option 2
        // const protocol = req.headers["x-forwarded-proto"] || "http";
        // const host = req.headers.host;
        // const baseUrl = `${protocol}://${host}`;
        // const urlObj = new URL(url, baseUrl);
        // urlObj.searchParams.delete("comeFrom");
        // const newUrl = urlObj.pathname + urlObj.search;

        // option 3
        const params = new URLSearchParams(restQuery).toString();
        const newUrl = `/profile/personal-details${params ? `?${params}` : ""}`;

        return {
            redirect: {
                destination: newUrl,
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}

const PersonalDetailsPage = () => {
    return (
        <ProfilePagesWrapper>
            <div className="lg:ml-[8%] py-10 md:px-5 xl:max-w-250 flex flex-col gap-12 items-center"> {/*  md:max-w-200 */}
                <div className="w-full flex gap-2 xl:gap-3 items-center">
                    <div className="border-2 p-1.5 rounded-full">
                        <FaRegUserCircle className="w-10 h-10 xl:w-12 xl:h-12" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-48">
                        <span className="font-bold text-xl xl:text-2xl">Username</span>
                        <div className="flex items-center justify-between">
                            <span className="flex-1">32 years</span>
                            <TbEdit className="w-5 h-5 xl:w-7 xl:h-7 text-[#96CD78] cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-12 max-lg:flex-col xl:gap-16">
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="flex justify-between">
                            <h2 className="text-lg xl:text-xl font-bold text-[#8A8A8A]">Contact Details</h2>
                            <TbEdit className="w-5 h-5 xl:w-7 xl:h-7 text-[#96CD78] cursor-pointer" />
                        </div>
                        <div className="bg-white rounded-2xl text-[#494A4A]">
                            <div className="p-4 flex justify-between">
                                <span>Phone Number</span>
                                <span className="font-semibold">9988774433</span>
                            </div>
                            <div className="p-4 flex justify-between">
                                <span>Email</span>
                                <span className="font-semibold">walter@ymail.com</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="flex justify-between">
                            <h2 className="text-lg xl:text-xl font-bold text-[#8A8A8A]">Participant Details</h2>
                            <TbEdit className="w-5 h-5 xl:w-7 xl:h-7 text-[#96CD78] cursor-pointer" />
                        </div>
                        <div className="bg-white rounded-2xl text-[#494A4A]">
                            <div className="p-4 flex justify-between">
                                <span>Gender</span>
                                <span className="font-semibold">Male</span>
                            </div>
                            <div className="p-4 flex justify-between">
                                <span>Blood Group</span>
                                <span className="font-semibold">A Positive</span>
                            </div>
                            <div className="p-4 flex justify-between">
                                <span>D.O.B</span>
                                <span className="font-semibold">07/09/1992</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProfilePagesWrapper>
    )
}

export default PersonalDetailsPage;