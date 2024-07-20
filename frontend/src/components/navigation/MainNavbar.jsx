import React from "react";
import { NavLink } from "react-router-dom";
import { PiCarSimpleFill } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRecordVinyl, FaSortAlphaDown } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";
import { FaBraveReverse } from "react-icons/fa6";
import { CiLogin } from "react-icons/ci";

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
              <PiCarSimpleFill title="Feed" />
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink
              to="add-new-car"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <IoIosAddCircleOutline title="Add New Car" />
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink
              to="record"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <FaRecordVinyl title="Record" />
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink
              to="show-and-sort-vehicles"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <FaSortAlphaDown title="Show & Sort" />
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink
              to="additional-expenses"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <GiExpense title="Additional Expenses" />
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink
              to="all-reverses-by-client"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <FaBraveReverse title="Client's reverses" />
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
            <CiLogin title="Authenticate" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavbar;
