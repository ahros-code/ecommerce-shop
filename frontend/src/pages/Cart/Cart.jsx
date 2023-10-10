import css from "./Cart.module.css"
import useFetch from "../../hooks/useFetch.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import CartItem from "../../components/CartItem/CartItem.jsx";
import payment from "../../assets/images/payment.png"
import payment1 from "../../assets/images/payment-1.png"
import payment2 from "../../assets/images/payment-2.png"
import payment3 from "../../assets/images/payment-3.png"
import payment4 from "../../assets/images/payment-4.png"

const Cart = () => {
  const {token} = useContext(AuthContext);
  const {data: Cart} = useFetch(`${import.meta.env.VITE_BACK_URL}/api/cart/get`, {
    headers: {
      token
    }
  });
  const [totalCountedPrice, setTotalCountedPrice] = useState(Cart.totalPrice);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [tax, setTax] = useState(14);

  return (
      <div className={css.wrapper}>
        <h4 className={css.myCartTitle}>My cart</h4>
        <div className={css.sections}>
          <div className={css.mainSection}>
            {Cart?.data?.map((product, index) => (
                <CartItem key={index} productName={product.ProductModel.name}
                          productImage={product.ProductModel.ImageModel.link}
                          shopName={product.ProductModel.ShopModel.name} price={product.ProductModel.discountPrice}
                          id={product.id}/>
            ))}
          </div>
          <div className={css.additionalSection}>
            <div className={css.sec}>
              <div className={css.subtotal}>
                Subtotal:
              </div>
              <div className={css.subtotalValue}>
                ${Cart.totalPrice}
              </div>
            </div>
            <div className={css.info}>
              <div className={css.sec}>
                <div className={css.discountInfo}>
                  Discount:
                </div>
                <div className={css.discountValue}>
                  - ${discountPrice}
                </div>
              </div>
              <div className={css.sec}>
                <div className={css.taxInfo}>
                  Tax:
                </div>
                <div className={css.taxValue}>
                  + ${tax}
                </div>
              </div>
            </div>
            <div className={css.totalSection}>
              <div className={css.secOne}>
                <div className={css.totalCountedInfo}>
                  Total:
                </div>
                <div className={css.totalCountedValue}>
                  ${totalCountedPrice}
                </div>
              </div>
              <button className={css.checkoutBtn}>Checkout</button>
              <div className={css.images}>
                <ul className={css.parent}>
                  <li>
                    <img src={payment}/>
                  </li>
                  <li>
                    <img src={payment1}/>
                  </li>
                  <li>
                    <img src={payment2}/>
                  </li>
                  <li>
                    <img src={payment3}/>
                  </li>
                  <li>
                    <img src={payment4}/>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Cart;