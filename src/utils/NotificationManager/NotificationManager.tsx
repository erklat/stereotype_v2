"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/state-management/store";
// import "./NotificationManager.css"; // Import any necessary styles
import { NotificationType } from "./notificationTypes";
import { actions as notificationActions } from "@/utils/NotificationManager/NotificationManager.reducer";

export const notify =
  ({ type, title, message, identifier }) =>
  (dispatch: AppDispatch) => {
    dispatch({
      type: notificationActions.ADD_NOTIFICATION,
      response: {
        identifier,
        type,
        title,
        message,
      },
    });

    setTimeout(() => {
      dispatch({
        type: notificationActions.REMOVE_NOTIFICATION,
        response: { id: identifier },
      });
    }, 6000);
  };

const NotificationManager: React.FC = () => {
  const notifications = useSelector((state: RootState) => {
    return state.notificationManager.notifications;
  });
  const dispatch = useDispatch<AppDispatch>();

  const removeNotification = (id: string) => {
    dispatch({
      type: notificationActions.REMOVE_NOTIFICATION,
      response: id,
    });
  };

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification ${notification.type}`}
        >
          {notification.message}
          <button onClick={() => removeNotification(notification.id)}>
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationManager;
