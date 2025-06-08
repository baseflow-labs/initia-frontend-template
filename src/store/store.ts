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

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__?.()
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
