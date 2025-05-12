import type { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";
import QuestionParagraphConf, { QuestionParagraphPropsType } from "./QuestionParagraph";
import QuestionInfoConf , { QuestionInfoPropsType } from "./QuestionInfo";
import QuestionTextAreaConf, { QuestionTextAreaPropsType } from "./QuestionTextArea";
import QuestionRadioConf, { QuestionRadioPropsType, QuestionRadioStatPropsType } from "./QuestionRadio";
import QuestionCheckboxConf ,{ QuestionCheckboxPropsType, QuestionCheckboxStatPropsType } from "./QuestionCheckbox";

export type ComponentPropsType =
    QuestionInputPropsType
  & QuestionTitlePropsType
  & QuestionParagraphPropsType
  & QuestionInfoPropsType
  & QuestionTextAreaPropsType
  & QuestionRadioPropsType
  & QuestionCheckboxPropsType
  ;

// 统一，各个组件的统计属性类型
type ComponentStatPropsType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType;

export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
  StatComponent?: FC<ComponentStatPropsType>; 
};

const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextAreaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,

];

export const componentConfGrop = [
  {
    groupId: 'textGroup',
    groupName:'文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'input',
    groupName:'用户输入',
    components: [QuestionTextAreaConf,QuestionInputConf],
  },
  {
    groupId: 'chooseGroup',
    groupName:'用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf]
  }
]

export function getComponentConfByType(type: string) {
    return componentConfList.find(c => c.type === type)
};