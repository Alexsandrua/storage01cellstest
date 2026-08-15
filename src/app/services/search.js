"use server"
import dataload from '../resurce/db';

import { cookies } from 'next/headers';

export async function search(data) {
  let name = data.search
    .toLowerCase()
    .trimStart()
    .trimEnd()
    .split(' ');

  if (name.length >= 2) {
    name = name[1] ? `${name[0].trim()}_${name[1].trim()}` : name[0].trim();
    console.log(name)
    try {
      const params = new URLSearchParams({ search: name }).toString();
      const response = await fetch(`${process.env.DB_SERVER}/searchname?${params}`, {
        method: 'GET', // Вказуємо метод
        headers: {
          'Accept': 'application/json', // Обов'язково для JSON
        },
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
  } else {
    return '';
  }


}