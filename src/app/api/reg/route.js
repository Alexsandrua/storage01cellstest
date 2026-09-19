import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request) {
    // Якщо в Docker не задано секрет, використовуємо дефолтний (для безпеки краще задати в docker-compose)
    const secretjwt = process.env.JWT_SECRET || "super_default_vps_secret_key";
    const cookieStore = await cookies();
    let token = cookieStore.get("auth_token")?.value;
    let isTokenValid = false;

    if (token) {
        try {
            // Перевіряємо токен
            jwt.verify(token, secretjwt);
            isTokenValid = true; // Якщо помилки немає — токен супер!
        } catch (error) {
            console.error("Токен застарів або невалідний:", error.message);
            isTokenValid = false; // Токен зламаний або протух, треба створити новий
        }
    }

    // Якщо токена немає, або він зламався/застарів — створюємо новий
    if (!isTokenValid) {
        const id_reg = `id_regestration_${new Date().getTime()}`;
        token = jwt.sign(
            { reg: id_reg },
            secretjwt,
            { expiresIn: '1d' }
        );

        // Встановлюємо куку ТІЛЬКИ тоді, коли вона дійсно нова або оновлена
        cookieStore.set('auth_token', token, {
            httpOnly: true, 
            secure: true, // Для Cloudflare/Production завжди ставимо true
            sameSite: 'lax', 
            maxAge: 60 * 60 * 24, // 1 день
            path: '/', 
        });
    }

    return NextResponse.json({ success: true });
}
