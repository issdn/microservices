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

export const useSession = () => useContext(SessionContext);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, _setSession] = useState(false);
  const [username, _setUsername] = useState("");
  const [id, _setId] = useState(-1);

  const responseHandlers = {
    200: (response: { id: number; username: string }) => {
      _setSession(true);
      _setUsername(response.username);
      _setId(response.id);
    },
    default: () => {},
  };

  const { get, canRender } = useFetch();

  const verifySession = async () => {
    await get("/user/v1/auth/session", responseHandlers);
  };

  const login = () => {
    verifySession();
  };

  const logout = () => {
    _setSession(false);
    _setUsername("");
    _setId(-1);
  };

  useEffect(() => {
    if (!session) {
      verifySession();
    }
  }, [session]);

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
