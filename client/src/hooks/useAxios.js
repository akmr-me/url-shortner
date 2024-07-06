import { useEffect, useState } from "react";
import Instance from "../axios/axiosInstance";
import { UserState } from "../context";

const useAxios = () => {
  const { setStorage, userDispatcher, setSession } = UserState();
  const [ServerError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const Fetch = async (configObj) => {
    const { method, url, requestConfig = {} } = configObj;

    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);

      const res = await Instance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });
      userDispatcher({ type: "USER", payload: res.data });
      userDispatcher({ type: "Message", payload: res.data.message });
      if (!res.data.rememberMe) {
        setSession({
          accessToken: res.data.accessToken,
          email: res.data.email,
        });
      }
      setStorage(res.data.data.urls);
    } catch (error) {
      let serverError =
        error?.response?.data?.message ||
        error?.response?.data ||
        error.message;
      setServerError(serverError);
      userDispatcher({ type: "SERVER_ERROR", payload: serverError });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setServerError("");
      userDispatcher({ type: "SERVER_ERROR", payload: "" });
      controller && controller.abort();
    };
    // eslint-disable-next-line
  }, [controller]);

  return [loading, ServerError, Fetch];
};

export default useAxios;
