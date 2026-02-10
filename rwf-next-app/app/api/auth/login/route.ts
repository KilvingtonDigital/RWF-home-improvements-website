import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'default-dev-secret-do-not-use-in-prod';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        // Create JWT
        const secret = new TextEncoder().encode(JWT_SECRET);
        const token = await new SignJWT({ role: 'admin' })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h') // 1 day session
            .sign(secret);

        // Set Cookie
        (await cookies()).set('admin_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
