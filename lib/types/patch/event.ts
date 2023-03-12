import { PatchEventSignature } from "@/patch/common";

export interface PatchEvent<T> {
  eventName: PatchEventSignature;
  payload: T;
}

export interface HandleEventMappings {
  [handleEvent: string]: PatchEventSignature;
}

export type PatchEventCallback<T> = (data: { payload: T }) => void;

export type HandleEventHandler<T extends Event | undefined = undefined> = T extends Event
  ? (callback: PatchEventCallback<T>) => void
  : (callback: () => void) => void;
