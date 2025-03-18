import * as yup from "yup";

export const newSalesReturnSchema = yup.object().shape({
  customerName: yup.string().required("Customer name is required"),
  salesOrder: yup.string().required("Sales order is required"),
  raNumber: yup.string().required("RA number is required"),
  date: yup
    .date()
    .required("Date is required")
    .typeError("Invalid date format"),
  invoiceNumber: yup.string().required("Invoice number is required"),
  invoiceDate: yup
    .date()
    .required("Invoice Date is required")
    .typeError("Invalid date format"),
  warehouse: yup.string().required("Warehouse is required"),
});

export const newCreditNoteSchema = yup.object().shape({
  customerName: yup.string().required("Customer name is required"),
  salesOrder: yup.string().required("Sales order is required"),
  creditNoteId: yup.string().required("Credit Note Id is required"),
  creditNoteDate: yup
    .date()
    .required("Credit Note Date is required")
    .typeError("Invalid date format"),
  salesPerson: yup.string().required("Sales Person is required"),
});

export const refundDialogSchema = yup.object().shape({
  refundDate: yup
    .date()
    .required("Refund Date is required")
    .typeError("Invalid date format"),
  paymentMode: yup.string().required("Payment Mode is required"),
  amount: yup.string().required("Amount is required"),
});

export const newSalesReInvoiceSchema = yup.object().shape({
  customerName: yup.string().required("Customer name is required"),
  salesOrder: yup.string().required("Sales order is required"),
  invoiceId: yup.string().required("Invoice number is required"),
  invoiceDate: yup
    .date()
    .required("Invoice date is required")
    .typeError("Invalid date format"),
  paymentTerms: yup.string().required("Payment terms is required"),
  dueDate: yup
    .date()
    .required("Due date is required")
    .typeError("Invalid date format"),
  orderNumber: yup.string().required("Order number is required"),
});

export const newEmployeeSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipCode: yup.string().required("Zip code is required"),
  mobileNo: yup.string().required("Mobile no is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().required("Confirm password is required"),
  dob: yup.date().required("DOB is required").typeError("Invalid date format"),
  typeOfHire: yup.string().required("Type of hire is required"),
  dateOfJoining: yup
    .date()
    .required("Date of joining is required")
    .typeError("Invalid date format"),
  nationality: yup.string().required("Nationality is required"),
  gender: yup.string().required("Gender is required"),
  accessTo: yup.string().required("Access to is required"),
});

export const resetPasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup.string().required("New password is required"),
  confirmPassword: yup.string().required("Confirm password is required"),
});

export const deleteAccountSchema = yup.object().shape({
  reason: yup.string().required("Reason is required"),
  feedback: yup.string().required("Feedback is required"),
});