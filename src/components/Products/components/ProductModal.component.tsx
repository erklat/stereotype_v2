import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

interface ProductModalProps {
  id: number | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ id, onClose }) => {
  const [product, setProduct] = useState<any>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id !== null) {
      axios
        .get(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setProduct(null);
    };
  }, [id, onClose]);

  if (id === null || !product) {
    return null;
  }

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full mx-4 sm:mx-6 lg:mx-8 p-6 relative text-slate-500"
      ref={modalRef}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
        <p className="text-gray-600">{product.description}</p>
      </div>
      <div className="mt-4">
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Rating:</strong> {product.rating}
        </p>
        <p>
          <strong>Stock:</strong> {product.stock}
        </p>
        <p>
          <strong>Brand:</strong> {product.brand}
        </p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700">Reviews</h3>
        <ul>
          {product.reviews.map((review: any, index: number) => (
            <li key={index} className="mt-2">
              <p className="text-gray-800">
                <strong>{review.reviewerName}:</strong> {review.comment}
              </p>
              <p className="text-gray-600">Rating: {review.rating}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductModal;
