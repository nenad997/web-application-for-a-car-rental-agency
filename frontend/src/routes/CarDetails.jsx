import React from "react";

import Details from "../components/car/CarDetails";

const CarDetails = () => {
  return <Details />;
};

export default CarDetails;

export async function loader({ params }) {
  const { carId } = params;
}
