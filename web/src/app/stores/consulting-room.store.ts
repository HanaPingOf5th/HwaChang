import { createStore } from 'zustand/vanilla'
import { ConsultingRoom } from '../business/consulting-room/consulting-room'
import { persist } from 'zustand/middleware';
export interface ConsultingRoomActions{
  updateCustomer: (customerId: string)=>void
  updateTeller: (tellerId: string)=>void
  updateConsultingRoomId: (consultingRoomId: string)=>void
  updateCustomerName: (customerName: string)=>void
  updateTellerType: (tellerType: number)=>void
  updateCategoryId: (categoryId: string)=>void
  initConsultingRoomStore: () => void
}

export type ConsultingRoomStore = ConsultingRoom & ConsultingRoomActions

export const initConsultingRoomStore = (): ConsultingRoom => {
  return {
    consultingRoomId: null,
    tellerId: null,
    tellerType: null,
    customerId: null,
    categoryId: null,
    originalText: null,
    summary: null,
    recordChat: [],
    voiceRecord: null,
    title: null,
    time: null,
  }
}

export const defaultConsultingRoom: ConsultingRoom = {
  consultingRoomId: null,
  tellerId: null,
  tellerType: null,
  customerId: null,
  categoryId: null,
  originalText: null,
  summary: null,
  recordChat: [],
  voiceRecord: null,
  title: null,
  time: null,
}

export const createConsultingRoomStore = (
  init: ConsultingRoom = defaultConsultingRoom
) => {
  return createStore<ConsultingRoom>()(
    persist(
      (set) => ({
        ...init,
        updateCustomer: (customerId: string) =>
          set(() => ({
            customerId: customerId
          })),
        updateTeller: (tellerId: string) =>
          set(() => ({
            tellerId: tellerId,
          })),
        updateConsultingRoomId: (consultingRoomId: string) =>
          set(() => ({
            consultingRoomId: consultingRoomId,
          })),
        updateCustomerName: (customerName: string) =>
          set(()=>({
            customerName: customerName
          })),
        updateTellerType: (tellerType: number) => 
          set(()=>({
            tellerType: tellerType
          })),
        updateCategoryId: (categoryId: string) =>
          set(()=>({
            categoryId: categoryId
          })),
          initConsultingRoomStore: () => 
          set(()=>({
            customerId: null,
            tellerId: null,
            consultingRoomId: null,
            customerName: null,
            categoryId: null
          }))
      }),
      {
        name: 'consulting-room-store',
        partialize: (state) => ({
          customerId: state.customerId,
          tellerId: state.tellerId,
          consultingRoomId: state.consultingRoomId,
          customerName: state.customerName,
          tellerType: state.tellerType,
          categoryId: state.categoryId
        }),
      }
    )
  );
};
