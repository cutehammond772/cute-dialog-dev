import * as React from "react";
import { DialogAreaProfile } from "@lib/types/area";

import "@lib/components/DialogArea.style.css";

const DialogArea = ({ children, className }: React.PropsWithChildren<DialogAreaProfile>) => {
  return <div className={className ?? "dialog-area-default"}>{children}</div>;
};

export default DialogArea;
