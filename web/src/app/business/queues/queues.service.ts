"use server";
import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";

// 대기열에 고객 추가
export async function addCustomerToQueue(
  typeId: string,
  categoryId: string,
): Promise<APIResponseType> {
  const response = await instance.post(`${API_PATH}/queues/${typeId}?categoryId=${categoryId}`);

  return {
    isSuccess: true,
    isFailure: false,
    data: response.data,
  };
}

// 대기열 정보 조회
export async function getQueueData(typeId: number): Promise<APIResponseType> {
  const response = await instance.get(`${API_PATH}/queues/${typeId}/teller-entrance`);
  if (response.status === 200) {
    return {
      isSuccess: true,
      isFailure: false,
      data: response.data,
    };
  } else {
    return {
      isSuccess: false,
      isFailure: true,
      data: null,
    };
  }
}

// 행원 상담 후처리 요청
export async function postProcessingRequest(): Promise<APIResponseType> {
  const response = await instance.post(`${API_PATH}/queues/teller-postprocessing`);
  if (response.status === 200) {
    return {
      isSuccess: true,
      isFailure: false,
      data: null,
    };
  } else {
    return {
      isSuccess: false,
      isFailure: true,
      data: null,
    };
  }
}

// 다음 고객 처리
export async function processNextCustomer(typeId: number): Promise<APIResponseType> {
  const response = await instance.get(`${API_PATH}/queues/${typeId}/processNextCustomer`);
  if (response.status === 200) {
    return {
      isSuccess: true,
      isFailure: false,
      data: response.data,
    };
  } else {
    return {
      isSuccess: false,
      isFailure: true,
      data: null,
    };
  }
}

// 대기열에서 나가기
export async function exitWaitingRoom(typeId: number): Promise<APIResponseType> {
  const response = await instance.delete(`${API_PATH}/queues/${typeId}/`);
  if (response.status === 200) {
    return {
      isSuccess: true,
      isFailure: false,
      data: response.data,
    };
  } else {
    return {
      isSuccess: false,
      isFailure: true,
      data: null,
    };
  }
}

// 대기열 크기 확인
export async function getQueueSize(categoryId: number): Promise<APIResponseType> {
  const response = await instance.get(`${API_PATH}/queues/${categoryId}/size`);
  if (response.status === 200) {
    return {
      isSuccess: true,
      isFailure: false,
      data: response.data,
    };
  } else {
    return {
      isSuccess: false,
      isFailure: true,
      data: null,
    };
  }
}
