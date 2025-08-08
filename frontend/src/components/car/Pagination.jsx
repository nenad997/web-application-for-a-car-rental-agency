import React from "react";

import classes from "./Pagination.module.css";

const CarPagination = ({ isDisabled, onLoadMore }) => {
  return (
    <div className={classes.wrapper}>
      <button
        disabled={isDisabled}
        onClick={onLoadMore}
        className={classes.button}
        style={{
          backgroundColor: isDisabled ? "lightgreen" : "green",
          cursor: isDisabled ? "not-allowed" : "pointer",
        }}
      >
        Load More
      </button>
    </div>
  );
};

export default CarPagination;
