"use client";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPopup({ onClose }) {
  const { cart, addToCart, removeFromCart } = useCart();

  const decreaseQty = (productId) => {
    const item = cart.find((item) => item.id === productId);
    if (item && item.quantity > 1) {
      removeFromCart(productId);
      addToCart({ ...item, quantity: item.quantity - 1 });
    } else {
      removeFromCart(productId);
    }
  };

  const increaseQty = (product) => {
    addToCart(product);
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Tu Carrito</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-black text-sm">✕</button>
      </div>

      {cart.length === 0 ? (
        <p className="text-sm text-gray-500">El carrito está vacío.</p>
      ) : (
        <div className="space-y-4 max-h-72 overflow-y-auto">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-16 h-16 relative">
                <Image
                  src={item.images[0].url || "/placeholder.jpg"}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">${Number(item.price).toFixed(2)}</p>
                <div className="flex items-center mt-1 gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-6 h-6 text-sm border rounded hover:bg-gray-200"
                  >−</button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item)}
                    className="w-6 h-6 text-sm border rounded hover:bg-gray-200"
                  >+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <>
          <div className="border-t pt-4 mt-4 text-right">
            <p className="text-base font-semibold">Total: ${total.toFixed(2)}</p>
          </div>
          <Link
            href="/checkout"
            className="block mt-3 text-center bg-gray-700 text-white py-2 rounded hover:bg-gray-800 duration-200"
            onClick={onClose}
          >
            Ir al Checkout
          </Link>
        </>
      )}
    </div>
  );
}
