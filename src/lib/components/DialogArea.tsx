import { DialogAreaProfile } from "@lib/types/area";
import * as React from "react";

const defaultAreaProfile: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",

  pointerEvents: "none",
};

const DialogArea = ({ children, areaProfile }: React.PropsWithChildren<DialogAreaProfile>) => {
  return <div style={areaProfile ?? defaultAreaProfile}>{children}</div>;
};

export default DialogArea;