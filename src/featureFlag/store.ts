import { localStorageRepository } from "./repository";
import { FeatureFlag } from "./types";

export const createFeatureFlagStore = ({
  repository,
}: {
  repository: {
    getFlags: () => Promise<FeatureFlag>;
    setFlag: (key: string, value: boolean) => Promise<FeatureFlag>;
  };
}) => {
  let store: FeatureFlag = {};
  let listeners: ((store: FeatureFlag) => void)[] = [];

  const initializeStore = async () => {
    const loadedFlags = await repository.getFlags();
    dispatch(loadedFlags);
  };

  const getStore = () => store;

  const subscribe = (listener: (store: FeatureFlag) => void) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (newStore: FeatureFlag) => {
    store = newStore;
    listeners.forEach((l) => l(store));
  };

  const updateFlag = async (key: string, value: boolean) => {
    const newStore = await repository.setFlag(key, value);
    dispatch(newStore);
  };

  initializeStore();

  return { getStore, subscribe, dispatch, updateFlag };
};

export const store = createFeatureFlagStore({
  repository: localStorageRepository,
});
