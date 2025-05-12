import React, { FC, useEffect, useState, useRef, useMemo } from "react";
import QuetionCard from "../../components/QuetionCard";
import ListSearch from "../../components/ListSearch";
import style from "./common.module.scss";
import { useDebounceFn, useRequest, useTitle } from "ahooks";
import { Spin, Empty } from "antd";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import { useSearchParams } from "react-router-dom";
import { getQuetionListService } from "../../service/quetion";
import { LIST_PAGE_SIZE_DEFAULT, LIST_SEARCH_KEYWORDS } from "../../const";

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
    isStar: false,
    answerCount: 5,
    createAt: "3月10日 13:23",
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: true,
    isStar: true,
    answerCount: 9,
    createAt: "3月11日 13:23",
  },
  {
    _id: "q4",
    title: "问卷4",
    isPublished: true,
    isStar: false,
    answerCount: 3,
    createAt: "3月13日 13:23",
  },
];
const List: FC = () => {
  useTitle("不想答问卷 - 我的问卷");
  const [page, setPage] = useState(1); // 内部，不用于url参数
  const [list, setList] = useState([]); // 累计
  const [total, setTotal] = useState(0);
  const haveMore = total > list.length;
  const [start, setStart] = useState(false); //标记是否开始加载

  const [searchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const keyword = searchParams.get(LIST_SEARCH_KEYWORDS) || "";

  // keyword变化,重置信息
  useEffect(() => {
    setPage(0);
    setList([]);
    setTotal(0);
    setStart(false);
  },[keyword])

  const { loading, run: load } = useRequest(
    async () => {
      const opt = {
        keyword, // 路径参数，但没有page、pageSize，
        page,
        pageSize: LIST_PAGE_SIZE_DEFAULT,
      };
      const data = await getQuetionListService(opt);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result;
        setList(list.concat(l));
        setTotal(total);
        setPage(page + 1);
      },
    }
  );

  // 防抖
  const { run: tryLoad } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem == null) {
        return;
      }
      const domRect = elem.getBoundingClientRect();
      if (domRect == null) {
        return;
      }
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        // console.log("执行加载");
        load();
        setStart(true)
      }
    },
    {
      wait: 1000,
    }
  );
  // 1. 组件一加载或者路由参数变化时，触发加载
  useEffect(() => {
    tryLoad();
  }, [searchParams]);
  // 2. 滑动事件，触发加载
  useEffect(() => {
    if (haveMore) {
      window.addEventListener("scroll", tryLoad);
    }
    return () => {
      window.removeEventListener("scroll", tryLoad); //组件销毁必须要移除监听
    };
  }, [searchParams, haveMore]);

  const loadMoreContentElem = useMemo(() => {
    if (!start || loading) return <Spin />;
    if (total === 0) return <Empty description="还没有数据哎~" />;
    if (!haveMore) return <span>人家是有底线的！</span>;
    return <span>开始加载下一页</span>;
  },[start, loading, haveMore]);

  return (
    <>
      <div className={style.header}>
        <div className={style.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={style.right}>
          <ListSearch />
        </div>
      </div>
      <div className={style.content}>
        {list.map((q: any) => {
          const { _id } = q;
          return <QuetionCard key={_id} {...q}></QuetionCard>;
        })}
      </div>
      <div className={style.footer}>
        <div ref={containerRef}>{loadMoreContentElem}</div>
      </div>
    </>
  );
};

export default List;
