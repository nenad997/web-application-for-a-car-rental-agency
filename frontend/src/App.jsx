import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout, {
  loader as rootLoader,
} from "./components/layouts/RootLayout";
import Feed, { loader as carsLoader } from "./routes/Feed";
import AddNewCar, {
  action as addNewCarAction,
  loader as addNewCarLoader,
} from "./routes/AddNewCar";
import Record, { loader as recordLoader } from "./routes/Record";
import ShowAndSort from "./routes/ShowAndSort";
import AdditionalExpenses, {
  loader as additionalExpensesLoader,
} from "./routes/AdditionalExpenses";
import ClientReverses, {
  loader as clientReversesLoader,
} from "./routes/ClientReverses";
import CarDetails, {
  loader as carDetailsLoader,
  action as toggleRentAction,
} from "./routes/CarDetails";
import Edit, {
  action as editCarAction,
  loader as editCarLoader,
} from "./routes/Edit";
import Auth, { action as authAction } from "./routes/Auth";
import { getAuthToken } from "./util/authorization";
import LoggedInUser, {
  action as editUserAction,
} from "./components/user/LoggedInUser";
import ProfilePage, { loader as userLoader } from "./routes/Profile";
import ErrorPage from "./components/ui/Error";
import { logout } from "./actions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    id: "root",
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
        loader: addNewCarLoader,
      },
      {
        path: "record",
        element: <Record />,
        loader: recordLoader,
      },
      {
        path: "show-and-sort-vehicles",
        element: <ShowAndSort />,
      },
      {
        path: "additional-expenses",
        element: <AdditionalExpenses />,
        loader: additionalExpensesLoader,
      },
      {
        path: "all-reverses-by-client",
        element: <ClientReverses />,
        loader: clientReversesLoader,
      },
      {
        path: "car/:carId",
        element: <CarDetails />,
        loader: carDetailsLoader,
        action: toggleRentAction,
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
        action: authAction,
      },
      {
        path: "profile",
        element: <ProfilePage />,
        loader: userLoader,
        id: "profile-root",
        children: [
          {
            path: "user",
            element: <LoggedInUser />,
            action: editUserAction,
          },
        ],
      },
      {
        path: "logout",
        action: logout,
      },
    ],
  },
]);

const App = () => {
  useEffect(() => {
    getAuthToken();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
