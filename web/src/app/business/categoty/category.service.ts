'use server'

import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";

export type ConsultingType = "CORPORATE" | "PERSONAL"
export interface Category{
  categoryId: string,
  categoryName: string
  categoryType:  ConsultingType
}

export async function getCategories(type: ConsultingType):Promise<APIResponseType>{
  console.log(`${API_PATH}/category/${type as string}`);
  const response = await instance.get(`${API_PATH}/category/${type as string}`)
  
  return {
    isSuccess: true,
    isFailure: true,
    data: response.data as Category[]
  }
}