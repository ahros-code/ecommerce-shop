import css from "./Shop.module.css"
import useFetch from "../../hooks/useFetch.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

const Shop = () => {
  const {token} = useContext(AuthContext)

  const {data: ShopData} = useFetch(`${import.meta.env.VITE_BACK_URL}/api/shop/get`, {headers: {token}});
  return (
      <div className={css.wrapper}>
        <div className={css.header}>
          <img src={`${import.meta.env.VITE_BACK_URL}`} alt=""/>
        </div>
      </div>
  )
}

export default Shop;