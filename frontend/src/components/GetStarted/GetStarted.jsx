import css from "./GetStarted.module.css"
import personIcon from "../../assets/images/hero/person.svg"
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

const GetStarted = () => {
  const {token} = useContext(AuthContext);
  return (
      <div className={css.wrapper}>
        <div className={css.profileSection}>
          <div className={css.imageSection}>
            <img src={personIcon} alt="icon of empty user"/>
          </div>
          <div className={css.textSection}>
            <h4 className={css.textSectionText}>{token ? "Hi user" : "Hi, user <br /> let’s  get stated"}</h4>
          </div>
        </div>
        <div className={css.buttonsWrapper}>
          {token ? <Link to={"/profile/orders"} className={css.joinBtn}>Profile</Link> : <Link to={"/register"} className={css.joinBtn}>Join now</Link>}
          {token ? <Link to={"/cart"} className={css.signBtn}>Go to cart</Link> : <Link to={"/login"} className={css.signBtn}>Log in</Link>}
        </div>
      </div>
  )
}

export default GetStarted;