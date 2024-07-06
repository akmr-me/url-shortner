import { UserState } from "../context";
import { PrivateInstance } from "../axios/axiosInstance";
import { useEffect } from "react";
import useRefresh from "./useRefresh";

const useInterceptor = () => {
  const { userState } = UserState();
  const refresh = useRefresh();

  useEffect(() => {
    const requestIntercept = PrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && userState.user.accessToken) {
          config.headers[
            "Authorization"
          ] = `Bearer ${userState.user.accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseIntercept = PrivateInstance.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return PrivateInstance(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    // Clean Up so that Interceptor does't pile up
    return () => {
      PrivateInstance.interceptors.request.eject(requestIntercept);
      PrivateInstance.interceptors.response.eject(responseIntercept);
    };
    // eslint-disable-next-line
  }, [userState]);

  return PrivateInstance;
};
export default useInterceptor;
