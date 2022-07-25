import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes, Navigate } from "react-router-dom";
import { Signup } from "./components/Signup/index";
import { Login } from "./components/Login/index";
import { Main } from "./components/Main/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = localStorage.getItem("token");
  return (
   <>
   <ToastContainer />
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" exact element={<Navigate replace to="/login" />} />
    </Routes>
   </>
  );
}

export default App;
