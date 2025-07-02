import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const CheckOut = () => {
  const stripe = useStripe();
  const [donationAmount, setDonationAmount] = useState(0);
  const elements = useElements();
  const [transaction, setTransaction] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const price = parseInt(donationAmount);
  useEffect(() => {
    if (price > 0) {
      axiosPublic.post(`/create-payment-intent`, { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosPublic, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (price < 5) return toast.error("Amount must be greater than $5");
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError(" ");
    }

    // confirm payment
    const { paymentIntent, error: cardConErr } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (cardConErr) {
      console.log("confirm error");
    } else {
      console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransaction(paymentIntent.id);
        const payment = {
          email: user?.email,
          name: user?.displayName,
          price: price,
          date: new Date(),
          transactionId: paymentIntent.id,
        };
        const res = axiosPublic.post(`/payments`, payment);
        toast.success("Payment success ");
      }
    }
  };

  return (
    <form className="p-6" onSubmit={handleSubmit}>
      <div className="flex flex-col mb-3">
        <label htmlFor="">Amount</label>
        <input
          type="number"
          placeholder="Type here"
          className="input mt-3 input-bordered input-primary w-full"
          required
          onBlur={(e) => setDonationAmount(e.target.value)}
        />
      </div>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn-warning btn mt-5 "
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-500">{error}</p>
      <p className="text-green-500 mt-5 ">{transaction}</p>
    </form>
  );
};

export default CheckOut;
// stripe pass :  x/M._?6dM%G@LDZ
// a2 stripe pass : k8?dCxphCBEF8.z
// || !clientSecret
