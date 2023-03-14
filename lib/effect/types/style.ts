export const StyleRequestType = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  RESET: "RESET",
} as const;

export interface StyleRequest {
  classNames: Array<string>;
  type: (typeof StyleRequestType)[keyof typeof StyleRequestType];
}

export interface StylePatchStore {
  initialClassName: string;
  resolvedClassNames: Array<string>;
}
