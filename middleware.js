import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
    const path = req.nextUrl.pathname;

    const secret = process.env.NEXTAUTH_SECRET;
    const userToken = await getToken({
        req,
        secret,
        cookieName: "next-auth.session-token.user"
    });

    if (userToken?.validationFailed) {
        const searchParams = req.nextUrl.searchParams;
        const comeFrom = searchParams.get('comeFrom');
        searchParams.delete('comeFrom');
        const callbackUrl = searchParams.size > 0 ? `${path}?${searchParams.toString()}` : path;
        const response = NextResponse.redirect(new URL(comeFrom || callbackUrl || '/', req.url));
        response.cookies.set('next-auth.session-token.user', '', {
            httpOnly: true,
            path: '/',
            expires: new Date(0), // Expire immediately
        });
        return response;
    }

    // Define public paths that don't need authentication
    const publicPaths = [
        '/admin/login',

        '/api/auth',
        '/api/auth/admin',

        '/',
        '/facilitators',
        '/course-offerings',
        '/ceremonies',
        '/blogs',
        '/ayahuasca',
        '/ayurveda',
        '/breathwork',
        '/bufo-alvarius',
        '/flight-service',
        '/kambo',
        '/yoga',
        '/safety',
        '/survey',
        '/questionnaire',

        '/user-auth-pages',
        '/privacy-policy',
        '/terms-and-conditions',
    ];
    const isPublicPath = publicPaths.some(pp =>
        path === pp || path.startsWith(`${pp}/`)
    );

    if (isPublicPath) {
        return NextResponse.next();
    }

    // Check for admin routes
    const isAdminPath = path.startsWith('/admin');

    // For admin paths, check admin auth token
    if (isAdminPath) {
        // Use the admin auth path to get the right session token
        const token = await getToken({
            req,
            secret,
            cookieName: "next-auth.session-token.admin"
        });

        // Redirect to admin login if no token or not admin role
        if (!token || token.role !== "admin") {
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }

        return NextResponse.next();
    }

    // For user paths, check user auth token
    // Redirect to login if no token
    if (!userToken) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // const searchParams = req.nextUrl.searchParams;
    // const comeFrom = searchParams.get('comeFrom');
    // if (userToken.validationFailed) {
    //     const callbackUrl = encodeURIComponent(comeFrom || '/');
    //     return NextResponse.redirect(
    //         new URL(`/user-auth-pages/access-denied-auto-logout?callbackUrl=${callbackUrl}`, req.url)
    //     );
    // }
    // else if (comeFrom) {
    //     searchParams.delete('comeFrom');
    //     const newUrl = new URL(path, req.url);
    //     newUrl.search = searchParams.toString();
    //     return NextResponse.redirect(newUrl);
    // }

    return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
    matcher: [
        /*
         * Match all paths except:
         * 1. /api routes that don't start with /api/auth or /api/auth/admin
         * 2. /_next (Next.js internals)
         * 3. /fonts, /icon, /image, /logo, /pdf (static files)
         * 4. /favicon.ico, /sitemap.xml (public files)
         */
        '/((?!api/(?!auth)|_next|fonts|icon|image|logo|pdf|favicon.ico|sitemap.xml).*)',
    ],
};