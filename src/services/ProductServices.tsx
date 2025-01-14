import { safeParse } from "valibot";
import axios from "axios";
import {
  DraftProductSchema,
  Product,
  ProductsSchema,
  ProductSchema,
} from "../types";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const res = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
      // description: data.description,
    });
    console.log(res);

    if (res.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: res.output.name,
        price: res.output.price,
        // description: res.output.description,
      });
      // console.log(data);
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url);

    const res = safeParse(ProductsSchema, data.data);
    if (res.success) {
      return res.output;
    } else {
      throw new Error("Error getting products");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios(url);

    const res = safeParse(ProductSchema, data.data);

    if (res.success) {
      return res.output;
    } else {
      throw new Error("Error getting products");
    }
  } catch (error) {
    console.log(error);
  }
}
