import "./Loader.css";

const Loader = () => {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center container text-center">
      <div className="jumping-dots-loader">
        {" "}
        <span></span> <span></span> <span></span>{" "}
      </div>
      <div className="moving-gradient"></div>
    </div>
  );
};

export default Loader;
