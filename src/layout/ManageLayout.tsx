import React, { FC, useState } from "react";
import styles from "./ManageLayout.module.scss";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button, message, Space } from "antd";
import {
  PlusOutlined,
  UnorderedListOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";
import { createQuetionService } from "../service/quetion";
import { useRequest } from "ahooks";
const ManageLayout: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const {
    loading,
    data,
    run: handleCreate,
  } = useRequest(createQuetionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id}`);
      message.success("创建成功");
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p>ManageLayout left</p>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          创建问卷
        </Button>
        <Divider style={{ borderTop: "transparent" }} />
        <Space direction="vertical">
          <Button
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
            icon={<UnorderedListOutlined />}
            onClick={() => {
              nav("/manage/list");
            }}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
            icon={<StarOutlined />}
            onClick={() => {
              nav("/manage/star");
            }}
          >
            星标问卷
          </Button>

          <Button
            type={pathname.startsWith("/manage/trash") ? "default" : "text"}
            icon={<DeleteOutlined />}
            onClick={() => {
              nav("/manage/trash");
            }}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default ManageLayout;
