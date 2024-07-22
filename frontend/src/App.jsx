import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/layouts/RootLayout";
import Feed, { loader as carsLoader } from "./routes/Feed";
import AddNewCar, { action as addNewCarAction } from "./routes/AddNewCar";
import Record from "./routes/Record";
import ShowAndSort from "./routes/ShowAndSort";
import AdditionalExpenses from "./routes/AdditionalExpenses";
import ClientReverses from "./routes/ClientReverses";
import CarDetails, { loader as carDetailsLoader } from "./routes/CarDetails";
import Edit, {
  action as editCarAction,
  loader as editCarLoader,
} from "./routes/Edit";
import Auth from "./routes/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Feed />,
        loader: carsLoader,
      },
      {
        path: "add-new-car",
        element: <AddNewCar />,
        action: addNewCarAction,
      },
      {
        path: "record",
        element: <Record />,
      },
      {
        path: "show-and-sort-vehicles",
        element: <ShowAndSort />,
      },
      {
        path: "additional-expenses",
        element: <AdditionalExpenses />,
      },
      {
        path: "all-reverses-by-client",
        element: <ClientReverses />,
      },
      {
        path: "car/:carId",
        element: <CarDetails />,
        loader: carDetailsLoader,
      },
      {
        path: "edit/:carId",
        element: <Edit />,
        loader: editCarLoader,
        action: editCarAction,
      },
      {
        path: "auth",
        element: <Auth />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
