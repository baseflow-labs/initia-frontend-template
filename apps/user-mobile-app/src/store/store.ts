import { combineReducers, createStore } from "redux";
import {
  authReducer,
  createAuthInitialState,
  loadingReducer,
  notificationsReducer,
  settingsReducer,
  createSettingsInitialState,
} from "@initia/state";

const rootReducer = combineReducers({
  notifications: notificationsReducer,
  settings: settingsReducer,
  loading: loadingReducer,
  auth: authReducer,
});

const preloadedState = {
  auth: createAuthInitialState(),
  settings: createSettingsInitialState(),
};

const store = createStore(rootReducer, preloadedState as never);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
