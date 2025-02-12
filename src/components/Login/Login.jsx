import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";

const Login = () => {
  const { handleLogin, handleGoogleLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    try {
      await handleLogin(email, password);
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.message);
      setError("Invalid email or password");
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await handleGoogleLogin();
      toast.success("Logged in with Google successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Google Login Error:", err.message);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[60vh]">
      <div className="max-w-md mx-auto mt-10 mb-10 p-6 bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 rounded shadow-md ">
        <Helmet>
          <title>Login | WhereIsIt</title>
        </Helmet>
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-4 right-2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <button
              type="submit"
              className="btn bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition duration-300 w-full mt-4"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          New User?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
        <div className="divider my-4">OR</div>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline  w-full flex items-center justify-center text-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white transition duration-300"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
