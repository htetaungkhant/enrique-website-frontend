import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
    const path = req.nextUrl.pathname;

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
    const secret = process.env.NEXTAUTH_SECRET;

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
    const token = await getToken({
        req,
        secret,
        cookieName: "next-auth.session-token.user"
    });

    // Redirect to login if no token
    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

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