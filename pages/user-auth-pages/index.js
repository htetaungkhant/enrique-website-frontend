export async function getServerSideProps(context) {
    const { callbackUrl } = context.query;

    if (callbackUrl) {
        const protocol = context.req.headers["x-forwarded-proto"] || "http";
        const host = context.req.headers.host;
        const baseUrl = `${protocol}://${host}`;

        try {
            const comeFrom = new URL(callbackUrl, baseUrl).searchParams.get("comeFrom");
            return {
                redirect: {
                    destination: comeFrom || callbackUrl,
                    permanent: false,
                },
            };
        } catch (e) {
            // fallback if callbackUrl is not a valid URL
            return {
                redirect: {
                    destination: callbackUrl,
                    permanent: false,
                },
            };
        }
    }

    return {
        props: {},
    };
}

const UserAuthPages = () => {
    return (
        <>
            <span className="w-screen h-screen flex justify-center items-center font-bold bg-white">Redirecting...</span>
        </>
    );
}

export default UserAuthPages;