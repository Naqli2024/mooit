import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EmailVerificationModal = ({ isOpen, onClose }) => {
  const { data } = useSelector((state) => state.createAccount);
  const navigate = useNavigate();

  const handleClick = () => {
    if(data?.data?.isVerified) {
      navigate("/login")
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data);
    } if(data?.data?.user) {
      navigate("/admin")
    }
  }, [data, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {data?.data?.isVerified ? (
          <div className="email-verify-modal-1">
            <p>Email verified successfully.</p>
            <button
              type="button"
              className="btn create-acc-btn p-2"
              onClick={handleClick}
            >
              Login
            </button>
          </div>
        ) : (
          <div className="email-verify-modal-2">
            <h2><b>Email Verification Required</b></h2>
            <p>
              You have to verify your email. Go to your email and verify your
              account.
            </p>
            <button onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationModal;
