/* eslint-disable import/no-anonymous-default-export */
import Component from "./Component";
import { QuestionCheckboxDefaultProps } from "./interface";
import PropComponent from "./PropComponent";
import StatComponent from "./StatComponent";

export * from "./interface";

export default {
    title: '多选',
    type: 'questionCheckbox', // 和后端一致
    Component,
    PropComponent,
    StatComponent,
    defaultProps: QuestionCheckboxDefaultProps,
}