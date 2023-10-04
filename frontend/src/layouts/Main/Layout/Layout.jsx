import Navbar from "../Navbar/Navbar.jsx";
import {Outlet} from "react-router-dom";
import css from "./Layout.module.css"
import Footer from "../Footer/Footer.jsx";
import SubHeader from "../SubHeader/SubHeader.jsx";

const Layout = () => {
  return (
      <div className={css.wrapper}>
        <div className={css.navbar}>
          <div className={css.container}>
            <Navbar/>
          </div>
        </div>
        <div className={css.subHeader}>
          <div className={css.container}>
            <SubHeader/>
          </div>
        </div>
        <div className={css.main}>
          <div className={css.container}>
            <Outlet/>
          </div>
        </div>
        <div className={css.footer}>
          <div className={css.container}>
            <Footer/>
          </div>
        </div>
      </div>
  )
}

export default Layout;