'use server'

import { ApplicationProps } from "@/app/(..route)/customer-room/components/application-form"
import { APIResponseType, instance } from "@/app/utils/http"
import { API_PATH } from "@/app/utils/http/api-query";

export interface ApplicationFormInfoType{
  applicationFormId: string;
  title: string;
}
export interface SubjectedFormData{
  section:string;
  label:string;
  value:string;
}

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

export async function getApplicationFormInfoListByCategoryId(categoryId: string):Promise<APIResponseType>{
  const response = await instance.get(`${API_PATH}/application/list/${categoryId}`)
  console.log(response);

  const data = response.data
  
  return{
    isSuccess: true,
    isFailure: false,
    data: data as ApplicationFormInfoType[]
  }
}

export async function submitApplicationForm(subjectedFormData:SubjectedFormData[]):Promise<APIResponseType> {
  const response = await instance.post(`${API_PATH}/save-form`, {subjectedFormData: subjectedFormData})
  console.log(response);

  return {
    isSuccess: true,
    isFailure: false,
    data: response.status
  }
}

export async function searchApplicationFormByKeyword(keyword: string):Promise<APIResponseType> {
  const response = await instance.get(`${API_PATH}/application?keyword=${keyword}`)

  console.log(response)

  return {
    isSuccess: true,
    isFailure: false,
    data: response.data as ApplicationFormInfoType[]
  }
}