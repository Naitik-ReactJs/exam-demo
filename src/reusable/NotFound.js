import { useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  let navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 ">
      <h1> :( </h1>
      <br />
      <h3>
        A 404 error occured, Page not found, check the Path{" "}
        <span className="text-danger"> {location.pathname} </span> and try
        again.
      </h3>
      <br />
      <button onClick={handleClick} className="btn btn-danger px-3 pt-2 ">
        Home
      </button>
    </div>
  );
};

export default NotFound;
