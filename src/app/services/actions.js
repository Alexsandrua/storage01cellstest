"use server"
import "dotenv/config"


export async function actionWrite(data) {

  let name = data.match
    .toLowerCase()
    .trim();
    
    if(data.label == 'secondName') name = `_${name}`;


  try {
    const params = new URLSearchParams({ search: name }).toString();
    const response = await fetch(`${process.env.DB_SERVER}/actionwrite?${params}`, {
      method: 'GET', // Вказуємо метод
      headers: {
        'Accept': 'application/json', // Обов'язково для JSON
      },
    });

    // Перевіряємо, чи успішний статус відповіді (200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let result = ''
    if (response.status === 200) {
      result = await response.json(); // Отримуємо відповідь від бекенду
    } else if (response.status === 204) result = null;
console.log(result)
    return result;

  } catch (error) {
    console.error('Помилка запиту:', error);
  }

}