import { FeatureFlag } from "./types";

export const FEATURE_FLAG_STORAGE_KEY = "featureFlags";

export const localStorageFetcher = async () => {
  const featureFlags = localStorage.getItem(FEATURE_FLAG_STORAGE_KEY);
  return featureFlags ? (JSON.parse(featureFlags) as FeatureFlag) : {};
};
