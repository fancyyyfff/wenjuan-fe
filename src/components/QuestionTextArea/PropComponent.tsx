import { Form, Input } from "antd";
import React, { FC, useEffect } from "react";
import { QuestionTextAreaPropsType } from "./interface";
const PropComponent: FC<QuestionTextAreaPropsType> = (
  props: QuestionTextAreaPropsType
) => {
  const { title, placeholder, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      onValuesChange={handleValueChange}
      form={form}
      disabled={disabled}
    >
      <Form.Item
        label="标题"
        name="text"
        rules={[{ required: true, message: "请输入标题内容" }]}
      >
        <Input placeholder="请输入标题内容" />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
