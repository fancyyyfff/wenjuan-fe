/* eslint-disable import/no-anonymous-default-export */
import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionTextAreaDefaultProps } from "./interface";

export * from './interface';

export default {
    title: '多行输入',
    type: 'questionTextArea', // 和后端一致
    Component,
    PropComponent,
    defaultProps: QuestionTextAreaDefaultProps,
}