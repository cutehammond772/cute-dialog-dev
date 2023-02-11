import * as React from "react";
import { DialogAreaProfile } from "@lib/types/area";

const defaultStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",

  pointerEvents: "none",
};

const DialogArea = ({ children, style }: React.PropsWithChildren<DialogAreaProfile>) => {
  return <div style={style ?? defaultStyle}>{children}</div>;
};

export default DialogArea;