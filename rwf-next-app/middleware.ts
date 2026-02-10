import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Secret key for JWT signing and verification
// In production, this MUST be set in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'default-dev-secret-do-not-use-in-prod';
const key = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
    // 1. Check if the path is protected
    const path = request.nextUrl.pathname;

    // Define protected paths
    const isProtectedPage = path.startsWith('/admin') && !path.startsWith('/admin/login');
    const isProtectedAPI =
        (path.startsWith('/api/pricing') && ['POST', 'DELETE', 'PUT'].includes(request.method)) ||
        (path.startsWith('/api/leads') && ['GET', 'DELETE'].includes(request.method)); // POST /api/leads is public (forms)

    if (!isProtectedPage && !isProtectedAPI) {
        return NextResponse.next();
    }

    // 2. Verify Session Cookie
    const cookie = request.cookies.get('admin_session');

    if (!cookie?.value) {
        return handleUnauthorized(request, isProtectedAPI);
    }

    try {
        await jwtVerify(cookie.value, key);
        // Valid token
        return NextResponse.next();
    } catch (err) {
        // Invalid token
        return handleUnauthorized(request, isProtectedAPI);
    }
}

function handleUnauthorized(request: NextRequest, isAPI: boolean) {
    if (isAPI) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    } else {
        // Redirect to login page with return URL
        const loginUrl = new URL('/admin/login', request.url);
        loginUrl.searchParams.set('from', request.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/api/pricing',
        '/api/leads',
    ],
};
