import { useEffect, useState } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { useDispatch } from "react-redux";
import { useRequest } from "ahooks";
import { getUserInfoService } from "../service/user";
import { loginReducer } from "../store/userReducer";

function useLoadUserInfoData() {
  const dispatch = useDispatch();
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitngLoad(false);
    },
  });
  const [waitingLoad, setWaitngLoad] = useState(true);
  const { username } = useGetUserInfo();
  useEffect(() => {
    if (username) {
      setWaitngLoad(false); // 如果已经有用户信息，不用加载
      return;
    }
    run();
  }, [username]);
  return { waitingLoad };
}

export default useLoadUserInfoData;
