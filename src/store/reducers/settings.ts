export interface NotificationsState {
  fontSize: number;
}

export type NotificationsAction = { type: "setFontSize"; size: number };

const initialState: NotificationsState = {
  fontSize: 15,
};

const notifications = (
  state: NotificationsState = initialState,
  action: NotificationsAction
): NotificationsState => {
  switch (action.type) {
    case "setFontSize":
      return {
        fontSize: action.size,
      };

    default:
      return state;
  }
};

export default notifications;
