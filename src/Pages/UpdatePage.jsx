import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    // Fetch the user data by ID and populate the form
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/get-user/${id}`
        );
        console.log(data);
        if (data) {
          // Set form values
          setValue("userName", data.userName);
          setValue("userEmail", data.userEmail);
          setValue("userPhone", data.userPhone);
          setValue("deparment", data.deparment);
          setValue("position", data.position);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/update-user/${id}`,
        data
      );
      if (response.data.success) {
        alert("User updated successfully!");
        navigate("/users"); // Navigate back to user list
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium mb-2">Name</label>
          <input
            {...register("userName")}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter user name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-2">Email</label>
          <input
            {...register("userEmail")}
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter user email"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium mb-2">Phone</label>
          <input
            {...register("userPhone")}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter user phone"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block font-medium mb-2">Department</label>
          <input
            {...register("deparment")}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter department"
          />
        </div>

        {/* Position */}
        <div>
          <label className="block font-medium mb-2">Position</label>
          <select
            {...register("position")}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdatePage;
