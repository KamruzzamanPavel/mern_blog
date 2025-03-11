import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/api/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        users.map((user) => (
          <div key={user._id} className="border p-4 rounded mb-2">
            <h3 className="font-semibold">{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Users;
