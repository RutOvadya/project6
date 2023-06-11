import React from "react";

export default function ViewInfoUser({ user }) {
  return (
    <div>
      <p>&emsp; name: {user.name}</p>
      <p>&emsp; user name: {user.username}</p>
      <p>&emsp; email: {user.email}</p>
      <p>&emsp; phone: {user.phone}</p>
      <p>&emsp; address: {user.address}</p>
    </div>
  );
};

