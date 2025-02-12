import { useEffect, useState } from "react";
import axios from "axios";

const ItemCounts = () => {
  const [counts, setCounts] = useState({
    lostCount: 0,
    foundCount: 0,
    recoveredCount: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/itemCounts");
        setCounts(response.data);
      } catch (error) {
        console.error("Failed to fetch item counts", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Item Counts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold">Lost Items</h3>
          <p className="text-3xl font-semibold mt-2">{counts.lostCount}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold">Found Items</h3>
          <p className="text-3xl font-semibold mt-2">{counts.foundCount}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold">Recovered Items</h3>
          <p className="text-3xl font-semibold mt-2">{counts.recoveredCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCounts;
