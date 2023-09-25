import { Fragment, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import "bootstrap/dist/css/bootstrap.min.css";
import DialogBox from "./DialogBox";

const Navbar = ({ navbarTitle, navigateTo, component }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogOutClick = () => {
    navigate("/");
    sessionStorage.clear();
  };
  const navButton = useRef(null);
  const linksContainerRef = useRef(null);

  const collapseNav = () => {
    navButton.current.classList.add("collapsed");
    linksContainerRef.current.classList.remove("show");
  };
  // navbar close automatically
  return (
    <div>
      {" "}
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light border-bottom p-3 fs-5">
        <Link
          onClick={collapseNav}
          to={`/${JSON.parse(sessionStorage.getItem("user-info"))?.role}`}
          className="navbar-brand mx-5"
        >
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
            {Object.entries(navbarTitle).map(([key, value], index) => {
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
            buttonText={"Log Out "}
            onClick={handleShow}
          />
          <DialogBox
            title={"Log out ExamDemo!!"}
            body={"Woohoo, Are you sure you want to log out !"}
            show={show}
            handleClose={handleClose}
            action={handleLogOutClick}
            buttonText1={"Yes ✅"}
            buttonText2={"No ❌"}
          />
        </div>
      </nav>
      <>{component}</>
    </div>
  );
};

export default Navbar;
