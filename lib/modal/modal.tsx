import React, { useCallback, useRef } from "react";
import { useDialog } from "@cute-dialog/core";
import { useAnimation, useFirst, useStyle } from "@cute-dialog/effect";

import Context from "@modal/context";
import {
  CreateModalFunction,
  DEFAULT_MODAL_PRESETS,
  ModalFadeAnimation,
  ModalFadeAnimationCount,
} from "@modal/types";
import {
  CLASS_BACKDROP_CLOSE,
  CLASS_BACKDROP_OPEN,
  CLASS_MODAL_CLOSE,
  CLASS_MODAL_OPEN,
  FADE_ALL,
  FADE_BACKDROP_ONLY,
  FADE_NONE,
} from "@modal/style";

/**
 * Modal 형태의 Dialog를 정의합니다.
 *
 * - Modal이 별도로 Animation을 정의하는 경우 **AnimationEndCount**를 명시해야 합니다.
 * - AnimationEndCount는 Close 요청 이후 진행되는 **Animation**의 개수로, 기본값은 1입니다.
 */
export const createModal: CreateModalFunction = ({
  Component,
  presets = DEFAULT_MODAL_PRESETS,
}) => {
  const { fade, animationCount } = presets;
  const totalAnimations = ModalFadeAnimationCount[fade] + (animationCount ?? 0);

  // Modal 기능을 제공하는 새로운 'DialogElement'를 정의합니다.
  const ModalWrapper = () => {
    const { remove } = useDialog();

    // 사용된 Patch입니다.
    const { addStyles } = useStyle();
    const { onAnimationEnd } = useAnimation();
    const { onLoad } = useFirst();

    // Close 요청을 저장합니다.
    const checkClose = useRef<boolean>(false);
    const closeAnimationCount = useRef<number>(0);

    /**
     * Modal를 삭제합니다. Animation이 존재하는 경우 Animation이 모두 끝난 뒤에 삭제됩니다.
     */
    const close = useCallback(() => {
      if (checkClose.current) {
        throw new Error("이미 이 Modal의 Close를 요청한 상태입니다.");
      }

      if (totalAnimations === 0) {
        // Animation을 설정하지 않은 경우 바로 삭제합니다.
        remove();
        return;
      }

      if (fade !== ModalFadeAnimation.NONE) addStyles(CLASS_BACKDROP_CLOSE);
      if (fade === ModalFadeAnimation.ALL) addStyles(CLASS_MODAL_CLOSE);

      checkClose.current = true;
    }, [remove, addStyles]);

    onLoad(
      useCallback(() => {
        if (fade !== ModalFadeAnimation.NONE) addStyles(CLASS_BACKDROP_OPEN);
        if (fade === ModalFadeAnimation.ALL) addStyles(CLASS_MODAL_OPEN);
      }, [addStyles])
    );

    onAnimationEnd(
      useCallback(() => {
        if (checkClose.current) {
          if ((closeAnimationCount.current += 1) === totalAnimations) remove();
        }
      }, [remove])
    );

    return (
      <Context.Provider value={{ close }}>
        <Component />
      </Context.Provider>
    );
  };

  return [
    {
      baseComponent:
        fade === ModalFadeAnimation.ALL
          ? FADE_ALL
          : fade === ModalFadeAnimation.BACKDROP_ONLY
          ? FADE_BACKDROP_ONLY
          : FADE_NONE,
    },
    ModalWrapper,
  ];
};
