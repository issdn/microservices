import { useEffect, useState, createContext, useContext, useMemo } from "react";
import Spinner from "../StandardComponents/Spinner";
import { useFetch } from "../StandardComponents/fetch";
import { useToast } from "../StandardComponents/Toast/hooks";

type SessionContextType = {
  session: boolean;
  username: string;
  id: number;
  login: () => void;
  logout: () => void;
  verifySession: () => void;
  canRender: boolean;
};

const SessionContext = createContext<SessionContextType>({
  session: false,
  username: "",
  id: -1,
  login: () => {},
  logout: () => {},
  verifySession: () => {},
  canRender: false,
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

  const { addToast } = useToast();

  const responseHandlers = {
    200: (response: { id: number; username: string }) => {
      _setSession(true);
      _setUsername(response.username);
      _setId(response.id);
    },
    403: () => {},
    default: () => {
      addToast({ title: "Couldn't verify your session.", type: "error" });
    },
  };

  const { get, canRender } = useFetch();

  const verifySession = async () => {
    await get("/user/v1/auth/session", responseHandlers);
  };

  const login = () => {
    _setSession(true);
  };

  const logout = () => {
    _setSession(false);
    _setUsername("");
    _setId(-1);
  };

  useEffect(() => {
    verifySession();
  }, []);

  const values = useMemo(
    () => ({ id, username, session, login, logout, verifySession, canRender }),
    [session, canRender]
  );

  return (
    <SessionContext.Provider value={values}>{children}</SessionContext.Provider>
  );
};

export const SecureComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { session, canRender } = useSession();
  return !canRender ? (
    <Spinner />
  ) : session ? (
    <>{children}</>
  ) : (
    <p>You have to log in.</p>
  );
};
