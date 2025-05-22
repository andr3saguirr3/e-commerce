import Image from "next/image";
import Link from "next/link";

export const Column = ({ src, alt, url, text }) => {
  return (
    <div className="relative w-[400px] h-[600px] overflow-hidden shadow-md">
      {/* Imagen como fondo */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover z-0"
      />
      
      {/* Contenido encima */}
      <div className="flex flex-col gap-4 relative z-10 p-4 text-white bg-black/40 h-full flex items-center justify-end ">
        <p className="text-lg font-semibold">
          {text}
        </p>
        <Link href={`/categories/${url}`} className="text-lg  bg-white text-black p-2 w-full ">
          VER {alt}
        </Link>
      </div>
    </div>
  );
};
