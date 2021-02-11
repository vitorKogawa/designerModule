import React, { useEffect, useState } from "react";
import { fireApp } from '../Screens/SignInScreen';
import {User} from '@firebase/auth-types';

export const AuthContext = React.createContext({});

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null as User | null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    fireApp.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{ currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};