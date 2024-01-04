import { useQuery } from '@tanstack/react-query';
import { getAllUsers, iUser } from '../services/users';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const {isLoading, isError, data, error} = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(),
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const navigate = useNavigate();

  console.log(data)

  if (isLoading) {
    return <p>...loading</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div>
      {data.map((user: iUser) => (
        <div key={user.id} className='flex gap-4'>
          <button onClick={() => navigate(`/users/${user.id}`)}>{user.name}</button>
          <p>{user.blogs.length}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
