import React from "react";
import { LibraryState } from "@dev/dialogs/updates/types";

const LibraryContext = React.createContext<LibraryState | null>(null);

export default LibraryContext;
