import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <ToastContainer position="top-center" />
      <Navbar></Navbar>
      <div className="mt-24">
      <Outlet></Outlet></div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
