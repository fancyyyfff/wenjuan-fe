import React, { FC, useRef } from "react";
import styles from "./StateHeader.module.scss";
import { Button, Input, InputRef, message, Popover, Space, Tooltip, Typography } from "antd";
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import useGetPageInfo from "../../../hooks/UseGetPageInfo";
import {QRCodeSVG} from "qrcode.react";

const { Title } = Typography;

const StateHeader: FC = () => {
  const nav = useNavigate();
  const {title} = useGetPageInfo();
  const {id} = useParams();
  const {isPublished} = useGetPageInfo();
  const urlInputRef = useRef<InputRef>(null);

  function copy() {
    const elem = urlInputRef.current;
    if (elem == null) return;
    elem.select();   // 选中
    document.execCommand("copy");  // 拷贝
    message.success("拷贝成功");
  }

  function genLinkAndQRCodeElem() {
    if (!isPublished) return null;

    const url = `https://localhost:3000/question/${id}`;

    // 定义二维码组件
    const QRCodeElem = (
      <div>
        <QRCodeSVG value={url} />
      </div>
    )

    return <Space>
      <Input value={url} style={{width: 300}} ref={urlInputRef}/>
      <Tooltip title="拷贝链接">
         <Button icon={<CopyOutlined />} onClick={copy}></Button>
      </Tooltip>
      <Popover content={QRCodeElem}> 
        <Button icon={<QrcodeOutlined />}></Button>
      </Popover>
    </Space>
  }

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
            <Button type="primary" onClick={() => nav(`/question/edit/${id}`)} >
                编辑问卷
            </Button>
        </div>
      </div>
    </div>
  );
};

export default StateHeader;
