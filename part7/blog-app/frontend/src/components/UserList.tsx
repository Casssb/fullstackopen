import { useQuery } from '@tanstack/react-query';
import { getAllUsers, iUser } from '../services/users';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(),
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const navigate = useNavigate();

  console.log(data);

  if (isLoading) {
    return <p>...loading</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Blogs
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((user: iUser) => (
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.name}
              </th>
              <td className="px-6 py-4">{user.blogs.length}</td>
              <td scope="row" className="px-6 py-3">
                <button
                  className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => navigate(`/users/${user.id}`)}
                >
                  Blogs
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
