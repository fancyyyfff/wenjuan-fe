import React, { ChangeEvent, FC, useState } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { Button, Input, message, Space } from "antd";
import { changeComponentHidden, changeComponentTitle, changeSelectedId, toggleComponentLock } from "../../../store/componentReducer";
import { useDispatch } from "react-redux";
import styles from "./Layers.module.scss";
import classNames from "classnames";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();
  //   记录当前正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState("");

  function handleTitleClick(fe_id: string) {
    const curComponent = componentList.find((item) => item.fe_id === fe_id);
    if (curComponent && curComponent.isHidden) {
      message.info("不能选中隐藏的组件");
      return;
    }
    if (fe_id !== selectedId) {
      // 执行选中
      dispatch(changeSelectedId(fe_id));
      setChangingTitleId("");
      return;
    }
    // 只有选中后，才可以显示Input框
    setChangingTitleId(fe_id);
  }

  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    if (!selectedId) return;
    // 修改标题
    dispatch(changeComponentTitle({fe_id: selectedId, title: newTitle}));
  }

  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({fe_id, isHidden}));
  }
  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLock({fe_id}));
  }
  return (
    <>
      {componentList.map((c) => {
        const { fe_id, title, isHidden, isLocked } = c;
        
        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });

        return (
          <div key={fe_id} className={styles.wrapper}>
            <div
              className={titleClassName}
              onClick={() => handleTitleClick(fe_id)}
            >
              {fe_id === changingTitleId && (
                <Input
                  value={title}
                  onChange={changeTitle}
                  onBlur={() => setChangingTitleId('')}
                  onPressEnter={() => setChangingTitleId('')}
                />
              )}
              {fe_id !== changingTitleId && title}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                size="small"
                shape="circle"
                className={!isHidden ? styles.btn : ''}
                icon={<EyeInvisibleOutlined />}
                type={isHidden ? 'primary' : 'text'}
                onClick={() => changeHidden(fe_id, !isHidden)}
                />
                <Button
                size="small"
                shape="circle"
                className={!isLocked ? styles.btn : ''}
                icon={<LockOutlined />}
                type={isLocked ? 'primary' : 'text'}
                onClick={() => changeLocked(fe_id)}
                />
              </Space>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Layers;
