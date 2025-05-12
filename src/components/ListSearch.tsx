import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Input } from "antd";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { LIST_SEARCH_KEYWORDS } from "../const";
const { Search } = Input;

const ListSearch: FC = () => {
    const nav = useNavigate();
    const {pathname} = useLocation();

  const [value, setValue] = useState("");
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSearch(value: string) {
    nav({
        pathname: pathname,
        search:`${LIST_SEARCH_KEYWORDS}=${value}`
    })
  }

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_KEYWORDS) || ''
    setValue(curVal);
  },[searchParams])
  
  return (
    <>
      <Search
        placeholder="请输入内容"
        style={{ width: 200 }}
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
        enterButton
        allowClear
      />
    </>
  );
};

export default ListSearch;
