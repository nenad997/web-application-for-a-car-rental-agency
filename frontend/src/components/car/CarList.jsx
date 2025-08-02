import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import CarArticle from "./CarArticle";
import Pagination from "./Pagination";
import classes from "./CarList.module.css";
import { selectFeedState } from "../../store";

const CarList = () => {
  const [limitValue, setLimitValue] = useState(2);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, error } = useSelector(selectFeedState);

  const buttonBehaviour = limitValue < data?.total;

  const loadMoreDataHandler = () => {
    setLimitValue((curLimit) =>
      curLimit < data?.total ? curLimit + 2 : curLimit
    );
  };

  useEffect(() => {
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.set("limit", limitValue);
    setSearchParams(updatedParams);
  }, [searchParams, limitValue]);

  if (!data || data.length === 0) {
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

  if (error) {
    return <p className={classes.center}>{error}</p>;
  }

  if (isLoading) {
    return <p className={classes.center}>Loading...</p>;
  }

  return (
    <>
      <ul className={classes.list}>
        {data.data.map((item) => (
          <li key={item._id}>
            <CarArticle
              id={item._id}
              title={`${item.vehicleMake} - ${item.vehicleModel}`}
              imageUrl={`http://localhost:3000${item.image}`}
              price={item.price}
              isAvailable={item.available}
            />
          </li>
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
