import React from "react";

const SideBar = (props) => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 bg-secondary">
          <div className="d-flex flex-column align-items-center  pt-2 text-white min-vh-100">
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center"
              id="menu"
            >
              <li className="m-5 text-light">{props.title1}</li>
              <li className="m-5 text-light">{props.title2}</li>
              <li className="m-5 text-light">{props.title3}</li>
            </ul>
          </div>
        </div>
        <div className="col py-3">Welcome Back</div>
      </div>
    </div>
  );
};

export default SideBar;
