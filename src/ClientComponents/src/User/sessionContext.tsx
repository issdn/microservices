import { useEffect, useState, createContext, useContext } from "react";

type SessionContextType = {
  session: boolean;
  login: () => void;
  logout: () => void;
};

const SessionContext = createContext<SessionContextType>({
  session: false,
  login: () => {},
  logout: () => {},
});

const fetchSession = async () => {
  const res = await fetch("user/auth/session", {
    method: "GET",
    credentials: "include",
  });

  return res.status === 200;
};

export const useSession = () => useContext(SessionContext);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, _setSession] = useState(false);

  // useEffect(() => {
  //   fetchSession().then((session) => _setSession(session));
  // }, []);

  const login = () => {
    _setSession(true);
  };

  const logout = () => {
    _setSession(false);
  };

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const SecureRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { session } = useSession();

  return session ? <>{children}</> : null;
};
