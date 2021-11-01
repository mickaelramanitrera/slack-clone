import React from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import type { IUser } from '../types/user';

export interface UserConnectedContextValue {
  setUser: (user: IUser) => void;
  clearUser: () => void;
  user?: IUser;
}

export const UserConnectedContext = React.createContext<UserConnectedContextValue>({
  setUser: () => {},
  clearUser: () => {},
  user: undefined,
});

export const UserConnectedProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<IUser>();

  React.useEffect(() => {
    const userConnected = reactLocalStorage.getObject('user');
    console.log('In use effect', userConnected);
    if (userConnected !== undefined && (userConnected as IUser)?.username) {
      setUser(userConnected as IUser);
    }
  }, []);

  return (
    <UserConnectedContext.Provider
      value={{
        setUser: (user: IUser) => {
          setUser(user);
          reactLocalStorage.setObject('user', user);
        },
        clearUser: () => {
          setUser(undefined);
          reactLocalStorage.clear();
        },
        user,
      }}
    >
      {children}
    </UserConnectedContext.Provider>
  );
};

export default UserConnectedProvider;
