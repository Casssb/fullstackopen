import { Dispatch } from 'react';
import { notificationAction } from '../NotificationContext';

const setMessageAfterDelay = (
  dispatch: Dispatch<notificationAction>,
  type: string,
  delay: number,
  message?: string,
) => {
  setTimeout(() => {
    dispatch({type, payload: message});
  }, delay);
};

export { setMessageAfterDelay };
