import React, { FC } from "react";
import useLoadQuetionData from "../../../hooks/useLoadQuetionData";
import styles from "./index.module.scss";
import EditCavas from "./EditCavas";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "../../../store/componentReducer";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import EditHeader from "./EditHeader";
import useGetPageInfo from "../../../hooks/UseGetPageInfo";
import { useTitle } from "ahooks";

const Edit: FC = () => {
  const dispatch = useDispatch();
  const {loading} = useLoadQuetionData();
  const {title} = useGetPageInfo();
  
  useTitle(`问卷编辑 - ${title}`);

  function clearSelectedId() {
    dispatch(changeSelectedId(''));
  }
  return (
    <div  className={styles.container}>
      <EditHeader />
      <div className={styles['container-wrap']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['cavas-wrap']}>
              <EditCavas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
