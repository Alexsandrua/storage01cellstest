"use server"
import { cookies } from 'next/headers';
import "dotenv/config"



export async function actionCreate(data) {

    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    

    const nameOne = data.oneName.length  > 2 ? data.oneName : null;
    const nameSecond = data.secondName.length  > 2 ? data.secondName : null;

    console.log(' CREATE KOMIRKA', nameOne, nameSecond);

    if(nameOne && nameSecond) {
        return false;
    } 
    /*
      if (token) {
    
          try {
            const response = await fetch(`${process.env.DB_SERVER}/datastor`, {
              method: 'POST', // Вказуємо метод
              headers: {
                'Content-Type': 'application/json', // Обов'язково для JSON
                // 'Authorization': 'Bearer ТУТ_ТВІЙ_ТОКЕН' // Якщо потрібна авторизація
              },
              body: JSON.stringify({
                data,
                token,
              }) // Перетворюємо об'єкт у рядок JSON
            });
    
            // Перевіряємо, чи успішний статус відповіді (200-299)
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json(); // Отримуємо відповідь від бекенду
            console.log('Успіх:', result);
            return result;
    
          } catch (error) {
            console.error('Помилка запиту:', error);
          }
        }*/
}