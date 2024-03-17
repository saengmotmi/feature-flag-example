import { localStorageFetcher } from "./fetcher";
import { FeatureFlag } from "./types";

export const createFeatureFlagStore = ({
  fetcher,
}: {
  fetcher: () => Promise<FeatureFlag>;
}) => {
  let store: FeatureFlag = {};
  let listeners: ((store: FeatureFlag) => void)[] = [];

  const initializeStore = async () => {
    const loadedFlags = await fetcher(); // TODO: 외부에서 fetcher를 주입받도록 변경
    dispatch(loadedFlags); // 로드된 flags로 store 상태 업데이트
  };

  const getStore = () => store;

  const subscribe = (listener: (store: FeatureFlag) => void) => {
    listener(store);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (newStore: FeatureFlag) => {
    store = newStore;
    listeners.forEach((l) => l(store));
  };

  initializeStore();

  return { getStore, subscribe, dispatch };
};

export const store = createFeatureFlagStore({
  fetcher: localStorageFetcher,
});
