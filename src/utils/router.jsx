import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout/MainLayout";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import AddLostFoundItem from "../components/AddLostFoundItems/AddLostFoundItems";
import AllItems from "../components/AllItems/AllItems";
import ItemDetails from "./../components/ItemDetails/ItemDetails";
import MyItems from "./../components/MyItems/MyItems";
// import UpdateItems from "../components/UpdateItem/UpdateItem";
import AllRecovered from "../components/AllRecovered/AllRecovered";
import UpdateItem from "../components/UpdateItem/UpdateItem";
import About from "../components/About/About";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/add-items",
        element: (
          <PrivateRoute>
            <AddLostFoundItem></AddLostFoundItem>
          </PrivateRoute>
        ),
      },

      {
        path: "/all-items",
        element: <AllItems></AllItems>,
      },

      {
        path: "/my-items",
        element: (
          <PrivateRoute>
            <MyItems></MyItems>
          </PrivateRoute>
        ),
      },

      {
        path: "/items/:id",
        element: (
          <PrivateRoute>
            <ItemDetails></ItemDetails>
          </PrivateRoute>
        ),
      },

      {
        path: "/updateItem/:id",
        element: (
          <PrivateRoute>
            <UpdateItem></UpdateItem>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-recovered",
        element: (
          <PrivateRoute>
            <AllRecovered></AllRecovered>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
    ],
  },
]);

export default router;
