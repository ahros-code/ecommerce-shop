import css from "./Profile.module.css";
import useFetch from "../../hooks/useFetch.jsx";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Link, Outlet, useLocation } from "react-router-dom";

const Profile = () => {
  const { token } = useContext(AuthContext);
  const { data: profileData } = useFetch(`${import.meta.env.VITE_BACK_URL}/api/profile`, {
    headers: {
      token: token,
    },
  });

  const location = useLocation();

  return (
      <div className={css.wrapper}>
        <div className={css.sideBarWrapper}>
          <div className={css.sidebar}>
            <h3>{profileData?.data?.firstName}</h3>
          </div>
          <div className={css.sections}>
            <ul className={css.sibebarList}>
              <li className={css.sideBarItem}>
                <Link to="/profile/orders" className={location.pathname === "/profile/orders" ? css.activeLink : css.notActiveLink}>
                  My orders
                </Link>
              </li>
              <li className={css.sideBarItem}>
                <Link to="/profile/user" className={location.pathname === "/profile/user" ? css.activeLink : css.notActiveLink}>
                  Settings
                </Link>
              </li>
            </ul>
            <div className={css.sidebarRightSection}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Profile;