import { LoadingState } from "../types";

export type LoadingAction = { type: "startLoading" } | { type: "endLoading" };

export const loadingReducer = (
  state: LoadingState = { loading: [] },
  action: LoadingAction
): LoadingState => {
  switch (action.type) {
    case "startLoading":
      return { loading: [...state.loading, true] };
    case "endLoading":
      return { loading: state.loading.slice(1) };
    default:
      return state;
  }
};
