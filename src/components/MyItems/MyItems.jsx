import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import axios from "axios";

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      const fetchItems = async () => {
        try {
          const response = await axios.get(
            `https://whereisit-sigma.vercel.app/myItems/${user.email}`,
            { withCredentials: true }
          );
          setItems(response.data);
        } catch (error) {
          console.error("Error fetching items:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchItems();
    }
  }, [user]);

  const handleUpdate = (itemId) => {
    navigate(`/updateItem/${itemId}`);
  };

  const handleDelete = async (itemId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://whereisit-sigma.vercel.app/deleteItem/${itemId}`
        );

        if (response.status === 200) {
          Swal.fire("Deleted!", "The item has been deleted.", "success");
          setItems(items.filter((item) => item._id !== itemId));
        } else {
          Swal.fire("Failed!", "Failed to delete item.", "error");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        Swal.fire(
          "Failed!",
          "An error occurred while deleting the item.",
          "error"
        );
      }
    }
  };

  return (
    <div className="container mx-auto p-6 my-10 min-h-[60vh]">
      <Helmet>
        <title>My Items | Lost & Found</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6">My Items</h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : items.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-gray-200">Title</th>
                <th className="border px-4 py-2 bg-gray-200">Type</th>
                <th className="border px-4 py-2 bg-gray-200">Category</th>
                <th className="border px-4 py-2 bg-gray-200">Location</th>
                <th className="border px-4 py-2 bg-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={item._id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border px-4 py-2 text-center">{item.title}</td>
                  <td className="border px-4 py-2 text-center">{item.type}</td>
                  <td className="border px-4 py-2 text-center">
                    {item.category}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {item.location}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleUpdate(item._id)}
                      className="btn bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition duration-300  px-3 py-1 mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn bg-red-500 text-white px-3 py-1 hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          You have not added any items yet.
        </p>
      )}
    </div>
  );
};

export default MyItems;
