import {
  Dispatch,
  ReactElement,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from 'react';

interface notificationState {
  type: string;
  message: string;
}

export type notificationAction = {
  type: string;
  payload: string;
};

interface NotificationContextValue {
  notification: notificationState | null;
  dispatch: Dispatch<notificationAction>;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

const notificationReducer: Reducer<
  notificationState | null,
  notificationAction
> = (state, action) => {
  switch (action.type) {
    case 'SET_SUCCESS':
      return { type: 'success', message: action.payload };
    case 'SET_ERROR':
      return { type: 'error', message: action.payload };
    case 'RESET':
      return null;
    default:
      return state;
  }
};

export const NotificationContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const valueAndDispatch = useContext(NotificationContext);
  return valueAndDispatch?.notification;
};

export const useNotificationDispatch = () => {
  const valueAndDispatch = useContext(NotificationContext);
  return valueAndDispatch!.dispatch;
};

export type RESET_NOTIFICATION = {type: 'RESET'}
