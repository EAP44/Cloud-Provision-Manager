import { useRef, useState } from "react";
import { Addorder } from "../../Redux/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { axiosClient } from "../../API/axios";

export default function InfosForm() {
  const ProductRef = useRef();
  const QuantityRef = useRef();
  const SubscriptionDateRef = useRef();
  const NoteRef = useRef();
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormSent, setIsFormSent] = useState(false);
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const dataOrder = useSelector(data=>data)
//---------------------------------------------------------
  const validateRequiredElement = (ref) => {
    if (ref.current.value.trim() === "") {
      setErrors((prevState) => {
        return { ...prevState, ...{ [ref.current.id]: "field required" } };
      });
      setIsFormValid(false);
    }
  };

  const validateForm = () => {
    let isFormValid = true;
    setErrors({});
    validateRequiredElement(ProductRef);
    validateRequiredElement(QuantityRef);

    if (
      SubscriptionDateRef.current.value.trim() === ""
    ) {
      setErrors((prevState) => {
        return {
          ...prevState,
          ...{ [SubscriptionDateRef.current.id]: "field required" },
        };
      });
      isFormValid = false;
    }

    setIsFormValid(isFormValid);
    return isFormValid;
  };

  const resetForm = () => {
    ProductRef.current.value = "";
    QuantityRef.current.value = "";
    SubscriptionDateRef.current.value = "";
    NoteRef.current.value = "";
  };

  const handleChange = () => {
    validateForm();
  };

  const displayError = (ref) => {
    if (ref.current !== undefined) {
      const fieldName = ref.current.id;
      if (errors[fieldName]) {
        ref.current.style.border = "1px solid red";
        ref.current.style.backgroundColor = "rgba(255,0,0,0.1)";
        return <div className={"text-danger"}>{errors[fieldName]}</div>;
      }
      ref.current.style.border = "1.5px solid green";
      ref.current.style.backgroundColor = "rgba(0,255,0,0.1)";
    }
  };
//---------------------------------------------------------
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = today.getDate();
month = (month < 10 ? '0' : '') + month;
day = (day < 10 ? '0' : '') + day;
var dateString = year + "-" + month + "-" + day;
  const send = async() => {
    if (validateForm()) {
      const formData = {
        product: ProductRef.current.value,
        quantity: QuantityRef.current.value,
        license_expiration_date: SubscriptionDateRef.current.value,
        order_date: dateString,
        note: NoteRef.current.value,
      };
      Dispatch(Addorder(formData));
      
      setIsFormSent(true);
      resetForm();
      await axiosClient.post("/api/order", dataOrder);
    }
  };

  return (
    <div className="InfosForm-container">
      {isFormSent ? (
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-3">Email sent successfully !!</h1>
            <hr className="my-2" />
            <p className="lead">
            "Your order has been successfully sent to the client via email. You will be notified of any further updates or actions required. Thank you for your attention."
              <button className="send-button" onClick={()=>{Navigate('/choose-client')}}>Return</button>
            </p>
          </div>
        </div>
      ) : (
        <form onChange={handleChange}>
          <h2 className="text-center">Order Information</h2>
          <label htmlFor="Product">Product Name</label>
          <input type="text" id="Product" ref={ProductRef} />
          {displayError(ProductRef)}
          <label htmlFor="Quantity">Quantity</label>
          <input type="text" id="Quantity" ref={QuantityRef} />
          {displayError(QuantityRef)}
          <label htmlFor="SubscriptionDate">Subscription</label>
          <input type="date" id="SubscriptionDate" ref={SubscriptionDateRef} />
          <label htmlFor="Note">Note</label>
          <input type="text" id="Note" ref={NoteRef} />
          <button disabled={!isFormValid} type="button" className="send-button" onClick={send} >Send</button>
        </form>
      )}
    </div>
  );
}
