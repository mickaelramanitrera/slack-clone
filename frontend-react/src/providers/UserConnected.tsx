/* eslint-disable prefer-const */
import React from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import type { IUser } from '../types/user';

(window as any).listeners = {};
(window as any).Faye.logger = (window as any).console;
(window as any).fayeClient = new (window as any).Faye.Client(process.env.REACT_APP_REALTIME_SERVER || '');

export interface UserConnectedContextValue {
  setUser: (user: IUser) => void;
  clearUser: () => void;
  user?: IUser;
  listenTo?: any;
  clearListeners?: any;
}

export const UserConnectedContext = React.createContext<UserConnectedContextValue>({
  setUser: () => {},
  clearUser: () => {},
  user: undefined,
  listenTo: undefined,
  clearListeners: undefined,
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
        listenTo: async (channel: string, action: any) => {
          (window as any).listeners[channel] = (window as any).fayeClient.subscribe(channel, action);
        },
        clearListeners: (name: string) => {
          // (window as any).listeners.forEach((l: any) => {
          //   // l.unsubscribe();
          //   // console.log('WILL claer=====', l.cancel());
          //   // if (typeof l.cancel === 'function') {
          //   //   console.log('Willclear========', l.cancel());
          //   // }
          // });
          if ((window as any).listeners[name] && typeof (window as any).listeners[name].cancel === 'function') {
            console.log('WIll cancel');
            (window as any).listeners[name].cancel();
          }
        },
      }}
    >
      {children}
    </UserConnectedContext.Provider>
  );
};

export default UserConnectedProvider;
