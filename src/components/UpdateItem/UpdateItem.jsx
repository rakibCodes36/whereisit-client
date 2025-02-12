import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";

const UpdateItem = () => {
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "",
    image: "",
    title: "",
    description: "",
    category: "",
    location: "",
    date: new Date(),
    contactInfo: "",
    userEmail: "",
    userName: "",
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/items/${id}`,
          {
            withCredentials: true,
          }
        );

        setFormData({
          ...response.data,
          date: new Date(response.data.date),
          contactInfo: `${response.data.userName}, ${response.data.userEmail}`,
        });
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, date }));
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5001/updateItem/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.message === "Item updated successfully") {
        Swal.fire({
          title: "Success!",
          text: "Item updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/my-items");
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message || "Failed to update the item.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error updating item:", error);
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          error.message ||
          "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to update your items.</div>;
  }

  return (
    <div className="max-w-4xl lg:mx-auto p-8 bg-blue-200 shadow rounded-md my-14 mx-4">
      <Helmet>
        <title>Update Item | WhereIsIt</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-8 text-center">Update Item</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Post Type</span>
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Thumbnail (Image Upload)</span>
          </label>
          <div
            {...getRootProps()}
            className={`input input-bordered w-full h-32 flex items-center justify-center border-dashed relative ${
              isDragActive ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {formData.image ? (
              <img
                src={formData.image}
                alt="Uploaded"
                className="absolute inset-0 w-20 h-20 object-cover rounded"
              />
            ) : isDragActive ? (
              <p>Drop the image here...</p>
            ) : (
              <p>Drag & drop an image, or click to select one</p>
            )}
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter item title"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., pets, documents, gadgets"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location where the item was lost or found"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Date Lost or Found</span>
          </label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Contact Information</span>
          </label>
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="btn bg-gradient-to-r from-green-400 to-blue-500 text-white w-full text-xl font-bold hover:from-green-500 hover:to-blue-600 transition duration-300"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
