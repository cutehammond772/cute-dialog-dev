export type PatchSignature = string;

export type PatchEventProps = {
  // Event를 발생시킵니다.
  // Note: onCleanUp()에서 Unmount 시 Event는 receive되지 않습니다.
  emit: (event: string) => void;

  // Event Handler 콜백 함수를 저장 후 반환하거나, name을 통해 다시 불러옵니다.
  // Note: 내부 함수에서 사용되는 변수, 상수는 파라미터를 통해 가져오거나 내부에서 초기화되어야 합니다.
  // Note: 이 함수는 Patch 내의 서로 다른 함수 간에 같은 함수 객체 레퍼런스를 공유하기 위해 사용됩니다.
  // Note: name은 각 Patch에 독립적입니다.
  callback: <T>(name: string, callbackFn?: T) => T;
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

  // Patch 초기화 시 Patch Context에서 사용하는 Store를 초기화합니다.
  onInit: (props: InitProps) => S;
  // Patch 요청을 받아 Store 데이터를 수정합니다. 이후 Re-render가 예약됩니다.
  onRequest: (props: RequestProps<S, R>) => S;
  // Store 데이터를 토대로(또는 독립적으로) Handle에 Patch를 적용합니다. (관리 또는 수정을 수행합니다.)
  onResolve: (props: ResolveProps<S>) => void;
  // Unmount, Re-render 전에 기존 데이터를 초기값으로 되돌립니다. (데이터를 정리합니다.)
  onCleanUp: (props: CleanUpProps<S>) => void;
}

export interface PatchNode<S extends object, R extends object> {
  signature: PatchSignature;
  patch: Patch<S, R>;
}

export interface PatchRequest<R extends object> {
  signature: PatchSignature;
  request: R;
}

export type PatchRequestCallbackFn = (patches: Array<PatchRequest<any>>) => void;
export type PatchRegistrationCallbackFn = (patches: Array<PatchNode<any, any>>) => void;

export type PatcherRegisterFn = <S extends object, R extends object>(patch: Patch<S, R>) => void;
export type PatcherRequestFn = <R extends object>(signature: PatchSignature, request: R) => void;
export type PatcherReveiveFn = (event: string, callbackFn: () => void) => void;

export type Patcher = {
  register: PatcherRegisterFn;
  request: PatcherRequestFn;
  receive: PatcherReveiveFn;
};
