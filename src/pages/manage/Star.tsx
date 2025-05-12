import React, { FC } from "react";
import { useTitle } from "ahooks";
import styles from "./common.module.scss";
import QuetionCard from "../../components/QuetionCard";
import ListSearch from "../../components/ListSearch";
import { Typography, Empty, Spin, Pagination } from "antd";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPagination from "../../components/ListPagination";

const { Title } = Typography;

const Star: FC = () => {
  useTitle("不想答问卷 - 星标问卷");
  const {
    loading,
    data = {},
    error,
  } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
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
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuetionCard key={_id} {...q}></QuetionCard>;
          })}
      </div>
      <div className={styles.footer}>
        <ListPagination total={total}/>
      </div>
    </>
  );
};

export default Star;
