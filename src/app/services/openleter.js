"use server"
import "dotenv/config"


async function reqWrite(name, type) {
    try {
        const params = new URLSearchParams({ name: name, type: type }).toString();
        const response = await fetch(`${process.env.DB_SERVER}/getleter?${params}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json', // Обов'язково для JSON
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.status)
        if (response.status === 200) {
            const result = await response.json();
            return { ...result, isExists: true };
        } else if (response.status === 204)
            return { isExists: false };
    } catch (error) {
        console.error('Помилка запиту:', error);
    }
}


export async function openLater(data) {


    let name = data.secondName ? `_${data.secondName}` : data.oneName;
    name = name
        .toLowerCase()
        .trim();

    let type = data.secondName ? 1 : 2;
    if (data.password) type = 3;

    const result = await reqWrite(name, type);
    if (result[name])
        return result[name];
    else return '';
}