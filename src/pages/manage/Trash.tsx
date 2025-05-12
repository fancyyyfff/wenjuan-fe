import React, { FC, useState } from "react";
import { useRequest, useTitle } from "ahooks";
import styles from "./common.module.scss";
import QuetionCard from "../../components/QuetionCard";
import ListSearch from "../../components/ListSearch";
import {
  Typography,
  Empty,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  message,
  Spin,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import {
  deleteQuetionListService,
  updateQuetionService,
} from "../../service/quetion";
const { Title } = Typography;
const { confirm } = Modal;
const rawQuetionList = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: false,
    isStar: false,
    answerCount: 4,
    createAt: "3月9日 13:23",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: "3月10日 13:23",
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: true,
    isStar: false,
    answerCount: 9,
    createAt: "3月11日 13:23",
  },
];

const columns = [
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "是否发布",
    dataIndex: "isPublished",
    render: (isPublished: boolean) => {
      return isPublished ? (
        <Tag color="processing">已发布</Tag>
      ) : (
        <Tag color="default">未发布</Tag>
      );
    },
  },
  {
    title: "答卷",
    dataIndex: "answerCount",
  },
  {
    title: "创建时间",
    dataIndex: "createAt",
  },
];

const Trash: FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useTitle("不想答问卷 - 回收站");

  const {
    loading,
    data = {},
    error,
    refresh,
  } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;

  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuetionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success("恢复成功");
        refresh();
        setSelectedIds([]);
      },
    }
  );

  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuetionListService(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        refresh();
        setSelectedIds([]);
      },
    }
  );

  function del() {
    confirm({
      title: "确定要删除吗？",
      cancelText: "点错啦",
      okText: "对！",
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    });
  }

  const TableElem = (
    <>
      <div style={{ marginBottom: "16px", textAlign: "left" }}>
        <Space>
          <Button
            type="primary"
            onClick={recover}
            disabled={selectedIds.length === 0}
          >
            恢复
          </Button>
          <Button danger onClick={del} disabled={selectedIds.length === 0}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={columns}
        pagination={false}
        rowKey={(q: any) => q._id}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            setSelectedIds(selectedRowKeys as string[]);
          },
        }}
      />
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="还没有数据哎" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Trash;
