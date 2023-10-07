import css from "./Footer.module.css"
import icon from "../../../assets/images/navbar/logo.svg"
import facebook from "../../../assets/images/facebook.svg";
import instagram from "../../../assets/images/instagram.svg";
import linkedin from "../../../assets/images/linkedin.svg";
import youtube from "../../../assets/images/youtube.svg";
import x from "../../../assets/images/x.svg";

const Footer = () => {
  return (
      <footer className={css.footerWrapper}>
        <div className={css.footerNav}>
          <img src={icon} className={css.image} />
          <p className={css.text}>
            Best information about the company gies here but now lorem ipsum is
          </p>
          <ul className={css.socials}>
            <li className={css.item}>
              <img src={facebook} alt="facebook"/>
            </li>
            <li className={css.item}>
              <img src={x} alt="x"/>
            </li>
            <li className={css.item}>
              <img src={linkedin} alt="linkedin"/>
            </li>
            <li className={css.item}>
              <img src={instagram} alt="instagram"/>
            </li>
            <li className={css.item}>
              <img src={youtube} alt="youtube"/>
            </li>
          </ul>
        </div>
        <div className={css.about}>
          <h4 className={css.title}>About</h4>
          <ul className={css.footerList}>
            <li className={css.footerItem}>About Us</li>
            <li className={css.footerItem}>Find store</li>
            <li className={css.footerItem}>Categories</li>
            <li className={css.footerItem}>Blogs</li>
          </ul>
        </div>
        <div className={css.partnership}>
          <h4 className={css.title}>Partnership</h4>
          <ul className={css.footerList}>
            <li className={css.footerItem}>About Us</li>
            <li className={css.footerItem}>Find store</li>
            <li className={css.footerItem}>Categories</li>
            <li className={css.footerItem}>Blogs</li>
          </ul>
        </div>
        <div className={css.information}>
          <h4 className={css.title}>Information</h4>
          <ul className={css.footerList}>
            <li className={css.footerItem}>Help Center</li>
            <li className={css.footerItem}>Money Refund</li>
            <li className={css.footerItem}>Shipping</li>
            <li className={css.footerItem}>Contact us</li>
          </ul>
        </div>
        <div className={css.forusers}>
          <h4 className={css.title}>For users</h4>
          <ul className={css.footerList}>
            <li className={css.footerItem}>Login</li>
            <li className={css.footerItem}>Register</li>
            <li className={css.footerItem}>Settings</li>
            <li className={css.footerItem}>My Orders</li>
          </ul>
        </div>
      </footer>
  )
}

export default Footer;