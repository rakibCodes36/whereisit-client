import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaListAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTags,
} from "react-icons/fa";

const LatestFindLost = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        const response = await axios.get("http://localhost:5001/recentItems");
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recent items:", error);
        setLoading(false);
      }
    };
    fetchRecentItems();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mb-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 mt-14 text-gray-800">
        Latest Found and Lost Items
      </h2>

      {loading ? (
        <div className="flex items-center justify-center">
          <span className="loading loading-lg loading-spinner text-blue-500"></span>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">No items found</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-sm mt-2 flex items-center gap-2">
                    <FaTags className="text-white" /> {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <FaMapMarkerAlt className="text-white" /> {item.location}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <FaCalendarAlt className="text-white" /> {new Date(item.date).toLocaleDateString("en-US")}
                  </p>
                  <p className="text-sm mt-2">{item.description}</p>
                  <div className="mt-6 text-center flex justify-center">
                    <button
                      onClick={() => navigate(`/items/${item._id}`)}
                      className="px-4 py-2 bg-white text-blue-600 font-semibold rounded flex items-center justify-center gap-2 hover:bg-gray-100"
                    >
                      <FaEye /> View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 flex justify-center">
            <button
              onClick={() => navigate("/all-items")}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded flex items-center justify-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition duration-300"
            >
              <FaListAlt /> See All
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LatestFindLost;
