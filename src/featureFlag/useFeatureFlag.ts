import { useSyncExternalStore } from "react";
import { store } from "./store";
import { FeatureFlag } from "./types";

export const useFeatureFlag = () => {
  const featureFlags = useSyncExternalStore(store.subscribe, store.getStore);

  const update = (key: string, newValue: FeatureFlag[string]["value"]) => {
    store.dispatch({
      ...featureFlags,
      [key]: {
        ...featureFlags[key],
        value: newValue,
      },
    }); // store의 상태를 업데이트하는 로직을 호출
  };

  return { featureFlags, update };
};
