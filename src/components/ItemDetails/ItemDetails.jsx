import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import ReactDatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import {
  MdDescription,
  MdCategory,
  MdLocationOn,
  MdDateRange,
  MdContactPhone,
} from "react-icons/md";
import { Helmet } from "react-helmet";

const ItemDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveryDate, setRecoveryDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchItemDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5001/items/${id}`,
            { withCredentials: true }
          );
          setItem(response.data);
        } catch (error) {
          console.error("Error fetching item details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchItemDetails();
    }
  }, [id, user]);

  const handleRecoverItem = () => {
    setIsModalOpen(true);
  };

  const handleSubmitRecovery = async () => {
    const recoveryDetails = {
      itemId: item._id,
      title: item.title,
      recoveredBy: {
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
      },
      recoveredLocation,
      recoveryDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/recoverItem",
        recoveryDetails,
        { withCredentials: true }
      );

      if (response.data.success) {
        setIsModalOpen(false);
        Swal.fire({
          title: "Success!",
          text: "Item has been marked as recovered.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/all-recovered");
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error recovering item:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to recover item. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-lg"></span>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="text-center mt-10 text-gray-500">Item not found</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 shadow-md rounded-lg my-10">
      <Helmet>
        <title>Item Details | WhereIsIt</title>
      </Helmet>
      <div className="mb-6">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-72 object-cover rounded-lg shadow-sm"
        />
      </div>
      <div className="p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          {item.title}
        </h1>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <MdDescription className="text-xl text-blue-500" />
            <p className="text-lg font-medium">Description:</p>
            <p className="text-gray-700">{item.description || "N/A"}</p>
          </div>
          <div className="flex items-center space-x-2">
            <MdCategory className="text-xl text-green-500" />
            <p className="text-lg font-medium">Category:</p>
            <p className="text-gray-700">{item.category || "N/A"}</p>
          </div>
          <div className="flex items-center space-x-2">
            <MdLocationOn className="text-xl text-red-500" />
            <p className="text-lg font-medium">Location:</p>
            <p className="text-gray-700">{item.location || "N/A"}</p>
          </div>
          <div className="flex items-center space-x-2">
            <MdDateRange className="text-xl text-purple-500" />
            <p className="text-lg font-medium">Date Lost/Found:</p>
            <p className="text-gray-700">
              {new Date(item.date).toLocaleDateString("en-US")}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <MdContactPhone className="text-xl text-yellow-500" />
            <p className="text-lg font-medium">Contact Information:</p>
            <p className="text-gray-700">{item.contactInfo || "N/A"}</p>
          </div>
        </div>
        <div className="mt-6">
          {item.status !== "recovered" ? (
            <button
              onClick={handleRecoverItem}
              className="w-full py-3 btn bg-gradient-to-r from-green-400 to-blue-500 text-white text-xl font-bold hover:from-green-500 hover:to-blue-600 transition duration-300 rounded-lg "
            >
              {item.type === "lost" ? "Found This!" : "This is Mine!"}
            </button>
          ) : (
            <button
              className="w-full py-3 bg-gray-400 text-white font-bold rounded-lg"
              disabled
            >
              Already Recovered
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-2xl font-bold mb-4">Recover Item</h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Recovered Location:
                </label>
                <input
                  type="text"
                  value={recoveredLocation}
                  onChange={(e) => setRecoveredLocation(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Recovery Date:
                </label>
                <ReactDatePicker
                  selected={recoveryDate}
                  onChange={(date) => setRecoveryDate(date)}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Recovered By:
                </label>
                <input
                  type="text"
                  value={`${user.displayName} (${user.email})`}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>
              <div className="modal-action">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitRecovery}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
