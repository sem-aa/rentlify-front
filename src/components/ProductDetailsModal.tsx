import { useRef, useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { ButtonClose } from "./ButtonClose";
import useClickOutside from "@/hooks/useClickOutSide";
import Loader from "./Loader";

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailsModal = ({
  product,
  onClose,
}: ProductDetailsModalProps) => {
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null!);
  useClickOutside(modalRef, onClose);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg overflow-hidden m-4 max-w-lg w-full"
      >
        <div className="flex justify-end p-4">
          <ButtonClose
            onClick={onClose}
            size="lg"
            className="text-gray-500 hover:text-gray-700 transition"
          />
        </div>
        <div className="p-6">
          <div className="relative flex justify-center min-h-[400px]">
            <Image
              src={`/images/products/${product.image}`}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-lg object-contain w-auto h-auto"
              onLoad={() => setLoading(true)}
            />
            {!loading && (
              <div className="absolute">
                <Loader />
              </div>
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {product.name}
            </h2>
            <p className="text-lg text-gray-600">{product.price} USD</p>
            <p className="text-md text-gray-500">{product.category}</p>
            <p className="text-md text-gray-500">{product.location}</p>
            <p className="text-md text-gray-500">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
