import { boolean, number, object, string, InferOutput, array } from "valibot";

export const DraftProductSchema = object({
  name: string(),
  price: number(),
  // description: string(),
});

export const ProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  // description: string(),
  availability: boolean(),
});
export const ProductsSchema = array(ProductSchema);
export type Product = InferOutput<typeof ProductSchema>;
