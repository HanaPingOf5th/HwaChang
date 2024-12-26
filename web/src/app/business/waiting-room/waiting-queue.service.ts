'use server'

import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";

export interface initialConsultingRoomInfoType {
  consultingRoomId: string,
  categoryId: string,
  customerId: string,
  tellerId: string,
  userName: string
}
export async function addCustomerToQueue(typeId: string, categoryId: string): Promise<APIResponseType> {
  const response = await instance.get(`${API_PATH}/queues/${typeId}?categoryId=${categoryId}`)

  return {
    isSuccess: true,
    isFailure: false,
    data: response.data
  }
}

export async function deleteCustomerFromQueueAndCreatingRoom(typeId: number): Promise<APIResponseType> {
  console.log(`${API_PATH}/queues/${typeId}/next`);
  const response = await instance.get(`${API_PATH}/queues/${typeId}/next`)
  console.log(response);
  return {
    isSuccess: true,
    isFailure: false,
    data: response.data.result as initialConsultingRoomInfoType
  }
}

export async function findCustomerRoomId(): Promise<APIResponseType> {
  const response = await instance.get(`${API_PATH}/queues/consulting-room`)
  console.log(response);
  return {
    isSuccess: true,
    isFailure: false,
    data: response.data.result as initialConsultingRoomInfoType
  }
}