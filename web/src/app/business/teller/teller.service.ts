"use server";
import { instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";

export interface DailyLog {
  yesterday: Array<number>;
  today: Array<number>;
}

export interface WeeklyLog {
  lastWeek: Array<number>;
  thisWeek: Array<number>;
}

export interface MonthlyLog {
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

interface TellerMainDataResultAPIResponseType {
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
  result: TellerMainDataResultAPIResponseType;
}

export interface TellerMainAPIResponseType {
  isSuccess: boolean;
  isFailure: boolean;
  data: TellerMainDataAPIResponseType;
}

export async function fetchTellerMain(): Promise<TellerMainAPIResponseType> {
  const response = await instance.get(`${API_PATH}/teller/main`);
  console.log(response);
  return {
    isSuccess: true,
    isFailure: false,
    data: response.data,
  };
}
