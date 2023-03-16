import { useEffect, useState, createContext, useContext } from "react";

type SessionContextType = {
  session: boolean;
  username: string;
  id: number;
  login: () => void;
  logout: () => void;
};

const SessionContext = createContext<SessionContextType>({
  session: false,
  username: "",
  id: -1,
  login: () => {},
  logout: () => {},
});

const fetchSession = async (): Promise<[string, boolean]> => {
  const res = await fetch("/user/v1/auth/session", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      withCredentials: "true",
    },
  });
  if (res.ok) {
    const data = await res.json();
    return [data.username, true];
  }
  return ["", false];
};

export const useSession = () => useContext(SessionContext);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, _setSession] = useState(false);
  const [username, _setUsername] = useState("");
  const [id, _setId] = useState(-1);

  useEffect(() => {
    fetchSession().then(([username, session]) => {
      _setSession(session);
      _setUsername(username);
    });
  }, []);

  const login = () => {
    _setSession(true);
  };

  const logout = () => {
    _setSession(false);
  };

  return (
    <SessionContext.Provider value={{ id, username, session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const SecureComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { session } = useSession();

  return session ? <>{children}</> : null;
};
