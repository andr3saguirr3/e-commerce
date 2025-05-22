"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Card from "@/components/products/card";
import { getProductByCategoryID } from "@/lib/products";

export default function CategoryClient({ category }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  const loadProducts = useCallback(async () => {
    if (!hasMore) return;

    const res = await getProductByCategoryID(category, page);
    setProducts((prev) => [...prev, ...res.data]);
    setHasMore(page < res.totalPages);
  }, [category, page, hasMore]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore]);

  return (
    <div>
      <h1 className="m-8 pl-18 text-4xl font-bold">
        {products[0]?.brand ?? "Categoría"}
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      <div ref={observerRef} className="h-10 my-8 flex justify-center items-center">
        {hasMore ? <span>Cargando más productos...</span> : <span>No hay más productos</span>}
      </div>
    </div>
  );
}
