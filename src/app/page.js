import Image from "next/image";
import Boxinput from "./components/boxinput";
import ListMess from "./components/listmess";
import ButtOpenCreate from "./components/buttonoc";
import dataload from "./resurce/db";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

dataload();

export default async function Home() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
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
          <Boxinput regToken={token}/>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Віртуальна комірка з повідомленням може зберігатию без пароля {" "}
            <a
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Три дні,
            </a>{" "}
            з паролем {" "}
            <a
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Три місяця
            </a>{" "}
            потім воно буде автоматично виделено.
          </p>
          <ButtOpenCreate />
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
        
        
        </div>
        
          
        
      </main>
    </div>
  );
}
