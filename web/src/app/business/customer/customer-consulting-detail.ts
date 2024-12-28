"use server";
import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";

export interface ConsultingDetailResponse {
  summary: string;
  originalText: {
    speaker: string;
    startTime: string;
    endTime: string;
    text: string;
  }[];

  tellerName: string;
  type: string;
  category: string;
  date: string;
  voiceUrl: string;
}

export async function fetchConsultingDetail(consultingRoomId: string): Promise<APIResponseType> {
  try {
    const response = await instance.get(
      `${API_PATH}/customer/consultings/detail/${consultingRoomId}`,
    );
    return {
      isSuccess: true,
      isFailure: false,
      data: response.data as ConsultingDetailResponse,
    };
  } catch (error) {
    console.error("Error fetching consulting detail", error);

    return {
      isSuccess: false,
      isFailure: true,
      data: null,
    };
  }
}
