export type PatchSignature = string;
export type PatchEventSignature = string;

export interface PatchEvent<T> {
  eventName: PatchEventSignature;
  payload: T;
}

export type PatchEventProps = {
  // Event를 발생시킵니다.
  // Note: onCleanUp()에서 Unmount 시 Event는 receive되지 않습니다.
  publish: <T>(event: PatchEvent<T>) => void;
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
  events?: HandleEventMappings;

  // Patch 초기화 시 Patch Context에서 사용하는 Store를 초기화합니다.
  onInit: (props: InitProps) => S;
  // Patch 요청을 받아 Store 데이터를 수정합니다. 이후 Re-render가 예약됩니다.
  onRequest: (props: RequestProps<S, R>) => S;
  // Store 데이터를 토대로(또는 독립적으로) Handle에 Patch를 적용합니다. (관리 또는 수정을 수행합니다.)
  onResolve: (props: ResolveProps<S>) => void;
  // Unmount, Re-render 전에 기존 데이터를 초기값으로 되돌립니다. (데이터를 정리합니다.)
  onCleanUp: (props: CleanUpProps<S>) => void;
}

export interface HandleEventMappings {
  [handleEvent: string]: PatchEventSignature;
}

export type HandleEventHandler<T extends Event | undefined = undefined> = T extends Event
  ? (callback: PatchEventCallback<T>) => void
  : (callback: () => void) => void;

export interface PatchRequest<R extends object> {
  signature: PatchSignature;
  request: R;
}

export type PatchEventCallback<T> = (data: { payload: T }) => void;
export type PatchRequestCallback = (patches: Array<PatchRequest<any>>) => void;
export type PatchRegisterCallback = (patches: Array<Patch<any, any>>) => void;

export type Patcher = {
  /**
   * Patch 등록을 예약합니다. 다음 렌더링 타이밍에 Patch가 등록됩니다.
   */
  reserve: <S extends object, R extends object>(patch: Patch<S, R>) => void;
  /**
   * 특정 Patch에 요청을 보냅니다.
   */
  request: <R extends object>(signature: PatchSignature, request: R) => void;
  /**
   * Event를 받습니다.
   */
  subscribe: <T>(event: PatchEventSignature, callbackFn: PatchEventCallback<T>) => void;
};
