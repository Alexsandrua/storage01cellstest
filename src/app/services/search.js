"use server"

export async function search(data) {
  console.log(' DATA ', data)
  if (data.search.length < 3) return null
  let name = data.search
    .toLowerCase()
    .trim();

  try {
    const params = new URLSearchParams({ search: name }).toString();
    const response = await fetch(`${process.env.DB_SERVER}/searchname?${params}`, {
      method: 'GET', // Вказуємо метод
      headers: {
        'Accept': 'application/json',
      },
    });


    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let result = ''
    if (response.status === 200) {
      result = await response.json();
    } else if (response.status === 204) result = null;
 console.log('RESULT   - ', result)
    return result;

  } catch (error) {
    console.error('Помилка запиту:', error);
  }

}