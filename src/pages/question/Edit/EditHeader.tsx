import React, { ChangeEvent, FC, useState } from "react";
import styles from "./EditHearder.module.scss";
import { Button, Typography, Space, Input, message } from "antd";
import { EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../hooks/UseGetPageInfo";
import { useDispatch } from "react-redux";
import { changePageTitle } from "../../../store/PageInfoReducer";
import { useDebounceEffect, useKeyPress, useRequest } from "ahooks";
import { updateQuetionService } from "../../../service/quetion";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

const { Title } = Typography;

const TitleElem: FC = () => {
  const [editState, setEditState] = useState(false);
  const { title } = useGetPageInfo();
  const dispatch = useDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (newTitle == null) return;
    dispatch(changePageTitle(newTitle));
  }

  if (editState) {
    return (
      <Input
        value={title}
        onChange={handleChange}
        onBlur={() => setEditState(false)}
        onPressEnter={() => setEditState(false)}
      />
    );
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => setEditState(true)}
      ></Button>
    </Space>
  );
};
// 保存
const SaveButton: FC = () => {
  const { id } = useParams();
  const pageInfo = useGetPageInfo();
  const { componentList = [] } = useGetComponentInfo();

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateQuetionService(id, { ...pageInfo, componentList });
    },
    { manual: true }
  );

  useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) save();
  });
  // 自动保存，防抖
  useDebounceEffect(
    () => {
      save();
    },
    [componentList, pageInfo],
    { wait: 1000 }
  );

  return (
    <Button
      onClick={save}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
  );
};
// 发布
const PublishButton: FC = () => {
  const { id } = useParams();
  const pageInfo = useGetPageInfo();
  const { componentList = [] } = useGetComponentInfo();
  const nav = useNavigate();

  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return;
      await updateQuetionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success("发布成功");
        nav("/question/state/" + id);
      },
    }
  );

  return (
    <Button
      type="primary"
      onClick={pub}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      发布
    </Button>
  );
};
const EditHearder: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHearder;
