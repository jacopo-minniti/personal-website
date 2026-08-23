"use client";

import { createContext, useContext } from "react";

export interface WindowControls {
  onClose: () => void;
  onToggleExpand: () => void;
  expanded: boolean;
}

const WindowControlsContext = createContext<WindowControls | null>(null);

export const WindowControlsProvider = WindowControlsContext.Provider;

export function useWindowControls() {
  return useContext(WindowControlsContext);
}
