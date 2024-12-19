'use server'

import { ApplicationProps } from "@/app/(..route)/customer-room/components/application-form"
import { APIResponseType, instance } from "@/app/utils/http"
import { API_PATH } from "@/app/utils/http/api-query";

export async function getApplicationFormById(id: string):Promise<APIResponseType>{
  const response = await instance.get(`${API_PATH}/application/${id}`)
  console.log(response);

  const data= response.data as ApplicationProps

  return {
    isSuccess: true,
    isFailure: false,
    data: data
  }
}

export async function getCategories():Promise<APIResponseType>{
  const response = await instance.get(`${API_PATH}/category`)
  console.log(response);

  const data = response.data

  return {
   isSuccess: true,
   isFailure: false,
   data: data
  }
}

export async function getFormTitleAndIdByCategoryId(categoryId: string):Promise<APIResponseType>{
  const response = await instance.get(`${API_PATH}/application/${categoryId}`)
  console.log(response);

  const data = response.data
  
  return{
    isSuccess: true,
    isFailure: false,
    data: data
  }
}