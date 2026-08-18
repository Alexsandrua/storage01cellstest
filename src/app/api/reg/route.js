import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function GET(request) {
    
    const secretjwt = process.env.JWT_SECRET;
    const cookieStore = await cookies();
    let token = cookieStore.get("auth_token")?.value;

    if (token) {
        try {
            let decoded = jwt.verify(token, secretjwt);
        } catch (error) {
            console.error(error);
        }
    } else {
        const id_reg = `id_regestration_${new Date().getTime()}`;
        token = jwt.sign(
            { reg: id_reg },
            secretjwt,
            { expiresIn: '1d' }
        );
    }



    const cookiesSet = await cookies();
    cookiesSet.set('auth_token', token, {
        httpOnly: true, // Захист від XSS (JS на клієнті не має доступу)
        secure: process.env.NODE_ENV === 'production', // Тільки через HTTPS у продакшені
        sameSite: 'lax', // Захист від CSRF
        maxAge: 60 * 60 * 24, // 1 день у секундах
        path: '/', // Доступно для всього сайту
    });

    return NextResponse.json({ success: true });

}