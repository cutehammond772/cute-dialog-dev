import React from "react";

// Dialog의 고유 ID입니다. 직접적으로 사용되지 않고 레퍼런스를 찾는 데에만 사용됩니다.
export type DialogUID = string;

// 특정 Dialog를 나타내는 레퍼런스 형태의 키입니다.
export type DialogReferenceKey = { uid: DialogUID };

export type DialogStyleProfile = {
  className?: string;
};

export type DialogComponent = React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;

export type DialogProfile = {
  customElement?: DialogComponent;
  defaultStyle?: DialogStyleProfile;
};

export type DialogElement = () => JSX.Element;

export type DialogTemplate = [DialogProfile, DialogElement];

export type DialogReferenceFunction<T> = (reference: DialogReferenceKey) => T;
