import css from "./ShopProductCard.module.css"
import {MdDelete, MdModeEditOutline} from "react-icons/md";
import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

const ShopProductCard = ({productName, productImage, price, id, refetch}) => {
  const {token} = useContext(AuthContext)
  const config = {
    headers: {
      token: token,
    },
  };
  const handleDelete = async () => {
    const deleteProduct = await axios.delete(`${import.meta.env.VITE_BACK_URL}/api/products/${id}`, config)
    refetch(id)
  }

  return (
        <div className={css.wrapper}>
          <img src={`${import.meta.env.VITE_BACK_URL}${productImage}`} alt={`${productName}'s image`} className={css.image} />
          <h4 className={css.title}>{productName}</h4>
          <p className={css.price}>${price}</p>
          <div className={css.btns}>
            <button className={css.editBtn}><MdModeEditOutline /> Edit</button>
            <button className={css.removeBtn} onClick={handleDelete}><MdDelete /> Remove</button>
          </div>
        </div>
  )
}

export default ShopProductCard