import css from "./Navbar.module.css"
import logo from "../../assets/images/navbar/logo.svg"
import Profile from "./userItems/Profile/Profile.jsx";
import Message from "./userItems/Message/Message.jsx";
import Orders from "./userItems/Orders/Orders.jsx";
import MyCart from "./userItems/MyCart/MyCart.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {SearchContext} from "../../context/SearchContext.jsx";

const NavbarComponent = () => {
  const { searchData, setSearchData } = useContext(SearchContext);
  const submitHandler = e => {
    e.preventDefault();
  };

  const navigate = useNavigate()

  return (
      <div className={css.wrapper}>
        <div className={css.logo}>
          <Link to={"/"}>
            <img src={logo} alt={"logo"}/>
          </Link>
        </div>
        <div className={css.search}>
          <form onSubmit={submitHandler}>
            <input
                type='text'
                placeholder='Search'
                value={searchData}
                onChange={e => setSearchData(e.target.value)}
            />
            <button type={"submit"} onClick={() => navigate(`/search?q=${searchData}`)}>Search</button>
          </form>
        </div>
        <ul className={css.userItems}>
          <li className={css.item}>
            <Link to={"/profile"}>
              <Profile/>
            </Link>
          </li>
          <li className={css.item}>
            <Link to={"https://kun.uz"}>
              <Message/>
            </Link>
          </li>
          <li className={css.item}>
            <Link to={"https://kun.uz"}>
              <Orders/>
            </Link>
          </li>
          <li className={css.item}>
            <Link to={"https://kun.uz"}>
              <MyCart/>
            </Link>
          </li>
        </ul>
      </div>
  )
}

export default NavbarComponent;