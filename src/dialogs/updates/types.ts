export const Library = {
  CORE: "CORE",
  EFFECT: "EFFECT",
  MODAL: "MODAL",
} as const;

export type Libraries = (typeof Library)[keyof typeof Library];

export type KeyMapped = "KeyMapped";
export type KeyUnmapped = "KeyUnmapped";
export type Specifiable = KeyMapped | KeyUnmapped;

export type KeyProps<T extends Specifiable> = T extends KeyMapped ? { key: string } : object;
export type ContentKeyProps<T extends Specifiable> = T extends KeyMapped
  ? { contentKey: string }
  : object;

export type ContentProps<T extends Specifiable = KeyMapped> = {
  contents: Array<SpecificLog<T> | DefaultLog<T>>;
} & ContentKeyProps<T>;
export type TitleProps = { title: string };
export type VersionProps = { version: string };

export type DefaultLog<T extends Specifiable = KeyMapped> = T extends KeyMapped
  ? TitleProps & KeyProps<T>
  : string;
export type SpecificLog<T extends Specifiable = KeyMapped> = TitleProps &
  ContentProps<T> &
  KeyProps<T>;

export type LibraryLog<T extends Specifiable = KeyMapped> = VersionProps & ContentProps<T>;
export type LibraryLogs<T extends Specifiable = KeyMapped> = Array<LibraryLog<T>>;

export type LibraryLogMappings = {
  [library in Libraries]: LibraryLogs;
};

export interface LibraryState {
  current?: Libraries;
  setCurrent: (library?: Libraries) => void;
}

export interface LibrarySelectorProps {
  library: Libraries;
  onClick: (state: Libraries) => void;
  selected: boolean;
  text: string;
}

// Type Guard Functions
export const isKeySpecificLog = (log: SpecificLog | DefaultLog): log is SpecificLog =>
  "contents" in log;

export const isUnKeyDefaultLog = (
  log: SpecificLog<KeyUnmapped> | DefaultLog<KeyUnmapped>
): log is DefaultLog<KeyUnmapped> => typeof log === "string";
