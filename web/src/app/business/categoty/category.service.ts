'use server'

import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";

export interface Category{
  categoryId: string,
  categoryName: string
}

export async function getCategories():Promise<APIResponseType>{
  const response = await instance.get(`${API_PATH}/category/CORPORATE`)
  
  return {
    isSuccess: true,
    isFailure: true,
    data: response.data as Category
  }
}