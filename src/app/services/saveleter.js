"use server"
import { cookies } from 'next/headers';
import "dotenv/config"



export async function actionSeve(data) {

    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (token) {

        try {
            const response = await fetch(`${process.env.DB_SERVER}/seveleter`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
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