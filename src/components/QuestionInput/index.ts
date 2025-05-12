/* eslint-disable import/no-anonymous-default-export */
/**
 * @description 问卷 输入框
 */
import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionInputDefaultProps } from "./interface";

export * from './interface';

export default {
    title: '输入框',
    type: 'questionInput', // 和后端一致
    Component,
    PropComponent,
    defaultProps: QuestionInputDefaultProps,
}