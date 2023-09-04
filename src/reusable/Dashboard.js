import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Button from "./Button";

const SideBar = ({ navigateTo, component, props }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/");
    localStorage.removeItem("user-info");
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap ">
        <div className="col-auto col-md-3 col-xl-2 ps-0">
          <div className="d-flex flex-column align-items-center pt-2 text-white min-vh-100 sidebar-menu p-3">
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center "
              id="menu"
            >
              {Object.entries(props).map(([key, value], index) => (
                <li className="m-5 text-light" key={index}>
                  <Link
                    className="forgotpass_link"
                    to={
                      index !== 0
                        ? `/${navigateTo}/${value
                            .replace(/\s/g, "")
                            .toLowerCase()}`
                        : `/${navigateTo}`
                    }
                  >
                    {value.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mb-5">
              <Button
                className={"btn btn-danger mt-3 mb-4"}
                type="submit"
                buttonText={"Log Out"}
                onClick={handleOnClick}
              />
            </div>
          </div>
        </div>
        <div className="col py-3">{component}</div>
      </div>
    </div>
  );
};

export default SideBar;
