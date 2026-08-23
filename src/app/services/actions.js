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

  let name = data.match
    .toLowerCase()
    .trim();


  if (!data.form.secondName && data.typName == 'oneName' || data.typName == 'secondName') {
    name = data.typName == 'secondName' ? `_${name}` : name;
    let res = await reqWrite(name);

    return { answer: res.result, lengthLine: true, open: !res.isExists, create: res.isExists };
  }

  if (data.form.secondName && data.form.oneName) {
    const nameMatch = data.typName == 'secondName' ? `_${name}` : `_${data.form.secondName}`;
    const match = await reqWrite(nameMatch);
    name = data.typName == 'secondName' ? `${data.form.oneName}_${name}` : `${data.form.secondName}_${name}`;
    const res = await reqWrite(name);

    return { answer: res.result, lengthLine: true, open: !res.isExists, create: match.isExists };
  }

}