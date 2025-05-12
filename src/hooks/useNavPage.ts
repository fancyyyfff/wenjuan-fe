import { useEffect } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { isLoginOrRegister, isNoNeedUserInfo, LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME } from "../router";
import { useLocation, useNavigate } from "react-router-dom";

function useNavPage(waitingUserData: boolean) {
    const {pathname} = useLocation();
    const {username} = useGetUserInfo();
    const nav = useNavigate();

    useEffect(() => {
        if(waitingUserData) return;//等待中就不管

        // 已登录：不能在login或register
        if(username) {
            if(isLoginOrRegister(pathname)) {
                nav(MANAGE_INDEX_PATHNAME);
            }
            return;
        }
        
        // 未登录：
        if(isNoNeedUserInfo(pathname)) {
            return;
        }else {
            nav(LOGIN_PATHNAME);
        }

    },[waitingUserData, username, pathname])
}

export default useNavPage;