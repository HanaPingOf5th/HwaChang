'use server'

import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";

export interface Document{
  documentId: string;
  title: string;
  path: string;
}

export async function getDocumentsByCategoryId(categoryId: string):Promise<APIResponseType> {
  const response = await instance.get(`${API_PATH}/document/list/${categoryId}`);
  
  return {
    isSuccess: true,
    isFailure: false,
    data: response.data as Document[]
  }
}