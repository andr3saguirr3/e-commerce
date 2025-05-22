"use client"
import Image from "next/image"
import ButtonAddCart from "./ButtonAddCart"
import { useCart } from "@/context/cartContext"

export default function Card({ product }) {
    const { addToCart } = useCart();
    if (!product || !product.images || product.images.length === 0) {
        return <div>No image available</div>
    }

    return (
        <div className="w-60 min-h-[300px] flex flex-col justify-between border rounded shadow p-4">
            <div>
                <Image
                    src={product.images[0].url}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-cover mx-auto"
                />
                <p className="text-center mt-2 font-semibold">{product.name}</p>
                <p className="text-center text-gray-700">${product.price}</p>
            </div>
            <ButtonAddCart onClick={() => addToCart(product)}/>
        </div>
    )
}
