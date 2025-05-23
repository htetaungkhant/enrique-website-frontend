import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import PurchasesPage from "@/components/Profile/PurchasesPage";


export async function getServerSideProps(context) {
    const { req, res, query } = context;
    const session = await getServerSession(req, res, authOptions);

    const { comeFrom, ...restQuery } = query;

    if (session.validationFailed) {

        return {
            redirect: {
                destination: `/user-auth-pages/access-denied-auto-logout?callbackUrl=${encodeURIComponent(comeFrom || "/")}`,
                permanent: false,
            },
        };
    }
    else if (comeFrom) {
        const params = new URLSearchParams(restQuery).toString();
        const newUrl = `/profile/purchases${params ? `?${params}` : ""}`;

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

const Purchases = () => {

    return (
        <PurchasesPage />
    )
}

export default Purchases;