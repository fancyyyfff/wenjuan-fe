import React, { FC, useState } from "react";
import useLoadQuetionData from "../../../hooks/useLoadQuetionData";
import { Button, Result, Spin } from "antd";
import useGetPageInfo from "../../../hooks/UseGetPageInfo";
import { useNavigate } from "react-router-dom";
import { useTitle } from "ahooks";
import styles from "./index.module.scss";
import StateHeader from "./StateHeader";
import ComponentList from "./ComponentList";
import PageStat from "./PageStat";
import ChartStat from "./ChartStat";

const State: FC = () => {
  const { loading } = useLoadQuetionData();
  const { title, isPublished } = useGetPageInfo();
  const nav = useNavigate();

  useTitle(`问卷统计 - ${title}`);

  const [selectedComponentId, setSelectedComponentId] = useState("");
  const [selectedComponentType, setSelectedComponentType] = useState("");

  const loadingElem = (
    <div style={{ textAlign: "center", marginTop: 200 }}>
      <Spin />
    </div>
  );

  function genContentElem() {
    if (typeof isPublished === "boolean" && !isPublished) {
      return (
        <div style={{ flex: "1" }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  nav(-1);
                }}
              >
                返回
              </Button>
            }
          />
        </div>
      );
    }

    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <StateHeader />
      <div className={styles["content-wrapper"]}>
        {loading && loadingElem}
        {!loading && <div className={styles.content}>{genContentElem()}</div>}
      </div>
    </div>
  );
};

export default State;
