import { title } from "process";

export type QuestionTitlePropsType = {
    title?: string;
    level?: 1 | 2 | 3 | 4 | 5 ;   // 暂时无法解决为什么level变成可选就报错
    isCenter?: boolean;
    onChange?: (newProps: QuestionTitlePropsType) => void;
    disabled?: boolean; 
}

export const QuestionDefaultProps: QuestionTitlePropsType = {
    title: '一行标题',
    level: 1,
    isCenter: false,
}