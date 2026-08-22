"use server"
import "dotenv/config"
import dataload from "../resurce/db";


export async function actionWrite(data) {
  let result = ''
  if (data.match.length < 3) {
    return { answer: result, lengthLine: false };
  }

  let name = data.match
    .toLowerCase()
    .trim();

  if (data.typName == 'secondName') name = `_${name}`;
  if (data.form.secondName && data.form.oneName && data.typName == 'secondName') name = `${data.form.oneName}${name}`;
  if (data.form.secondName && data.form.oneName && data.typName == 'oneName') name = `${data.form.secondName}_${name}`;

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

    if (response.status === 200) {
      result = await response.json();
      return { answer: result, lengthLine: true, open: true, create: false };
    } else if (response.status === 204)
      return { answer: result, lengthLine: true, open: false, create: true };
  } catch (error) {
    console.error('Помилка запиту:', error);
  }
}