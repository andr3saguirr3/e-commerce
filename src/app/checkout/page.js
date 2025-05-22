"use client";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const { cart } = useCart();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    alert(`Gracias por tu compra, ${formData.name}!`);
  };

  if (!mounted) {
    return <p>Cargando carrito...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="space-y-4 my-8 ">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center border-b pb-2"
              >
                <div className="w-16 h-16 relative">
                  <Image
                    src={item.images[0]?.url || "/placeholder.jpg"}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × ${Number(item.price).toFixed(2)}
                  </p>
                </div>
                <p className="font-semibold">
                  ${Number(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="text-right mb-8">
            <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
          </div>

          <form onSubmit={handleConfirm} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <textarea
              name="address"
              placeholder="Dirección de envío"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Confirmar pedido
            </button>
          </form>
        </>
      )}
    </div>
  );
}
