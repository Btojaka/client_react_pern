import { Product } from "../types";

type ProductFormProps = {
  product?: Product;
};

const FormProduct = ({ product }: ProductFormProps) => {
  return (
    <>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="name">
          Porduct Name:
        </label>
        <input
          id="name"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Name of the product"
          name="name"
          defaultValue={product?.name}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          type="number"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Precio Producto. ej. 200, 300"
          name="price"
          defaultValue={product?.price}
        />
      </div>
    </>
  );
};

export default FormProduct;
