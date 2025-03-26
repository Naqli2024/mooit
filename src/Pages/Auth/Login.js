import { React, useState } from "react";
import loginBackground from "../../assests/images/loginBackground.svg";
import loginForm from "../../assests/images/login.svg";
import googleLogo from "../../assests/images/google-logo.svg";
import fbLogo from "../../assests/images/fb-logo.svg";
import xLogo from "../../assests/images/x-logo.svg";
import linkedInLogo from "../../assests/images/linkedIn-logo.svg";
import { InputGroup, Form, Button } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../Helper/Loader";
import ForgotPasswordModal from "../Accounts/ForgotPasswordModal";
import { signInSchema } from "../../Helper/validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const Login = () => {
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    emailId: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: "onBlur",
  });

  const backToHome = () => {
    navigate("/");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    setLoading(true);
    dispatch(userLogin(loginData))
      .unwrap()
      .then((response) => {
        setLoading(false);
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });
        setTimeout(() => navigate("/admin"), 2000);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="login">
      {loading && <Loader isLoading={loading} />}
      <div className="emp-cancel-icon" onClick={backToHome}>
        <CloseIcon className="fs-5 text-secondary" />
      </div>
      <div className="login-overlay">
        <div className="login-container">
          <div className="col-12 col-md-6">
            <img
              src={loginForm}
              alt="Login Background"
              className="login-form-img"
            />
          </div>
          <div className="col-12 col-md-6 login-form">
            <p className="login-text">Login</p>
            <Form.Group className="col-md-10 mb-3">
              <div className="d-flex align-items-center">
                <Form.Label className="custom-label mb-0">Email Id</Form.Label>
                {errors.emailId && (
                  <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                )}
              </div>
              <InputGroup>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield mt-2"
                  {...register("emailId")}
                  name="emailId"
                  value={loginData.emailId}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="col-md-10 mb-3">
              <div className="d-flex align-items-center">
                <Form.Label className="custom-label mb-0">Password</Form.Label>
                {errors.password && (
                  <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                )}
              </div>
              <InputGroup>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  className="custom-textfield mt-2"
                  {...register("password")}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={handleChange}
                />
                <InputGroup.Text
                  onClick={() => setShowPassword(!showPassword)}
                  className="mt-2"
                  style={{
                    cursor: "pointer",
                    background: "transparent",
                  }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <div
              className="text-primary cursor-pointer"
              onClick={() => setOpenForgotPasswordDialog(true)}
            >
              Forgot Password?
            </div>
            <div className="mt-4 d-flex col-md-10 justify-content-center">
              <button
                type="submit"
                className="btn flex-grow-1 p-2"
                style={{ color: "white", backgroundColor: "#1F3F7F" }}
                // onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="col-md-10 login-divider mt-4">
              <hr /> <span>or</span> <hr />
            </div>
            <p>Login using</p>
            <div className="d-flex gap-3 mb-4">
              <img
                src={googleLogo}
                alt="google-logo"
                className="cursor-pointer"
              />
              <img src={fbLogo} alt="fb-logo" className="cursor-pointer" />
              <img src={xLogo} alt="x-logo" className="cursor-pointer" />
              <img
                src={linkedInLogo}
                alt="linkedIn-logo"
                className="cursor-pointer"
              />
            </div>
            <p>
              Don't have an account?
              <span
                className="text-primary cursor-pointer ms-1"
                onClick={handleSignUp}
              >
                Signup
              </span>
            </p>
          </div>
        </div>
      </div>
      <img
        src={loginBackground}
        alt="Login Background"
        className="login-background"
      />
      <ToastContainer />
      {openForgotPasswordDialog && (
        <ForgotPasswordModal
          openForgotPasswordDialog={openForgotPasswordDialog}
          setOpenForgotPasswordDialog={setOpenForgotPasswordDialog}
        />
      )}
    </form>
  );
};

export default Login;
