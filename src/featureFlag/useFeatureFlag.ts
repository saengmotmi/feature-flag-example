import { useSyncExternalStore } from "react";
import { store } from "./store";

export const useFeatureFlag = () => {
  return useSyncExternalStore(store.subscribe, store.getStore);
};
