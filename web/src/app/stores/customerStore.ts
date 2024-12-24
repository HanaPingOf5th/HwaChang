// src/app/stores/customerStore.ts

import { create } from "zustand";

interface CustomerState {
  customerName: string; // 추가: 고객 이름 상태
  setCustomerName: (newName: string) => void; // 추가: 고객 이름 설정 함수
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customerName: "", // 초기값은 빈 문자열
  setCustomerName: (newName) => set(() => ({ customerName: newName })), // 이름 업데이트 함수
}));
