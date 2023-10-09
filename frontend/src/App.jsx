import Home from "./pages/Home/Home.jsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import Layout from "./layouts/Main/Layout/Layout.jsx";
import Profile from "./pages/Profile/Profile.jsx"
import Search from "./pages/Search/Search.jsx";
import SingleProduct from "./pages/SingleProduct/SingleProduct.jsx";
import Register from "./pages/Auth/Register/Register.jsx";
import React, {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";
import Login from "./pages/Auth/Login/Login.jsx";
import Orders from "./pages/Profile/Orders/Orders.jsx";
import User from "./pages/Profile/User/User.jsx";

function App() {
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();

  return (
      <Routes>
        <Route path={"/"} element={<Layout/>}>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/profile"} element={<Profile/>}>
            <Route path={"orders"} element={<Orders />} />
            <Route path={"user"} element={<User />} />
          </Route>
          <Route path={"/search"} element={<Search/>}/>
          <Route path={"/products/:id"} element={<SingleProduct/>}/>
        </Route>
        <Route
            path={"/register"}
            element={<Register/>}
        />
        <Route
            path={"/login"}
            element={<Login />}
        />
      </Routes>
  );
}

export default App;