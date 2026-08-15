import { createClient } from "redis";
import "dotenv/config";

export async function redisInit() {

    const clientRedis = await createClient({
        url: process.env.REDIS_URL
    }).on('error', (err) => console.error('Redis Client Error', err));
    
    
    const workr = {
        tokens: {
            token: { // це приклад для редагування
                nameOne: '',
                nameTwo: '',
                password: '',

            }
        },
        match: { // данні завантажуються з основної ьази зразу після її оновлення
            name: 'name',//це окрема комірка тількі для читання
            name_name: 'name_name',// name_name - _name це она коміркв подвійне ім!я для редагування
            _name: 'name_name'//імʼя для читання
        }
    }

    return clientRedis;
}



export async function showAll () {
    const client = await redisInit();
return await client.hGetAll('tokens');
}


