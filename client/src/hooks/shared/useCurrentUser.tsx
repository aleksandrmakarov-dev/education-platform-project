import { useContext } from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { refreshToken } from "../../services/auth.service";

export type CurrentUserPayload = {
  name?: string;
  email?: string;
  image?: string;
  roles: string[];
};

export type AuthContextPayload = {
  user?: CurrentUserPayload;
  isLoading: boolean;
  signIn: (user: CurrentUserPayload) => void;
  signOut: () => void;
};

const AuthContext = React.createContext<AuthContextPayload>({
  isLoading: false,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const timeInterval = 15 * 60 * 1000;

  const [currentUser, setCurrentUser] = useState<
    CurrentUserPayload | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signIn = (user: CurrentUserPayload) => {
    setCurrentUser(user);

    //  - After signing in set interval to refresh access token
    if (!intervalRef.current) {
      const interval = setInterval(() => authenticate(), timeInterval);
      intervalRef.current = interval;
    }
  };

  const signOut = () => {
    setCurrentUser(undefined);

    //  - Clear interval after signing out so it does not try to refresh token again
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  };

  const authenticate = useCallback(async () => {
    setIsLoading(true);

    try {
      //  - Send post request to /refresh-token
      const response = await refreshToken();

      //  - Add user data to context
      signIn({
        name: response.name,
        email: response.email,
        image: response.image,
        roles: response.roles,
      });

      setIsLoading(false);

      return true;
    } catch (error: any) {
      // -  If error then clear user in context if there was any data
      signOut();

      setIsLoading(false);
      console.log(error);

      return false;
    }
  }, []);

  //  - Store interval here;
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const func = async () => {
      await authenticate();
    };

    func();

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: currentUser, isLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useCurrentUser() {
  return useContext(AuthContext);
}
