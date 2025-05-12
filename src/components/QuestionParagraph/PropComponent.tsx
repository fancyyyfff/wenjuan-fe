import React, { FC, useEffect } from "react";
import { QuestionParagraphPropsType } from "./interface";
import { Checkbox, Form, Input } from "antd";

const { TextArea } = Input;

const PropComponent: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType
) => {
  const { text, isCenter, onChange, disabled } = props;
  const [form] = Form.useForm();
  
  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [text, isCenter]);

  function handleChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      onValuesChange={handleChange}
      form={form}
      disabled={disabled}
    >
      <Form.Item
        label="段落文本"
        name="text"
        rules={[{ required: true, message: "请输入段落文本" }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
