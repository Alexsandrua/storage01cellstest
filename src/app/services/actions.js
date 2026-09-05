"use server"
import "dotenv/config"


async function reqWrite(payload) {
  try {
    const params = new URLSearchParams({ ...payload }).toString();
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
      return { ...result, isExists: true };
    } else if (response.status === 204)
      return { oneName: null, secondName: null, isExists: false };;
  } catch (error) {
    console.error('Помилка запиту:', error);
  }
}


export async function actionWrite(data) {

  const payload = { oneName: '', secondName: '' };

  if (data.typName === 'oneName') {
    payload.oneName = data.name.length > 2 ? data.name.toLowerCase().trim() : '';
    payload.secondName = data.form.secondName.length > 2 ? `_${data.form.secondName.toLowerCase().trim()}` : '';
  } else if (data.typName === 'secondName') {
    payload.secondName = data.name.length > 2 ? `_${data.name.toLowerCase().trim()}` : '';
    payload.oneName = data.form.oneName.length > 2 ? data.form.oneName.toLowerCase().trim() : '';
  }

  if (!payload.secondName && !payload.oneName) {
    return { lengthLine: true, isExistsOne:false, isExistsSecond:false, open: true, create: true };
  }

  const result = await reqWrite(payload);

  // перевіряє запис якщо він існує то повертає TRUE
  const oneName = payload.oneName ? true : false;
  const secondName = payload.secondName ? true : false;

  // перевіряє чи є запис в базі, якщо є то повертає TRUE
  const isExistsOne = result.oneName ? true : false;
  const isExistsSecond = result.secondName ? true : false;

  let open = false;
  let create = false;

  // Логіка перевірки 001
  // З — запис є
  // І — запис в БД є
  // В — запис в БД відсутній

  // З З && І І
  // так_відкрити ні_створити // відкриває другий
  if ((oneName && secondName) && (isExistsOne && isExistsSecond)) {
    console.log('З З && І І')
    return { lengthLine: true, isExistsOne, isExistsSecond, open: false, create: true };
  }
  // З З && В В
  // ні_відкрити так_створити
  if ((oneName && secondName) && (!isExistsOne && !isExistsSecond)) {
    console.log('З З && В В')
    return { lengthLine: true, isExistsOne, isExistsSecond, open: true, create: false };
  }
  // З З && І В
  // ні_відкрити так_створити
  if ((oneName && secondName) && (isExistsOne && !isExistsSecond)) {
    console.log('З З && І В')
    return { lengthLine: true, isExistsOne, isExistsSecond, open: true, create: false };
  }
  // З З && В I
  // так_відкрити ні_створити
  if ((oneName && secondName) && (!isExistsOne && isExistsSecond)) {
    console.log('З З && В I')
    return { lengthLine: true, isExistsOne, isExistsSecond, open: true, create: false };
  }
  // ʼʼ ʼʼ && В В
  // ні_відкрити ні_створити
  if ((!oneName && !secondName) && (!isExistsOne && !isExistsSecond)) {
    console.log("ʼʼ ʼʼ && В В")
    return { lengthLine: true, isExistsOne, isExistsSecond, open: false, create: false };
  }
  // З ʼʼ && І В
  // так_відкрити ні_створити
  if ((oneName && !secondName) && (isExistsOne && !isExistsSecond)) {
    console.log("З ʼʼ && І В")
    return { lengthLine: true, isExistsOne, isExistsSecond, open: false, create: true };
  }
  // З ʼʼ && В В
  // ні_відкрити так_створити
  if ((oneName && !secondName) && (!isExistsOne && !isExistsSecond)) {
    console.log("З ʼʼ && В В")
    return { lengthLine: true, isExistsOne, isExistsSecond, open: true, create: false };
  }
  // ʼʼ З && В В
  // ні_відкрити ні_створити
  if ((!oneName && secondName) && (!isExistsOne && !isExistsSecond)) {
    console.log("ʼʼ З && В В")
    return { lengthLine: true, isExistsOne, isExistsSecond, open: true, create: true };
  }
  // ʼʼ З && В I
  // так_відкрити ні_створити
  if ((!oneName && secondName) && (!isExistsOne && isExistsSecond)) {
    console.log("ʼʼ З && В І")
    return { lengthLine: true, isExistsOne, isExistsSecond, open: false, create: true };
  }
}