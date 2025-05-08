interface LoadingState {
  loading: boolean[];
}

type LoadingAction = { type: "startLoading" } | { type: "endLoading" };
const initialState: LoadingState = {
  loading: [],
};

const loading = (
  state: LoadingState = initialState,
  action: LoadingAction
): LoadingState => {
  switch (action.type) {
    case "startLoading":
      return {
        loading: [...state.loading, true],
      };

    case "endLoading":
      return {
        loading: state.loading.slice(1), // or use your filter version
      };

    default:
      return state;
  }
};

export default loading;
