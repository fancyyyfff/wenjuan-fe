import axios from "axios";
import React, { FC, useState } from "react";
import { getQuestionStatListService } from "../../../service/stat";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { Pagination, Spin, Table, Typography } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { STAT_PAGE_SIZE_DEFAULT } from "../../../const";

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const PageStat: FC<PropsType> = (props: PropsType) => {
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedComponentType,
  } = props;
  const { id = "" } = useParams();
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE_DEFAULT);

  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, {
        page,
        pageSize,
      });
      return res;
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list = [] } = res;
        setTotal(total);
        setList(list);
      },
    }
  );
  const { componentList } = useGetComponentInfo();
  const columns = componentList.map((c) => {
    const { fe_id, title } = c;
    return {
      dataIndex: fe_id,
      title: (
        <div
          onClick={() => {
            setSelectedComponentId(fe_id);
            setSelectedComponentType(c.type);
          }}
        >
          <span
            style={{
              cursor: "pointer",
              color: fe_id === selectedComponentId ? "#1890ff" : "inherit",
            }}
          >
            {title}
          </span>
        </div>
      ),
    };
  });

  const dataSource = list.map((i: any) => ({ key: i._id, ...i }));

  const TableElem = (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
      <Pagination
        current={page}
        pageSize={pageSize}
        total={total}
        onChange={setPage}
        onShowSizeChange={(page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        }}
      ></Pagination>
    </>
  );

  return (
    <div>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      )}
      {!loading && TableElem}
    </div>
  );
};

export default PageStat;
