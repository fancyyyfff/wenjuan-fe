import React, { FC, useEffect, useState } from "react";
import { Pagination } from "antd";
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_DEFAULT,
  LIST_PAGE_SIZE_PARAM_KEY,
} from "../const";
import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

interface PropsType {
  total: number;
}
const ListPagination: FC<PropsType> = (props: PropsType) => {
  const { total } = props;
  const [searchParams] = useSearchParams();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE_DEFAULT);

  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
    setCurrent(page);
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
      LIST_PAGE_SIZE_DEFAULT;
    setPageSize(pageSize);
  }, [searchParams]);

  const nav = useNavigate();
  const { pathname } = useLocation();
  function handleChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  }

  return (
    <>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={handleChange}
      />
    </>
  );
};

export default ListPagination;
