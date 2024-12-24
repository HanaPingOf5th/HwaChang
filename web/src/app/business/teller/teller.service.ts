"use server";
import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";
import { boolean } from "zod";

interface DailyLog {
  yesterday: Array<number>;
  today: Array<number>;
}

interface WeeklyLog {
  lastWeek: Array<number>;
  thisWeek: Array<number>;
}

interface MonthlyLog {
  lastMonth: Array<number>;
  thisMonth: Array<number>;
}

interface HwachangLog {
  dailyLog: DailyLog;
  weeklyLog: WeeklyLog;
  monthlyLog: MonthlyLog;
}

interface NpsData {
  promoter: number;
  neutral: number;
  detractor: number;
}

interface TellerMainDataResultType {
  avgScore: number;
  hwachangLog: HwachangLog;
  reviews: Array<string>;
  sumCustomer: number;
  npsData: NpsData;
}

interface TellerMainDataAPIResponseType {
  code: string;
  isSuccess: boolean;
  message: string;
  result: TellerMainDataResultType;
}

export interface TellerAPIResponseType<T> {
  isSuccess: boolean;
  isFailure: boolean;
  data: T;
}

export async function fetchTellerMain(): Promise<
  TellerAPIResponseType<TellerMainDataAPIResponseType>
> {
  const response = await instance.get(`${API_PATH}/teller/main`);
  console.log(response);
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

interface TellerStatusResponseType {
  name: string;
  position: string;
  type: string;
  status: string;
}

interface TellerResponseWrapper<T> {
  code: string;
  isSucess: boolean;
  message: string;
  result: T;
}

export async function fetchTellerStatus(): Promise<
  TellerAPIResponseType<TellerResponseWrapper<TellerStatusResponseType>>
> {
  const response = await instance.get(`${API_PATH}/teller/mypage`);
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

export async function patchTellerStatus(status: string): Promise<APIResponseType> {
  const response = await instance.patch(`${API_PATH}/teller/status`, { status });
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
