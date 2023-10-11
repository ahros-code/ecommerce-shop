import React, { useContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';
import Layout from './layouts/Main/Layout/Layout.jsx';
import Login from './pages/Auth/Login/Login.jsx';
import Register from './pages/Auth/Register/Register.jsx';
import Home from './pages/Home/Home.jsx';
import Orders from './pages/Profile/Orders/Orders.jsx';
import Profile from './pages/Profile/Profile.jsx';
import User from './pages/Profile/User/User.jsx';
import Search from './pages/Search/Search.jsx';
import SingleProduct from './pages/SingleProduct/SingleProduct.jsx';
import Liked from "./pages/Liked/Liked.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Activation from "./pages/Activation/Activation.jsx";
import ActivateAccountPage from "./pages/Activation/Activation.jsx";
import Description from "./components/Description/Description.jsx";
import Reviews from "./components/Reviews/Reviews.jsx";

function App() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route path={'/'} element={<Home />} />
          <Route path={'/profile'} element={<Profile />}>
            <Route path={'orders'} element={<Orders />} />
            <Route path={'user'} element={<User />} />
          </Route>
          <Route path={"/liked"} element={<Liked />} />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={'/search'} element={<Search />} />
          <Route path={'/products/:id'} element={<SingleProduct />} >
            <Route path={"description"} element={<Description />} />
            <Route path={"reviews"} element={<Reviews />} />
          </Route>
        </Route>
        <Route path={'/register'} element={<Register />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={"/user/auth/account/activate/:code"} element={<ActivateAccountPage />} />
      </Routes>
  );
}

export default App;
