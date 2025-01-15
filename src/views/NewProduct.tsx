import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import { addProduct } from "../services/ProductServices";
import ErrorMessage from "../components/ErrorMessage";
import FormProduct from "../components/FormProduct";

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
        <FormProduct />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded-md"
          value="Add Product"
        />
      </Form>
    </>
  );
};

export default NewProduct;
