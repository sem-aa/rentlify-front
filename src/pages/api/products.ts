import axios from "axios";
import { Product, SearchParams } from "@/types";

axios.defaults.baseURL = "https://rentlify-back.onrender.com/";

export const fetchAllProductsApi = async (): Promise<Product[]> => {
  const response = await axios.get("products");
  return response.data;
};

export const fetchFilteredProductsApi = async (
  params: SearchParams,
): Promise<Product[]> => {
  const response = await axios.get("products", { params });
  return response.data;
};
