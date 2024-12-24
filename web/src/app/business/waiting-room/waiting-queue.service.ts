'use server'

import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";

export async function addCustomerToQueue(typeId: string, categoryId: string):Promise<APIResponseType>{
  const response = await instance.post(`${API_PATH}/queues/${typeId}?categoryId=${categoryId}`)

  return {
    isSuccess: true,
    isFailure: false,
    data: response.data
  }
}