"use server"
import { cookies } from 'next/headers';
import "dotenv/config"



export async function actionCreate(data) {

    data.oneName = data.oneName
        .toLowerCase()
        .trim();

    data.secondName = data.secondName
        .toLowerCase()
        .trim();
        
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (token) {

        try {
            const response = await fetch(`${process.env.DB_SERVER}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Обов'язково для JSON
                    // 'Authorization': 'Bearer ТУТ_ТВІЙ_ТОКЕН' // Якщо потрібна авторизація
                },
                body: JSON.stringify({
                    data,
                    token,
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            console.log('Успіх:', result);
            return result;

        } catch (error) {
            console.error('Помилка запиту:', error);
        }
    }
}