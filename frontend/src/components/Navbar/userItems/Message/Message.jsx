import css from "./Message.module.css";
import MessageIcon from "../../../../assets/images/navbar/Message.svg"

const Profile = () => {
  return (
      <div className={css.card}>
        <div className={css.icon}>
          <img src={MessageIcon} />
        </div>
        <div className={css.textWrapper}>
          <p className={css.text}>
            Message
          </p>
        </div>
      </div>
  )
}

export default Profile;