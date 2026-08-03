"use server"
import temporareStor from '../resurce/rdb'

export async function actionNameOne (fromData) {
    console.log("Данні отриманні з першого поля",'"', fromData,'"');
}