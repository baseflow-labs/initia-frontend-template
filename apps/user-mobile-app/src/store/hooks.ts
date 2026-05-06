import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootState } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const usePermission = (table: string, action: string): boolean => {
  const { user, permissions } = useAppSelector((state) => state.auth);
  if (user?.role === "admin") return true;
  return permissions.some((p) => p.table === table && p.action === action);
};
