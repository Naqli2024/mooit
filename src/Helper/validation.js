import * as yup from "yup";

export const newSalesReturnSchema = yup.object().shape({
  customerName: yup.string().required("Customer name is required"),
  salesOrder: yup.string().required("Sales order is required"),
  raNumber: yup.string().required("RA number is required"),
  date: yup.date().required("Date is required").typeError("Invalid date format"),
  invoiceNumber: yup.string().required("Invoice number is required"),
  invoiceDate: yup.date().required("Invoice Date is required").typeError("Invalid date format"),
  warehouse: yup.string().required("Warehouse is required"),
});

export const newCreditNoteSchema = yup.object().shape({
  customerName: yup.string().required("Customer name is required"),
  salesOrder: yup.string().required("Sales order is required"),
  creditNoteId: yup.string().required("Credit Note Id is required"),
  creditNoteDate: yup.date().required("Credit Note Date is required").typeError("Invalid date format"),
  salesPerson: yup.string().required("Sales Person is required"),
});


export const refundDialogSchema = yup.object().shape({
  refundDate: yup.date().required("Refund Date is required").typeError("Invalid date format"),
  paymentMode: yup.string().required("Payment Mode is required"),
  amount: yup.string().required("Amount is required"),
});


export const newSalesReInvoiceSchema = yup.object().shape({
customerName: yup.string().required("Customer name is required"),
salesOrder: yup.string().required("Sales order is required"),
invoiceId: yup.string().required("Invoice number is required"),
invoiceDate: yup.date().required("Invoice date is required").typeError("Invalid date format"),
paymentTerms: yup.string().required("Payment terms is required"),
dueDate: yup.date().required("Due date is required").typeError("Invalid date format"),
orderNumber: yup.string().required("Order number is required"),
});

