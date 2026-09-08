'use client';
import Image from "next/image";
import { useEffect } from "react";
import Typography from '@mui/material/Typography'
import DashboardImput from "./components/dashboardImput";

export default function Home() {
  useEffect(() => {
    const initRegSesion = async () => {
      try {
        await fetch("/api/reg");
      } catch (error) {
        console.error(error);
      }
    }
    initRegSesion();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans ">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-black dark:bg-black sm:items-start">

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Комірки очікування.
          </h1>
          <Image

            src="/mal.svg"
            alt="Next.js logo"
            width={100}
            height={100}
            priority
          />
          <DashboardImput />
          <Typography component="span" variant="body2">
           <Typography> Правила:</Typography>
            Комірка створена з першим ім’ям  буде  тільки для читання.
            <Typography>Комірка створена з двох імен, може бути редагована і мати пароль.
            Для редагування треба вводити два імʼя . Для  читання треба ввести тільки друге імʼя і натиснути відкрити. Якщо вона з паролем треба ввести і пароль.
            Комірки зберігаються 3 години.</Typography>
          </Typography>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
        </div>
      </main>
    </div>
  );
}
