import css from "./GetStarted.module.css"
import personIcon from "../../assets/images/hero/person.svg"
import {Link} from "react-router-dom";

const GetStarted = () => {
  return (
      <div className={css.wrapper}>
        <div className={css.profileSection}>
          <div className={css.imageSection}>
            <img src={personIcon} alt="icon of empty user"/>
          </div>
          <div className={css.textSection}>
            <h4 className={css.textSectionText}>Hi, user <br /> let’s  get stated</h4>
          </div>
        </div>
        <div className={css.buttonsWrapper}>
          <Link to={"/register"} className={css.joinBtn}>Join now</Link>
          <Link to={"/login"} className={css.signBtn}>Log in</Link>
        </div>
      </div>
  )
}

export default GetStarted;