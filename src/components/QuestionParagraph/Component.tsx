import React, { FC } from "react";
import {
  QuestionParagraphPropsType,
  QuestionParagraphDefaultProps,
} from "./interface";
import { Typography } from "antd";

const { Paragraph } = Typography;
const Component: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType
) => {
  const { text = "", isCenter = false } = {
    ...QuestionParagraphDefaultProps,
    ...props,
  };
  // 尽量不要使用 dangerouslySetInnerHTML ，不安全，因为会导致 XSS 攻击？
  const textList = text.split("\n");
  return (
    <Paragraph
      style={{ textAlign: isCenter ? "center" : "start", marginBottom: "10px" }}
    >
      {textList.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  );
};

export default Component;
