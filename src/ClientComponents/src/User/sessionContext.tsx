import {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";

type SessionContextType = {
  session: boolean;
  username: string;
  id: number;
  login: () => void;
  logout: () => void;
  verifySession: () => void;
};

const SessionContext = createContext<SessionContextType>({
  session: false,
  username: "",
  id: -1,
  login: () => {},
  logout: () => {},
  verifySession: () => {},
});

const fetchSession = async (): Promise<{
  id: number;
  username: string;
  session: boolean;
}> => {
  const res = await fetch("/user/v1/auth/session", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      withCredentials: "true",
    },
  });
  if (res.ok) {
    const data = await res.json();
    return { id: data.id, username: data.username, session: true };
  }
  return { id: -1, username: "", session: false };
};

export const useSession = () => useContext(SessionContext);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, _setSession] = useState(false);
  const [username, _setUsername] = useState("");
  const [id, _setId] = useState(-1);

  const verifySession = useCallback(() => {
    fetchSession().then(({ id, username, session }) => {
      _setSession(session);
      _setUsername(username);
      _setId(id);
    });
  }, []);

  const login = () => {
    _setSession(true);
  };

  const logout = () => {
    _setSession(false);
  };

  return (
    <SessionContext.Provider
      value={{ id, username, session, login, logout, verifySession }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const SecureComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { session, verifySession } = useSession();
  useEffect(() => {
    verifySession();
  });
  return session ? <>{children}</> : null;
};
