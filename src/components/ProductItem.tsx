import React from "react";
import Image from "next/image";
import { Product } from "@/types";

interface ProductItemProps {
  product: Product;
  onClick: () => void;
}

const ProductItem = ({ product, onClick }: ProductItemProps) => {
  return (
    <div
      onClick={onClick}
      role={"button"}
      className="group cursor-pointer rounded-lg border bg-white shadow-sm hover:shadow-md transition p-4 flex flex-col w-full max-w-80"
    >
      <div className="relative w-full h-40">
        <Image
          src={`/images/products/${product.image}`}
          alt={product.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg group-hover:scale-105 transition-transform object-contain"
          fill
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-1 mt-4 flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-turquoise transition">
          {product.name}
        </h2>
        <p className="text-sm font-medium text-gray-600">{product.price} USD</p>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-sm text-gray-500">{product.location}</p>
      </div>
    </div>
  );
};

export default ProductItem;
