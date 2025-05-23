import { getServerSession } from "next-auth";

import LoginForm from "@/components/common/auth/admin/LoginForm";
import { adminAuthOptions } from "../api/auth/admin/[...nextauth]";


export async function getServerSideProps(context) {
    const { req, res, query } = context;
    const session = await getServerSession(req, res, adminAuthOptions);

    if (session) {
        return {
            redirect: {
                destination: "/admin/courses-purchased",
                permanent: false,
            },
        };
    }

    return { props: {} };
}

const AdminLogin = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100">
            <div className="w-full max-w-md p-8 shadow-lg border border-gray-200 bg-white rounded-xl">
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-900">Admin Login</h1>
                <LoginForm />
            </div>
        </main>
    );
}

AdminLogin.isAdminRoute = true;
export default AdminLogin;