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
    <div>
      <h2>{user.name}</h2>
      {user.blogs.length ? <h3>Added blogs</h3> : <h3>No added blogs</h3>}
      {user.blogs && (
        <ol>
          {user.blogs.map((blog: iBlog) => (
            <li key={blog.id}>
              {blog.title} by {blog.author}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default User;
