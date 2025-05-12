import React, { FC } from "react";
import { QuestionTitlePropsType, QuestionDefaultProps } from "./interface";
import { Typography } from "antd";
const { Title } = Typography;

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const {
    title = "",
    level = 1,
    isCenter = "center",
    text ='',
  } = { ...QuestionDefaultProps, ...props };

  const genFontSize = () => {
    if (level === 1) return "24px";
    if (level === 2) return "20px";
    if (level === 3) return "16px";
    return "16px";
  };

  return (
    <div>
      <Title
        level={level}
        style={{
          textAlign: isCenter ? "center" : "start",
          marginBottom: 0,
          fontSize: genFontSize(),
        }}
      >
        {text}
      </Title>
    </div>
  );
};

export default QuestionTitle;
