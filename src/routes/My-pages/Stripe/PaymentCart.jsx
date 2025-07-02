import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const PaymentCart = () => {
  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-red-100 min-h-screen flex justify-center items-center px-4">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white p-8 rounded-xl shadow-2xl">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-600 mb-6">
          Secure Payment
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Complete your donation safely with our secure payment system.
        </p>

        {/* Stripe Checkout */}
        <Elements stripe={stripePromise}>
          <CheckOut />
        </Elements>

        {/* Divider */}
        <div className="mt-6 flex items-center justify-center">
          <span className="h-px w-16 bg-gray-300"></span>
          <span className="px-2 text-gray-400 text-sm">or</span>
          <span className="h-px w-16 bg-gray-300"></span>
        </div>

        {/* Alternative Payment Note */}
        <p className="text-sm text-center text-gray-500 mt-4">Need help? </p>
      </div>
    </div>
  );
};

export default PaymentCart;
