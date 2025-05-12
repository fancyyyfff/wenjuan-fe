export type QuestionInputPropsType = {
    title?: string;
    placeholder?: string;
    onChange?: (newProps: QuestionInputPropsType) => void;
    disabled?: boolean; 
}

export const QuestionInputDefaultProps = {
    title: '输入框标题',
    placeholder: '请输入内容',
}