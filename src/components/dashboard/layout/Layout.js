import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import FullLoadingContext from "../../../contexts/FullLoadingContext";
import UserContext from "../../../contexts/UserContext";
import canView from "../permissions";

const Layout = ({ children }) => {
  const [user] = useContext(UserContext);
  return (
    <div className="wrapper">
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-indigo navbar-dark text-white">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/" className="nav-link">
              Back To Site
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <span
              className="nav-link"
              data-widget="navbar-search"
              role="button"
            >
              <i className="fas fa-search" />
            </span>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                    <button
                      className="btn btn-navbar"
                      type="button"
                      data-widget="navbar-search"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>

          {user.role && (
            <li className="nav-item d-none d-sm-inline-block">
              <a href="/logout" className="nav-link">
                <i className="fas mr-1 fa-power-off"></i> LogOut
              </a>
            </li>
          )}
          {/* <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {user && user.name}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/">
                <i className="nav-icon mr-2 fas fa-user-alt"></i>
                Profile
              </a>
              <a className="dropdown-item" href="/logout">
                <i className="fas fa-power-off mr-2"></i>
                Logout
              </a>
            </div>
          </li> */}
        </ul>
      </nav>
      {/* SideBar */}
      <aside className="main-sidebar sidebar-light-indigo elevation-4">
        <Link to="/" className="brand-link">
          <img
            src="/logo1.png"
            alt="AdminLTE Logo"
            className="brand-image "
            style={{ opacity: ".8", width: "170px" }}
          />
          {/* <span className="brand-text font-weight-light">Rise-n-Shine</span> */}
        </Link>
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column "
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item my-2">
                <NavLink
                  to="/dashboard/"
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className="nav-icon mr-3 fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </NavLink>
              </li>
              {canView("bookings", user.role) && (
                <li className="nav-item mb-2">
                  <NavLink
                    to="/dashboard/bookings"
                    className="nav-link "
                    activeClassName="active"
                  >
                    <i className="nav-icon mr-3 fas fa-check-square" />
                    <p>Room Bookings</p>
                  </NavLink>
                </li>
              )}
              {canView("hallbookings", user.role) && (
                <li className="nav-item mb-2">
                  <NavLink
                    to="/dashboard/hallbookings"
                    className="nav-link "
                    activeClassName="active"
                  >
                    <i className="nav-icon mr-3 fas fa-check-square" />
                    <p>Hall Bookings</p>
                  </NavLink>
                </li>
              )}
              {canView("customers", user.role) && (
                <li className="nav-item mb-2">
                  <NavLink
                    to="/dashboard/customers"
                    className="nav-link "
                    activeClassName="active"
                  >
                    <i className="nav-icon mr-3 fas fa-users" />
                    <p>Customers</p>
                  </NavLink>
                </li>
              )}
              {canView("employees", user.role) && (
                <>
                  <li className="nav-item mb-2">
                    <NavLink
                      to="/dashboard/employees"
                      className="nav-link "
                      activeClassName="active"
                    >
                      <i className="fas fa-user-tie nav-icon mr-3"></i>
                      <p>Employees</p>
                    </NavLink>
                  </li>
                </>
              )}
              {canView("floors", user.role) && (
                <li className="nav-item mb-2">
                  <NavLink
                    to="/dashboard/floors"
                    className="nav-link "
                    activeClassName="active"
                  >
                    <i className="nav-icon mr-3 fas fa-home" />
                    <p>Floors</p>
                  </NavLink>
                </li>
              )}

              {canView("halls", user.role) && (
                <li className="nav-item mb-2">
                  <NavLink
                    to="/dashboard/halls"
                    className="nav-link "
                    activeClassName="active"
                  >
                    <i className="nav-icon mr-3 fas fa-couch" />
                    <p>Halls</p>
                  </NavLink>
                </li>
              )}
              {canView("amenities", user.role) && (
                <li className="nav-item mb-2">
                  <NavLink
                    to="/dashboard/amenities"
                    className="nav-link "
                    activeClassName="active"
                  >
                    <i className="nav-icon mr-3 fas fa-bath" />
                    <p>Amenities</p>
                  </NavLink>
                </li>
              )}
              {canView("rooms", user.role) && (
                <li className="nav-item mb-2">
                  <NavLink
                    to="/dashboard/rooms"
                    className="nav-link "
                    activeClassName="active"
                  >
                    <i className="nav-icon mr-3 fas fa-bed" />
                    <p>Rooms</p>
                  </NavLink>
                </li>
              )}
              {canView("roomtypes", user.role) && (
                <li className="nav-item mb-2">
                  <NavLink
                    to="/dashboard/roomtypes"
                    className="nav-link "
                    activeClassName="active"
                  >
                    <i className="nav-icon mr-3 fas fa-procedures" />
                    <p>Room Types</p>
                  </NavLink>
                </li>
              )}

              {canView("departments", user.role) && (
                <li className="nav-item mb-2">
                  <NavLink
                    to="/dashboard/departments"
                    className="nav-link "
                    activeClassName="active"
                  >
                    <i className="nav-icon mr-3 fas fa-briefcase" />
                    <p>Departments</p>
                  </NavLink>
                </li>
              )}
              {canView("roles", user.role) && (
                <li className="nav-item mb-2">
                  <NavLink
                    to="/dashboard/roles"
                    className="nav-link "
                    activeClassName="active"
                  >
                    <i className="nav-icon mr-3 fas fa-user-tag" />
                    <p>Roles</p>
                  </NavLink>
                </li>
              )}
              {canView("shifts", user.role) && (
                <li className="nav-item mb-2">
                  <NavLink
                    to="/dashboard/shifts"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="nav-icon mr-3 fas fa-sun" />
                    <p>Shifts</p>
                  </NavLink>
                </li>
              )}

              {canView("foods", user.role) && (
                <li className="nav-item mb-2">
                  <NavLink
                    to="/dashboard/foods"
                    className="nav-link "
                    activeClassName="active"
                  >
                    <i className="nav-icon mr-3 fas fa-utensils" />
                    <p>Food Items</p>
                  </NavLink>
                </li>
              )}
              {canView("foodorders", user.role) && (
                <li className="nav-item mb-2">
                  <NavLink
                    to="/dashboard/foodorders"
                    className="nav-link "
                    activeClassName="active"
                  >
                    <i className="nav-icon mr-3 fas fa-shopping-bag" />
                    <p>Food Orders</p>
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </aside>
      {/* Content */}
      <div className="content-wrapper">
        <section className="content py-5 px-2">
          <div className="container-fluid">{children}</div>
        </section>
      </div>
      {/* Footer */}
      <footer className="main-footer bg-navy">
        <strong>
          Copyright © 2014-2021
          <a href="/">Rise-n-Shine</a>.
        </strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 3.2.0
        </div>
      </footer>
    </div>
  );
};

export default Layout;
