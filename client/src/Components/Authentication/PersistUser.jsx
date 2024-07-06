import { useEffect, useState } from "react";
import { UserState } from "../../context";
import useRefresh from "../../hooks/useRefresh";
//TODO line:15
const PersistUser = ({ children }) => {
  const { session, userState, storage } = UserState();
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const refresh = useRefresh();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        setLoading(true);
        await refresh();
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    // this is being called twice in <React StrictMode>
    !userState?.user?.accessToken && !session.accessToken && storage.length > 0
      ? verifyRefreshToken()
      : setLoading(false);
    // eslint-disable-next-line
  }, []);

  return <>{children}</>;
};

export default PersistUser;
