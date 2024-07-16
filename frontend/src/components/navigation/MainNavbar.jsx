import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./MainNavbar.module.css";

const MainNavbar = () => {
  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        <div className={classes.routes}>
          <li className={classes.item}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Feed
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink
              to="add-new-car"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Add New Car
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink
              to="record"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Record
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink
              to="show-and-sort-vehicles"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Show & Sort
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink
              to="additional-expenses"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Additional Expenses
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink
              to="all-reverses-by-client"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Client's reverses
            </NavLink>
          </li>
        </div>
          <li className={classes.item}>
            <NavLink
              to="auth"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Auth
            </NavLink>
          </li>
      </ul>
    </nav>
  );
};

export default MainNavbar;
