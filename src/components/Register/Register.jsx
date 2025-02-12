import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet";

const Register = () => {
  const { handleRegister, handleGoogleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = formData;
    const passwordError = validatePassword(password);

    if (passwordError) {
      setError(passwordError);
      toast.error(passwordError);
      return;
    }

    try {
      await handleRegister(email, password, name, photoURL);
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      console.error(err.message);
      setError("Registration failed. Please try again.");
      toast.error("Registration failed.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await handleGoogleLogin();
      toast.success("Registered with Google successfully!");
      navigate("/");
    } catch (err) {
      console.error("Google Login Error:", err.message);
      toast.error("Google registration failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-14 p-8 bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100  shadow rounded-md">
      <Helmet>
        <title>Register | WhereIsIt</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-center mb-4">
        Registration 
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label>Password</label>
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
        </div>
        <div>
          <label>Photo URL</label>
          <input
            type="text"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" className="btn bg-gradient-to-r from-green-400 to-blue-500 text-white w-full text-xl font-bold hover:from-green-500 hover:to-blue-600 transition duration-300">
          Register
        </button>
      </form>

      <p className="text-center mt-3">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>

      <div className="divider my-4">OR</div>

      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline text-blue-500 w-full flex items-center justify-center"
      >
        <FcGoogle size={20} />
        Sign up with Google
      </button>
    </div>
  );
};

export default Register;
