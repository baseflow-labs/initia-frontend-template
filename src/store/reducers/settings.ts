export interface NotificationsState {
  fontSize: number;
}

export type NotificationsAction = { type: "setFontSize"; size: number };

const initialState: NotificationsState = {
  fontSize: parseInt(localStorage.getItem("fontSize") || "") || 15,
};

const notifications = (
  state: NotificationsState = initialState,
  action: NotificationsAction
): NotificationsState => {
  switch (action.type) {
    case "setFontSize":
      localStorage.setItem("fontSize", String(action.size));
      return {
        fontSize: action.size,
      };

    default:
      return state;
  }
};

export default notifications;
