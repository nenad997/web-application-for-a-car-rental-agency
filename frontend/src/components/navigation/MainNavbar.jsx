import React from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { PiCarSimpleFill } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRecordVinyl, FaSortAlphaDown } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";
import { FaBraveReverse } from "react-icons/fa6";
import { CiLogin } from "react-icons/ci";

import classes from "./MainNavbar.module.css";

const MainNavbar = () => {
  const token = useLoaderData();

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
              <PiCarSimpleFill />
              <span>Feed</span>
            </NavLink>
          </li>
          {token && (
            <>
              <li className={classes.item}>
                <NavLink
                  to="add-new-car"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  <IoIosAddCircleOutline />
                  <span>Add New Car</span>
                </NavLink>
              </li>
              <li className={classes.item}>
                <NavLink
                  to="record"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  <FaRecordVinyl />
                  <span>Record</span>
                </NavLink>
              </li>
            </>
          )}
          <li className={classes.item}>
            <NavLink
              to="show-and-sort-vehicles"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <FaSortAlphaDown />
              <span>Show & Sort</span>
            </NavLink>
          </li>
          {token && (
            <>
              <li className={classes.item}>
                <NavLink
                  to="additional-expenses"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  <GiExpense />
                  <span>Additional Expenses</span>
                </NavLink>
              </li>
              <li className={classes.item}>
                <NavLink
                  to="all-reverses-by-client"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  <FaBraveReverse />
                  <span>Client's reverses</span>
                </NavLink>
              </li>
            </>
          )}
        </div>
        <li className={classes.item}>
          <NavLink
            to="auth?mode=login"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <CiLogin />
            <span>{token ? "Profile" : "Auth"}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavbar;
