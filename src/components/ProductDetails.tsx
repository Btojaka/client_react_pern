import React from "react";
import { Product } from "../types";
import { formatCurrency } from "../helpers";
import { Link, useNavigate } from "react-router-dom";

type ProductDetailsProps = {
  product: Product;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const navigate = useNavigate();
  const isAvailable = product.availability;
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {isAvailable ? "Available" : "Not Available"}
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`/products/${product.id}/edit`)}
            className=" bg-yellow-500 text-black rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          >
            Edit
          </button>
          <Link
            to={`/products/${product.id}/delete`}
            className=" bg-red-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          >
            Delete
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ProductDetails;
