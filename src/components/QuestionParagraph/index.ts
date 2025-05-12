/* eslint-disable import/no-anonymous-default-export */
import Component from "./Component"; 
import { QuestionParagraphDefaultProps } from "./interface";  
import PropComponent from "./PropComponent";     
export * from "./interface";

export default {
    title: '段落',
    type: 'questionParagraph', // 和后端一致
    Component,
    PropComponent,
    defaultProps: QuestionParagraphDefaultProps,
}