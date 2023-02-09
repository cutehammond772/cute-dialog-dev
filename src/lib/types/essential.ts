export type DialogID = string;

export type DialogIDRef = { id: DialogID };

export type DialogProfile = {
  element?: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
  css?: React.CSSProperties;
  className?: string;
};

export type Dialog = ({ id }: { id: DialogID }) => JSX.Element;

export type DialogTemplate = [DialogProfile, Dialog];