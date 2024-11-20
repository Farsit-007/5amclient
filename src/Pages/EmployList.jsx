import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EmployList = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/get-user`);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Delete user by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {users.length === 0 ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Phone</th>
              <th className="border border-gray-300 p-2">Department</th>
              <th className="border border-gray-300 p-2">Position</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="text-center">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{user.userName}</td>
                <td className="border border-gray-300 p-2">{user.userEmail}</td>
                <td className="border border-gray-300 p-2">{user.userPhone}</td>
                <td className="border border-gray-300 p-2">
                  {user.department}
                </td>
                <td className="border border-gray-300 p-2">{user.position}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <Link
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    to={`/user-update/${user._id}`}
                  >
                    Update
                  </Link>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployList;
