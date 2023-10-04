import css from "./Navbar.module.css"
import logo from "../../assets/images/navbar/logo.svg"
import Profile from "./userItems/Profile/Profile.jsx";
import Message from "./userItems/Message/Message.jsx";
import Orders from "./userItems/Orders/Orders.jsx";
import MyCart from "./userItems/MyCart/MyCart.jsx";
import {Link} from "react-router-dom";

const NavbarComponent = () => {
  return (
      <div className={css.wrapper}>
        <div className={css.logo}>
          <img src={logo}/>
        </div>
        <div className={css.search}>
          <input type={"search"} placeholder={"Search"}/>
          <button type={"submit"}>Search</button>
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