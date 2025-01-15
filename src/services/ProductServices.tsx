import { safeParse, pipe, number, transform, string, parse } from "valibot";
import axios from "axios";
import {
  DraftProductSchema,
  Product,
  ProductsSchema,
  ProductSchema,
} from "../types";
import { toBoolean } from "../helpers";

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

export async function updateProduct(data: ProductData, id: Product["id"]) {
  try {
    //Este es el schema ya listo
    const NumberSchema = pipe(string(), transform(Number), number());
    // const BooleanSchema = pipe(string(), transform(Boolean), boolean());
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString()),
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    }
  } catch (error) {
    console.log(error);
  }
}
