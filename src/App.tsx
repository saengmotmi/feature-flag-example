import { useLayoutEffect } from "react";
import "./App.css";
import { useFeatureFlag } from "./featureFlag/useFeatureFlag";

function App() {
  useLocalStorageInitialize();

  const featureFlags = useFeatureFlag();

  return <pre>{JSON.stringify(featureFlags, null, 2)}</pre>;
}

export default App;

const useLocalStorageInitialize = () => {
  const featureFlags = useFeatureFlag();
  useLayoutEffect(() => {
    if (!Object.keys(featureFlags).length) {
      localStorage.setItem(
        "featureFlags",
        JSON.stringify({
          newUIFeature: {
            value: true,
            label: "새 UI 기능",
            description: "새로운 UI를 활성화합니다.",
          },
          rolloutPercentage: {
            value: "30%",
            label: "롤아웃 비율",
            description: "기능이 활성화될 사용자의 비율입니다.",
          },
        })
      );
    }
  });
};
