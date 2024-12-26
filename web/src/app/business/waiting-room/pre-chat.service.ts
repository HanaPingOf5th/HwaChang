'use server'
import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";

const userName: string = "dw1234";

export async function sendPrechat(content: string): Promise<APIResponseType>{
  const response = await instance.post(`${API_PATH}/waiting-room/prechat`, {content:content})

  console.log(response);
  return {
    isSuccess: true,
    isFailure: false,
    data: response.data
  }
}

export async function getPrechat(): Promise<APIResponseType> {
  // console.log(`${API_PATH}/waiting-room/prechat/${userName}`);
  const response = await instance.get(`${API_PATH}/waiting-room/prechat/${userName}`)
  
  // console.log(response);
  return {
    isSuccess: true,
    isFailure: false,
    data: response.data
  }
    
}