import { Link } from "react-router-dom";
import "../App.css";
const SideBar = (props, { component }) => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 custom-bg">
          <div className="d-flex flex-column align-items-center  pt-2 text-white min-vh-100">
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center"
              id="menu"
            >
              {Object.values(props).map((item, index) => {
                return (
                  <li className="m-5 text-light " key={index}>
                    <Link
                      className="forgotpass_link"
                      to={`${item.replace(/\s/g, "").toLowerCase()}`}
                    >
                      {item.toUpperCase()}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col py-3">{component}</div>
      </div>
    </div>
  );
};

export default SideBar;
