import { Link } from "react-router-dom";
import logo from "../../assets/wlogo-f.png";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
      <h2 className="text-3xl font-extrabold">Page is not available</h2>
      <img src={logo} alt="" className="w-96 rounded-[32px]" />
      <Link
        to="/"
        className="mt-4  bg-white text-indigo-600 py-2 px-4 rounded-md"
      >
        Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
