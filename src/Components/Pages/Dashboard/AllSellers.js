import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";

import { AuthContext } from "../../../Context/UserContext";

const AllSellers = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.email);
  const { data: users = [], refetch } = useQuery({
    queryKey: ["sellerProducts"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/allsellers?role=seller`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (error) { }
    },
  });

  const handleDelete = (id) => {
    const proceed = window.confirm("Do you want to delete this seller?");
    if (proceed) {
      fetch(`http://localhost:5000/users/delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Seller Deleted Successfully");
            refetch();
          }
        });
    }
  };
  const handleverify = (id) => {
    fetch(`http://localhost:5000/users/verify/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Seller verified Sucessfully");
          refetch();
        }
      });
  };
  return (
    <div>
      <h2 className="text-3xl">All Sellers</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-xs btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSellers;
