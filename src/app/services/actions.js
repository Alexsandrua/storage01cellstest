"use server"
import "dotenv/config"


async function reqWrite(name) {
  try {
    const params = new URLSearchParams({ search: name }).toString();
    const response = await fetch(`${process.env.DB_SERVER}/actionwrite?${params}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json', // Обов'язково для JSON
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (response.status === 200) {
      const result = await response.json();
      return { result, isExists: true };
    } else if (response.status === 204)
      return { result: '', isExists: false };;
  } catch (error) {
    console.error('Помилка запиту:', error);
  }
}


export async function actionWrite(data) {

  if (data.match.length < 3) {
    return { answer: '', lengthLine: false };
  }

  const name = data.match
    .toLowerCase()
    .trim();

  if (data.typName == 'oneName') {
    const res = await reqWrite(name);
    return { answer: res.result, lengthLine: true, open: !res.isExists, create: res.isExists };
  } else if (data.typName == 'secondName') {
    const nameMatch = `_${name}`;
    const ress = await reqWrite(nameMatch);
    return { answer: ress.result, lengthLine: true, open: !ress.isExists, create: ress.isExists };
  }
}