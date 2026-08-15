"use server"
import { cookies } from 'next/headers';
import "dotenv/config"



export async function actionWrite(data) {

  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;


  if (token) {
   console.log('TOKEN TOKEN')
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

      //if (data.nameOne)
      //  temporareStor.tokens[data.reg.regToken][data.nameOne] = data.nameOne;
      //if (data.nameTwo)
      //   temporareStor.tokens[data.reg.regToken][data.nameTwo] = data.nameTwo;
      //if (data.nameP)
      //      temporareStor.tokens[data.reg.regToken][data.nameP] = data.nameP;
      // console.log("TemporareStor", '"', temporareStor, '"');
    }
  }