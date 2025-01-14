import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import { addProduct } from "../services/ProductServices";
import ErrorMessage from "../components/ErrorMessage";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "All fields are required";
  }
  if (error.length) {
    return error;
  }
  await addProduct(data);
  return redirect("/");
}

const NewProduct = () => {
  const error = useActionData() as string;
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">New product</h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Go back to products
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="POST">
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
          />
        </div>
        {/* <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Product Description:
          </label>
          <input
            id="description"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Description of the product"
            name="description"
          />
        </div> */}
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded-md"
          value="Add"
        />
      </Form>
    </>
  );
};

export default NewProduct;
