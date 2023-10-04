import css from "./Profile.module.css";
import ProfileIcon from "../../../../assets/images/navbar/Profile.svg"

const Profile = () => {
  return (
      <div className={css.card}>
        <div className={css.icon}>
          <img src={ProfileIcon}/>
        </div>
        <div className={css.textWrapper}>
          <p className={css.text}>
            Profile
          </p>
        </div>
      </div>
  )
}

export default Profile;