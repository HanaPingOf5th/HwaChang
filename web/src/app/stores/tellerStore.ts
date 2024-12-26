import { create } from "zustand";

interface TellerState {
  tellerType: number;
  setTellerType: (newType: number) => void;
}

export const useTellerStore = create<TellerState>()((set) => ({
  tellerType: 1,
  setTellerType: (newType) => set(() => ({ tellerType: newType })),
}));
