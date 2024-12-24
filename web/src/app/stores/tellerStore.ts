import { create } from "zustand";

interface TellerState {
  tellerType: number;
  setTellerType: (newType: number) => void;
}

export const useTellerStore = create<TellerState>()((set) => ({
  tellerType: 0,
  setTellerType: (newType) => set((state) => ({ tellerType: newType })),
}));
