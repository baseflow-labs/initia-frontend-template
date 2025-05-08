import { combineReducers, createStore } from "redux";
import notifications from "./reducers/notifications";
import loading from "./reducers/loading";
import auth from "./reducers/auth";

const rootReducer = combineReducers({
  notifications,
  loading,
  auth,
});

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__?.()
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
