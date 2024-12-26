"use server";
import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";

// 요청 파라미터 타입 정의
export interface ConsultingRequestParams {
  summaryKeyword?: string; // 검색 키워드 (optional)
  startDate?: string; // 시작 날짜 (optional)
  endDate?: string; // 종료 날짜 (optional)
}

// API 요청 결과 타입
export interface ConsultingResponse {
  consultingRoomId: string;
  summary: string;
  tellerName: string;
  type: string;
  category: string;
  date: string;
}

// fetchCustomerConsultings 함수
export async function fetchCustomerConsultings(
  params: ConsultingRequestParams,
): Promise<APIResponseType> {
  // 쿼리 파라미터를 URL에 추가
  const queryParams = new URLSearchParams();

  // queryParams.append("customerId", params.customerId); // customerId도 쿼리 파라미터로 포함
  if (params.summaryKeyword) queryParams.append("summaryKeyword", params.summaryKeyword);
  if (params.startDate) queryParams.append("startDate", params.startDate);
  if (params.endDate) queryParams.append("endDate", params.endDate);

  // GET 요청 URL
  const response = await instance.get(`${API_PATH}/customer/consultings?${queryParams.toString()}`);
  console.log(response);

  return {
    isSuccess: true,
    isFailure: false,
    data: response.data,
  };
}
