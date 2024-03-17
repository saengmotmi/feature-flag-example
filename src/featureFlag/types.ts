export interface FeatureFlag {
  [key: string]: {
    value: boolean; // 피쳐 플래그 활성화 여부
    label?: string; // 피쳐 플래그 이름
    description?: string; // 피쳐 플래그 설명
  };
}
