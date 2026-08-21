"use server"
import "dotenv/config"


export async function actionWrite(data) {
  if(data.match.length < 3) return null
  let name = data.match
    .toLowerCase()
    .trim();

  if (data.typName == 'secondName') name = `_${name}`;
  if (data.typName == 'secondName' && data.form.oneName ) console.log(' DABLE ', `${data.form.oneName}_${name}`);


  console.log(' FORM ', data.form)

  try {
    const params = new URLSearchParams({ search: name }).toString();
    const response = await fetch(`${process.env.DB_SERVER}/actionwrite?${params}`, {
      method: 'GET', // Вказуємо метод
      headers: {
        'Accept': 'application/json', // Обов'язково для JSON
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let result = ''
    if (response.status === 200) {
      result = await response.json();
    } else if (response.status === 204) result = null;
    return result;
  } catch (error) {
    console.error('Помилка запиту:', error);
  }
}