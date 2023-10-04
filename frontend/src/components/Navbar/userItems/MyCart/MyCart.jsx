import css from "./MyCart.module.css";
import CartIcon from "../../../../assets/images/navbar/Cart.svg"

const MyCart = () => {
  return (
      <div className={css.card}>
        <div className={css.icon}>
          <img src={CartIcon} />
        </div>
        <div className={css.textWrapper}>
          <p className={css.text}>
            My cart
          </p>
        </div>
      </div>
  )
}

export default MyCart;