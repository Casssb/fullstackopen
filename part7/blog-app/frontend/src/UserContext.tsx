import {
  Dispatch,
  ReactElement,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { iUser } from './services/users';

export type userAction = {
  type: string;
  payload: iUser | null;
};

interface UserContextValue {
  user: iUser | null;
  dispatch: Dispatch<userAction>;
}

const UserContext = createContext<UserContextValue | null>(null);

const userReducer = (state: iUser | null, action: userAction) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'REMOVE_USER':
      return null;
    default:
      return state;
  }
};

export const UserContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [user, dispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const valueAndDispatch = useContext(UserContext);
  return valueAndDispatch?.user;
};

export const useUserDispatch = () => {
  const valueAndDispatch = useContext(UserContext);
  return valueAndDispatch!.dispatch;
};
