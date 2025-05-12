import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { Space, Button, message } from "antd";
import { getUserInfoService } from "../service/user";
import { useRequest } from "ahooks";
import { UserOutlined } from "@ant-design/icons";
import { removeToken } from "../utils/user-token";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { useDispatch } from "react-redux";
import { logoutReducer } from "../store/userReducer";

const UserInfo: FC = () => {
  // const { data } = useRequest(getUserInfoService);
  // const { username, nickname } = data || {};
  const nav = useNavigate();
  const {username, nickname} = useGetUserInfo();
  const dispatch = useDispatch();

  const UserInfo = (
    <>
      <Space style={{ color: "#e8e8e8" }}>
        <span>
          <UserOutlined />
        </span>
        <span>{nickname}</span>
      </Space>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  );
  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>;
  function logout() {
    dispatch(logoutReducer());
    removeToken();
    message.success("退出成功");
    nav(LOGIN_PATHNAME);
  }
  return (
    <>
      <div>{username ? UserInfo : Login}</div>
    </>
  );
};

export default UserInfo;
