import css from "./Orders.module.css";
import OrdersIcon from "../../../../assets/images/navbar/liked.svg"

const Orders = () => {
  return (
      <div className={css.card}>
        <div className={css.icon}>
          <img src={OrdersIcon} />
        </div>
        <div className={css.textWrapper}>
          <p className={css.text}>
            Orders
          </p>
        </div>
      </div>
  )
}

export default Orders;