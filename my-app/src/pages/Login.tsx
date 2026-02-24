import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import type { FieldType } from "../Props";
import { Link, useNavigate } from "react-router-dom";
import { openNotification } from "../lib/openNotification";
import { useLogin } from "../hooks/usePosts";
import { setAccessToken, setRefreshToken} from "../utlis/handleToken";

const Login = () => {
  const navigate = useNavigate();
  const login = useLogin();

  const onFinish = async (values: any) => {
    console.log("Login form data:", values);
    try {
      const res = await login.mutateAsync(values);
      console.log("User id:", res);
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);
      
      // Navigate based on user role if available in res, otherwise default to home
      if (res.user?.role === "ADMIN" || res.user?.role === "SUPER_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      openNotification("error", "Login Failed", "Invalid credentials");
      console.log("Login error: ", err);
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
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="!bg-primary hover:!bg-primaryHover"
                block
              >
                Submit
              </Button>
            </Form.Item>

            <div className="text-center">
              <Link to="/signup" className="text-blue-500 hover:text-blue-700">
                Don't have an account? SignUp
              </Link>
              <br />
              <Link
                to="/verify-email"
                className="text-blue-500 hover:text-blue-700"
              >
                Forgot password?
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
