import React from "react";
import { DialogAreaProfile } from "@/provider";

const DialogArea = ({ children, className }: React.PropsWithChildren<DialogAreaProfile>) => {
  return <div className={className}>{children}</div>;
};

export default DialogArea;
