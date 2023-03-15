import { DialogComponent, DialogTemplate } from "@cute-dialog/core";

/**
 * Modal의 Fade Animation 적용 범위를 나타냅니다.
 */
export const ModalFadeAnimation = {
  NONE: "NONE",
  BACKDROP_ONLY: "BACKDROP_ONLY",
  ALL: "ALL",
} as const;

export const ModalFadeAnimationCount = {
  [ModalFadeAnimation.NONE]: 0,
  [ModalFadeAnimation.BACKDROP_ONLY]: 1,
  [ModalFadeAnimation.ALL]: 2,
} as const;

export interface ModalPresets {
  // Fade Animation 적용 범위를 설정합니다.
  fade: (typeof ModalFadeAnimation)[keyof typeof ModalFadeAnimation];
  // fade 옵션을 제외한 Modal의 Animation이 별도로 존재하는 경우, 여기에 Animation의 개수를 명시합니다.
  animationCount?: number;
}

export const DEFAULT_MODAL_PRESETS: ModalPresets = {
  fade: ModalFadeAnimation.ALL,
  animationCount: 0,
};

export interface ModalTemplate {
  presets?: ModalPresets;
  Component: DialogComponent;
}

export type CreateModalFunction = (template: ModalTemplate) => DialogTemplate;
