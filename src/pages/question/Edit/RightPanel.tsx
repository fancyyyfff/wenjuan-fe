import React, { Children, FC, useEffect, useState } from "react";
import { Space, Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentProp from "./ComponentProp";
import PageSetting from "./PageSetting";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

enum TAB_KEY {
  PROPS_KEY = "props",
  SETTING_KEY = "setting",
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEY.PROPS_KEY);
  const {selectedId} = useGetComponentInfo();
  useEffect(() => {
    if (selectedId) {
      setActiveKey(TAB_KEY.PROPS_KEY);
    } else {
      setActiveKey(TAB_KEY.SETTING_KEY);
    }
  }, [selectedId])
  const tabItems = [
    {
      key: TAB_KEY.PROPS_KEY,
      label: (
        <Space>
          <FileTextOutlined />
          属性
        </Space>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEY.SETTING_KEY,
      label: (
        <Space>
          <SettingOutlined />
          页面设置
        </Space>
      ),
      children: <PageSetting />,
    },
  ];
  return <Tabs activeKey={activeKey} items={tabItems}></Tabs>;
};

export default RightPanel;
