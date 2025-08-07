import { getAllUsers } from "@/features/users/allUsersSlice";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

const Debouncing = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const debounceRef = useRef(null);

  // handle debouncing
  const handleSearch = (value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current); // clear previous timeout

    debounceRef.current = setTimeout(() => {
      dispatch(getAllUsers({ search: value }));
    }, 500);
  };

  // handle change
  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
    handleSearch(value);
  };

  return (
    <div className="w-full flex justify-center">
      {/* search box */}
      <input
        type="text"
        placeholder="Search user..."
        value={input}
        onChange={handleChange}
        className="w-full md:w-80 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition placeholder-gray-400 dark:placeholder-gray-500"
      />
    </div>
  );
};

export default Debouncing;
