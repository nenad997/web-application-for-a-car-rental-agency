import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/layouts/RootLayout";
import Feed from "./routes/Feed";
import AddNewCar from "./routes/AddNewCar";
import Record from "./routes/Record";
import ShowAndSort from "./routes/ShowAndSort";
import AdditionalExpenses from "./routes/AdditionalExpenses";
import ClientReverses from "./routes/ClientReverses";
import CarDetails from "./routes/CarDetails";
import Auth from "./routes/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: "add-new-car",
        element: <AddNewCar />,
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
