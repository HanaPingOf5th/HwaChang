import { createContext, ReactNode, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";
import { persist } from "zustand/middleware";

export type TellerStateStoreApi = ReturnType<typeof createTellerState>;

export interface TellerState {
  typeId?: number | null;
}

export interface TellerStateActions {
  updateTellerState: (typeId: number) => void;
}

export interface TellerStoreProviderProps {
  children: ReactNode;
}

const defaultTellerStore: TellerState = {
  typeId: null,
};

export const createTellerState = (init: TellerState = defaultTellerStore) => {
  return createStore<TellerState & TellerStateActions>()(
    persist(
      (set) => ({
        ...init,
        updateTellerState: (typeId: number) => set({ typeId }),
      }),
      {
        name: 'teller-state-store',
        partialize: (state) => ({ typeId: state.typeId }),
      }
    )
  );
};

export const TellerStoreContext = createContext<TellerStateStoreApi | undefined>(undefined);

export const useTellerStore = <T,>(selector: (store: TellerState & TellerStateActions) => T): T => {
  const tellerStoreContext = useContext(TellerStoreContext);

  if (!tellerStoreContext) {
    throw new Error('useTellerStore must be used within TellerStoreProvider');
  }

  return useStore(tellerStoreContext, selector);
};


export const initTellerStore = (): TellerState => ({ typeId: null });
