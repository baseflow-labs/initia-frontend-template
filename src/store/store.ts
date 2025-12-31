import { combineReducers, createStore } from "redux";

import auth from "./reducers/auth";
import loading from "./reducers/loading";
import notifications from "./reducers/notifications";
import settings from "./reducers/settings";

const rootReducer = combineReducers({
  notifications,
  settings,
  loading,
  auth,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => unknown;
  }
}

const enhancer =
  typeof window !== "undefined" ? window.__REDUX_DEVTOOLS_EXTENSION__?.() : undefined;

const store = createStore(rootReducer, enhancer as unknown as never);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
