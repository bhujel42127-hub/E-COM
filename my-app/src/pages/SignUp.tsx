import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import type { FieldType } from "../Props";
import { openNotification } from "../lib/openNotification";
import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../hooks/usePosts";

export const SignUp = () => {
  const navigate = useNavigate();
  const createUser = useCreateUser();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      const res = await createUser.mutate(newUser);
      console.log(res);
      navigate("/signup");
    } catch (err: any) {
      if (err.response?.data?.message === "Email already used") {
        openNotification("error", "Signup Failed", "Email already in use");
      } else {
        console.log(err);
      }
    }
    // console.log("clicked");
    // const res = await api.get<User[]>("/users");
    // const userExists = res.data.some((e) => e.email === values.email);
    // console.log("User exists: ", userExists);
    // if (userExists) {
    //   dupEmailNotification();
    //   return;
    // }
    // if (!userExists) {
    //   const timeStamp = new Date().toISOString();
    //   const newUser = {
    //     ...values,
    //     createdAt: timeStamp,
    //   };
    //   await api.post("/users", newUser);
    //   navigate("/login");
    //   console.log("User added", newUser);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="flex items-center justify-center">
          <h1 className="text-5xl font-bold">My Brand</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
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
                style={{ background: "#001529" }}
              >
                Submit
              </Button>
            </Form.Item>

            <div className="text-center">
              <a href="/login" className="text-blue-1000 hover:text-blue-700">
                Already got an account? Login
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
