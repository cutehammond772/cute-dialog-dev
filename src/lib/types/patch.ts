export type PatchSignature = string;

export type PatchEventProps = {
  // Event를 발생시킵니다.
  // Note: onCleanUp()에서 Unmount 시 Event는 receive되지 않습니다.
  publish: (event: string) => void;
};
export type PatchHandleProps = {
  handle: HTMLDivElement;
};

export type InitProps = PatchEventProps & PatchHandleProps;
export type RequestProps<S extends object, R extends object> = {
  store: S;
  request: R;
} & PatchEventProps;
export type ResolveProps<S extends object> = {
  store: S;
} & PatchHandleProps &
  PatchEventProps;
export type CleanUpProps<S extends object> = {
  store: S;
} & PatchHandleProps &
  PatchEventProps;

export interface Patch<S extends object, R extends object> {
  signature: PatchSignature;

  /**
   * Element Event를 Patch Event로 publish할 때 이에 대한 매핑을 설정합니다.
   */
  events?: PatchEventMappings;

  // Patch 초기화 시 Patch Context에서 사용하는 Store를 초기화합니다.
  onInit: (props: InitProps) => S;
  // Patch 요청을 받아 Store 데이터를 수정합니다. 이후 Re-render가 예약됩니다.
  onRequest: (props: RequestProps<S, R>) => S;
  // Store 데이터를 토대로(또는 독립적으로) Handle에 Patch를 적용합니다. (관리 또는 수정을 수행합니다.)
  onResolve: (props: ResolveProps<S>) => void;
  // Unmount, Re-render 전에 기존 데이터를 초기값으로 되돌립니다. (데이터를 정리합니다.)
  onCleanUp: (props: CleanUpProps<S>) => void;
}

export interface PatchEventMappings {
  [event: string]: string;
}

export interface PatchRequest<R extends object> {
  signature: PatchSignature;
  request: R;
}

export type PatchRequestCallback = (patches: Array<PatchRequest<any>>) => void;
export type PatchRegisterCallback = (patches: Array<Patch<any, any>>) => void;

export type Patcher = {
  reserve: <S extends object, R extends object>(patch: Patch<S, R>) => void;
  request: <R extends object>(signature: PatchSignature, request: R) => void;
  subscribe: (event: string, callbackFn: () => void) => void;
};
