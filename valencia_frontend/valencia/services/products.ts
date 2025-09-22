// import { Product } from '@prisma/client';
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { Product } from "@/interfaces/types";

interface SearchParams {
  name?: string;
  id?: string;
}

export const search = async (params: SearchParams): Promise<Product[]> => {
  return (console.log("запрос"),
  await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params }))
    .data;
};
