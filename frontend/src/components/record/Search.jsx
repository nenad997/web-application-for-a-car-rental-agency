import React, { useState, useEffect } from "react";

import classes from "./Search.module.css";
import User from "./User";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  const inputChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (!searchTerm) {
      return;
    }

    const timer = setTimeout(() => {
      fetch(`http://localhost:3000/api/rents?idCardNumber=${searchTerm}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }
          return response.json();
        })
        .then((responseData) => {
          setUsers(responseData.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm) {
      setUsers([]);
    }
  }, [searchTerm]);

  return (
    <>
      <div className={classes.control}>
        <input
          type="text"
          placeholder="Search user..."
          onChange={inputChangeHandler}
          value={searchTerm}
        />
      </div>
      <div className={classes.wrapper}>
        {users.length > 0 ? (
          <ul className={classes.list}>
            {users.map((user) => (
              <User
                key={user._id}
                username={user.rentedBy.username}
                idCardNumber={user.rentedBy.id_card_number}
                carData={{
                  make: user.vehicleMake,
                  model: user.vehicleModel,
                }}
              />
            ))}
          </ul>
        ) : (
          <p className={`center ${classes.fallback}`}>No data</p>
        )}
      </div>
    </>
  );
};

export default Search;
