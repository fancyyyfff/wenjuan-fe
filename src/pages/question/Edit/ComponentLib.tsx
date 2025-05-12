import React, { FC } from "react";
import { componentConfGrop, ComponentConfType } from "../../../components";
import { Typography } from "antd";
import styles from "./ComponentLib.module.scss";
import { useDispatch } from "react-redux";
import { addComponent } from "../../../store/componentReducer";
import { nanoid } from "@reduxjs/toolkit";
const { Title } = Typography;

const ComponentLib: FC = () => {
  const dispatch = useDispatch();

  function genComponent(c: ComponentConfType) {
    const { title, type, Component, defaultProps } = c;
    function handleClick() {
      dispatch(addComponent({
          fe_id: nanoid(), 
          title,
          type, 
          props: defaultProps,
      }))
    }
    return (
      <div key={type} className={styles.wrapper} onClick={handleClick}>
        <div className={styles.component}>
          <Component />
        </div>
      </div>
    );
  }
  return (
    <>
      {componentConfGrop.map((group, index) => {
        const { groupId, groupName, components } = group;
        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{
                fontSize: "16px",
                marginTop: index > 0 ? "20px" : "0px",
              }}
            >
              {groupName}
            </Title>
            <div>{components.map((c) => genComponent(c))}</div>
          </div>
        );
      })}
    </>
  );
};

export default ComponentLib;
