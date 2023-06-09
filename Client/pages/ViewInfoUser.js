import React from "react";

export default function ViewInfoUser({ user }) {
  return (
    <div>
      <p>&emsp; name: {user.name}</p>
      <p>&emsp; user name: {user.username}</p>
      <p>&emsp; email: {user.email}</p>
      <p>&emsp; phone: {user.phone}</p>
      <p>&emsp; website: {user.website}</p>
      <p>&emsp; address:</p>
      <p>
      &emsp;&emsp;street: {user.address.street}
        <br />
        &emsp;&emsp;suite: {user.address.suite}
        <br />
        &emsp;&emsp;city: {user.address.city}
        <br />
        &emsp;&emsp;zipcode: {user.address.zipcode}
        <br />
        &emsp;&emsp;geo: lat: {user.address.geo.lat} &emsp;lng: {user.address.geo.lng}
      </p>
      <p>&emsp; company:</p>
      <p>
      &emsp;&emsp;name: {user.company.name}
        <br />
        &emsp;&emsp;catchPhrase: {user.company.catchPhrase}
        <br />
        &emsp;&emsp;bs: {user.company.bs}
      </p>
    </div>
  );
};

