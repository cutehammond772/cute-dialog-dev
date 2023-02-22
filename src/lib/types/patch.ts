export type PatchUID = string;

export type InitProps = { handle: HTMLDivElement };
export type RequestProps<S extends object, R extends object> = {
  store: S;
  request: R;
};
export type ResolveProps<S extends object> = { handle: HTMLDivElement; store: S };
export type CleanUpProps<S extends object> = { handle: HTMLDivElement; store: S };

export interface Patch<S extends object, R extends object> {
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
  uid: PatchUID;
  patch: Patch<S, R>;
}

export interface PatchRequest<R extends object> {
  uid: PatchUID;
  request: R;
}

export type PatchRequestCallbackFn = (patches: Array<PatchRequest<any>>) => void;

export type PatchRegistrationCallbackFn = (patches: Array<PatchNode<any, any>>) => void;

export type PatcherRegisterFn = <S extends object, R extends object>(
  patch: Patch<S, R>
) => PatchUID;
export type PatcherRequestFn = <R extends object>(uid: PatchUID, request: R) => void;

export type Patcher = {
  register: PatcherRegisterFn;
  request: PatcherRequestFn;
};
