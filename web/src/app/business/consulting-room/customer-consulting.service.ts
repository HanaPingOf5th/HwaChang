'use server'

import { APIResponseType, instance } from "@/app/utils/http"
import { API_PATH } from "@/app/utils/http/api-query";

export interface ConsultingList{
    consultingRoomId : string;
    createdAt : string;
    title : string;
    categoryName : string;
    summary : string;
    customerName : string;
}

export async function getConsultingList(
  params: string
):Promise<APIResponseType>{
  const queryParams = new URLSearchParams();
  
  if (params) queryParams.append("customerId", params);
  const response = await instance.get(`${API_PATH}/consulting-room/consulting-list?${queryParams.toString()}`);

  const data= response.data as ConsultingList[];
  console.log(data);

  return {
    isSuccess: true,
    isFailure: false,
    data: data
  }
}