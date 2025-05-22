import Image from "next/image";
import { Column } from "@/components/column";

export default function Home() {

  return (
    <div className="flex items-center flex-col">
      <Image
      src="/PORTADA.png"
      alt="portada"
      width={0}
      height={0}
      sizes="100vw"
      className="w-full h-auto"
    />    

    <h2 className="text-4xl font-bold mt-26"> MARCAS</h2>

      <div className="flex flex-wrap justify-center gap-4 my-8">
        {Array.from({ length: 14 }, (_, i) => {
          const number = String(i + 6).padStart(2, '0'); // "06" hasta "19"
          return (
            <Image
              key={number}
              src={`/lentes-${number}.png`}
              alt={`lentes-${number}`}
              width={200}
              height={200}
            />
          );
        })}
      </div>

      <h2>EXPLORA NUESTRAS MARCAS</h2>
      <p>CONOCE LAS COLECCIONES DE LENTES DE SOL</p>
      <div className="flex flex-wrap justify-center gap-32 my-8">
        <Column src="/MIU-MIU.png" alt="MIU MIU" url="92f29296-a612-41e3-881a-bed4e52736e7" text="Para quienes no encajan, brillan.
          Para quienes usan MIU MIU"/>
        <Column src="/VERSACE.png" alt="VERSACE" url="c9a36ad2-75fa-45d1-96fb-14dd1d187da6" text="Para quienes nacieron para destacar. Para quienes eligen VERSACE"/>
      </div>
    </div>
  );
}
