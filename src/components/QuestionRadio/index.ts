/* eslint-disable import/no-anonymous-default-export */
import Component from "./Component";
import { QuestionRadioDefaultProps } from "./interface";
import PropComponent from "./PropComponent";
import StatComponent from "./StatComponent";

export * from "./interface";

export default {
    title: '单选',
    type: 'questionRadio', // 和后端一致
    Component,
    PropComponent,
    StatComponent,
    defaultProps: QuestionRadioDefaultProps,
}