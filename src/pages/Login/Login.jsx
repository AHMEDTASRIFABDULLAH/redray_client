import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  if (user) return <Navigate to={from} replace={true} />;

  // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      //User Login
      await signIn(email, password);

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-100 via-white to-red-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-red-600">Log In</h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email Here"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*******"
              autoComplete="current-password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-2 font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md"
          >
            Continue
          </button>
        </form>
        <div className="text-right">
          <button className="text-xs text-red-500 hover:underline">
            Forgot password?
          </button>
        </div>
        <div className="flex items-center py-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="text-sm text-gray-500">Login with social accounts</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <p className="text-center text-sm text-gray-500">
          Don’t have an account yet?{" "}
          <Link to="/signup" className="text-red-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
