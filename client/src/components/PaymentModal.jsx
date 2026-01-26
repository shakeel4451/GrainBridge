import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./PaymentModal.css"; // We will create this css next

// PASTE YOUR PUBLISHABLE KEY HERE
const stripePromise = loadStripe(
  import.meta.env
    .pk_test_51SttKxRFoOUzByp8mdvE9NWgIc0Rg92dUTXrnD3AKma6M2kOYSOdHGmKay8goC1RV03lPHlp6zQQSzShc2JQZk8u00Kg0DKLQV,
);

const CheckoutForm = ({ amount, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // Prevents redirecting away from your site
    });

    if (error) {
      setErrorMsg(error.message);
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess(); // Payment verified! Trigger the order creation
    } else {
      setIsProcessing(false);
      setErrorMsg("Payment failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <h3 style={{ color: "#3e5235", marginBottom: "20px" }}>
        Secure Checkout (Rs. {amount.toLocaleString()})
      </h3>
      <PaymentElement />
      {errorMsg && <div className="stripe-error">{errorMsg}</div>}
      <div className="stripe-actions">
        <button type="button" className="cancel-pay-btn" onClick={onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className="pay-now-btn"
          disabled={!stripe || isProcessing}
        >
          {isProcessing
            ? "Processing..."
            : `Pay Rs. ${amount.toLocaleString()}`}
        </button>
      </div>
    </form>
  );
};

const PaymentModal = ({ clientSecret, amount, onSuccess, onCancel }) => {
  const options = { clientSecret };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal-content">
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            amount={amount}
            onSuccess={onSuccess}
            onCancel={onCancel}
          />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentModal;
