import css from "./CartItem.module.css"
import useFetch from "../../hooks/useFetch.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {ProductContext} from "../../context/ProductContext.jsx";

const CartItem = ({productName, productImage, shopName, price, id}) => {
  const {token} = useContext(AuthContext)
  const {setData} = useContext(ProductContext)
  const handleItemDelete = async () => {
    const deletedData = await fetch(`${import.meta.env.VITE_BACK_URL}/api/cart/${id}`, {
      method: "DELETE",
    });

    const res =await fetch(`${import.meta.env.VITE_BACK_URL}/api/cart/get`, {
      headers: {
        token
      }
    });

    const data = await res.json()

    setData(data)
  }
  return (
      <div className={css.wrapper}>
        <div className={css.parent}>
          <div className={css.top}>
            <div className={css.image}>
              <img src={`${import.meta.env.VITE_BACK_URL}${productImage}`} alt={`${productName}'s image`}/>
            </div>
            <div className={css.information}>
              <h4 className={css.productTitle}>{productName}</h4>
              <p className={css.shopTitle}>Shop: {shopName}</p>
            </div>
          </div>
          <div className={css.bottom}>
            <button className={css.removeBtn} onClick={handleItemDelete}>
              Remove
            </button>
            <button className={css.saveBtn} onClick={() => {
              console.log("saved for later")
            }}>
              Save for later
            </button>
          </div>
        </div>
        <div className={css.price}>
          ${price}
        </div>
      </div>
  )
}

export default CartItem;