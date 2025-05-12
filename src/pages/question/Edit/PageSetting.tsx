import { Form, Input } from "antd";
import React, { FC, useEffect } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { useDispatch } from "react-redux";
import { resetPageInfo } from "../../../store/PageInfoReducer";

const { TextArea } = Input;
const PageSetting: FC = () => {
  const pageInfo = useGetComponentInfo();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue({ pageInfo });
  }, [pageInfo]);

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()));
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ pageInfo }}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: "请输入问卷标题" }]}
      >
        <Input placeholder="输入问卷标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder={"输入问卷描述"} />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="输入样式代码" />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="输入脚本代码" />
      </Form.Item>
    </Form>
  );
};

export default PageSetting;
