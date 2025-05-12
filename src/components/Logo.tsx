import React, { FC, useEffect, useState } from "react";
import { Space } from "antd";
import { Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styles from "./Logo.module.scss";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { MANAGE_INDEX_PATHNAME } from "../router";
import { Link } from "react-router-dom";

const { Title } = Typography;
const Logo: FC = () => {
  const [pathname, setPathname] = useState('/');
  const { username } = useGetUserInfo();
  useEffect(() => {
    if(username) {
      setPathname(MANAGE_INDEX_PATHNAME);
    }
  },[username])

  return (
    <div  className={styles.container}>
      <Link to={pathname}>
      <Space>
        <Title>
          <FormOutlined />
        </Title>
        <Title>
            不想答问卷
        </Title>
      </Space></Link>
    </div>
  );
};

export default Logo;
