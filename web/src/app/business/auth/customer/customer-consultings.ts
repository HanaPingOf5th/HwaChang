import { HttpError } from "@/app/utils/http/http-error";

// 요청 파라미터 타입 정의
export interface ConsultingRequestParams {
  customerId: string;
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
): Promise<ConsultingResponse[]> {
  try {
    // 쿼리 파라미터를 URL에 추가
    const queryParams = new URLSearchParams();

    queryParams.append("customerId", params.customerId); // customerId도 쿼리 파라미터로 포함
    if (params.summaryKeyword) queryParams.append("summaryKeyword", params.summaryKeyword);
    if (params.startDate) queryParams.append("startDate", params.startDate);
    if (params.endDate) queryParams.append("endDate", params.endDate);

    // GET 요청 URL
    const url = `/api/customer/consultings?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 응답이 실패하면 에러 처리
    if (!response.ok) {
      throw new HttpError(response.status, "API 요청에 실패했습니다.");
    }

    // JSON 데이터 반환
    const data: ConsultingResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    throw error; // 상위 호출 함수에서 처리할 수 있도록 에러 재발생
  }
}
