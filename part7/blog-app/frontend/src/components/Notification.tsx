import { useNotificationValue } from '../NotificationContext';

const Notification = () => {
  const notification = useNotificationValue();
  return (
    notification && (
      <div
        className={
          notification.type === 'success' ? 'text-green-400' : 'text-red-400'
        }
      >
        {notification.message}
      </div>
    )
  );
};

export default Notification;
