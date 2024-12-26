"use server";
import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";

export interface EndConsultingRoom {
  consultingRoomId: string;
  tellerId: string;
  categoryId: string;
  customerId: string;
  recordChat: string[];
  voiceUrl: string;
  time: string;
}

export async function endConsultingRoom(data: EndConsultingRoom): Promise<APIResponseType> {
  try {
    const response = await instance.post(`${API_PATH}/consulting-room/end`, data);

    return {
      isSuccess: true,
      isFailure: false,
      data: response.data,
    };
  } catch (error) {
    console.error("Error ending consulting room", error);

    return {
      isSuccess: false,
      isFailure: true,
      data: null,
    };
  }
}
