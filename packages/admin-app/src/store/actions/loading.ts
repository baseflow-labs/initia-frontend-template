export type LoadingAction = { type: "startLoading" } | { type: "endLoading" };

export const startLoading = (): LoadingAction => ({
  type: "startLoading",
});

export const endLoading = (): LoadingAction => ({
  type: "endLoading",
});
