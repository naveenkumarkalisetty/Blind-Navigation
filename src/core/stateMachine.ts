import { useNavigationStore } from "@/store/navigationStore";

export function transition(nextState: any) {
  useNavigationStore.getState().setState(nextState);
}
