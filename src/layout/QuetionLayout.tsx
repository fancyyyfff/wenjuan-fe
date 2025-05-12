import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import useLoadUserInfoData from "../hooks/useLoadUserInfoData";
import { Spin } from "antd";
import useNavPage from "../hooks/useNavPage";

const QuetionLayout: FC = () => {
  const { waitingLoad } = useLoadUserInfoData();
  useNavPage(waitingLoad);
  return (
    <div>
      <div>QuetionLayout</div>
      {waitingLoad ? (
        <div>
          <Spin style={{ marginTop: "80px" }} />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default QuetionLayout;
