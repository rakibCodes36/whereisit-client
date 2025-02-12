import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaMapMarkerAlt, FaCalendarAlt, FaTags } from "react-icons/fa";
import { Helmet } from "react-helmet";

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    axios
      .get("https://whereisit-sigma.vercel.app/allItems")
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="max-w-6xl mx-auto my-16 px-4">
      <Helmet>
        <title>All Lost or Found Items | WhereIsIt</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Lost and Found Items
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <span className="loading loading-lg loading-spinner text-blue-500"></span>
        </div>
      ) : (
        <>
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full sm:w-2/3 lg:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center mt-10 text-gray-500">
              No items found
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((item) => (
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
                      <h2 className="text-2xl font-bold">{item.title}</h2>
                      <p className="text-sm mt-2 flex items-center gap-2">
                        <FaTags className="text-white" />{" "}
                        <strong className="mr-1">Type:</strong>
                        {item.type}
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <FaMapMarkerAlt className="text-white" />
                        <strong className="mr-1">Location:</strong>{" "}
                        {item.location}
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <FaCalendarAlt className="text-white" />{" "}
                        <strong className="mr-1">Date:</strong>
                        {new Date(item.date).toLocaleDateString("en-US")}
                      </p>
                      <div className="mt-6 text-center flex justify-center">
                        <Link
                          to={`/items/${item._id}`}
                          className="px-4 py-2 bg-white text-blue-600 font-semibold rounded flex items-center justify-center gap-2 hover:bg-gray-100"
                        >
                          <FaEye /> View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`px-4 py-2 mx-1 rounded ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 mx-1 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`px-4 py-2 mx-1 rounded ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AllItems;