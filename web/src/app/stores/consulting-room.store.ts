import { createStore } from 'zustand/vanilla'
import { ConsultingRoom } from '../business/consulting-room/consulting-room'
import { persist } from 'zustand/middleware';
export interface ConsultingRoomActions{
  updateCustomer: (customerId: string)=>void
  updateTeller: (tellerId: string)=>void
  updateConsultingRoomId: (consultingRoomId: string) => void

}

export type ConsultingRoomStore = ConsultingRoom & ConsultingRoomActions

export const initConsultingRoomStore = (): ConsultingRoom => {
  return {
    consultingRoomId: null,
    tellerId: null,
    customerIds: [],
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
  customerIds: [],
  categoryId: null,
  originalText: null,
  summary: null,
  recordChat: [],
  voiceRecord: null,
  title: null,
  time: null,
}

// export const createConsultingRoomStore = (init:ConsultingRoom = defaultConsultingRoom)=>{
//   return createStore<ConsultingRoom>()((set)=>({
//     ...init,
//     updateCustomer: (customerId: string) => set((state)=>{
//       const newCustomerIds = [...state.customerIds, customerId];
//       return {customerIds: newCustomerIds}
//     }),
//     updateTeller: (tellerId: string) => set(()=>{
//       return {tellerId: tellerId}
//     }),
//     updateConsultingRoomId: (consultingRoomId: string) => set(()=>{
//       return {consultingRoomId: consultingRoomId}
//     })
//   }))
// }

export const createConsultingRoomStore = (
  init: ConsultingRoom = defaultConsultingRoom
) => {
  return createStore<ConsultingRoom>()(
    persist(
      (set) => ({
        ...init,
        updateCustomer: (customerId: string) =>
          set((state) => {
            const newCustomerIds = [...state.customerIds, customerId];
            return { customerIds: newCustomerIds };
          }),
        updateTeller: (tellerId: string) =>
          set(() => ({
            tellerId: tellerId,
          })),
        updateConsultingRoomId: (consultingRoomId: string) =>
          set(() => ({
            consultingRoomId: consultingRoomId,
          })),
      }),
      {
        name: 'consulting-room-store',
        partialize: (state) => ({
          customerIds: state.customerIds,
          tellerId: state.tellerId,
          consultingRoomId: state.consultingRoomId,
        }),
      }
    )
  );
};
