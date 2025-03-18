import { React, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import slide1 from "../../assests/images/signup-slide1.svg";
import slide2 from "../../assests/images/signup-slide2.svg";
import slide3 from "../../assests/images/signup-slide3.svg";
import { InputGroup, Form, Button } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { createAccount } from "../../Redux/auth/authSlice";
import Loader from "../../Helper/Loader";
import EmailVerificationModal from "../../Helper/EmailVerificationModal";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    companyName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
    accountType: "",
  });
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateAccount = () => {
    if (!isChecked) {
      toast.warn("You must agree to the Terms of Service and Privacy Policy.", {
        position: "top-center",
        autoClose: 2000,
        closeButton: false,
      });
      return;
    }

    setLoading(true);

    dispatch(createAccount(formData))
      .unwrap()
      .then((response) => {
        setLoading(false);
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });
        // Open the modal after successful registration
        setIsModalOpen(true);
        // Reset form data only after successful account creation
        // setFormData({
        //   firstName: "",
        //   lastName: "",
        //   emailId: "",
        //   companyName: "",
        //   phoneNumber: "",
        //   password: "",
        //   confirmPassword: "",
        //   country: "",
        //   state: "",
        //   city: "",
        //   accountType: "",
        // });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error);
      });
  };

  return (
    <div className="signup">
      {loading && <Loader isLoading={loading} />}
      <div className="emp-cancel-icon" onClick={handleLogin}>
        <CloseIcon className="fs-5 text-secondary" />
      </div>
      <div className="col-md-5 slider">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          loop={true}
        >
          <SwiperSlide>
            <img src={slide1} alt="Slide 1" className="signup-slider" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide2} alt="Slide 2" className="signup-slider" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide3} alt="Slide 3" className="signup-slider" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="col-md-6 signup-form">
        <p className="create-account-text">
          <span className="create-color">Cre</span>ate your account
        </p>
        <div className="create-account-field">
          <Form.Group className="col-md-5 mb-3">
            <Form.Label>First name</Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="col-md-5 mb-3">
            <Form.Label>Last name</Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </div>
        <div className="create-account-field">
          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Email Id</Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </div>
        <div className="create-account-field">
          <Form.Group className="col-md-5 mb-3">
            <Form.Label>Company name</Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="col-md-5 mb-3">
            <Form.Label>Phone number</Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </div>
        <div className="create-account-field">
          <Form.Group className="col-md-5 mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
              />
              <InputGroup.Text
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  cursor: "pointer",
                  background: "transparent",
                }}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className="col-md-5 mb-3">
            <Form.Label>Confirm password</Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <InputGroup.Text
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  cursor: "pointer",
                  background: "transparent",
                }}
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </div>
        <div className="create-account-field">
          <Form.Group className="col-md-5 mb-3">
            <Form.Label>Country</Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="col-md-5 mb-3">
            <Form.Label>State</Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </div>
        <div className="create-account-field">
          <Form.Group className="col-md-5 mb-3">
            <Form.Label>City</Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                className="custom-textfield"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="col-md-5 mb-3">
            <Form.Label>Account type</Form.Label>
            <Form.Select
              aria-label="Default select example"
              style={{ height: "45px" }}
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
            >
              <option value="1">Account type</option>
              <option value="admin">Single User</option>
              <option value="user">Super User</option>
            </Form.Select>
          </Form.Group>
        </div>
        <p>
          <input
            type="checkBox"
            className="me-2"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          I agree to the
          <span className="text-primary cursor-pointer ms-1 text-decoration-underline">
            Terms of Services
          </span>{" "}
          and
          <span className="text-primary cursor-pointer ms-1 text-decoration-underline">
            Privacy Policy
          </span>
          .
        </p>
        <div className="mt-4 d-flex justify-content-center w-100">
          <button
            type="button"
            className="btn create-acc-btn p-2"
            onClick={handleCreateAccount}
          >
            Create account
          </button>
        </div>
        <p className="text-center">
          Already have an mooit account?
          <span
            className="text-primary ms-1 cursor-pointer"
            onClick={handleLogin}
          >
            Login
          </span>
        </p>
      </div>
      <ToastContainer />
      {/* Modal will only show when isModalOpen is true */}
      <EmailVerificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Signup;
