import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootState } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Returns true if the current user's role has the given permission.
 * Admin role always returns true (the backend also bypasses checks for admins).
 *
 * @param table  The table/resource name (matches TableNames enum values on the backend)
 * @param action The action (e.g. "get_all", "create", "update", "delete", "get_one")
 */
export const usePermission = (table: string, action: string): boolean => {
  const { user, permissions } = useAppSelector((state) => state.auth);

  if (user?.role === "admin") return true;

  return permissions.some((p) => p.table === table && p.action === action);
};
