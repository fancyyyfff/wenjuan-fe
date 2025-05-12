import React, { FC, useState } from "react";
import style from "./QuetionCard.module.scss";
import { Space, Button, Tag, Popconfirm, message, Modal } from "antd";
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { Divider } from "antd";
import { useRequest } from "ahooks";
import {
  duplicateQuetionListService,
  updateQuetionService,
} from "../service/quetion";

const { confirm } = Modal;

type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createAt: string;
};

const QuetionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate();
  const { _id, isPublished, answerCount, createAt, isStar, title } = props;
  const [isStarState, setIsStarState] = useState(isStar);
  const [isDeletedState, setIsDeletedState] = useState(false);

  const {
    loading: changeLoading,
    data,
    error,
    run: changeStart,
  } = useRequest(
    async () => {
      await updateQuetionService(_id, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState);
        message.success("修改成功");
      },
    }
  );

  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuetionService(_id, { idDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        setIsDeletedState(true);
      },
    }
  );

  function del() {
    confirm({
      title: "确定删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      cancelText: "按错了",
      okText: "删了",
      onOk: deleteQuestion,
    });
  }

  const { loading, run: duplicate } = useRequest(
    async () => await duplicateQuetionListService(_id),
    {
      manual: true,
      onSuccess(result) {
        message.success("复制成功");
        nav(`question/edit/${result.id}`); // 跳转回问卷编辑页
      },
    }
  );

  if (isDeletedState) return null;

  return (
    <div className={style.container}>
      <div className={style.title}>
        <div className={style.left}>
          <Link
            to={
              isPublished ? `/question/state/${_id}` : `/question/edit/${_id}`
            }
          >
            <Space>
              {isStarState && <StarOutlined style={{ color: "red" }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={style.right}>
          <Space>
            {isPublished ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷: {answerCount}</span>
            <span>{createAt}</span>
          </Space>
        </div>
      </div>
      <Divider />
      <div className={style["button-container"]}>
        <div className={style.left}>
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => {
                nav(`/question/edit/${_id}`);
              }}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              icon={<LineChartOutlined />}
              size="small"
              onClick={() => {
                nav(`/question/state/${_id}`);
              }}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={style.right}>
          <Space>
            <Button
              type="text"
              icon={<StarOutlined />}
              size="small"
              onClick={changeStart}
              disabled={changeLoading}
            >
              {isStarState ? "取消星标" : "标星"}
            </Button>
            <Popconfirm
              title="确定复制该问卷吗？"
              okText="对！"
              cancelText="不了"
              onConfirm={duplicate}
            >
              <Button type="text" icon={<CopyOutlined />} size="small">
                复制
              </Button>
            </Popconfirm>

            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              onClick={del}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default QuetionCard;
