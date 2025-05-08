import { combineReducers, createStore } from "redux";
import notifications from "./reducers/notifications";
import loading from "./reducers/loading";
import auth from "./reducers/auth";

// Combine reducers with type inference
const rootReducer = combineReducers({
  notifications,
  loading,
  auth,
});

// Create store with optional Redux DevTools
const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__?.()
);

// ✅ Type for RootState (used in useSelector and middleware)
export type RootState = ReturnType<typeof rootReducer>;

export default store;
