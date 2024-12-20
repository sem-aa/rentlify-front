import React from "react";
import ProductItem from "./ProductItem";
import { Product } from "@/types";

interface ProductListProps {
  products: Product[];
  onProductClick: (id: number) => void;
}

const ProductList = ({ products, onProductClick }: ProductListProps) => {
  return (
    <div className="flex justify-center flex-wrap gap-4">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onClick={() => onProductClick(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList;
