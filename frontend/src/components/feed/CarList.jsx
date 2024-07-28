import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";

import Car from "./Car";
import Pagination from "./Pagination";
import classes from "./CarList.module.css";

const CarList = () => {
  const loaderData = useLoaderData();
  const [limitValue, setLimitValue] = useState(2);
  const [_, setSearchParams] = useSearchParams();

  const data = loaderData?.data ? loaderData.data : [];
  const buttonBehaviour = limitValue < loaderData?.total;

  const loadMoreDataHandler = () => {
    setLimitValue((curLimit) =>
      curLimit < loaderData?.total ? curLimit + 2 : curLimit
    );
  };

  useEffect(() => {
    setSearchParams({ limit: limitValue });
  }, [setSearchParams, limitValue]);

  if (!data) {
    return (
      <div className={classes.fallback}>
        <h1>Failed to fetch data</h1>
        <p>Something went wrong, please try again later</p>
      </div>
    );
  }

  if (data && data.length === 0) {
    return (
      <div className={classes.fallback}>
        <h1>Nothing to show here</h1>
        <p>Start adding some cars</p>
        <Link to="add-new-car" title="Start adding...">
          Add
        </Link>
      </div>
    );
  }

  return (
    <>
      <ul className={classes.list}>
        {data.map((item) => (
          <Car
            key={item._id}
            id={item._id}
            title={`${item.vehicleMake} - ${item.vehicleModel}`}
            imageUrl={item.imageUrl}
            price={item.price}
            isAvailable={item.available}
          />
        ))}
      </ul>
      <Pagination
        isDisabled={!buttonBehaviour}
        onLoadMore={loadMoreDataHandler}
      />
    </>
  );
};

export default CarList;
