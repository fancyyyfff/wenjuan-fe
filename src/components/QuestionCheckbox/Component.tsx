import React, { FC } from "react";
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from "./interface";
import { Typography, Radio, Space, Checkbox } from "antd";

const {Paragraph} = Typography;
const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
    const {title, list = [], isVertical } = {...QuestionCheckboxDefaultProps, ...props}
    return (
        <div>
            <Paragraph strong>{title}</Paragraph>
            <Space direction={isVertical ? "vertical" : "horizontal"}>
                {list.map((opt, index) => {
                    const {value, text, checked} = opt;
                    return(
                        <Checkbox key={value} value={value} checked={checked}>
                            {text}
                        </Checkbox>
                    )
                })}
            </Space>
        </div>
    )

}

export default Component;