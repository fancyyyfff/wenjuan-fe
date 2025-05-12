import React, { FC, MouseEvent } from "react";
import styles from "./EditCavas.module.scss";
import { Spin } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  changeSelectedId,
  ComponentInfoType,
} from "../../../store/componentReducer";
import { getComponentConfByType } from "../../../components";
import { useDispatch } from "react-redux";
import classnames from "classnames";
import useBindCanvasKeyPress from "../../../hooks/useBindCavasKeyPress";

type PropsType = {
  loading: boolean;
};

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;
  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCavas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();
  // 绑定快捷键
  useBindCanvasKeyPress();

  if (loading) {
    return (
      <div>
        <Spin style={{ marginTop: "50px" }} />
      </div>
    );
  }
  function handleClick(event: MouseEvent ,id: string) {
    event.stopPropagation();
    console.log('组件Id',id);
    dispatch(changeSelectedId(id));
  }

  return (
    <div className={styles.cavas}>
      {componentList
      .filter( c => !c.isHidden)
      .map((c) => {
        const { fe_id, isLocked } = c;
        const wrapDefaultClassName = styles["component-wrapper"];
        const selectedClassName = styles.selected;
        const LockedClassName = styles.locked;
        const wrapClassName = classnames({
          [wrapDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
          [LockedClassName]: isLocked,
        })
        return (
          <div
            key={fe_id}
            className={wrapClassName}
            onClick={(e) => handleClick(e, fe_id)}
          >
            <div className={styles.component}>{genComponent(c)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EditCavas;
