import { Link } from "react-router-dom";
import logo from "../../assets/wlogo.png";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10">
      <h2 className="text-3xl font-extrabold text-c1">Page is not available</h2>
      <img src={logo} alt="" className="w-96 rounded-[32px]" />
      <Link
        to="/"
        className="mt-4  bg-[#4a00ff] text-white py-2 px-4 rounded-md"
      >
        Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
