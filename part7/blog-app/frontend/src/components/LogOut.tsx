import { useUserDispatch } from '../UserContext';

const LogOut = () => {
  const dispatch = useUserDispatch();
  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch({ type: 'REMOVE_USER', payload: null });
  };
  return (
    <div>
      <button
        onClick={() => handleLogOut()}
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Log out
      </button>
    </div>
  );
};

export default LogOut;
