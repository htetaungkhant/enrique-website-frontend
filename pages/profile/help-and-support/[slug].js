import { getServerSession } from "next-auth";

import ProfilePagesWrapper from "@/components/common/auth/ProfilePagesWrapper";
import HelpAndSupportForm from "@/components/Profile/HelpAndSupportPage/HelpAndSupportForm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";


export async function getServerSideProps(context) {
    const { req, res, query } = context;
    const session = await getServerSession(req, res, authOptions);

    const { comeFrom, slug, ...restQuery } = query;

    if (session.validationFailed) {

        return {
            redirect: {
                destination: `/user-auth-pages/access-denied-auto-logout?callbackUrl=${encodeURIComponent(comeFrom || "/")}`,
                permanent: false,
            },
        };
    }
    else if (comeFrom) {
        const queries = new URLSearchParams(restQuery).toString();
        const newUrl = `/profile/help-and-support${slug ? `/${slug}` : ""}${queries ? `?${queries}` : ""}`;

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

const HelpAndSupportDetails = () => {
    return (
        <ProfilePagesWrapper>
            <div className="px-[8%] max-lg:px-0 py-8 w-full max-w-300 flex flex-col gap-10 items-center">
                <p className="poppins-font text-2xl md:text-4xl lg:text-5xl text-center font-medium leading-16">Love to hear from you, <br />Get in touch 👋</p>
                <HelpAndSupportForm />
            </div>
        </ProfilePagesWrapper>
    )
}

export default HelpAndSupportDetails;