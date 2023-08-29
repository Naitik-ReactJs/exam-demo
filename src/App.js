import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import SignUp from "./components/SignUp";
import NotFound from "./reusable/NotFound";

function App() {
  return (
    <Router>
      <>
        <Routes>
          {" "}
          <Route path="/" element={<SignIn />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
