import { create } from "zustand";

export type NavState =
  | "IDLE"
  | "PROCESSING_DESTINATION"
  | "ROUTE_READY"
  | "NAVIGATING"
  | "ARRIVED";

interface NavigationStore {
  state: NavState;
  destinationText: string | null;
  route: any[];
  setState: (s: NavState) => void;
  setDestinationText: (t: string) => void;
  setRoute: (r: any[]) => void;
}

export const useNavigationStore = create<NavigationStore>(set => ({
  state: "IDLE",
  destinationText: null,
  route: [],
  setState: state => set({ state }),
  setDestinationText: text => set({ destinationText: text }),
  setRoute: route => set({ route }),
}));
