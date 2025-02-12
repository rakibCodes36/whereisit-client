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
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
