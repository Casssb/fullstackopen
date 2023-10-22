import { useState } from 'react';

interface TogglableProps {
  children: JSX.Element;
  action: string;
}

const Togglable = ({ children, action }: TogglableProps) => {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <div>
      {showChildren ? (
        <div>
          {children}
          <button
            onClick={() => setShowChildren(!showChildren)}
            type="button"
            className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowChildren(!showChildren)}
          type="button"
          className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {action}
        </button>
      )}
    </div>
  );
};

export default Togglable;
