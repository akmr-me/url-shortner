import Instance from "../axios/axiosInstance";
import { UserState } from "../context";

const useRefresh = () => {
  const { userDispatcher, setStorage } = UserState();

  const refresh = async () => {
    try {
      const res = await Instance.get("/refresh");
      userDispatcher({ type: "USER", payload: res.data });
      setStorage(res.data.data.urls);
      return res.data.accessToken;
    } catch (error) {
      void error;
    }
  };

  return refresh;
};

export default useRefresh;
