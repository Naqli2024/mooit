import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getInvoiceDetails } from "../../../../Redux/salesInvoiceSlice/salesInvoice";


const InvoiceCell = ({ salesOrderId }) => {
  const dispatch = useDispatch();
  const [invoiceId, setInvoiceId] = useState("Loading...");

  useEffect(() => {
    dispatch(getInvoiceDetails(salesOrderId)).then((response) => {
      setInvoiceId(response.payload?.invoiceId || "N/A");
    });
  }, [dispatch, salesOrderId]);

  return <>{invoiceId}</>;
};

export default InvoiceCell;