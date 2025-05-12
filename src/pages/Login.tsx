import React, { FC, useEffect } from "react";
import {
  Space,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
  message,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from "../router";
import { useRequest } from "ahooks";
import { loginService } from "../service/user";
import { setToken } from "../utils/user-token";

const { Title } = Typography;

const USERNAME_KEY = "usename";
const PASSWORD_KEY = "password";

function remenberUser(values: any) {
  localStorage.setItem(USERNAME_KEY, values.username);
  localStorage.setItem(PASSWORD_KEY, values.password);
}
function deleteUserFormStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

function getUserFormStorage() {
  return {
    USERNAME_KEY: localStorage.getItem(USERNAME_KEY),
    PASSWORD_KEY: localStorage.getItem(PASSWORD_KEY),
  };
}

const Login: FC = () => {
  const [form] = Form.useForm();
  const nav = useNavigate();

  const { run: login } = useRequest(
    async (values) => {
      const { username, password } = values;
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const {token = ''} = result;
        setToken(token);
        message.success("登录成功");
        nav(MANAGE_INDEX_PATHNAME);
      },
    }
  );

  useEffect(() => {
    const { USERNAME_KEY, PASSWORD_KEY } = getUserFormStorage();
    form.setFieldsValue({ USERNAME_KEY, PASSWORD_KEY });
  }, []);

  function onFinish(values: any) {
    login(values);
    if (values.remember) {
      remenberUser(values);
    } else {
      deleteUserFormStorage();
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: "请输入用户名" },
              { type: "string", min: 5, max: 20, message: "长度在5~20位" },
              { pattern: /^\w+$/, message: "只能是字母、数字、下划线" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item label={null}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
