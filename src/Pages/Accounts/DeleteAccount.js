import React from "react";
import { useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import DeleteAccountLogo from "../../assests/images/deleteLogo.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Slide,
} from "@mui/material";
import { deleteAccountSchema } from "../../Helper/validation";
import CloseIcon from "@mui/icons-material/Close";

const DeleteAccount = () => {
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(deleteAccountSchema) });

  const handleDialogSubmit = async () => {
    const isValid = await trigger(["reason", "feedback"]);
    if (isValid) {
      setOpenConfirmDeleteDialog(true);
      setOpenDeleteAccountDialog(false);
    }
  };

  return (
    <div className="purchase-list">
      <h2>Delete Account</h2>
      <div className="delete-account">
        <div className="col-md-8 col-12">
          <p>Terminate account</p>
          <p className="text-secondary mt-2">
            "Permanently delete your personal account and all associated content
            from the Mooit platform. This action cannot be undone, so proceed
            with caution."
          </p>
        </div>
        <div className="col-md-2 col-12">
          <button
            type="button"
            className="btn flex-grow-1 bg-danger text-white"
            onClick={() => setOpenDeleteAccountDialog(true)}
          >
            Delete Account
          </button>
        </div>
        <Dialog
          open={openDeleteAccountDialog}
          onClose={() => setOpenDeleteAccountDialog(false)}
          aria-describedby="alert-dialog-slide-description"
          sx={{
            "& .MuiDialog-paper": {
              width: "500px",
              maxWidth: "80vw",
            },
          }}
        >
          <DialogTitle className="purchase-list" sx={{ padding: 0 }}>
            <h2 className="dialog-cancel-icon">
              Delete Account
              <span>
                <CloseIcon onClick={() => setOpenDeleteAccountDialog(false)} />
              </span>
            </h2>
          </DialogTitle>
          <DialogContent>
            <p className="mt-3 mb-3 text-secondary">
              Deleting your account will remove all of your information from our
              Database. This cannot be undone.
            </p>
            <div className="mt-3 d-flex align-items-center">
              <div className="col-md-8">
                <Form.Group>
                  <Form.Label className="custom-label mb-0">
                    <div className="d-flex align-items-center">
                      <Form.Label className="custom-label mb-2">
                        Reason for account closure.
                      </Form.Label>
                      {errors.reason && (
                        <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                      )}
                    </div>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    {...register("reason")}
                  >
                    <option value="">Select Reason</option>
                    <option value="english">Business Closure</option>
                    <option value="arabic">Personal Reasons</option>
                    <option value="hindi">Financial Reasons</option>
                    <option value="hindi">Business-Related Reasons</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <div className="mt-5 d-flex align-items-center">
              <div className="col-md-8">
                <Form.Group>
                  <div className="d-flex align-items-center">
                    <Form.Label className="custom-label mb-0">
                      Share Feedback
                    </Form.Label>
                    {errors.feedback && (
                      <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                    )}
                  </div>
                  <InputGroup className="mt-2">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      aria-label="Feedback"
                      className="description-textfield"
                      {...register("feedback")}
                    />
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleDialogSubmit}
              sx={{
                fontWeight: "normal",
                paddingTop: "7px",
                paddingBottom: "7px",
                backgroundColor: "#1F3F7F",
                textTransform: "capitalize",
                width: "200px",
                marginBottom: "20px",
              }}
            >
              Continue
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openConfirmDeleteDialog}
          onClose={() => setOpenConfirmDeleteDialog(false)}
          aria-describedby="alert-dialog-slide-description"
          sx={{
            "& .MuiDialog-paper": {
              width: "450px",
              maxWidth: "80vw",
            },
          }}
        >
          <DialogContent>
            <div className="deleteAccountLogo">
              <img src={DeleteAccountLogo} alt="DeleteAccountLogo" />
            </div>
            <p className="mt-3 mb-3 text-center fw-bold">Delete Account</p>
            <p className="mt-3 mb-3 text-center text-danger">
              <span className="fw-bold">Warning :</span> This is permanent and cannot be Undone
            </p>
            <div className="mt-5 d-flex justify-content-center align-items-center">
              <div className="col-md-8">
                <Form.Group>
                  <Form.Label className="custom-label mb-0">
                    Confirm Username
                  </Form.Label>
                  <InputGroup className="mt-2">
                    <Form.Control
                      aria-label="confirm-username"
                      className="custom-textfield"
                    />
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              gap: "8px",
              padding: "16px",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                fontWeight: "normal",
                paddingTop: "5px",
                paddingBottom: "3px",
                backgroundColor: "red",
                textTransform: "capitalize",
                width: "150px",
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => setOpenConfirmDeleteDialog(false)}
              sx={{
                backgroundColor: "#CFCFCF",
                color: "black",
                fontWeight: "normal",
                paddingTop: "5px",
                paddingBottom: "3px",
                textTransform: "capitalize",
                width: "150px",
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default DeleteAccount;
