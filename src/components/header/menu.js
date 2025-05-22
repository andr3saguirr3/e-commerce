"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { getCategories } from "@/lib/categories"

export default function Menu() {
  const [categories, setCategories] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getCategories().then((data) => setCategories(data))
  }, [])

  return (
    <nav className="bg-white text-black p-4 flex gap-6 border-b border-gray-200 sticky top-0 z-50">
      <Link className="hover:bg-gray-200 p-1 rounded-md duration-200" href="/">INICIO</Link>
      <Link className="hover:bg-gray-200 p-1 rounded-md duration-200" href="/">LENTES DE SOL</Link>

      {/* Dropdown de categorías */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover:bg-gray-200 p-1 rounded-md duration-200"
        >
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
    </nav>
  )
}
