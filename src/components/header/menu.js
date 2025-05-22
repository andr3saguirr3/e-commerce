"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/categories";
import { useCart } from "@/context/cartContext";
import CartPopup from "@/components/cart/CartPopup";

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [mounted, setMounted] = useState(false); 

  const { cart } = useCart();
  const totalItems = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  useEffect(() => {
    getCategories().then(setCategories);
    setMounted(true); 
  }, []);

  return (
    <nav className="bg-white text-black p-4 flex gap-6 border-b border-gray-200 sticky top-0 z-50">
      <Link className="hover:bg-gray-200 p-1 rounded-md duration-200" href="/">INICIO</Link>
      <Link className="hover:bg-gray-200 p-1 rounded-md duration-200" href="/">LENTES DE SOL</Link>

      <div className="relative">
        <button onClick={() => setIsOpen(!isOpen)} className="hover:bg-gray-200 p-1 rounded-md duration-200">
          MARCAS
        </button>
        {isOpen && (
          <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
            {categories.length > 0 ? (
              categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              ))
            ) : (
              <span className="block px-4 py-2 text-gray-500">Cargando...</span>
            )}
          </div>
        )}
      </div>

      <div className="ml-auto relative">
        <button
          onClick={() => setShowCart(!showCart)}
          className="relative p-2 hover:bg-gray-200 rounded-md duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.6 8m11.2-8l1.6 8m-13.2-8h14" />
          </svg>
          {mounted && totalItems > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              {totalItems}
            </span>
          )}
        </button>
        
        {showCart && <CartPopup onClose={() => setShowCart(false)} />}
      </div>
    </nav>
  );
}
