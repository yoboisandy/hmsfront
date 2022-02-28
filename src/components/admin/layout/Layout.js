import React from "react";
import { Link, NavLink } from "react-router-dom";
const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-indigo navbar-dark text-white">
        <ul className="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button">
              <i class="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/admin" className="nav-link">
              Home
            </Link>
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
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {/* {user.name} */}
              sandeep
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="/">
                <i class="nav-icon mr-2 fas fa-user-alt"></i>
                Profile
              </a>
              <a class="dropdown-item" href="/">
                <i class="fas fa-power-off mr-2"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
      {/* SideBar */}
      <aside className="main-sidebar sidebar-light-indigo elevation-4">
        <Link to="/admin" className="brand-link">
          <img
            src="/logo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle "
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">Rise-n-Shine</span>
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
                  to="/admin/dashboard"
                  exact="true"
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className="nav-icon mr-3 fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </NavLink>
              </li>
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
                  to="/admin/categories"
                  className="nav-link "
                  activeClassName="active"
                >
                  <i className="nav-icon mr-3 fas fa-list" />
                  <p>Categories</p>
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  to="/admin/employees"
                  className="nav-link "
                  activeClassName="active"
                >
                  <i className="nav-icon mr-3 fas fa-list" />
                  <p>Employees</p>
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  to="/admin/guests"
                  className="nav-link "
                  activeClassName="active"
                >
                  <i className="nav-icon mr-3 fas fa-list" />
                  <p>Guests</p>
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
                  to="/admin/types"
                  className="nav-link "
                  activeClassName="active"
                >
                  <i className="nav-icon mr-3 fas fa-list" />
                  <p>Types</p>
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  to="/admin/sets"
                  className="nav-link "
                  activeClassName="active"
                >
                  <i className="nav-icon mr-3 fas fa-list" />
                  <p>Sets</p>
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
