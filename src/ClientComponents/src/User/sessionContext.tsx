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
  const res = await fetch("/v1/user/auth/session", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      withCredentials: "true",
    },
  });
  if (res.ok) {
    return true;
  }
  return false;
};

export const useSession = () => useContext(SessionContext);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, _setSession] = useState(false);

  useEffect(() => {
    fetchSession().then((session) => _setSession(session));
  }, []);

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
