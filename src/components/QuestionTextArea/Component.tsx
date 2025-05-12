import React, {FC} from "react";
import { QuestionTextAreaPropsType, QuestionTextAreaDefaultProps } from "./interface";
import { Typography, Input } from "antd";
const {Paragraph} = Typography;
const {TextArea} = Input;

const QuestionTextArea: FC<QuestionTextAreaPropsType> = (props: QuestionTextAreaPropsType) => {
    const {title, placeholder} = {...QuestionTextAreaDefaultProps, ...props};

    return(
        <div>
            <Paragraph strong> {title} </Paragraph>
            <TextArea placeholder={placeholder}/>
        </div>
    )
}

export default QuestionTextArea;