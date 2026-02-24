import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import type { FieldType } from "../Props";
import { openNotification } from "../lib/openNotification";
import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../hooks/usePosts";

const SignUp = () => {
  const navigate = useNavigate();
  const createUser = useCreateUser();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      const res = await createUser.mutateAsync(newUser);
      console.log(res);
      navigate("/login");
    } catch (err: any) {
      if (err.response?.data?.message === "Email already used") {
        openNotification("error", "Signup Failed", "Email already in use");
      } else {
        console.log(err);
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex-1 hidden md:flex flex-col items-center justify-center bg-primary text-center px-10">
        <div className="flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-primary font-['Libre_Baskerville']">LOGO</span>
          </div>
      </div>

      <div className="flex-1 flex items-center ml-20">
        <div className="w-full max-w-md px-8">
          <Form
            name="signup"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { message: "Please confirm your password!", required: true },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="!bg-primary hover:!bg-primaryHover"
              >
                Submit
              </Button>
            </Form.Item>

            <div className="text-center">
              <a href="/login" className="text-blue-500 hover:text-blue-700">
                Already got an account? Login
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
