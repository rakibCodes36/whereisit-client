import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
import { Menu } from "@headlessui/react";
import { Tooltip } from "react-tooltip";
import logo from "../../assets/wlogo-f.png";

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      toast.error("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const navLink = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/all-items">Lost & Found Items Page</NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-cyan-500 z-50">
      <div className="navbar max-w-7xl mx-auto py-4 px-4 lg:px-3">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <GiHamburgerMenu size={30} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLink}
            </ul>
          </div>
          <Link to="/">
            <img src={logo} alt="Logo" className="w-36 rounded-xl" />
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base text-white">
            {navLink}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center gap-4">
          {user ? (
            <>
              {/* Profile Dropdown */}
              <Menu as="div" className="relative mt-1">
                <Menu.Button>
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border-2 border-primary"
                    data-tooltip-id="user-tooltip"
                    data-tooltip-content={user.displayName}
                  />
                  <Tooltip id="user-tooltip" place="top" style={{ zIndex: 10 }} />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to="/add-items"
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "bg-blue-100 text-blue-700"
                              : active
                              ? "bg-gray-100"
                              : ""
                          } block px-4 py-2 text-sm text-gray-700`
                        }
                      >
                        Add Items
                      </NavLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to="/all-recovered"
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "bg-blue-100 text-blue-700"
                              : active
                              ? "bg-gray-100"
                              : ""
                          } block px-4 py-2 text-sm text-gray-700`
                        }
                      >
                        All Recovered
                      </NavLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to="/my-items"
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "bg-blue-100 text-blue-700"
                              : active
                              ? "bg-gray-100"
                              : ""
                          } block px-4 py-2 text-sm text-gray-700`
                        }
                      >
                        My Items
                      </NavLink>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>

              {/* Logout Button */}
              <button onClick={handleLogoutClick} className="btn btn-error btn-sm">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="bg-white text-indigo-600 py-2 px-4 rounded-md">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
