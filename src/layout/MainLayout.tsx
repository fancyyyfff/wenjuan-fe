import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import { Layout, Spin } from "antd";
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";
import useLoadUserInfoData from "../hooks/useLoadUserInfoData";
import useNavPage from "../hooks/useNavPage";

const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
  const {waitingLoad} = useLoadUserInfoData();
  useNavPage(waitingLoad);
  return (
    <Layout style={{overflow:'hidden'}}>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          {waitingLoad ? <div><Spin style={{marginTop: '80px'}}/></div> : <Outlet />}
        </Content>
      </Layout>

      <Footer className={styles.footer}>
        不想答问卷 2025 -finish by fancyyyfff <br></br> &copy;2023 -create by
        双越
      </Footer>
    </Layout>
  );
};

export default MainLayout;
