import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST (request) {
    const { reg } = await request.json();
    console.log(' TEST - ', reg);

    const token = jwt.sign(
        { reg: "id00001" },
        "secret1010",
        { expiresIn: '1d'}
    );

    const cookiesSet = await cookies();
    cookiesSet.set('auth_token', token, {
        httpOnly: true, // Захист від XSS (JS на клієнті не має доступу)
        secure: process.env.NODE_ENV === 'production', // Тільки через HTTPS у продакшені
        sameSite: 'lax', // Захист від CSRF
        maxAge: 60 * 60 * 24, // 1 день у секундах
        path: '/', // Доступно для всього сайту
    });

    return NextResponse.json({ success: true, message: "Вхід успішний" });
}