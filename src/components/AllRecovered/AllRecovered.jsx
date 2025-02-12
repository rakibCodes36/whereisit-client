import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MdLocationOn,
  MdDateRange,
  MdPerson,
  MdTableRows,
} from "react-icons/md";
import { Helmet } from "react-helmet";
import { RiLayoutGrid2Fill } from "react-icons/ri";

const AllRecovered = () => {
  const { user, loading } = useContext(AuthContext);
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState("cards"); // Default to card view
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchRecoveredItems = async () => {
      try {
        const response = await axios.get(
          "https://whereisit-sigma.vercel.app/allRecovered",
          {
            withCredentials: true,
          }
        );
        const userItems = response.data.filter(
          (item) => item.recoveredBy.email === user.email
        );
        setRecoveredItems(userItems);
      } catch (error) {
        console.error("Failed to fetch recovered items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecoveredItems();
  }, [user, navigate]);

  if (loading || isLoading) {
    return (
      <div className="flex flex-col items-center min-h-[70vh]">
        <h1 className="text-3xl font-bold mb-4">All Recovered Items</h1>
        <span className="loading loading-lg text-blue-500"></span>
      </div>
    );
  }

  if (recoveredItems.length === 0) {
    return (
      <div className="text-center mt-20 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">
          No recovered items found.
        </h2>
        <p className="text-gray-500">You have not recovered any items yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh]">
      <Helmet>
        <title>All Recovered Items | WhereIsIt</title>
      </Helmet>
      <div className="max-w-6xl mx-4 lg:mx-auto my-14 px-6 py-10 bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          All Recovered Items
        </h1>
        <div className="flex justify-end items-center gap-4 mb-4">
          <RiLayoutGrid2Fill
            onClick={() => setLayout("cards")}
            className={`cursor-pointer text-3xl ${
              layout === "cards" ? "text-blue-600" : "text-gray-400"
            } hover:text-blue-500 transition duration-300`}
          />
          <MdTableRows
            onClick={() => setLayout("table")}
            className={`cursor-pointer text-3xl ${
              layout === "table" ? "text-blue-600" : "text-gray-400"
            } hover:text-blue-500 transition duration-300`}
          />
        </div>

        {layout === "table" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Title
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Recovered Location
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Recovered Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Recovered By
                  </th>
                </tr>
              </thead>
              <tbody>
                {recoveredItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {item.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.recoveredLocation}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(item.recoveryDate).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.recoveredBy.name} ({item.recoveredBy.email})
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recoveredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {item.title}
                  </h2>
                  <div className="flex items-center space-x-2 mt-2">
                    <MdLocationOn className="text-xl text-red-500" />
                    <p className="text-sm text-gray-600">
                      <strong> Recovered Location:</strong>{" "}
                      {item.recoveredLocation}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <MdDateRange className="text-xl text-purple-500" />
                    <p className="text-sm text-gray-600">
                      <strong>Recovered Date:</strong>{" "}
                      {new Date(item.recoveryDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <MdPerson className="text-xl text-blue-500" />
                    <p className="text-sm text-gray-600">
                      <strong>Recovered By:</strong> {item.recoveredBy.name} (
                      {item.recoveredBy.email})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRecovered;
