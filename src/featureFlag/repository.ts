import { FeatureFlag } from "./types";

const FEATURE_FLAG_STORAGE_KEY = "featureFlags";

const localStorageFetcher = async () => {
  const featureFlags = localStorage.getItem(FEATURE_FLAG_STORAGE_KEY);
  return featureFlags ? (JSON.parse(featureFlags) as FeatureFlag) : {};
};

const localStorageSetter = async (key: string, value: boolean) => {
  const prevFlags = await localStorageFetcher();
  const nextFlags = {
    ...prevFlags,
    [key]: {
      ...prevFlags[key],
      value,
    },
  };
  localStorage.setItem(FEATURE_FLAG_STORAGE_KEY, JSON.stringify(nextFlags));

  return nextFlags;
};

export const localStorageRepository = {
  getFlags: localStorageFetcher,
  setFlag: localStorageSetter,
};
