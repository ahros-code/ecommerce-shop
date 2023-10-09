import css from "./Cart.module.css"
import useFetch from "../../hooks/useFetch.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import CartItem from "../../components/CartItem/CartItem.jsx";

const Cart = () => {
  const {token} = useContext(AuthContext);
  const {data: Cart} = useFetch(`${import.meta.env.VITE_BACK_URL}/api/cart/get`, {
    headers: {
      token
    }
  });
  return (
    <div className={css.wrapper}>
      <h4 className={css.myCartTitle}>My cart</h4>
      <div className={css.sections}>
        <div className={css.mainSection}>
          {Cart?.data?.map((product, index) => (
              <CartItem key={index} productName={product.ProductModel.name} productImage={product.ProductModel.ImageModel.link} shopName={product.ProductModel.ShopModel.name} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cart;