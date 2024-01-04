import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSingleUser, iUser } from '../services/users';
import { iBlog } from '../services/blogs';

const User = () => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['singleUser', id],
    queryFn: () => getSingleUser(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const user: iUser = data;

  if (isLoading) {
    return <p>...loading</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2 mb-4">
        <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
          {user.name}
        </h2>
        {user.blogs.length ? <h3>Added blogs</h3> : <h3>No added blogs</h3>}
      </div>
      {user.blogs && (
        <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {user.blogs.map((blog: iBlog) => (
            <li
              key={blog.id}
              className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600"
            >
              {blog.title} by {blog.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default User;
