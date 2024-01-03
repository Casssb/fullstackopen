import { useQuery } from '@tanstack/react-query';
import { getAllUsers, iUser } from '../services/users';

const UserList = () => {
  const userQuery = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  console.log(userQuery.data)

  return (
    <div>
      {userQuery.data && userQuery.data.map((user: iUser) => (
        <p key={user.id}>
          {user.name} blogs created:{user.blogs.length}
        </p>
      ))}
    </div>
  );
};

export default UserList;
