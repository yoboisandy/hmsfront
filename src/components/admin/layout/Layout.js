import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import FullLoadingContext from "../../../contexts/FullLoadingContext";
import UserContext from "../../../contexts/UserContext";
// import canView from "../permissions";

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

          <li className="nav-item dropdown">
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
          </li>
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
                  to="/admin/"
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className="nav-icon mr-3 fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </NavLink>
              </li>
              {/* {canView("customers") && (
                <li className="nav-item mb-2">
                  <NavLink
                    to="/admin/customers"
                    className="nav-link "
                    activeClassName="active"
                  >
                    <i className="nav-icon mr-3 fas fa-users" />
                    <p>Customers</p>
                  </NavLink>
                </li>
              )} */}
              <li className="nav-item mb-2">
                <NavLink
                  to="/admin/customers"
                  className="nav-link "
                  activeClassName="active"
                >
                  <i className="nav-icon mr-3 fas fa-users" />
                  <p>Customers</p>
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  to="/admin/employees"
                  className="nav-link "
                  activeClassName="active"
                >
                  <i className="fas fa-user-tie nav-icon mr-3"></i>
                  <p>Employees</p>
                </NavLink>
              </li>

              <li className="nav-item mb-2">
                <NavLink
                  to="/admin/halls"
                  className="nav-link "
                  activeClassName="active"
                >
                  <i className="nav-icon mr-3 fas fa-list" />
                  <p>Halls</p>
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  to="/admin/rooms"
                  className="nav-link "
                  activeClassName="active"
                >
                  <i className="nav-icon mr-3 fas fa-bed" />
                  <p>Rooms</p>
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  to="/admin/roomtypes"
                  className="nav-link "
                  activeClassName="active"
                >
                  <i className="nav-icon mr-3 fas fa-bed" />
                  <p>Room Types</p>
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  to="/admin/shifts"
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className="nav-icon mr-3 fas fa-sun" />
                  <p>Shifts</p>
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  to="/admin/roles"
                  className="nav-link "
                  activeClassName="active"
                >
                  <i className="nav-icon mr-3 fas fa-user" />
                  <p>Roles</p>
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  to="/admin/departments"
                  className="nav-link "
                  activeClassName="active"
                >
                  <i className="nav-icon mr-3 fas fa-building" />
                  <p>Departments</p>
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  to="/admin/floors"
                  className="nav-link "
                  activeClassName="active"
                >
                  <i className="nav-icon mr-3 fas fa-building" />
                  <p>Floors</p>
                </NavLink>
              </li>
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
