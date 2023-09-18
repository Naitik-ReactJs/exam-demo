import React, { Fragment } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import Button from "./Button";

const Navbar = ({ navBarProps, navigateTo, component }) => {
  const navigate = useNavigate();
  const handleLogOutClick = () => {
    navigate("/");
    sessionStorage.clear();
  };
  const navButton = useRef(null);
  const linksContainerRef = useRef(null);

  function collapseNav() {
    navButton.current.classList.add("collapsed");
    linksContainerRef.current.classList.remove("show");
  }
  // navbar close automatically
  return (
    <div>
      {" "}
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom p-3 fs-5">
        <Link onClick={collapseNav} to="/" className="navbar-brand mx-5">
          <i className="fa-solid fa-book"></i> Exam-demo
        </Link>
        <button
          ref={navButton}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          ref={linksContainerRef}
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav m-auto">
            {" "}
            {Object.entries(navBarProps).map(([key, value], index) => {
              return (
                <Fragment key={index}>
                  <li className="nav-item mx-5 ms-3 " key={index}>
                    <NavLink
                      className="nav-link"
                      onClick={collapseNav}
                      to={
                        index !== 0
                          ? `/${navigateTo}/${value
                              .replace(/\s/g, "-")
                              .toLowerCase()}`
                          : `/${navigateTo}`
                      }
                    >
                      {value[0].toUpperCase() + value.slice(1)}
                    </NavLink>
                  </li>
                </Fragment>
              );
            })}
          </ul>
          <Button
            className={"btn btn-danger mt-3 mb-4 me-5"}
            type="submit"
            buttonText={"Log Out"}
            onClick={handleLogOutClick}
          />
        </div>
      </nav>
      <>{component}</>
    </div>
  );
};

export default Navbar;