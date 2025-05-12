export type QuestionTextAreaPropsType = {
    title?: string;
    placeholder?: string;
    onChange?: (newProps: QuestionTextAreaPropsType) => void;
    disabled?: boolean; 
}

export const QuestionTextAreaDefaultProps = {
    title: '多行输入',
    placeholder: '请输入内容',
}