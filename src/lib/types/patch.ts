export type PatchUID = string;

export type InitProps = { handle: HTMLDivElement };
export type ResolveProps<S extends object, R extends object> = {
  handle: HTMLDivElement;
  store: S;
  request: R;
};
export type CleanProps<S extends object> = { handle: HTMLDivElement; store: S };

export interface Patch<S extends object, R extends object> {
  onInit: (props: InitProps) => S;
  onResolve: (props: ResolveProps<S, R>) => S | void;
  onClean: (props: CleanProps<S>) => void;
}

export interface PatchNode<S extends object, R extends object> {
  uid: PatchUID;
  patch: Patch<S, R>;
}

export interface PatchRequest<R extends object> {
  uid: PatchUID;
  request: R;
}

export type PatcherRegisterFn = <S extends object, R extends object>(patch: Patch<S, R>) => PatchUID;
export type PatcherRequestFn = <R extends object>(uid: PatchUID, request: R) => void;

export type Patcher = {
  register: PatcherRegisterFn;
  request: PatcherRequestFn;
};
