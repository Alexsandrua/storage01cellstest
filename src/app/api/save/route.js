import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import "dotenv/config"

export async function POST(Request) {
console.log('TEST API REG')
    const secretjwt = process.env.JWT_SECRET;

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;
        if (!token) {
            return NextResponse.json({ error: "Незаєстрований" }, { status: 401 });
        }
        const decode = jwt.verify(token, secretjwt)
    } catch (error) {   
        console.error(error);
    }
}