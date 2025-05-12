/* eslint-disable import/no-anonymous-default-export */
import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionDefaultProps } from "./interface";
export * from './interface'

export default {
    title: '标题',
    type: 'questionTitle',
    Component,
    PropComponent,
    defaultProps: QuestionDefaultProps,
}