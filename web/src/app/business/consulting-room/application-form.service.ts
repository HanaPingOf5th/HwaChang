'use server'

import { ApplicationProps } from "@/app/(..route)/customer-room/components/application-form"
import { APIResponseType, instance } from "@/app/utils/http"

export async function getApplicationFormById(id: string):Promise<APIResponseType>{
  const response = await instance.get(`${process.env.API_URL}/consulting-room/application/${id}`)
  console.log(response);

  const data= response.data as ApplicationProps

  return {
    isSuccess: true,
    isFailure: false,
    data: data
  }
}

export async function getCategories():Promise<APIResponseType>{
  const response = await instance.get(`${process.env.API_URL}/consulting-room/application/categories`)
  console.log(response);

  const data = response.data

  return {
   isSuccess: true,
   isFailure: false,
   data: data
  }
}

export async function getFormTitleAndIdByCategoryId(categoryId: string):Promise<APIResponseType>{
  const response = await instance.get(`${process.env.API_URL}/consulting-room/application-forms/${categoryId}`)
  console.log(response);

  const data = response.data
  
  return{
    isSuccess: true,
    isFailure: false,
    data: data
  }
}