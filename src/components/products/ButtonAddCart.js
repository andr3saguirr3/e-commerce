

export default function ButtonAddCart({ onClick }) {
    return (
        <button className="bg-gray-700 text-white p-2 mt-4 hover:bg-gray-800 hover:cursor-pointer" onClick={onClick}>
            Agregar al carrito
        </button>
    )
}   