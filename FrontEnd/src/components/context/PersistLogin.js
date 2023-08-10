import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, setAuth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    if (auth?.accessToken === undefined) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {}, [isLoading]);

  return <>{isLoading ? <p>Is loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
