export const actions = {
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  REMOVE_NOTIFICATION: "REMOVE_NOTIFICATION",
};

export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

export type TNotification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
};

export type TNotificationState = {
  notifications: TNotification[];
};

const initialState: TNotificationState = {
  notifications: [],
};

const notificationActions = (
  state = initialState,
  { type, response }: { type: string; response: TNotification }
) => {
  switch (type) {
    case actions.ADD_NOTIFICATION: {
      return { ...state, notifications: [...state.notifications, response] };
    }

    case actions.REMOVE_NOTIFICATION: {
      return {
        ...state,
        notifications: [
          ...state.notifications.filter((n) => n.id === response.id),
        ],
      };
    }

    // END:SINGLE
    default: {
      return state;
    }
  }
};

export default notificationActions;
