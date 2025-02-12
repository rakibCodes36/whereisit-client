import logo from "../../assets/wlogo.png";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-gradient-to-r from-blue-500 to-cyan-500 text-gray-100 p-10 ">
      <aside>
        <img src={logo} alt="" className="w-16 rounded-xl"/>
        <h2 className="text-xl font-bold"> WhereIsIt</h2>
        <p className="font-bold">
         
          
        Connecting Lost and Found Items
        </p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a>
            <FaFacebookF size={20}/>
          </a>
          <a>
            <FaInstagram size={20}/>
          </a>
          <a>
            <FaTwitter size={20}/>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
