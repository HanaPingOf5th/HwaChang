'use client'

import { createContext, type ReactNode, useContext, useRef } from "react"
import { useStore } from 'zustand'
import { ConsultingRoomStore, createConsultingRoomStore, initConsultingRoomStore } from "./consulting-room.store";

// 왜 ReturnType을 사용하는지 알아보기
export type ConsultingRoomStoreApi = ReturnType<typeof createConsultingRoomStore>
export const ConsultingRoomStoreContext = createContext<ConsultingRoomStoreApi | undefined>(undefined);
export interface ConsultingRoomStoreProviderProps { children: ReactNode }

export const ConsultingRoomStoreProvider = ({
  children,
}: ConsultingRoomStoreProviderProps) => {
  const storeRef = useRef<ConsultingRoomStoreApi>()
  if(!storeRef.current){
    storeRef.current = createConsultingRoomStore(initConsultingRoomStore())
  }

  return (
    <ConsultingRoomStoreContext.Provider value={storeRef.current}>
      {children}
    </ConsultingRoomStoreContext.Provider>
  )
}

export const useCounterStore = <T,>(selector: (store: ConsultingRoomStore) => T,):T => {
  const consultingRoomStoreContext = useContext(ConsultingRoomStoreContext)

  if(!consultingRoomStoreContext){
    throw new Error('useConsultingRoomStore must be used within ConsultingRoomStoreProvider')
  }

  return useStore(consultingRoomStoreContext, selector);
}