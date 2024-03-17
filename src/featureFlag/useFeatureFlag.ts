import { useSyncExternalStore } from "react";
import { store } from "./store";

export const useFeatureFlag = () => {
  const featureFlags = useSyncExternalStore(store.subscribe, store.getStore);

  return {
    featureFlags,
    updateFlag: store.updateFlag,
    getFlag: (key: string) => featureFlags[key],
  };
};
